import { ReactNode } from "react"
import { ConfirmModalProps } from "../components/ConfirmModal"
import { ModalProps } from "../Modal"

export type ModalSettings = Partial<Omit<ModalProps, "opened">> & {
  modalId?: string
  title?: ReactNode
}

export type ConfirmLabels = Record<"confirm" | "cancel", ReactNode>

export interface OpenConfirmModal extends ModalSettings, ConfirmModalProps {}
export interface OpenContextModal<CustomProps extends Record<string, any> = {}>
  extends ModalSettings {
  innerProps: CustomProps
}

export interface ModalsContextProps {
  modalProps: ModalSettings
  modals: ModalState[]
  openModal: (props: ModalSettings) => string
  openConfirmModal: (props: OpenConfirmModal) => string
  openContextModal: <TKey extends TModal>(
    modal: TKey,
    props: OpenContextModal<Parameters<TModals[TKey]>[0]["innerProps"]>,
  ) => string
  closeModal: (id: string, canceled?: boolean) => void
  closeContextModal: <TKey extends TModal>(id: TKey, canceled?: boolean) => void
  closeAll: () => void
  updateModal: (
    payload: { modalId: string } & Partial<OpenConfirmModal>,
  ) => void
  updateContextModal: (
    payload: { modalId: string } & Partial<OpenContextModal<any>>,
  ) => void
}

export interface ContextModalProps<T extends Record<string, any> = {}> {
  context: ModalsContextProps
  innerProps: T
  id: string
}

export type ModalState =
  | { id: string; props: ModalSettings; type: "content" }
  | { id: string; props: OpenConfirmModal; type: "confirm" }
  | { id: string; props: OpenContextModal; type: "context"; ctx: string }

export interface ModalsOverride {}

export type ModalsOverwritten = keyof ModalsOverride extends never
  ? { modals: Record<string, React.FC<ContextModalProps<any>>> }
  : ModalsOverride

export type TModals = ModalsOverwritten["modals"]

export type TModal = keyof TModals
