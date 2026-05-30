import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Calendar } from "lucide-react"
import { SectionLabel } from "@/components/section-label"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import { getLatestArticles } from "@/lib/content/articles"

function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date)
}

export async function LatestBlog({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = await getLatestArticles({ locale, limit: 3 })

  if (items.length === 0) return null

  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <SectionLabel label={dict.home.blogLabel} index="007" blink />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-2xl lg:text-4xl font-mono font-bold tracking-tight uppercase text-foreground text-balance">
            {dict.home.blogTitle}
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
            {dict.home.blogSub}
          </p>
        </div>
        <Link
          href={localizedPath(locale, "blog")}
          className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          {dict.common.viewAll} <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`${localizedPath(locale, "blog")}/${item.slug}`}
            className={`group flex flex-col bg-background hover:bg-foreground hover:text-background transition-colors ${
              i < items.length - 1
                ? "border-b-2 md:border-b-0 md:[&:nth-child(2n)]:border-r-0 md:border-r-2 lg:border-r-2 lg:[&:nth-child(3n)]:border-r-0 border-foreground"
                : ""
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary border-b-2 border-foreground">
              <Image
                src={item.coverImage || "/placeholder.jpg"}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.15em] uppercase opacity-70">
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} strokeWidth={1.8} />
                  {item.publishedAt ? formatDate(item.publishedAt, locale) : ""}
                </span>
                <span>{item.readingTime} {dict.common.minRead}</span>
              </div>
              <h3 className="text-base font-mono font-bold uppercase tracking-tight line-clamp-2">
                {item.title}
              </h3>
              <p className="text-[11px] font-mono leading-relaxed opacity-80 line-clamp-3">
                {item.excerpt}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.18em] uppercase">
                {dict.common.readMore}
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
