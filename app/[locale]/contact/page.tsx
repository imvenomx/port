import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Mail, MapPin, Phone } from "lucide-react"
import { isLocale, localizedPath, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact-form"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/structured-data"

type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = `${siteUrl}${localizedPath(locale, "contact")}`
  const languages: Record<string, string> = {}
  for (const loc of locales) languages[loc] = `${siteUrl}${localizedPath(loc, "contact")}`
  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageLead,
    alternates: { canonical, languages },
  }
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.meta.siteName, href: localizedPath(locale, "home") },
          { name: dict.nav.contact, href: localizedPath(locale, "contact") },
        ])}
      />
      <JsonLd data={organizationJsonLd()} />
      <Navbar locale={locale} dict={dict} />
      <main>
        <PageHeader
          eyebrow="// CONTACT"
          title={dict.contact.pageTitle.toUpperCase()}
          lead={dict.contact.pageLead}
          index="C.01"
        />

        <section className="px-6 lg:px-12 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <aside className="lg:col-span-1 flex flex-col gap-5">
            <ChannelBlock
              icon={<Mail size={18} strokeWidth={1.6} />}
              label={dict.contact.channels.email}
              value="hello@sharpsb2b.com"
              href="mailto:hello@sharpsb2b.com"
            />
            <ChannelBlock
              icon={<Phone size={18} strokeWidth={1.6} />}
              label={dict.contact.channels.phone}
              value="+39 02 0000 0000"
              href="tel:+390200000000"
            />
            <ChannelBlock
              icon={<MapPin size={18} strokeWidth={1.6} />}
              label={dict.contact.channels.office}
              value={locale === "it" ? "Milano, Italia" : "Milan, Italy"}
            />

            <div className="border-2 border-foreground bg-foreground text-background p-5 mt-2">
              <span className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-background/60 mb-3">
                <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
                {locale === "it" ? "Risposta entro" : "Reply within"}
              </span>
              <span className="font-pixel text-5xl text-[#ea580c]">24h</span>
              <p className="text-[11px] font-mono text-background/70 mt-3 leading-relaxed">
                {locale === "it"
                  ? "Su tutte le richieste ricevute in giorni lavorativi."
                  : "On every request received during working days."}
              </p>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <ContactForm locale={locale} dict={dict} />
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}

function ChannelBlock({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <div className="border-2 border-foreground p-5 flex items-start gap-4 bg-background hover:bg-foreground hover:text-background transition-colors">
      <span className="flex items-center justify-center w-9 h-9 bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70">{label}</span>
        <span className="text-sm font-mono">{value}</span>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="group">
      {inner}
    </a>
  ) : (
    inner
  )
}
