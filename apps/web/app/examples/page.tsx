"use client"

import { useState } from "react"
import { modals } from "@repo/modals"
import { CodeBlock } from "../features/docs/components"

// ─── Code Snippets ──────────────────────────────────────────────────────────

const BASIC_CODE = `import { modals } from "@repo/modals"

modals.open({
  title: "Welcome",
  children: (
    <div>
      <p>This is a basic modal. Simple and clean.</p>
    </div>
  ),
})`

const CONFIRM_CODE = `import { modals } from "@repo/modals"

modals.openConfirmModal({
  title: "Delete project",
  children: (
    <p>Are you sure? This action cannot be undone.</p>
  ),
  labels: { confirm: "Delete", cancel: "Keep it" },
  onConfirm: () => console.log("Project deleted!"),
  onCancel: () => console.log("Cancelled"),
})`

const CONTEXT_CODE = `// 1. Define your modal component
import { ContextModalProps } from "@repo/modals"

interface DeleteModalProps {
  itemName: string
  onDeleted?: () => void
}

export const DeleteModal = ({
  innerProps: { itemName, onDeleted },
  context,
  id,
}: ContextModalProps<DeleteModalProps>) => (
  <div>
    <p>Delete <strong>{itemName}</strong>?</p>
    <button onClick={() => {
      onDeleted?.()
      context.closeModal(id)
    }}>Confirm</button>
  </div>
)

// 2. Register in provider + augment types
declare module "@repo/modals" {
  interface ModalsOverride {
    modals: { delete: typeof DeleteModal }
  }
}

// 3. Open it anywhere — fully type-safe!
modals.openContextModal({
  modal: "delete",           // ← autocomplete ✓
  innerProps: {
    itemName: "my-project", // ← type-checked ✓
    onDeleted: () => refetch(),
  },
})`

const STACKING_CODE = `import { modals } from "@repo/modals"

// Opening a modal inside another modal
modals.open({
  title: "Step 1",
  children: (
    <div>
      <p>First modal content</p>
      <button
        onClick={() =>
          modals.open({
            title: "Step 2",
            children: (
              <div>
                <p>Second modal content</p>
                <button onClick={() => modals.closeAll()}>
                  Close All
                </button>
              </div>
            ),
          })
        }
      >
        Open Next Step
      </button>
    </div>
  ),
})`

const USER_PROFILE_CODE = `// 1. Define the modal
interface UserProfileModalProps {
  username: string
  role: "admin" | "editor" | "viewer"
  email: string
}

export const UserProfileModal = ({
  innerProps: { username, role, email },
  context, id,
}: ContextModalProps<UserProfileModalProps>) => (
  <div>
    <Avatar name={username} />
    <div>{username} · {email}</div>
    <Badge>{role}</Badge>
    <button onClick={() => context.closeModal(id)}>Close</button>
  </div>
)

// 2. Open it with full type safety
modals.openContextModal({
  modal: "userProfile",
  title: "User Profile",
  innerProps: {
    username: "johndoe",
    role: "admin",    // ← only "admin" | "editor" | "viewer" allowed
    email: "john@example.com",
  },
})`

const UPDATE_CODE = `import { modals } from "@repo/modals"

// Get the ID when opening
const id = modals.open({
  title: "Loading...",
  children: <Spinner />,
})

// Later — update the open modal
modals.updateModal({
  modalId: id,
  title: "Done!",
  children: <SuccessMessage />,
})`

const GLOBAL_PROPS_CODE = `// Apply shared props to ALL modals at once
<ModalsProvider
  modalProps={{
    centered: true,
    radius: "lg",
    overlayProps: { blur: 4 },
    transitionProps: { duration: 200, transition: "fade" },
  }}
  labels={{
    confirm: "Yes, proceed",
    cancel: "No, go back",
  }}
>
  {children}
</ModalsProvider>`

// ─── Example demos ──────────────────────────────────────────────────────────

function BasicDemo() {
  const open = () =>
    modals.open({
      title: "Welcome to Modals Manager",
      children: (
        <div>
          <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
            This is a <strong style={{ color: "var(--text-primary)" }}>basic modal</strong>{" "}
            with a title and custom children. It can hold any React content.
          </p>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "10px 14px",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              color: "#a78bfa",
            }}
          >
            modals.open(&#123; title, children &#125;)
          </div>
        </div>
      ),
    })

  return (
    <button className='btn btn-primary' onClick={open} id='demo-basic-modal'>
      Open Basic Modal
    </button>
  )
}

