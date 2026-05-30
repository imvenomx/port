"use client"

import { useEffect, useState } from "react"
import type { Locale } from "@/lib/i18n/config"

const LOG_LINES_IT = [
  "> brief.received — Modaviva",
  "> design.kickoff scheduled",
  "> figma:sync ok (12 frames)",
  "> shopify:theme building...",
  "> theme.build complete — 1.2s",
  "> meta_ads.creatives queued (8)",
  "> tracking.server_side ok",
  "> lighthouse: 98 / 100 / 100 / 95",
  "> deploy.preview ready",
  "> client.review > approved",
  "> deploy.production live",
  "> automation.email_flow armed",
  "> ads.campaign live — ROAS target 3.5x",
  "> --------- CYCLE COMPLETE ---------",
]

const LOG_LINES_EN = [
  "> brief.received — Modaviva",
  "> design.kickoff scheduled",
  "> figma:sync ok (12 frames)",
  "> shopify:theme building...",
  "> theme.build complete — 1.2s",
  "> meta_ads.creatives queued (8)",
  "> tracking.server_side ok",
  "> lighthouse: 98 / 100 / 100 / 95",
  "> deploy.preview ready",
  "> client.review > approved",
  "> deploy.production live",
  "> automation.email_flow armed",
  "> ads.campaign live — ROAS target 3.5x",
  "> --------- CYCLE COMPLETE ---------",
]

export function TerminalCard({ locale }: { locale: Locale }) {
  const lines_src = locale === "it" ? LOG_LINES_IT : LOG_LINES_EN
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        const next = prev + 1
        if (next >= lines_src.length) {
          setLines([])
          return 0
        }
        setLines((l) => [...l.slice(-8), lines_src[next]])
        return next
      })
    }, 700)

    setLines([lines_src[0]])
    return () => clearInterval(interval)
  }, [lines_src])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2">
        <span className="h-2 w-2 bg-[#ea580c]" />
        <span className="h-2 w-2 bg-foreground" />
        <span className="h-2 w-2 border border-foreground" />
        <span className="ml-auto text-[10px] tracking-widest text-muted-foreground uppercase">
          sharps.pipeline
        </span>
      </div>
      <div className="flex-1 bg-foreground p-4 overflow-hidden">
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <span
              key={`${currentLine}-${i}`}
              className="text-xs text-background font-mono block"
              style={{ opacity: i === lines.length - 1 ? 1 : 0.6 }}
            >
              {line}
            </span>
          ))}
          <span className="text-xs text-[#ea580c] font-mono animate-blink">_</span>
        </div>
      </div>
    </div>
  )
}
