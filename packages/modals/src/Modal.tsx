import { ReactNode } from "react"

export interface ModalProps {
  onClose?: () => void
  zIndex: number
  opened: boolean
  children: ReactNode
}

export function Modal({ children }: ModalProps) {
  return <div>{children}</div>
}
