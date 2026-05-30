import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { locales, isLocale, defaultLocale, type Locale, routes } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"

type Params = { locale: string }

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"

  const canonical = locale === defaultLocale ? siteUrl : `${siteUrl}/${locale}`
  const languages: Record<string, string> = {}
  for (const loc of locales) {
    languages[loc] = loc === defaultLocale ? siteUrl : `${siteUrl}/${loc}`
  }
  languages["x-default"] = siteUrl

  // Note: only the LOCALE LAYOUT defines per-locale metadata. Page-level
  // generateMetadata calls override `title` (as a plain string, picked up by
  // the template `%s — SharpsB2B` from the root layout). Don't set `title`
  // here as a string — that would short-circuit the template.
  return {
    description: dict.meta.defaultDescription,
    alternates: { canonical, languages },
    openGraph: {
      locale: locale === "it" ? "it_IT" : "en_US",
      url: canonical,
      description: dict.meta.defaultDescription,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => (l === "en" ? "en_US" : "it_IT")),
    },
    twitter: {
      description: dict.meta.defaultDescription,
    },
  }
}

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Promise<Params>
  children: React.ReactNode
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <div lang={locale} className="min-h-screen dot-grid-bg flex flex-col">
      {children}
    </div>
  )
}

export const dynamicParams = false
