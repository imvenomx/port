"use client"

import { useState } from "react"
import { Linkedin, Twitter, Link as LinkIcon, Check } from "lucide-react"

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // noop
    }
  }

  const buttons = [
    {
      key: "twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Twitter / X",
    },
    {
      key: "linkedin",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: "LinkedIn",
    },
  ]

  return (
    <div className="flex lg:flex-col items-start gap-2">
      {buttons.map((b) => {
        const Icon = b.icon
        return (
          <a
            key={b.key}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${b.label}`}
            className="flex items-center justify-center w-9 h-9 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <Icon size={14} strokeWidth={1.8} />
          </a>
        )
      })}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="flex items-center justify-center w-9 h-9 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
      >
        {copied ? <Check size={14} className="text-[#ea580c]" /> : <LinkIcon size={14} strokeWidth={1.8} />}
      </button>
    </div>
  )
}
