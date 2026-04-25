import { useModals } from "../context/use-modal.context"

export interface ConfirmModalProps {
  id?: string
  children?: React.ReactNode
  onCancel?: () => void
  onConfirm?: () => void
  closeOnConfirm?: boolean
  closeOnCancel?: boolean
  cancelProps?: React.ComponentProps<"button"> & Record<`data-${string}`, any>
  confirmProps?: React.ComponentProps<"button"> & Record<`data-${string}`, any>
  labels?: { cancel?: React.ReactNode; confirm?: React.ReactNode }
}

export function ConfirmModal({
  id,
  cancelProps,
  confirmProps,
  labels = { cancel: "", confirm: "" },
  closeOnConfirm = true,
  closeOnCancel = true,
  onCancel,
  onConfirm,
  children,
}: ConfirmModalProps) {
  const { cancel: cancelLabel, confirm: confirmLabel } = labels
  const ctx = useModals()

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    typeof cancelProps?.onClick === "function" && cancelProps?.onClick(event)
    typeof onCancel === "function" && onCancel()
    closeOnCancel && ctx.closeModal(id!)
  }

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    typeof confirmProps?.onClick === "function" && confirmProps?.onClick(event)
    typeof onConfirm === "function" && onConfirm()
    closeOnConfirm && ctx.closeModal(id!)
  }

  return (
    <>
      {children && <div className='mb-md'>{children}</div>}

      <div className='mt-md justify-end'>
        <button
          className='variant-default'
          {...cancelProps}
          onClick={handleCancel}
        >
          {cancelProps?.children || cancelLabel}
        </button>

        <button {...confirmProps} onClick={handleConfirm}>
          {confirmProps?.children || confirmLabel}
        </button>
      </div>
    </>
  )
}
