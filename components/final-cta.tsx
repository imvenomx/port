"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SectionLabel } from "@/components/section-label"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/getDictionary"

const ease = [0.22, 1, 0.36, 1] as const

export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <SectionLabel label={dict.home.ctaLabel} index="008" blink />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="border-2 border-foreground bg-foreground text-background p-8 lg:p-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
      >
        <div className="flex flex-col gap-5 max-w-3xl">
          <h2 className="font-pixel text-4xl lg:text-7xl tracking-tight leading-[1] text-balance">
            {dict.home.ctaTitle}
          </h2>
          <p className="text-sm font-mono text-background/70 leading-relaxed max-w-xl">
            {dict.home.ctaSub}
          </p>
        </div>

        <Link
          href={localizedPath(locale, "contact")}
          className="group flex items-center bg-background text-foreground text-xs font-mono tracking-[0.18em] uppercase self-start lg:self-end shrink-0"
        >
          <span className="flex items-center justify-center w-12 h-12 bg-[#ea580c]">
            <ArrowRight size={18} strokeWidth={2} className="text-background transition-transform group-hover:translate-x-1" />
          </span>
          <span className="px-6 py-3.5">{dict.home.ctaButton}</span>
        </Link>
      </motion.div>
    </section>
  )
}
