"use client"

import { useEffect, useState } from "react"
import type { Locale } from "@/lib/i18n/config"

function ScrambleNumber({ target, label, delay = 0 }: { target: string; label: string; delay?: number }) {
  const [display, setDisplay] = useState(target.replace(/[0-9]/g, "0"))

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iterations = 0
      const maxIterations = 20

      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          setDisplay(target)
          clearInterval(interval)
          return
        }
        setDisplay(
          target
            .split("")
            .map((char, i) => {
              if (!/[0-9]/.test(char)) return char
              if (iterations > maxIterations - 5 && i < iterations - (maxIterations - 5)) return char
              return String(Math.floor(Math.random() * 10))
            })
            .join("")
        )
        iterations++
      }, 50)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [target, delay])

  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-4xl lg:text-5xl font-mono font-bold tracking-tight text-foreground"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {display}
      </span>
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{label}</span>
    </div>
  )
}

export function MetricsCard({ locale }: { locale: Locale }) {
  const stats = locale === "it"
    ? [
        { value: "+42%", label: "Conversion rate medio post-launch", delay: 500 },
        { value: "4.7x", label: "ROAS medio campagne ads", delay: 800 },
        { value: "98", label: "Lighthouse performance medio", delay: 1100 },
        { value: "24h", label: "Tempo di risposta dichiarato", delay: 1400 },
      ]
    : [
        { value: "+42%", label: "Avg conversion rate post-launch", delay: 500 },
        { value: "4.7x", label: "Avg ROAS on managed ads", delay: 800 },
        { value: "98", label: "Avg Lighthouse performance", delay: 1100 },
        { value: "24h", label: "Declared response time", delay: 1400 },
      ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">agency.metrics</span>
        <span className="inline-block h-2 w-2 bg-[#ea580c]" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-5 p-6">
        {stats.map((s) => (
          <ScrambleNumber key={s.label} target={s.value} label={s.label} delay={s.delay} />
        ))}
      </div>
    </div>
  )
}
