import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, Code2, ShoppingBag, Globe, Megaphone, Smartphone, Zap, Boxes } from "lucide-react"
import { isLocale, localizedPath, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { getAllServices } from "@/lib/services"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { FinalCta } from "@/components/final-cta"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/seo/structured-data"

type Params = { locale: string }

const ICONS = {
  web: Code2,
  shopify: ShoppingBag,
  wordpress: Globe,
  ads: Megaphone,
  apps: Smartphone,
  automation: Zap,
  store: Boxes,
} as const

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = `${siteUrl}${localizedPath(locale, "services")}`
  const languages: Record<string, string> = {}
  for (const loc of locales) languages[loc] = `${siteUrl}${localizedPath(loc, "services")}`
  return {
    title: dict.services.pageTitle,
    description: dict.services.pageLead,
    alternates: { canonical, languages },
  }
}

export default async function ServicesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const services = getAllServices(dict)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.meta.siteName, href: localizedPath(locale, "home") },
          { name: dict.nav.services, href: localizedPath(locale, "services") },
        ])}
      />
      <JsonLd data={servicesJsonLd(locale, services)} />
      <Navbar locale={locale} dict={dict} />
      <main>
        <PageHeader
          eyebrow={`// SERVICES`}
          title={dict.services.pageTitle.toUpperCase()}
          lead={dict.services.pageLead}
          index="001"
        />

        <div className="px-6 lg:px-12 pb-10 flex flex-col gap-0 border-y-2 border-foreground">
          {services.map((svc, i) => {
            const Icon = ICONS[svc.id]
            const reverse = i % 2 === 1
            return (
              <section
                key={svc.id}
                id={svc.id}
                className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-0 border-b-2 border-foreground last:border-b-0 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-5 p-6 lg:p-10 border-r-0 lg:border-r-2 border-foreground flex flex-col gap-5 bg-foreground text-background min-h-[280px]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center justify-center w-12 h-12 border-2 border-background/30 text-[#ea580c]">
                      <Icon size={24} strokeWidth={1.6} />
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.18em] text-background/60">{svc.tag}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
                    {svc.name}
                  </h2>
                  <p className="text-xs lg:text-sm font-mono text-background/70 leading-relaxed mt-auto">
                    {svc.headline}
                  </p>
                </div>

                <div className="lg:col-span-7 p-6 lg:p-10 flex flex-col gap-5">
                  <p className="text-sm lg:text-base font-mono text-foreground leading-relaxed">
                    {svc.body}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-2">
                    {svc.bullets.map((b: string) => (
                      <li key={b} className="flex items-start gap-3 text-xs lg:text-sm font-mono">
                        <Check size={14} strokeWidth={2.5} className="mt-0.5 text-[#ea580c] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={localizedPath(locale, "contact")}
                    className="self-start group flex items-center bg-foreground text-background text-[11px] font-mono tracking-[0.18em] uppercase mt-3"
                  >
                    <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
                      <ArrowRight size={14} strokeWidth={2} className="text-background transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="px-4 py-2.5">{dict.services.ctaButton}</span>
                  </Link>
                </div>
              </section>
            )
          })}
        </div>

        <FinalCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
