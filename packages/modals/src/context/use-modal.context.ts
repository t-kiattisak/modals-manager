"use client"

import { createContext, use } from "react"
import { ModalsContextProps } from "../models/modals-context.model"

export function useModals() {
  const ctx = use(ModalsContext)

  if (!ctx) {
    throw new Error(
      "useModals hook was called outside of context, wrap your app with ModalsProvider component",
    )
  }

  return ctx
}

export const ModalsContext = createContext<ModalsContextProps>(null as any)
ModalsContext.displayName = "modals/ModalsContext"