function ConfirmDemo() {
  const open = () =>
    modals.openConfirmModal({
      title: "Delete project?",
      children: (
        <p style={{ color: "var(--text-secondary)" }}>
          Are you sure you want to delete{" "}
          <strong style={{ color: "#ef4444" }}>my-cool-project</strong>? This
          action cannot be undone.
        </p>
      ),
      labels: { confirm: "Delete", cancel: "Keep it" },
      onConfirm: () => alert("✓ Deleted!"),
    })

  return (
    <button className='btn btn-primary' onClick={open} id='demo-confirm-modal'>
      Open Confirm Modal
    </button>
  )
}

function ContextDemo() {
  const open = () =>
    modals.openContextModal({
      modal: "delete",
      title: "Delete Item",
      innerProps: {
        itemName: "my-project-v2",
        onDeleted: () => alert("✓ Deletion callback fired!"),
      },
    })

  return (
    <button className='btn btn-primary' onClick={open} id='demo-context-modal'>
      Open Context Modal
    </button>
  )
}

function StackingDemo() {
  const open = () =>
    modals.open({
      title: "Step 1 — Select Action",
      children: (
        <div>
          <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
            Modals can be stacked. Open another from within this one.
          </p>
          <button
            className='btn btn-secondary'
            style={{ width: "100%" }}
            onClick={() =>
              modals.open({
                title: "Step 2 — Confirm",
                children: (
                  <div>
                    <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
                      This is the second level modal.
                    </p>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className='btn btn-ghost'
                        style={{ flex: 1 }}
                        onClick={() => modals.closeAll()}
                      >
                        Close All
                      </button>
                      <button
                        className='btn btn-primary'
                        style={{ flex: 1 }}
                        onClick={() => alert("✓ Confirmed!")}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                ),
              })
            }
          >
            Open Step 2 →
          </button>
        </div>
      ),
    })

  return (
    <button className='btn btn-primary' onClick={open} id='demo-stacking'>
      Open Stacked Modals
    </button>
  )
}

function UserProfileDemo() {
  const open = () =>
    modals.openContextModal({
      modal: "userProfile",
      title: "User Profile",
      innerProps: {
        username: "johndoe",
        role: "admin",
        email: "john@example.com",
      },
    })

  return (
    <button className='btn btn-primary' onClick={open} id='demo-user-profile'>
      Open User Profile
    </button>
  )
}

function SettingsDemo() {
  const open = () =>
    modals.openContextModal({
      modal: "settings",
      title: "App Settings",
      innerProps: { content: "theme=dark&lang=en" },
    })

  return (
    <button className='btn btn-primary' onClick={open} id='demo-settings'>
      Open Settings Modal
    </button>
  )
}

// ─── Example Section Component ───────────────────────────────────────────────

