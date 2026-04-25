"use client"

import { useState } from "react"

interface CodeBlockProps {
  code: string
  filename?: string
  lang?: string
}

export function CodeBlock({ code, filename, lang = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-docs-border bg-docs-surface">
      <div className="flex items-center justify-between border-b border-docs-border bg-docs-card px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {filename && (
          <span className="font-mono text-[11px] text-docs-muted">
            {filename}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="rounded-md border border-docs-border bg-docs-card-hover px-2.5 py-1 font-sans text-[11px] text-docs-muted transition-colors hover:border-docs-accent hover:text-docs-text"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <pre className="m-0">
          <code
            className="text-[#c9d1d9]"
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
      </div>
    </div>
  )
}

function highlightCode(code: string): string {
  // Escape HTML
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Use unique markers for comments and strings to avoid double-processing
  const markers: string[] = []
  
  // 1. Extract strings and comments
  html = html.replace(/(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (match, comment, string) => {
    const i = markers.length
    if (comment) {
      markers.push(`<span style="color:var(--color-syntax-comment);font-style:italic">${comment}</span>`)
    } else {
      markers.push(`<span style="color:var(--color-syntax-string)">${string}</span>`)
    }
    return `___MARKER_${i}___`
  })

  // 2. Highlight other tokens
  html = html
    // keywords
    .replace(/\b(import|export|from|const|let|var|function|return|type|interface|declare|module|extends|implements|default|new|class|async|await|if|else|for|while|of|in|null|undefined|true|false)\b/g, '<span style="color:var(--color-syntax-keyword)">$1</span>')
    // types
    .replace(/\b(React|string|number|boolean|void|any|Record|Partial|Required|FC|ReactNode)\b/g, '<span style="color:var(--color-syntax-type)">$1</span>')
    // JSX tags
    .replace(/(&lt;\/?[A-Z][A-Za-z]*)/g, '<span style="color:var(--color-syntax-func)">$1</span>')
    // numbers
    .replace(/\b(\d+)\b/g, '<span style="color:var(--color-syntax-num)">$1</span>')

  // 3. Put back strings and comments
  markers.forEach((marker, i) => {
    html = html.replace(`___MARKER_${i}___`, marker)
  })

  return html
}
