import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { isLocale, localizedPath, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { getAllCaseStudies, localizedCaseStudy } from "@/lib/content/case-studies"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { FinalCta } from "@/components/final-cta"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/seo/structured-data"

type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = `${siteUrl}${localizedPath(locale, "work")}`
  const languages: Record<string, string> = {}
  for (const loc of locales) languages[loc] = `${siteUrl}${localizedPath(loc, "work")}`
  return {
    title: dict.work.pageTitle,
    description: dict.work.pageLead,
    alternates: { canonical, languages },
  }
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const items = await getAllCaseStudies()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.meta.siteName, href: localizedPath(locale, "home") },
          { name: dict.nav.work, href: localizedPath(locale, "work") },
        ])}
      />
      <Navbar locale={locale} dict={dict} />
      <main>
        <PageHeader
          eyebrow="// WORK"
          title={dict.work.pageTitle.toUpperCase()}
          lead={dict.work.pageLead}
          index="W.01"
        />

        {items.length === 0 ? (
          <div className="px-6 lg:px-12 pb-20 text-sm font-mono text-muted-foreground">
            {dict.work.noStudies}
          </div>
        ) : (
          <div className="px-6 lg:px-12 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
              {items.map((item, i) => {
                const lang = localizedCaseStudy(item, locale)
                const isLastRow = i >= items.length - (items.length % 2 === 0 ? 2 : 1)
                return (
                  <Link
                    key={item.slug}
                    href={`${localizedPath(locale, "work")}/${item.slug}`}
                    className={`group flex flex-col bg-background hover:bg-foreground hover:text-background transition-colors ${
                      !isLastRow ? "border-b-2 border-foreground" : ""
                    } ${i % 2 === 0 ? "md:border-r-2 border-foreground" : ""}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary border-b-2 border-foreground">
                      <Image
                        src={item.coverImage}
                        alt={lang.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.isPlaceholder && (
                        <span className="absolute top-3 left-3 bg-[#ea580c] text-background text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-1">
                          {dict.common.placeholder}
                        </span>
                      )}
                    </div>
                    <div className="p-5 lg:p-7 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.18em] uppercase opacity-70">
                        <span>{item.client}</span>
                        <span>{item.services.join(" · ")}</span>
                      </div>
                      <h2 className="text-lg lg:text-2xl font-mono font-bold uppercase tracking-tight">
                        {lang.title}
                      </h2>
                      <p className="text-[11px] lg:text-xs font-mono leading-relaxed opacity-80 line-clamp-3">
                        {lang.problem}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.18em] uppercase">
                        {dict.common.viewCase}
                        <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <FinalCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
