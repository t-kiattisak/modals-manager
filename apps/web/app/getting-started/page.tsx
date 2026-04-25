import { CodeBlock } from "../features/docs/components"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Getting Started – Modals Manager",
  description: "Step-by-step guide to install and set up modals-manager in your React project.",
}

const installCode = `npm install @repo/modals`

const modalComponentCode = `// app/features/modals/components/DeleteModal.tsx
"use client"

import { ContextModalProps } from "@repo/modals"

interface DeleteModalProps {
  itemName: string
  onDeleted?: () => void
}

export const DeleteModal = ({
  innerProps: { itemName, onDeleted },
  context,
  id,
}: ContextModalProps<DeleteModalProps>) => {
  return (
    <div>
      <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={() => context.closeModal(id)}>Cancel</button>
        <button
          onClick={() => {
            onDeleted?.()
            context.closeModal(id)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}`

const providerCode = `// app/providers/ModalProvider.tsx
"use client"

import { ModalsProvider } from "@repo/modals"
import { DeleteModal } from "../features/modals/components/DeleteModal"

const modals = {
  delete: DeleteModal,
}

// ← Augment the type — this is the key to full type safety
declare module "@repo/modals" {
  interface ModalsOverride {
    modals: typeof modals
  }
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => (
  <ModalsProvider modals={modals}>{children}</ModalsProvider>
)`

const layoutCode = `// app/layout.tsx
import { ModalProvider } from "./providers/ModalProvider"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  )
}`

const usageCode = `// Any component, anywhere
import { modals } from "@repo/modals"

function MyComponent() {
  const handleDelete = () => {
    modals.openContextModal({
      modal: "delete",           // ← autocomplete ✓
      innerProps: {
        itemName: "my-project", // ← type-checked ✓
        onDeleted: () => console.log("Item deleted"),
      },
    })
  }

  return <button onClick={handleDelete}>Delete</button>
}`

const STEPS = [
  {
    num: "01",
    title: "Install the package",
    desc: "Add modals-manager to your project.",
    code: installCode,
    file: "terminal",
    note: null,
  },
  {
    num: "02",
    title: "Create context modal components",
    desc: "Define reusable modal components with typed innerProps. Place them in a feature folder.",
    code: modalComponentCode,
    file: "features/modals/components/DeleteModal.tsx",
    note: "Each context modal receives context, id, and innerProps. The ContextModalProps<T> generic types your custom props.",
  },
  {
    num: "03",
    title: "Set up the provider",
    desc: "Create a ModalProvider wrapper that registers your modals and augments the type.",
    code: providerCode,
    file: "providers/ModalProvider.tsx",
    note: "The declare module augmentation is what gives you type-safe openContextModal calls. TypeScript will now know which modal keys exist and what innerProps they accept.",
  },
  {
    num: "04",
    title: "Add to your root layout",
    desc: "Wrap your app with the provider — once, at the root.",
    code: layoutCode,
    file: "app/layout.tsx",
    note: null,
  },
  {
    num: "05",
    title: "Open modals anywhere",
    desc: "Use the modals object anywhere in your app — no hooks, no imports of components.",
    code: usageCode,
    file: "any-component.tsx",
    note: null,
  },
]

export default function GettingStartedPage() {
  return (
    <div style={{ padding: "48px 56px", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <span className='badge badge-green'>Guide</span>
          <span className='badge badge-blue'>~5 min</span>
        </div>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            marginBottom: 12,
          }}
        >
          Getting Started
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "55ch", lineHeight: 1.75 }}>
          Set up modals-manager in your React project in under 5 minutes. This
          guide walks you through installation, provider setup, type
          augmentation, and opening your first modal.
        </p>
      </div>

      {/* Prerequisites */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          Prerequisites
        </div>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            "React 18 or later",
            "TypeScript 5+ (recommended)",
            "Next.js 13+ with App Router or any React framework",
          ].map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
              }}
            >
              <span style={{ color: "var(--green)", fontSize: "0.8rem" }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {STEPS.map((step) => (
          <div key={step.num}>
            {/* Step header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                {step.num}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: 4,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.title}
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
            </div>

            <CodeBlock code={step.code} filename={step.file} />

            {step.note && (
              <div className='callout callout-tip' style={{ marginTop: 12 }}>
                <strong>💡 Note: </strong>
                {step.note}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div className='divider' />
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 8,
          }}
        >
          You're ready! 🎉
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
          Explore more features and real-world use cases.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { href: "/examples", label: "→ View Examples", variant: "btn-primary" },
            { href: "/api", label: "API Reference", variant: "btn-secondary" },
          ].map((b) => (
            <a key={b.href} href={b.href} className={`btn ${b.variant}`}>
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
