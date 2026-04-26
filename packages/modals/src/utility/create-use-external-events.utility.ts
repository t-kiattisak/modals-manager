"use client"

import { useEffect, useLayoutEffect, useRef } from "react"

export const useIsomorphicEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect

function dispatchEvent<T>(type: string, detail?: T) {
  window.dispatchEvent(new CustomEvent(type, { detail }))
}

export function createUseExternalEvents<
  Handlers extends Record<string, (detail: any) => void>,
>(prefix: string) {
  function useRegisteredWindowEvents(events: Handlers) {
    const eventsRef = useRef(events)
    eventsRef.current = events

    useIsomorphicEffect(() => {
      const keys = Object.keys(eventsRef.current) as (keyof Handlers & string)[]
      const registered: { type: string; listener: (e: Event) => void }[] = []

      for (const key of keys) {
        const type = `${prefix}:${String(key)}`
        const listener = (event: Event) => {
          const handler = eventsRef.current[key]
          if (typeof handler === "function") {
            handler((event as CustomEvent).detail)
          }
        }
        window.addEventListener(type, listener)
        registered.push({ type, listener })
      }

      return () => {
        for (const { type, listener } of registered) {
          window.removeEventListener(type, listener)
        }
      }
    }, [prefix])
  }

  function createEvent<EventKey extends keyof Handlers>(event: EventKey) {
    type Parameter = Parameters<Handlers[EventKey]>[0]

    return (
      ...payload: Parameter extends undefined ? [undefined?] : [Parameter]
    ) => dispatchEvent(`${prefix}:${String(event)}`, payload[0])
  }

  return [useRegisteredWindowEvents, createEvent] as const
}
