"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "/", label: "Introduction" },
      { href: "/getting-started", label: "Getting Started" },
    ],
  },
  {
    label: "Guides",
    items: [
      { href: "/examples", label: "Examples" },
      { href: "/examples#basic", label: "Basic Modal" },
      { href: "/examples#confirm", label: "Confirm Modal" },
      { href: "/examples#context", label: "Context Modal" },
      { href: "/examples#stacking", label: "Stacking" },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/api", label: "API Reference" },
      { href: "/api#modals-provider", label: "ModalsProvider" },
      { href: "/api#modals-object", label: "modals object" },
      { href: "/api#types", label: "TypeScript Types" },
    ],
  },
]

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className='flex min-h-screen flex-col'>
      {/* ── Top Header ── */}
      <header className='sticky top-0 z-50 h-[var(--header-height)] border-b border-docs-border bg-docs-bg/85 backdrop-blur-lg'>
        <div className='flex h-full items-center gap-4 px-6'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center gap-2.5 font-extrabold tracking-tight text-docs-text no-underline'
          >
            <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-docs-accent to-[#a78bfa] text-[13px] font-black text-white'>
              M
            </span>
            <span className='text-sm'>modals-manager</span>
          </Link>

          {/* Version badge */}
          <span className='badge badge-purple text-[11px]'>v1.0</span>

          <div className='flex-1' />

          {/* Nav links */}
          <nav className='hidden items-center gap-1 md:flex'>
            {[
              { href: "/", label: "Docs" },
              { href: "/examples", label: "Examples" },
              { href: "/api", label: "API" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  pathname === item.href
                    ? "bg-docs-card text-docs-text"
                    : "text-docs-muted hover:bg-docs-card/50 hover:text-docs-text"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href='https://github.com'
            target='_blank'
            rel='noreferrer'
            className='btn btn-secondary !px-3 !py-1.5 !text-[11px]'
          >
            <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
            </svg>
            GitHub
          </a>
        </div>
      </header>

      {/* ── Body: Sidebar + Content ── */}
      <div className='flex flex-1'>
        {/* ── Sidebar ── */}
        <aside className='sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] w-[var(--sidebar-width)] shrink-0 overflow-y-auto border-r border-docs-border bg-docs-bg px-4 py-8'>
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className='mb-7'>
              <div className='mb-2.5 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-docs-muted/60'>
                {section.label}
              </div>
              <ul className='flex flex-col gap-0.5 list-none'>
                {section.items.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href.split("#")[0]) &&
                        !item.href.includes("#")

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-3 py-1.5 transition-all ${
                          item.href.includes("#")
                            ? "pl-5 text-[11px] text-docs-muted/70 hover:text-docs-text"
                            : "text-[13px] font-medium"
                        } ${
                          isActive
                            ? "bg-docs-accent/15 text-docs-accent"
                            : !item.href.includes("#")
                              ? "text-docs-muted hover:bg-docs-card/50 hover:text-docs-text"
                              : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </aside>

        {/* ── Main content ── */}
        <main className='min-w-0 flex-1 overflow-x-hidden'>{children}</main>
      </div>
    </div>
  )
}
