"use client"

import { useEffect, useState } from "react"
import type { Locale } from "@/lib/i18n/config"

const PROJECTS_IT = [
  { name: "MODAVIVA", phase: "ADS", status: "LIVE" },
  { name: "FERROBELLO", phase: "BUILD", status: "WIP" },
  { name: "SPORTIVA", phase: "QA", status: "REVIEW" },
  { name: "VETRI", phase: "OPS", status: "LIVE" },
]

const PROJECTS_EN = PROJECTS_IT

export function StatusCard({ locale }: { locale: Locale }) {
  const projects = locale === "it" ? PROJECTS_IT : PROJECTS_EN
  const headers = locale === "it"
    ? { project: "Progetto", phase: "Fase", status: "Stato" }
    : { project: "Project", phase: "Phase", status: "Status" }
  const utilization = locale === "it" ? "Capacità del team" : "Team utilization"

  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">active_projects.status</span>
        <span className="text-[10px] tracking-widest text-muted-foreground">{`TICK:${String(tick).padStart(4, "0")}`}</span>
      </div>
      <div className="flex-1 flex flex-col p-4 gap-0">
        <div className="grid grid-cols-3 gap-2 border-b border-border pb-2 mb-2">
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{headers.project}</span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{headers.phase}</span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground text-right">{headers.status}</span>
        </div>
        {projects.map((p) => (
          <div key={p.name} className="grid grid-cols-3 gap-2 py-2 border-b border-border last:border-none">
            <span className="text-xs font-mono text-foreground">{p.name}</span>
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5"
                style={{ backgroundColor: p.status === "LIVE" ? "#ea580c" : "hsl(var(--muted-foreground))" }}
              />
              <span className="text-xs font-mono text-muted-foreground">{p.phase}</span>
            </div>
            <span className="text-xs font-mono text-foreground text-right">{p.status}</span>
          </div>
        ))}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{utilization}</span>
            <span className="text-[9px] font-mono text-foreground">82%</span>
          </div>
          <div className="h-2 w-full border border-foreground">
            <div className="h-full bg-foreground" style={{ width: "82%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
