"use client"

import { ModalsProvider } from "@repo/modals"
import {
  SettingsModal,
  DeleteModal,
  UserProfileModal,
} from "../features/modals/components"

const modals = {
  settings: SettingsModal,
  delete: DeleteModal,
  userProfile: UserProfileModal,
}

declare module "@repo/modals" {
  interface ModalsOverride {
    modals: typeof modals
  }
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return <ModalsProvider modals={modals}>{children}</ModalsProvider>
}
