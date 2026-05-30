import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react"
import { isLocale, localizedPath, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { getCaseStudyBySlug, getAdjacentCaseStudy, localizedCaseStudy, getAllCaseStudies } from "@/lib/content/case-studies"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionLabel } from "@/components/section-label"
import { FinalCta } from "@/components/final-cta"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo/structured-data"

type Params = { locale: string; slug: string }

export async function generateStaticParams() {
  const all = await getAllCaseStudies()
  const out: { locale: string; slug: string }[] = []
  for (const loc of locales) {
    for (const cs of all) {
      out.push({ locale: loc, slug: cs.slug })
    }
  }
  return out
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const item = await getCaseStudyBySlug(slug)
  if (!item) return {}
  const lang = localizedCaseStudy(item, locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = `${siteUrl}${localizedPath(locale, "work")}/${slug}`
  const languages: Record<string, string> = {}
  for (const loc of locales) languages[loc] = `${siteUrl}${localizedPath(loc, "work")}/${slug}`
  return {
    title: lang.title,
    description: lang.problem,
    alternates: { canonical, languages },
    openGraph: {
      title: lang.title,
      description: lang.problem,
      images: item.coverImage ? [{ url: item.coverImage }] : undefined,
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const item = await getCaseStudyBySlug(slug)
  if (!item) notFound()

  const dict = getDictionary(locale)
  const lang = localizedCaseStudy(item, locale)
  const next = await getAdjacentCaseStudy(slug)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.meta.siteName, href: localizedPath(locale, "home") },
          { name: dict.nav.work, href: localizedPath(locale, "work") },
          { name: lang.title, href: `${localizedPath(locale, "work")}/${slug}` },
        ])}
      />
      <JsonLd
        data={caseStudyJsonLd({
          locale,
          slug,
          title: lang.title,
          client: item.client,
          description: lang.problem,
          coverImage: item.coverImage,
          services: item.services,
        })}
      />
      <Navbar locale={locale} dict={dict} />
      <main>
        {/* Header */}
        <section className="px-6 lg:px-12 pt-10 lg:pt-16 pb-10">
          <Link
            href={localizedPath(locale, "work")}
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={12} /> {dict.common.back}
          </Link>

          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
              <span>{dict.work.clientLabel}</span>
              <span className="text-foreground">{item.client}</span>
              {item.isPlaceholder && (
                <span className="ml-2 bg-[#ea580c] text-background px-2 py-0.5">
                  {dict.common.placeholder}
                </span>
              )}
            </div>
            <h1 className="font-pixel text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[1] text-balance">
              {lang.title.toUpperCase()}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {item.services.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-mono tracking-[0.18em] uppercase border border-foreground px-2 py-1"
                >
                  {s}
                </span>
              ))}
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group ml-1 flex items-center bg-foreground text-background text-[10px] font-mono tracking-[0.18em] uppercase hover:bg-[#ea580c] transition-colors"
                >
                  <span className="flex items-center justify-center w-7 h-7 bg-[#ea580c] group-hover:bg-background group-hover:text-foreground transition-colors">
                    <ExternalLink size={12} strokeWidth={2} />
                  </span>
                  <span className="px-3 py-1.5">{dict.work.visitStore}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="px-6 lg:px-12 pb-16">
          <div className="relative aspect-[16/9] border-2 border-foreground overflow-hidden bg-secondary">
            <Image
              src={item.coverImage}
              alt={lang.title}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {item.isPlaceholder && (
          <div className="px-6 lg:px-12 pb-6">
            <div className="border-2 border-[#ea580c] bg-[#ea580c]/10 p-4 text-[11px] font-mono text-foreground">
              {dict.work.placeholderNotice}
            </div>
          </div>
        )}

        {/* Problem / Solution / Results */}
        <section className="px-6 lg:px-12 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-foreground">
            <Block label={dict.work.problemLabel} body={lang.problem} index="01" />
            <Block label={dict.work.solutionLabel} body={lang.solution} index="02" middle />
            <Block label={dict.work.resultsLabel} body={lang.results} index="03" highlight />
          </div>
        </section>

        {/* Gallery */}
        {item.gallery.length > 0 && (
          <section className="px-6 lg:px-12 pb-20">
            <SectionLabel label={`// ${dict.work.galleryLabel.toUpperCase()}`} index="G.01" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
              {item.gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`relative aspect-[4/3] bg-secondary ${
                    i % 2 === 0 ? "md:border-r-2 border-foreground" : ""
                  } ${i < item.gallery.length - 2 ? "border-b-2 border-foreground" : ""}`}
                >
                  <Image src={src} alt={`${lang.title} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next project */}
        {next && next.slug !== item.slug && (
          <section className="px-6 lg:px-12 pb-16">
            <SectionLabel label={`// ${dict.common.nextProject.toUpperCase()}`} index="→" />
            <Link
              href={`${localizedPath(locale, "work")}/${next.slug}`}
              className="group flex flex-col lg:flex-row items-stretch border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:w-1/2 bg-secondary lg:border-r-2 border-foreground">
                <Image src={next.coverImage} alt={localizedCaseStudy(next, locale).title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="flex-1 p-6 lg:p-10 flex flex-col gap-3 justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase opacity-70">
                    {next.client}
                  </span>
                  <h3 className="text-xl lg:text-3xl font-mono font-bold uppercase tracking-tight mt-2 text-balance">
                    {localizedCaseStudy(next, locale).title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase mt-auto">
                  {dict.common.nextProject}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </section>
        )}

        <FinalCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}

function Block({
  label,
  body,
  index,
  middle = false,
  highlight = false,
}: {
  label: string
  body: string
  index: string
  middle?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`p-6 lg:p-8 flex flex-col gap-3 min-h-[260px] ${
        middle ? "lg:border-x-2 border-foreground border-y-2 lg:border-y-0" : ""
      } ${highlight ? "bg-foreground text-background" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70">{label}</span>
        <span className="text-[10px] font-mono tracking-[0.18em] opacity-50">{index}</span>
      </div>
      <p className="text-sm font-mono leading-relaxed">{body}</p>
    </div>
  )
}
