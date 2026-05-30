import { defaultLocale, localizedPath, locales, type Locale } from "@/lib/i18n/config"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "SharpsB2B",
    legalName: "SharpsB2B",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-black.png`,
    image: `${SITE_URL}/og-default.png`,
    description:
      "Agenzia digitale B2B con sede in Italia: siti web, Shopify, WooCommerce, app mobili, Meta & Google Ads, automazione aziendale.",
    email: "hello@sharpsb2b.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
      addressLocality: "Milano",
    },
    areaServed: ["IT", "EU", "WW"],
    sameAs: [] as string[],
  }
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: locale === defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
    name: "SharpsB2B",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: locale,
  }
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: Array<{ name: string; href: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.href.startsWith("http") ? it.href : `${SITE_URL}${it.href}`,
    })),
    inLanguage: locale,
  }
}

export function articleJsonLd(opts: {
  locale: Locale
  slug: string
  title: string
  description: string
  coverImage: string | null
  publishedAt: Date | null
  updatedAt?: Date | null
  category: string | null
  hasOtherLocale: boolean
}) {
  const url = `${SITE_URL}${localizedPath(opts.locale, "blog")}/${opts.slug}`
  const inLanguage = opts.locale
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: opts.title,
    description: opts.description,
    image: opts.coverImage
      ? [opts.coverImage.startsWith("http") ? opts.coverImage : `${SITE_URL}${opts.coverImage}`]
      : undefined,
    datePublished: opts.publishedAt?.toISOString(),
    dateModified: (opts.updatedAt ?? opts.publishedAt)?.toISOString(),
    author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "SharpsB2B" },
    publisher: { "@id": `${SITE_URL}/#organization` },
    articleSection: opts.category ?? undefined,
    inLanguage,
  }
  if (opts.hasOtherLocale) {
    data.workTranslation = locales
      .filter((l) => l !== opts.locale)
      .map((l) => ({
        "@type": "BlogPosting",
        url: `${SITE_URL}${localizedPath(l, "blog")}/${opts.slug}`,
        inLanguage: l,
      }))
  }
  return data
}

export function caseStudyJsonLd(opts: {
  locale: Locale
  slug: string
  title: string
  client: string
  description: string
  coverImage: string
  services: string[]
}) {
  const url = `${SITE_URL}${localizedPath(opts.locale, "work")}/${opts.slug}`
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    name: opts.title,
    headline: opts.title,
    description: opts.description,
    image: opts.coverImage.startsWith("http") ? opts.coverImage : `${SITE_URL}${opts.coverImage}`,
    creator: { "@id": `${SITE_URL}/#organization` },
    about: opts.services,
    inLanguage: opts.locale,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  }
}

export function servicesJsonLd(
  locale: Locale,
  services: Array<{ id: string; name: string; headline: string; body: string }>
) {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.name,
    name: s.name,
    description: s.headline,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["IT", "EU", "WW"],
    url: `${SITE_URL}${localizedPath(locale, "services")}#${s.id}`,
    inLanguage: locale,
  }))
}
