"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { WorkflowDiagram } from "@/components/workflow-diagram"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/getDictionary"

const ease = [0.22, 1, 0.36, 1] as const

const LEFT_LABELS_IT = ["Brief", "Design", "Codice"]
const RIGHT_LABELS_IT = ["Lancio", "Ads", "Crescita"]
const LEFT_LABELS_EN = ["Brief", "Design", "Code"]
const RIGHT_LABELS_EN = ["Ship", "Ads", "Grow"]

export function HeroSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const left = locale === "it" ? LEFT_LABELS_IT : LEFT_LABELS_EN
  const right = locale === "it" ? RIGHT_LABELS_IT : RIGHT_LABELS_EN

  // Visible (screen-reader-hidden) decorative pixel lines split the headline
  // into two visual pieces with the workflow diagram between them. A single
  // accessible h1 holds the full sentence for SEO and AT.
  const fullHeadline = `${dict.home.heroTopLine} ${dict.home.heroBottomLine}`

  return (
    <section className="relative w-full px-6 pt-8 pb-12 lg:px-24 lg:pt-12 lg:pb-20">
      <h1 className="sr-only">{fullHeadline}</h1>
      <div className="flex flex-col items-center text-center">
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-2 select-none"
        >
          {dict.home.heroTopLine}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="w-full max-w-2xl my-4 lg:my-6"
        >
          <WorkflowDiagram leftLabels={left} rightLabels={right} />
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-4 select-none"
        >
          {dict.home.heroBottomLine}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="text-xs lg:text-sm text-muted-foreground max-w-lg mb-7 leading-relaxed font-mono"
        >
          {dict.home.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href={localizedPath(locale, "contact")}
            className="group flex items-center bg-foreground text-background text-xs font-mono tracking-[0.18em] uppercase hover:opacity-95 transition-opacity"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
              <ArrowRight size={16} strokeWidth={2} className="text-background transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="px-5 py-2.5">{dict.home.heroCta}</span>
          </Link>
          <Link
            href={localizedPath(locale, "work")}
            className="text-xs font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors border border-foreground/30 hover:border-foreground px-5 py-3"
          >
            {dict.home.heroCtaSecondary} →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
