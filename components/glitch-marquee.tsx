"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "@/components/section-label"
import type { Dictionary } from "@/lib/i18n/getDictionary"

const ease = [0.22, 1, 0.36, 1] as const

const STACK = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "SHOPIFY",
  "HYDROGEN",
  "WOOCOMMERCE",
  "WORDPRESS",
  "META ADS",
  "GOOGLE ADS",
  "GA4",
  "STRIPE",
  "KLAVIYO",
  "POSTGRES",
  "VERCEL",
  "AWS",
  "REACT NATIVE",
  "FRAMER MOTION",
  "TAILWIND",
  "FIGMA",
  "N8N",
]

function LogoBlock({ name, glitch }: { name: string; glitch: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-8 py-4 border-r-2 border-foreground shrink-0 ${
        glitch ? "animate-glitch" : ""
      }`}
    >
      <span className="text-sm font-mono tracking-[0.18em] uppercase text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function GlitchMarquee({ dict }: { dict: Dictionary }) {
  const glitchIndices = [3, 7, 14]

  return (
    <section className="w-full py-16 px-6 lg:px-12">
      <SectionLabel label={dict.home.logosLabel} index="006" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="overflow-hidden border-2 border-foreground"
      >
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...STACK, ...STACK].map((name, i) => (
            <LogoBlock
              key={`${name}-${i}`}
              name={name}
              glitch={glitchIndices.includes(i % STACK.length)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
