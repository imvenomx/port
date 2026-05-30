"use client"

import { motion } from "framer-motion"
import { TerminalCard } from "@/components/bento/terminal-card"
import { DitherCard } from "@/components/bento/dither-card"
import { MetricsCard } from "@/components/bento/metrics-card"
import { StatusCard } from "@/components/bento/status-card"
import { SectionLabel } from "@/components/section-label"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import type { Locale } from "@/lib/i18n/config"

const ease = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease },
  }),
}

export function FeatureGrid({ locale, dict: _dict }: { locale: Locale; dict: Dictionary }) {
  const label = locale === "it" ? "// LIVE: SHIPPING_PIPELINE" : "// LIVE: SHIPPING_PIPELINE"
  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <SectionLabel label={label} index="005" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 border-2 border-foreground"
      >
        <motion.div
          custom={0}
          variants={cardVariants}
          className="border-b-2 md:border-b-2 md:border-r-2 border-foreground min-h-[280px]"
        >
          <TerminalCard locale={locale} />
        </motion.div>

        <motion.div
          custom={1}
          variants={cardVariants}
          className="border-b-2 border-foreground min-h-[280px]"
        >
          <DitherCard locale={locale} />
        </motion.div>

        <motion.div
          custom={2}
          variants={cardVariants}
          className="md:border-r-2 border-foreground min-h-[280px] border-b-2 md:border-b-0"
        >
          <MetricsCard locale={locale} />
        </motion.div>

        <motion.div custom={3} variants={cardVariants} className="border-foreground min-h-[280px]">
          <StatusCard locale={locale} />
        </motion.div>
      </motion.div>
    </section>
  )
}
