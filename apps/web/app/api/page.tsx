import { CodeBlock } from "../features/docs/components"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Reference – Modals Manager",
  description: "Complete API reference for modals-manager: ModalsProvider, modals object, hooks, and TypeScript types.",
}

const PROVIDER_CODE = `import { ModalsProvider } from "@repo/modals"

<ModalsProvider
  modals={modals}            // Record of context modal components
  modalProps={modalProps}    // Shared ModalSettings for all modals
  labels={labels}            // Default confirm/cancel button labels
>
  {children}
</ModalsProvider>`

const MODALS_OPEN_CODE = `import { modals } from "@repo/modals"

const id = modals.open({
  title: "My Modal",
  children: <p>Hello world</p>,
  modalId: "optional-custom-id", // optional — auto-generated if omitted
  // ...any ModalSettings props
})`

const MODALS_CONFIRM_CODE = `modals.openConfirmModal({
  title: "Are you sure?",
  children: <p>This cannot be undone.</p>,
  labels: { confirm: "Yes", cancel: "No" },
  onConfirm: () => void,
  onCancel:  () => void,
  closeOnConfirm: true,  // default: true
  closeOnCancel:  true,  // default: true
  confirmProps: { /* button props */ },
  cancelProps:  { /* button props */ },
})`

const MODALS_CONTEXT_CODE = `modals.openContextModal({
  modal: "myModal",       // key from your registered modals
  title: "My Title",
  innerProps: {           // typed based on your modal component
    userId: "abc123",
    onSuccess: () => void,
  },
})`

const CLOSE_CODE = `modals.close("modal-id")       // close by ID
modals.closeAll()              // close all open modals`

const UPDATE_CODE = `const id = modals.open({ title: "Loading..." })

modals.updateModal({
  modalId: id,
  title: "Loaded!",
  // any ModalSettings props to merge
})`

const CONTEXT_MODAL_PROPS_CODE = `import { ContextModalProps } from "@repo/modals"

interface MyProps {
  name: string
  onDone?: () => void
}

// Your component receives these automatically:
const MyModal = ({
  context,     // ModalsContextProps — full modals API
  id,          // string — this modal's ID
  innerProps,  // MyProps — your custom typed props
}: ContextModalProps<MyProps>) => {
  return (
    <div>
      <p>Hello {innerProps.name}</p>
      <button onClick={() => context.closeModal(id)}>Close</button>
    </div>
  )
}`

const AUGMENT_CODE = `// Anywhere in your codebase (usually in your ModalProvider file)
declare module "@repo/modals" {
  interface ModalsOverride {
    modals: {
      delete:      typeof DeleteModal
      userProfile: typeof UserProfileModal
      settings:    typeof SettingsModal
    }
  }
}

// Now openContextModal is fully typed:
modals.openContextModal({
  modal: "delete",         // ← autocomplete: "delete" | "userProfile" | "settings"
  innerProps: {
    itemName: "...",       // ← type-checked against DeleteModal's props
  },
})`

const MODAL_SETTINGS_TYPE = `type ModalSettings = Partial<Omit<ModalProps, "opened">> & {
  modalId?: string     // optional custom ID
  title?: ReactNode    // modal header title
  children?: ReactNode // modal body content
}`

const CONFIRM_LABELS_TYPE = `type ConfirmLabels = Record<"confirm" | "cancel", ReactNode>`

const OPEN_CONTEXT_MODAL_TYPE = `interface OpenContextModal<CustomProps extends Record<string, any> = {}> 
  extends ModalSettings {
  innerProps: CustomProps
}`

const MODALS_CONTEXT_PROPS_TYPE = `interface ModalsContextProps {
  modalProps: ModalSettings
  modals: ModalState[]
  openModal:          (props: ModalSettings) => string
  openConfirmModal:   (props: OpenConfirmModal) => string
  openContextModal:   <TKey extends TModal>(
    modal: TKey,
    props: OpenContextModal<Parameters<TModals[TKey]>[0]["innerProps"]>,
  ) => string
  closeModal:         (id: string, canceled?: boolean) => void
  closeContextModal:  <TKey extends TModal>(id: TKey, canceled?: boolean) => void
  closeAll:           () => void
  updateModal:        (payload: { modalId: string } & Partial<OpenConfirmModal>) => void
  updateContextModal: (payload: { modalId: string } & Partial<OpenContextModal<any>>) => void
}`

