import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, defaultLocale, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { JsonLd } from "@/components/json-ld"
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesOverview } from "@/components/services-overview"
import { AboutSection } from "@/components/about-section"
import { WhyUsGrid } from "@/components/why-us-grid"
import { FeatureGrid } from "@/components/feature-grid"
import { FeaturedWork } from "@/components/featured-work"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { LatestBlog } from "@/components/latest-blog"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"

type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = locale === defaultLocale ? siteUrl : `${siteUrl}/${locale}`
  const title =
    locale === "it"
      ? "Agenzia digitale B2B — siti, e-commerce, ads, automazioni"
      : "B2B digital agency — websites, e-commerce, ads, automation"
  return {
    title: { absolute: `SharpsB2B — ${title}` },
    description: dict.meta.defaultDescription,
    openGraph: {
      title: `SharpsB2B — ${title}`,
      url: canonical,
    },
    twitter: { title: `SharpsB2B — ${title}` },
  }
}

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd(locale)} />
      <Navbar locale={locale} dict={dict} />
      <main>
        <HeroSection locale={locale} dict={dict} />
        <ServicesOverview locale={locale} dict={dict} />
        <AboutSection locale={locale} dict={dict} />
        <WhyUsGrid locale={locale} dict={dict} />
        <FeatureGrid locale={locale} dict={dict} />
        <FeaturedWork locale={locale} dict={dict} />
        <GlitchMarquee dict={dict} />
        <LatestBlog locale={locale} dict={dict} />
        <FinalCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
