import Link from "next/link"
import { CodeBlock } from "./features/docs/components"

const INSTALL_CODE = `npm install @repo/modals
# or
yarn add @repo/modals
# or
pnpm add @repo/modals`

const SETUP_CODE = `// app/providers/ModalProvider.tsx
"use client"

import { ModalsProvider } from "@repo/modals"
import { DeleteModal, SettingsModal } from "../features/modals/components"

const modals = {
  delete: DeleteModal,
  settings: SettingsModal,
}

// 🔑 Augment the type so openContextModal is fully typed
declare module "@repo/modals" {
  interface ModalsOverride {
    modals: typeof modals
  }
}

export const ModalProvider = ({ children }) => (
  <ModalsProvider modals={modals}>{children}</ModalsProvider>
)`

const USAGE_CODE = `// Anywhere in your app — no imports needed!
import { modals } from "@repo/modals"

// Open a basic modal
modals.open({ title: "Hello", children: <p>World</p> })

// Open a confirm dialog
modals.openConfirmModal({
  title: "Delete item?",
  labels: { confirm: "Delete", cancel: "Keep" },
  onConfirm: () => console.log("deleted!"),
})

// Open a typed context modal
modals.openContextModal({
  modal: "delete",
  innerProps: { itemName: "my-project" }, // ← fully typed!
})`

const FEATURES = [
  {
    icon: "⚡",
    title: "Programmatic API",
    desc: "Open, close, and update modals from anywhere — no state, no props drilling.",
    color: "#6c63ff",
  },
  {
    icon: "🔒",
    title: "Fully Type-Safe",
    desc: "Context modals infer their innerProps type automatically via module augmentation.",
    color: "#22c55e",
  },
  {
    icon: "📦",
    title: "Context Modals",
    desc: "Register reusable modal components once, open them by key from anywhere.",
    color: "#3b82f6",
  },
  {
    icon: "✅",
    title: "Confirm Dialogs",
    desc: "Built-in confirm modal with customizable labels and callbacks.",
    color: "#f97316",
  },
  {
    icon: "🗂️",
    title: "Modal Stacking",
    desc: "Open multiple modals on top of each other with a single queue.",
    color: "#ec4899",
  },
  {
    icon: "🎨",
    title: "Customizable",
    desc: "Global modal props, per-modal overrides, and full style control.",
    color: "#a78bfa",
  },
]

export default function HomePage() {
  return (
    <div style={{ padding: "48px 56px", maxWidth: 900 }}>
      {/* ── Hero ── */}
      <div className='animate-fade-up' style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span className='badge badge-purple'>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#a78bfa",
                display: "inline-block",
              }}
            />
            v1.0 — Stable
          </span>
          <span className='badge badge-green'>TypeScript</span>
          <span className='badge badge-blue'>React 18+</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          The modal library
          <br />
          <span className='gradient-text'>your app deserves.</span>
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            color: "var(--text-secondary)",
            maxWidth: "55ch",
            lineHeight: 1.75,
            marginBottom: 32,
          }}
        >
          <strong style={{ color: "var(--text-primary)" }}>modals-manager</strong> is a
          type-safe, programmatic modal library for React. Open modals from
          anywhere — no context, no prop drilling, no boilerplate.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href='/getting-started' className='btn btn-primary'>
            Get Started →
          </Link>
          <Link href='/examples' className='btn btn-secondary'>
            See Examples
          </Link>
          <Link href='/api' className='btn btn-ghost'>
            API Reference
          </Link>
        </div>
      </div>

      {/* ── Quick preview ── */}
      <div className='animate-fade-up-delay-1'>
        <CodeBlock code={USAGE_CODE} filename='anywhere-in-your-app.tsx' />
      </div>

      <div className='divider' />

      {/* ── Features ── */}
      <div className='animate-fade-up-delay-2'>
        <h2 className='section-title'>Why modals-manager?</h2>
        <p className='section-subtitle'>
          Everything you need, nothing you don't.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className='card'
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  marginBottom: 14,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  marginBottom: 6,
                  color: "var(--text-primary)",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='divider' />

      {/* ── Install ── */}
      <div className='animate-fade-up-delay-3'>
        <h2 className='section-title'>Installation</h2>
        <p className='section-subtitle'>
          Pick your package manager and run one command.
        </p>
        <CodeBlock code={INSTALL_CODE} filename='terminal' lang='bash' />
      </div>

      <div className='divider' />

      {/* ── Setup ── */}
      <div>
        <h2 className='section-title'>Quick Setup</h2>
        <p className='section-subtitle'>
          Two steps and you're ready to open modals from anywhere.
        </p>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "8px 0",
            marginBottom: 24,
          }}
        >
          <div className='step'>
            <div className='step-number'>1</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
                Wrap your app with{" "}
                <code>ModalsProvider</code>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Register your context modal components and augment the type.
              </div>
            </div>
          </div>
          <div className='step'>
            <div className='step-number'>2</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
                Use <code>modals</code> anywhere
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Import the <code>modals</code> object and call its methods — no
                hook, no context needed.
              </div>
            </div>
          </div>
        </div>

        <CodeBlock code={SETUP_CODE} filename='providers/ModalProvider.tsx' />

        <div className='callout callout-info' style={{ marginTop: 24 }}>
          <strong>💡 Module Augmentation</strong> — declaring{" "}
          <code>ModalsOverride</code> gives you full type safety on{" "}
          <code>openContextModal</code>. Without it, TypeScript won't know which
          modals exist or what props they accept.
        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
          <Link href='/getting-started' className='btn btn-primary'>
            Full Setup Guide →
          </Link>
          <Link href='/examples' className='btn btn-secondary'>
            See Examples
          </Link>
        </div>
      </div>
    </div>
  )
}