function ExampleSection({
  id,
  badge,
  badgeVariant = "badge-purple",
  title,
  description,
  demo,
  code,
  codeFile,
  callout,
}: {
  id: string
  badge: string
  badgeVariant?: string
  title: string
  description: string
  demo: React.ReactNode
  code: string
  codeFile: string
  callout?: { type: "info" | "tip" | "warn"; text: string }
}) {
  const [showCode, setShowCode] = useState(false)

  return (
    <section
      id={id}
      style={{
        paddingTop: 64,
        scrollMarginTop: 80,
      }}
    >
      <span className={`badge ${badgeVariant}`} style={{ marginBottom: 12, display: "inline-flex" }}>
        {badge}
      </span>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          marginBottom: 10,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.95rem",
          maxWidth: "60ch",
          lineHeight: 1.75,
          marginBottom: 24,
        }}
      >
        {description}
      </p>

      {/* Demo card */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          minHeight: 120,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 16,
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          Live Demo
        </div>
        {demo}
      </div>

      {/* Toggle code */}
      <button
        className='btn btn-ghost'
        style={{ fontSize: "0.8rem", marginBottom: 4 }}
        onClick={() => setShowCode((v) => !v)}
      >
        {showCode ? "▾ Hide Code" : "▸ Show Code"}
      </button>

      {showCode && <CodeBlock code={code} filename={codeFile} />}

      {callout && (
        <div className={`callout callout-${callout.type}`}>
          {callout.text}
        </div>
      )}
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ExamplesPage() {
  return (
    <div style={{ padding: "48px 56px", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <span className='badge badge-blue' style={{ marginBottom: 16, display: "inline-flex" }}>
          Examples
        </span>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            marginBottom: 12,
          }}
        >
          Examples & Use Cases
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "58ch", lineHeight: 1.75 }}>
          Real-world examples of modals-manager in action. Click each demo to
          see it live, then expand the code to see how it's done.
        </p>
      </div>

      <ExampleSection
        id='basic'
        badge='01 · Basic'
        badgeVariant='badge-purple'
        title='Basic Modal'
        description='The simplest way to open a modal. Pass a title and any React element as children. The modal is managed entirely by the library — no useState required.'
        demo={<BasicDemo />}
        code={BASIC_CODE}
        codeFile='basic-example.tsx'
        callout={{
          type: "tip",
          text: "💡 modals.open() returns a string ID. You can use it later to update or close this specific modal programmatically.",
        }}
      />

      <div className='divider' />

      <ExampleSection
        id='confirm'
        badge='02 · Confirm'
        badgeVariant='badge-green'
        title='Confirm Modal'
        description='A built-in confirm dialog pattern with configurable labels and onConfirm / onCancel callbacks. Perfect for destructive actions that need user approval.'
        demo={<ConfirmDemo />}
        code={CONFIRM_CODE}
        codeFile='confirm-example.tsx'
        callout={{
          type: "info",
          text: "ℹ️ The labels prop on ModalsProvider sets default button labels for all confirm modals. You can override per-modal too.",
        }}
      />

      <div className='divider' />

      <ExampleSection
        id='context'
        badge='03 · Context Modal'
        badgeVariant='badge-blue'
        title='Context Modal'
        description='Register reusable React components as named modals. Open them by key with fully typed innerProps — TypeScript will error if you pass the wrong props.'
        demo={<ContextDemo />}
        code={CONTEXT_CODE}
        codeFile='context-modal-example.tsx'
        callout={{
          type: "tip",
          text: "💡 The declare module augmentation is what makes openContextModal type-safe. Without it, TypeScript has no way to know which modal keys or props you've registered.",
        }}
      />

      <div className='divider' />

      <ExampleSection
        id='user-profile'
        badge='04 · Complex Props'
        badgeVariant='badge-orange'
        title='User Profile Modal'
        description='Context modals support any typed innerProps shape — including union types, optional callbacks, and nested objects. TypeScript enforces correctness at every call site.'
        demo={<UserProfileDemo />}
        code={USER_PROFILE_CODE}
        codeFile='user-profile-modal.tsx'
      />

      <div className='divider' />

      <ExampleSection
        id='stacking'
        badge='05 · Stacking'
        badgeVariant='badge-purple'
        title='Stacked Modals'
        description='Open a modal from within another modal. The library queues them automatically. Use modals.closeAll() to dismiss everything at once.'
        demo={<StackingDemo />}
        code={STACKING_CODE}
        codeFile='stacking-example.tsx'
      />

      <div className='divider' />

      <ExampleSection
        id='settings'
        badge='06 · Settings'
        badgeVariant='badge-blue'
        title='Settings Modal'
        description='A dedicated settings modal with full context access. The modal component can call context.closeModal(id) itself for self-dismissal.'
        demo={<SettingsDemo />}
        code={CONTEXT_CODE}
        codeFile='settings-modal.tsx'
      />

      <div className='divider' />

      {/* Update modal */}
      <section id='update' style={{ paddingTop: 64, scrollMarginTop: 80 }}>
        <span className='badge badge-green' style={{ marginBottom: 12, display: "inline-flex" }}>
          07 · Update
        </span>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
          Updating a Modal
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "60ch", lineHeight: 1.75, marginBottom: 24 }}>
          Capture the modal ID and use <code>modals.updateModal()</code> to
          change its content or props while it's still open. Great for async
          loading states.
        </p>
        <CodeBlock code={UPDATE_CODE} filename='update-modal-example.tsx' />
      </section>

      <div className='divider' />

      {/* Global props */}
      <section id='global-props' style={{ paddingTop: 64, scrollMarginTop: 80 }}>
        <span className='badge badge-orange' style={{ marginBottom: 12, display: "inline-flex" }}>
          08 · Global Config
        </span>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
          Global Modal Props
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "60ch", lineHeight: 1.75, marginBottom: 24 }}>
          Pass <code>modalProps</code> to <code>ModalsProvider</code> to apply
          settings to every modal. Individual modals can still override these.
        </p>
        <CodeBlock code={GLOBAL_PROPS_CODE} filename='ModalProvider.tsx' />
        <div className='callout callout-info' style={{ marginTop: 16 }}>
          ℹ️ <code>labels</code> on the provider sets default confirm/cancel button text for all <code>openConfirmModal</code> calls.
        </div>
      </section>
    </div>
  )
}