// ─── Sub-components ──────────────────────────────────────────────────────────

function PropTable({
  rows,
}: {
  rows: {
    name: string
    type: string
    default?: string
    required?: boolean
    description: string
  }[]
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        margin: "20px 0",
      }}
    >
      <table className='api-table'>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                {row.name}
                {row.required && (
                  <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>
                )}
              </td>
              <td>
                <span style={{ color: "#8be9fd", fontFamily: "monospace", fontSize: "0.8rem" }}>
                  {row.type}
                </span>
              </td>
              <td>
                <span style={{ color: "var(--text-muted)", fontFamily: "monospace", fontSize: "0.8rem" }}>
                  {row.default ?? "—"}
                </span>
              </td>
              <td style={{ fontFamily: "inherit" }}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ApiSection({
  id,
  title,
  badge,
  description,
  children,
}: {
  id: string
  title: string
  badge?: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      style={{ paddingTop: 64, scrollMarginTop: 80 }}
    >
      {badge && (
        <span className='badge badge-purple' style={{ marginBottom: 12, display: "inline-flex" }}>
          {badge}
        </span>
      )}
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          marginBottom: description ? 10 : 20,
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "60ch", lineHeight: 1.75, marginBottom: 24 }}>
          {description}
        </p>
      )}
      {children}
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ApiPage() {
  return (
    <div style={{ padding: "48px 56px", maxWidth: 960 }}>
      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <span className='badge badge-orange' style={{ marginBottom: 16, display: "inline-flex" }}>
          API Reference
        </span>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            marginBottom: 12,
          }}
        >
          API Reference
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "58ch", lineHeight: 1.75 }}>
          Complete reference for all exports, props, and TypeScript types in
          modals-manager.
        </p>
      </div>

      {/* ── ModalsProvider ── */}
      <ApiSection
        id='modals-provider'
        title='ModalsProvider'
        badge='Component'
        description='The root provider that powers the entire modal system. Wrap your app (or a subtree) with this once.'
      >
        <CodeBlock code={PROVIDER_CODE} filename='ModalProvider.tsx' />
        <PropTable
          rows={[
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "Your application or component tree.",
            },
            {
              name: "modals",
              type: "Record<string, FC<ContextModalProps<any>>>",
              description: "A map of named context modal components. Keys become the modal identifiers.",
            },
            {
              name: "modalProps",
              type: "ModalSettings",
              description: "Shared props applied to every modal. Can be overridden per-modal.",
            },
            {
              name: "labels",
              type: "ConfirmLabels",
              default: '{ confirm: "Confirm", cancel: "Cancel" }',
              description: "Default button labels for confirm modals.",
            },
          ]}
        />
      </ApiSection>

      <div className='divider' />

      {/* ── modals object ── */}
      <ApiSection
        id='modals-object'
        title='modals'
        badge='Object'
        description='A singleton object you can import anywhere to interact with modals without a hook or context.'
      >
        {/* open */}
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          modals.open()
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 12 }}>
          Opens a basic modal with custom children content.
        </p>
        <CodeBlock code={MODALS_OPEN_CODE} filename='usage.tsx' />

        <div className='divider' style={{ margin: "32px 0" }} />

        {/* openConfirmModal */}
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          modals.openConfirmModal()
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 12 }}>
          Opens a modal with built-in confirm/cancel buttons and callbacks.
        </p>
        <CodeBlock code={MODALS_CONFIRM_CODE} filename='usage.tsx' />
        <PropTable
          rows={[
            { name: "title", type: "ReactNode", description: "Modal header title." },
            { name: "children", type: "ReactNode", description: "Modal body content." },
            { name: "labels", type: "ConfirmLabels", description: "Override confirm/cancel button text." },
            { name: "onConfirm", type: "() => void", description: "Called when the confirm button is clicked." },
            { name: "onCancel", type: "() => void", description: "Called when the cancel button or close is clicked." },
            { name: "closeOnConfirm", type: "boolean", default: "true", description: "Auto-close after confirm." },
            { name: "closeOnCancel", type: "boolean", default: "true", description: "Auto-close after cancel." },
            { name: "confirmProps", type: "ButtonProps", description: "Props forwarded to the confirm button." },
            { name: "cancelProps", type: "ButtonProps", description: "Props forwarded to the cancel button." },
          ]}
        />

        <div className='divider' style={{ margin: "32px 0" }} />

        {/* openContextModal */}
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          modals.openContextModal()
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 12 }}>
          Opens a pre-registered context modal by key with typed{" "}
          <code>innerProps</code>.
        </p>
        <CodeBlock code={MODALS_CONTEXT_CODE} filename='usage.tsx' />
        <div className='callout callout-tip'>
          💡 <code>modal</code> is constrained to the keys of your registered{" "}
          <code>modals</code> record. <code>innerProps</code> is typed based on
          the component's <code>ContextModalProps&lt;T&gt;</code> generic.
        </div>

        <div className='divider' style={{ margin: "32px 0" }} />

        {/* close & update */}
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          modals.close() / modals.closeAll()
        </h3>
        <CodeBlock code={CLOSE_CODE} filename='usage.tsx' />

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, marginTop: 24, color: "var(--text-primary)" }}>
          modals.updateModal()
        </h3>
        <CodeBlock code={UPDATE_CODE} filename='usage.tsx' />
      </ApiSection>

      <div className='divider' />

      {/* ── ContextModalProps ── */}
      <ApiSection
        id='context-modal-props'
        title='ContextModalProps<T>'
        badge='Type'
        description='The props type for your context modal components. Pass your custom props type as the generic.'
      >
        <CodeBlock code={CONTEXT_MODAL_PROPS_CODE} filename='MyModal.tsx' />
        <PropTable
          rows={[
            { name: "context", type: "ModalsContextProps", description: "The full modals context — open, close, update methods." },
            { name: "id", type: "string", description: "This modal's unique ID. Use with context.closeModal(id) to self-dismiss." },
            { name: "innerProps", type: "T", description: "Your custom typed props, passed via openContextModal's innerProps." },
          ]}
        />
      </ApiSection>

      <div className='divider' />

      {/* ── Module Augmentation ── */}
      <ApiSection
        id='module-augmentation'
        title='ModalsOverride (Type Augmentation)'
        badge='TypeScript'
        description='Declare module augmentation to make openContextModal fully type-safe. This is the key to the library&apos;s type inference.'
      >
        <CodeBlock code={AUGMENT_CODE} filename='ModalProvider.tsx' />
        <div className='callout callout-warn'>
          ⚠️ Without the <code>declare module</code> block,{" "}
          <code>openContextModal</code> will accept any string as the modal key
          and <code>innerProps</code> will be untyped.
        </div>
      </ApiSection>

      <div className='divider' />

      {/* ── TypeScript Types ── */}
      <ApiSection id='types' title='TypeScript Types' badge='Types'>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          ModalSettings
        </h3>
        <CodeBlock code={MODAL_SETTINGS_TYPE} />

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, marginTop: 28, color: "var(--text-primary)" }}>
          ConfirmLabels
        </h3>
        <CodeBlock code={CONFIRM_LABELS_TYPE} />

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, marginTop: 28, color: "var(--text-primary)" }}>
          OpenContextModal&lt;T&gt;
        </h3>
        <CodeBlock code={OPEN_CONTEXT_MODAL_TYPE} />

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, marginTop: 28, color: "var(--text-primary)" }}>
          ModalsContextProps
        </h3>
        <CodeBlock code={MODALS_CONTEXT_PROPS_TYPE} />
      </ApiSection>
    </div>
  )
}
