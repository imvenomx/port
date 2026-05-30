"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import { BrandLogo } from "@/components/brand-logo"

const ease = [0.22, 1, 0.36, 1] as const

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease }}
      className="w-full border-t-2 border-foreground mt-auto"
    >
      {/* Top grid */}
      <div className="px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b-2 border-foreground">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <BrandLogo width={120} className="h-6 w-auto" />
          <p className="text-[11px] font-mono text-muted-foreground leading-relaxed max-w-xs">
            {dict.footer.tagline}
          </p>
        </div>

        {/* Navigate */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            {dict.footer.navTitle}
          </span>
          <ul className="flex flex-col gap-2">
            <li><Link href={localizedPath(locale, "services")} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.nav.services}</Link></li>
            <li><Link href={localizedPath(locale, "work")} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.nav.work}</Link></li>
            <li><Link href={localizedPath(locale, "blog")} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.nav.blog}</Link></li>
            <li><Link href={localizedPath(locale, "about")} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.nav.about}</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            {dict.footer.servicesTitle}
          </span>
          <ul className="flex flex-col gap-2">
            <li><Link href={`${localizedPath(locale, "services")}#web`} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.services.items.web.name}</Link></li>
            <li><Link href={`${localizedPath(locale, "services")}#shopify`} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.services.items.shopify.name}</Link></li>
            <li><Link href={`${localizedPath(locale, "services")}#wordpress`} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.services.items.wordpress.name}</Link></li>
            <li><Link href={`${localizedPath(locale, "services")}#ads`} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.services.items.ads.name}</Link></li>
            <li><Link href={`${localizedPath(locale, "services")}#automation`} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.services.items.automation.name}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            {dict.footer.contactTitle}
          </span>
          <ul className="flex flex-col gap-2">
            <li><a href="mailto:hello@sharpsb2b.com" className="text-xs font-mono hover:text-[#ea580c] transition-colors">hello@sharpsb2b.com</a></li>
            <li><Link href={localizedPath(locale, "contact")} className="text-xs font-mono hover:text-[#ea580c] transition-colors">{dict.nav.cta} →</Link></li>
          </ul>
          <div className="mt-2 flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
            <span>{locale === "it" ? "Disponibili per nuovi progetti" : "Available for new projects"}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 lg:px-12 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
          © {year} SharpsB2B. {dict.footer.rights}
        </span>
        <div className="flex items-center gap-5">
          <Link href="#" className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            {dict.footer.privacy}
          </Link>
          <Link href="#" className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            {dict.footer.cookies}
          </Link>
          <Link href="#" className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            {dict.footer.terms}
          </Link>
        </div>
      </div>
    </motion.footer>
  )
}
