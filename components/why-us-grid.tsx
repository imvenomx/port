"use client"

import { motion } from "framer-motion"
import { Clock, Layers, Languages, TrendingUp } from "lucide-react"
import { SectionLabel } from "@/components/section-label"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import type { Locale } from "@/lib/i18n/config"

const ease = [0.22, 1, 0.36, 1] as const

export function WhyUsGrid({ locale: _locale, dict }: { locale: Locale; dict: Dictionary }) {
  const points = [
    { key: "p1", icon: Clock, title: dict.home.whyPoints.p1Title, body: dict.home.whyPoints.p1Body },
    { key: "p2", icon: Layers, title: dict.home.whyPoints.p2Title, body: dict.home.whyPoints.p2Body },
    { key: "p3", icon: Languages, title: dict.home.whyPoints.p3Title, body: dict.home.whyPoints.p3Body },
    { key: "p4", icon: TrendingUp, title: dict.home.whyPoints.p4Title, body: dict.home.whyPoints.p4Body },
  ]

  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <SectionLabel label="// PRINCIPLES" index="003" />

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="text-2xl lg:text-4xl font-mono font-bold tracking-tight uppercase mb-10 max-w-3xl text-balance"
      >
        {dict.home.whyTitle}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-foreground">
        {points.map((p, i) => {
          const Icon = p.icon
          const isLastCol = i === points.length - 1
          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className={`flex flex-col gap-4 p-6 lg:p-7 min-h-[220px] ${
                !isLastCol ? "lg:border-r-2 border-foreground" : ""
              } ${i < points.length - 1 ? "border-b-2 md:[&:nth-child(odd)]:border-r-2 lg:[&:nth-child(odd)]:border-r-2 md:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r-2 border-foreground md:border-b-2 lg:border-b-0" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-center w-9 h-9 bg-foreground text-background">
                  <Icon size={16} strokeWidth={1.6} />
                </span>
                <span className="text-[10px] font-mono tracking-[0.18em] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-tight">
                {p.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
