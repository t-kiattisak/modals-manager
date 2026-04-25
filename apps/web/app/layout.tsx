import "@repo/ui/styles.css"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ModalProvider } from "./providers/ModalProvider"
import { DocsLayout } from "./features/docs/components/DocsLayout"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Modals Manager – Type-safe React Modals",
  description:
    "A premium, type-safe modals library for React. Programmatic control, beautiful animations, context modals, confirm dialogs, and effortless stacking.",
  keywords: ["react", "modals", "typescript", "ui", "dialog"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.variable}>
        <ModalProvider>
          <DocsLayout>{children}</DocsLayout>
        </ModalProvider>
      </body>
    </html>
  )
}
