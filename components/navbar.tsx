"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { BrandLogo } from "@/components/brand-logo"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/getDictionary"

const ease = [0.22, 1, 0.36, 1] as const

type NavLink = { key: "services" | "work" | "blog" | "about" | "contact"; label: string }

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false)

  const links: NavLink[] = [
    { key: "services", label: dict.nav.services },
    { key: "work", label: dict.nav.work },
    { key: "blog", label: dict.nav.blog },
    { key: "about", label: dict.nav.about },
    { key: "contact", label: dict.nav.contact },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="w-full px-4 pt-4 lg:px-6 lg:pt-6 sticky top-0 z-50"
    >
      <nav aria-label="Primary" className="w-full border-2 border-foreground bg-background/85 backdrop-blur-sm px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={localizedPath(locale, "home")}
            className="flex items-center shrink-0 group"
            aria-label="SharpsB2B — Home"
          >
            <BrandLogo width={140} priority className="h-7 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((link, i) => (
              <motion.div
                key={link.key}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.05, duration: 0.4, ease }}
              >
                <Link
                  href={localizedPath(locale, link.key)}
                  className="text-[11px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
            <Link
              href={localizedPath(locale, "contact")}
              className="hidden sm:flex items-center group bg-foreground text-background"
            >
              <span className="flex items-center justify-center w-8 h-8 bg-[#ea580c]">
                <ArrowRight size={14} strokeWidth={2} className="text-background transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="px-3 py-1.5 text-[10px] font-mono tracking-[0.18em] uppercase">
                {dict.nav.cta}
              </span>
            </Link>
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="lg:hidden w-9 h-9 flex items-center justify-center border border-foreground"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
            className="lg:hidden mt-2 border-2 border-foreground bg-background"
          >
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={localizedPath(locale, link.key)}
                  onClick={() => setOpen(false)}
                  className="px-5 py-4 text-xs font-mono tracking-[0.18em] uppercase border-b border-foreground/20 last:border-b-0 hover:bg-foreground hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-t-2 border-foreground bg-secondary/40">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
