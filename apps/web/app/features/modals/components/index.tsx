"use client"

import { ContextModalProps } from "@repo/modals"

// ─── Settings Modal ───────────────────────────────────────────────────────────
interface SettingsModalProps {
  content?: string
}

export const SettingsModal = ({
  innerProps: { content },
  context,
  id,
}: ContextModalProps<SettingsModalProps>) => {
  return (
    <div style={{ padding: "8px 0" }}>
      <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
        This is a <strong style={{ color: "var(--text-primary)" }}>context modal</strong> — a
        reusable, registered component with typed props.
      </p>
      {content && (
        <div
          style={{
            background: "var(--accent-dim)",
            border: "1px solid rgba(108,99,255,0.2)",
            borderRadius: 8,
            padding: "10px 14px",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            color: "#a78bfa",
          }}
        >
          innerProps.content: "{content}"
        </div>
      )}
      <button
        onClick={() => context.closeModal(id)}
        style={{
          marginTop: 20,
          width: "100%",
          padding: "10px",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "0.875rem",
        }}
      >
        Close Modal
      </button>
    </div>
  )
}

// ─── Delete Confirm Modal (context modal) ─────────────────────────────────────
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
    <div style={{ padding: "8px 0" }}>
      <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>
        You are about to permanently delete{" "}
        <strong style={{ color: "#ef4444" }}>{itemName}</strong>. This action
        cannot be undone.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => context.closeModal(id)}
          style={{
            flex: 1,
            padding: "10px",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onDeleted?.()
            context.closeModal(id)
          }}
          style={{
            flex: 1,
            padding: "10px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

// ─── User Profile Modal ───────────────────────────────────────────────────────
interface UserProfileModalProps {
  username: string
  role: "admin" | "editor" | "viewer"
  email: string
}

export const UserProfileModal = ({
  innerProps: { username, role, email },
  context,
  id,
}: ContextModalProps<UserProfileModalProps>) => {
  const roleColors: Record<string, string> = {
    admin: "#ef4444",
    editor: "#f97316",
    viewer: "#3b82f6",
  }

  return (
    <div style={{ padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), #a78bfa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {username[0].toUpperCase()}
        </div>
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--text-primary)",
            }}
          >
            {username}
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            {email}
          </div>
        </div>
        <span
          style={{
            marginLeft: "auto",
            padding: "3px 10px",
            background: `${roleColors[role]}22`,
            color: roleColors[role],
            borderRadius: 99,
            fontSize: "0.75rem",
            fontWeight: 700,
            border: `1px solid ${roleColors[role]}44`,
          }}
        >
          {role}
        </span>
      </div>
      <button
        onClick={() => context.closeModal(id)}
        style={{
          width: "100%",
          padding: "10px",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "0.875rem",
        }}
      >
        Close
      </button>
    </div>
  )
}
