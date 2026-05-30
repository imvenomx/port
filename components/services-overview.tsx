"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Code2,
  ShoppingBag,
  Globe,
  Megaphone,
  Smartphone,
  Zap,
  Boxes,
  ArrowRight,
} from "lucide-react"
import { SectionLabel } from "@/components/section-label"
import { getAllServices } from "@/lib/services"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/getDictionary"

const ease = [0.22, 1, 0.36, 1] as const

const ICONS = {
  web: Code2,
  shopify: ShoppingBag,
  wordpress: Globe,
  ads: Megaphone,
  apps: Smartphone,
  automation: Zap,
  store: Boxes,
} as const

export function ServicesOverview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const services = getAllServices(dict)
  const total = services.length + 1 // 7 services + 1 CTA tile

  // Border helper: at the active breakpoint (4 cols on xl, 3 on lg, 2 on md, 1 mobile),
  // a cell gets a right border unless it's the last of its row, and a bottom border
  // unless it's in the last row. We compute classes per-breakpoint.
  function borderClasses(i: number): string {
    const rightCls: string[] = []
    const bottomCls: string[] = []

    // mobile (1 col): only bottom between items
    if (i < total - 1) bottomCls.push("border-b-2")
    bottomCls.push("border-foreground")

    // md (2 cols): cell ends at col index 1 → no right; cell in last row of (ceil(total/2)) → no bottom
    const colMd = i % 2
    const rowMd = Math.floor(i / 2)
    const lastRowMd = rowMd === Math.floor((total - 1) / 2)
    if (colMd === 0) rightCls.push("md:border-r-2")
    bottomCls.push(lastRowMd ? "md:border-b-0" : "md:border-b-2")

    // lg (3 cols)
    const colLg = i % 3
    const rowLg = Math.floor(i / 3)
    const lastRowLg = rowLg === Math.floor((total - 1) / 3)
    if (colLg === 0) rightCls.push("lg:border-r-2")
    else if (colLg === 1) rightCls.push("lg:border-r-2")
    else rightCls.push("lg:border-r-0")
    bottomCls.push(lastRowLg ? "lg:border-b-0" : "lg:border-b-2")

    // xl (4 cols)
    const colXl = i % 4
    const rowXl = Math.floor(i / 4)
    const lastRowXl = rowXl === Math.floor((total - 1) / 4)
    if (colXl < 3) rightCls.push("xl:border-r-2")
    else rightCls.push("xl:border-r-0")
    bottomCls.push(lastRowXl ? "xl:border-b-0" : "xl:border-b-2")

    return [...rightCls, ...bottomCls, "border-foreground"].join(" ")
  }

  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <SectionLabel label={dict.home.servicesLabel} index="001" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
      >
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-2xl lg:text-4xl font-mono font-bold tracking-tight uppercase text-foreground text-balance">
            {dict.home.servicesTitle}
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
            {dict.home.servicesSub}
          </p>
        </div>
        <Link
          href={localizedPath(locale, "services")}
          className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          {dict.common.viewAll} <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-2 border-foreground">
        {services.map((svc, i) => {
          const Icon = ICONS[svc.id]
          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease }}
              className={borderClasses(i)}
            >
              <Link
                href={`${localizedPath(locale, "services")}#${svc.id}`}
                className="relative p-6 flex flex-col gap-3 min-h-[200px] h-full bg-background hover:bg-foreground hover:text-background transition-colors group"
                aria-label={svc.name}
              >
                <div className="flex items-start justify-between">
                  <Icon size={22} strokeWidth={1.6} className="text-[#ea580c]" aria-hidden="true" />
                  <span className="text-[10px] font-mono tracking-[0.15em] opacity-60">
                    {svc.tag}
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold tracking-tight uppercase mt-2">
                  {svc.name}
                </h3>
                <p className="text-[11px] font-mono leading-relaxed opacity-80">
                  {svc.headline}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.15em] uppercase">
                  {dict.common.readMore}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.div>
          )
        })}

        {/* Final CTA tile — skewed-arrow visual linking to all services */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: services.length * 0.06, duration: 0.5, ease }}
          className={borderClasses(services.length)}
        >
          <Link
            href={localizedPath(locale, "services")}
            className="relative p-6 flex flex-col gap-3 min-h-[200px] h-full bg-foreground text-background overflow-hidden group transition-colors"
            aria-label={dict.common.viewAll}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-background/60">
                {dict.home.servicesLabel}
              </span>
              <span className="text-[10px] font-mono tracking-[0.15em] text-background/60">
                {String(services.length + 1).padStart(2, "0")} / {String(services.length + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              <span
                className="flex items-center justify-center w-20 h-20 bg-[#ea580c] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ transform: "rotate(-45deg)" }}
                aria-hidden="true"
              >
                <ArrowRight size={32} strokeWidth={2.4} className="text-background" />
              </span>
            </div>

            <span className="mt-auto inline-flex items-center justify-between gap-2 text-[11px] font-mono tracking-[0.18em] uppercase">
              {dict.common.viewAll}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
