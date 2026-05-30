import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { SectionLabel } from "@/components/section-label"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import { getFeaturedCaseStudies } from "@/lib/content/case-studies"

export async function FeaturedWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = await getFeaturedCaseStudies(3)

  if (items.length === 0) return null

  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <SectionLabel label={dict.home.caseStudiesLabel} index="004" />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-2xl lg:text-4xl font-mono font-bold tracking-tight uppercase text-foreground text-balance">
            {dict.home.caseStudiesTitle}
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
            {dict.home.caseStudiesSub}
          </p>
        </div>
        <Link
          href={localizedPath(locale, "work")}
          className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          {dict.common.viewAll} <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
        {items.map((item, i) => {
          const lang = item[locale] ?? item.it
          return (
            <Link
              key={item.slug}
              href={`${localizedPath(locale, "work")}/${item.slug}`}
              className={`group flex flex-col bg-background hover:bg-foreground hover:text-background transition-colors ${
                i < items.length - 1 ? "border-b-2 md:border-b-0 md:[&:nth-child(2n)]:border-r-0 md:border-r-2 lg:border-r-2 lg:[&:nth-child(3n)]:border-r-0 border-foreground" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary border-b-2 border-foreground">
                <Image
                  src={item.coverImage}
                  alt={lang.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.isPlaceholder && (
                  <span className="absolute top-3 left-3 bg-[#ea580c] text-background text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-1">
                    {dict.common.placeholder}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.15em] uppercase opacity-70">
                  <span>{item.client}</span>
                  <span>{item.services.join(" · ")}</span>
                </div>
                <h3 className="text-base font-mono font-bold uppercase tracking-tight">
                  {lang.title}
                </h3>
                <p className="text-[11px] font-mono leading-relaxed opacity-80 line-clamp-2">
                  {lang.problem}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.18em] uppercase">
                  {dict.common.viewCase}
                  <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
