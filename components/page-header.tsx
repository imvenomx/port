"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function PageHeader({
  eyebrow,
  title,
  lead,
  index,
}: {
  eyebrow: string
  title: string
  lead?: string
  index?: string
}) {
  return (
    <section className="w-full px-6 pt-10 pb-12 lg:px-12 lg:pt-16 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {eyebrow}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
        {index && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            {index}
          </span>
        )}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.05, ease }}
        className="font-pixel text-5xl sm:text-6xl lg:text-8xl tracking-tight text-foreground leading-[1] mb-6 select-none"
      >
        {title}
      </motion.h1>

      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-sm lg:text-base font-mono text-muted-foreground leading-relaxed max-w-2xl"
        >
          {lead}
        </motion.p>
      )}
    </section>
  )
}
