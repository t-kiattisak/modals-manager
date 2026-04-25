"use client"

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ReactNode } from "react"

const backdropStyles =
  "fixed inset-0 bg-zinc-950/40 dark:bg-zinc-950/70 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"

const panelStyles =
  "relative w-full max-w-lg transform overflow-hidden rounded-xl border border-zinc-200/80 bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:border-zinc-700 dark:bg-zinc-900 data-closed:sm:translate-y-0 data-closed:sm:scale-95 sm:rounded-2xl"

const titleRowStyles = "px-4 pt-5 sm:px-6 sm:pt-6"
const bodyStyles = "px-4 pb-4 pt-0 sm:px-6 sm:pb-6"

/**
 * Re-export Headless UI dialog primitives for custom compositions
 * (same as your stack’s `Dialog*`, but named for modal-manager use).
 */
export {
  Dialog as ModalDialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/react"

export interface ModalProps {
  readonly opened: boolean
  readonly onClose?: () => void
  readonly zIndex: number
  readonly children: ReactNode
  /** Shown in the panel header; a screen-reader-only title is used when omitted. */
  readonly title?: ReactNode
  readonly className?: string
  readonly backdropClassName?: string
  readonly panelClassName?: string
  readonly titleClassName?: string
}

/**
 * Default shell for {@link ModalsProvider}: backdrop, centered panel, enter/leave transitions.
 * Styling is intentionally minimal (primitive); apps override via *ClassName or compose `ModalDialog`.
 */
export function Modal({
  opened,
  onClose,
  zIndex,
  children,
  title,
  className,
  backdropClassName,
  panelClassName,
  titleClassName,
}: ModalProps) {
  return (
    <Dialog
      open={opened}
      onClose={() => onClose?.()}
      className={twMerge("fixed inset-0", className)}
      style={{ zIndex }}
    >
      <DialogBackdrop
        transition
        className={twMerge(backdropStyles, backdropClassName)}
      />

      <div className='fixed inset-0 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className={twMerge(panelStyles, panelClassName)}
          >
            {title ? (
              <div className={titleRowStyles}>
                <DialogTitle
                  as='h2'
                  className={twMerge(
                    "text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100",
                    titleClassName,
                  )}
                >
                  {title}
                </DialogTitle>
              </div>
            ) : (
              <DialogTitle className='sr-only'>Dialog</DialogTitle>
            )}

            <div
              className={clsx(
                bodyStyles,
                title ? "pt-3 sm:pt-4" : "pt-5 sm:pt-6",
              )}
            >
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
