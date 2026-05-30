import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, localizedPath, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { FinalCta } from "@/components/final-cta"
import { SectionLabel } from "@/components/section-label"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/seo/structured-data"

type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = `${siteUrl}${localizedPath(locale, "about")}`
  const languages: Record<string, string> = {}
  for (const loc of locales) languages[loc] = `${siteUrl}${localizedPath(loc, "about")}`
  return {
    title: dict.about.pageTitle,
    description: dict.about.pageLead,
    alternates: { canonical, languages },
  }
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  const steps = [
    { ...dict.about.approachSteps, step: "s1" } as never,
  ]
  const stepKeys: Array<keyof typeof dict.about.approachSteps> = ["s1Title", "s2Title", "s3Title", "s4Title"]
  const stepData = [1, 2, 3, 4].map((n) => ({
    n,
    title: dict.about.approachSteps[`s${n}Title` as keyof typeof dict.about.approachSteps],
    body: dict.about.approachSteps[`s${n}Body` as keyof typeof dict.about.approachSteps],
  }))
  const valuesData = [1, 2, 3, 4].map((n) => ({
    n,
    title: dict.about.values[`v${n}Title` as keyof typeof dict.about.values],
    body: dict.about.values[`v${n}Body` as keyof typeof dict.about.values],
  }))

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.meta.siteName, href: localizedPath(locale, "home") },
          { name: dict.nav.about, href: localizedPath(locale, "about") },
        ])}
      />
      <Navbar locale={locale} dict={dict} />
      <main>
        <PageHeader
          eyebrow="// ABOUT"
          title={dict.about.pageTitle.toUpperCase()}
          lead={dict.about.pageLead}
          index="A.01"
        />

        {/* Story */}
        <section className="px-6 lg:px-12 pb-16">
          <SectionLabel label={dict.about.storyLabel} index="A.02" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-foreground">
            <div className="p-6 lg:p-10 bg-foreground text-background border-b-2 lg:border-b-0 lg:border-r-2 border-foreground flex flex-col justify-end min-h-[260px]">
              <div className="font-pixel text-7xl lg:text-9xl text-[#ea580c] leading-none">01</div>
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-background/60 mt-3">
                {dict.about.storyLabel.replace("// ", "")}
              </span>
            </div>
            <div className="p-6 lg:p-10 flex flex-col gap-4">
              <h2 className="text-2xl lg:text-3xl font-mono font-bold uppercase tracking-tight text-balance">
                {dict.about.storyTitle}
              </h2>
              <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                {dict.about.storyBody}
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 lg:px-12 pb-16">
          <SectionLabel label={dict.about.missionLabel} index="A.03" />
          <div className="border-2 border-foreground p-6 lg:p-12 flex flex-col gap-5 max-w-4xl">
            <h2 className="text-2xl lg:text-4xl font-mono font-bold uppercase tracking-tight text-balance">
              {dict.about.missionTitle}
            </h2>
            <p className="text-base lg:text-lg font-mono text-foreground leading-relaxed">
              {dict.about.missionBody}
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className="px-6 lg:px-12 pb-16">
          <SectionLabel label={dict.about.approachLabel} index="A.04" />
          <h2 className="text-2xl lg:text-4xl font-mono font-bold uppercase tracking-tight mb-8 max-w-3xl">
            {dict.about.approachTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-foreground">
            {stepData.map((s, i) => (
              <div
                key={s.n}
                className={`p-6 flex flex-col gap-3 min-h-[220px] ${
                  i < stepData.length - 1 ? "border-b-2 md:[&:nth-child(2)]:border-b-2 md:[&:nth-child(1)]:border-r-2 md:[&:nth-child(3)]:border-r-2 lg:border-b-0 lg:border-r-2 border-foreground" : ""
                }`}
              >
                <span className="font-pixel text-5xl text-[#ea580c] leading-none">0{s.n}</span>
                <h3 className="text-sm font-mono font-bold uppercase tracking-tight mt-2">{s.title}</h3>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="px-6 lg:px-12 pb-16">
          <SectionLabel label={dict.about.valuesLabel} index="A.05" blink />
          <h2 className="text-2xl lg:text-4xl font-mono font-bold uppercase tracking-tight mb-8 max-w-3xl">
            {dict.about.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
            {valuesData.map((v, i) => (
              <div
                key={v.n}
                className={`p-6 lg:p-8 flex flex-col gap-3 min-h-[180px] ${
                  i < 2 ? "border-b-2 border-foreground" : ""
                } ${i % 2 === 0 ? "md:border-r-2 border-foreground" : ""}`}
              >
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                  V.0{v.n}
                </span>
                <h3 className="text-base font-mono font-bold uppercase tracking-tight">{v.title}</h3>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <FinalCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
