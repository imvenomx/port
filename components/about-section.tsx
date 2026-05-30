"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel } from "@/components/section-label"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import type { Locale } from "@/lib/i18n/config"

const ease = [0.22, 1, 0.36, 1] as const

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./:"

  useEffect(() => {
    if (!inView) return
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration) return text[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      iteration += 0.5
      if (iteration >= text.length) {
        setDisplay(text)
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [inView, text])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

function UptimeCounter() {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    // Simulate "agency uptime" since a fixed founding moment.
    const base = 31536000 * 2 + Math.floor(Math.random() * 100000)
    setSeconds(base)
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const format = (n: number) => {
    const d = Math.floor(n / 86400)
    const h = Math.floor((n % 86400) / 3600)
    const m = Math.floor((n % 3600) / 60)
    const s = n % 60
    return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
  }

  return (
    <span className="font-mono text-[#ea580c]" style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(seconds)}
    </span>
  )
}

function StatBlock({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease }}
      className="flex flex-col gap-1 border-2 border-foreground px-4 py-3"
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        {label}
      </span>
      <span className="text-xl lg:text-2xl font-mono font-bold tracking-tight">
        <ScrambleText text={value} />
      </span>
    </motion.div>
  )
}

export function AboutSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const stats = locale === "it"
    ? [
        { label: "PROGETTI_SPEDITI", value: "120+" },
        { label: "CLIENTI_ATTIVI", value: "32" },
        { label: "PAESI", value: "8" },
        { label: "ROAS_MEDIO_ADS", value: "4.7x" },
      ]
    : [
        { label: "PROJECTS_SHIPPED", value: "120+" },
        { label: "ACTIVE_CLIENTS", value: "32" },
        { label: "COUNTRIES", value: "8" },
        { label: "AVG_ADS_ROAS", value: "4.7x" },
      ]

  const title = locale === "it" ? (
    <>
      Costruiamo macchine digitali per <span className="text-[#ea580c]">aziende serie</span>
    </>
  ) : (
    <>
      We build digital machines for <span className="text-[#ea580c]">serious businesses</span>
    </>
  )

  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <SectionLabel label={dict.home.whyLabel} index="002" blink />

      <div className="flex flex-col lg:flex-row gap-0 border-2 border-foreground">
        {/* Left: Numbers / visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px] border-b-2 lg:border-b-0 lg:border-r-2 border-foreground bg-foreground text-background overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b-2 border-background/20">
            <span className="text-[10px] tracking-[0.2em] uppercase text-background/60 font-mono">
              MANIFEST.md
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#ea580c] font-mono">
              LIVE
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="font-pixel text-[#ea580c] text-7xl lg:text-9xl tracking-tight leading-none select-none">
              SB2B
            </div>
          </div>

          <div className="grid grid-cols-2 gap-0 border-t-2 border-background/20">
            {stats.slice(0, 2).map((s) => (
              <div key={s.label} className="border-r-2 last:border-r-0 border-background/20 px-4 py-3 flex flex-col gap-1">
                <span className="text-[9px] tracking-[0.2em] uppercase text-background/50 font-mono">{s.label}</span>
                <span className="text-xl font-mono font-bold tracking-tight"><ScrambleText text={s.value} /></span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-col w-full lg:w-1/2"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b-2 border-foreground">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              about.md
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              v1.0
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-between px-5 py-6 lg:py-8 gap-6">
            <div className="flex flex-col gap-5">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance"
              >
                {title}
              </motion.h2>

              <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                {dict.home.whySub}
              </p>

              <div className="flex items-center gap-3 py-3 border-t-2 border-b-2 border-foreground">
                <span className="h-1.5 w-1.5 bg-[#ea580c]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                  UPTIME:
                </span>
                <UptimeCounter />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-0">
              {stats.map((stat, i) => (
                <StatBlock key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
