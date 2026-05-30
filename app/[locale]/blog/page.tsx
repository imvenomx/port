import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowUpRight, Calendar } from "lucide-react"
import { isLocale, localizedPath, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { getAllPublishedArticles, getAllCategories } from "@/lib/content/articles"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/seo/structured-data"

type Params = { locale: string }
type Search = { category?: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = `${siteUrl}${localizedPath(locale, "blog")}`
  const languages: Record<string, string> = {}
  for (const loc of locales) languages[loc] = `${siteUrl}${localizedPath(loc, "blog")}`
  return {
    title: dict.blog.pageTitle,
    description: dict.blog.pageLead,
    alternates: { canonical, languages },
  }
}

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date)
}

export default async function BlogIndex({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<Search>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const { category } = await searchParams

  const [posts, categories] = await Promise.all([
    getAllPublishedArticles({ locale, category }),
    getAllCategories(),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.meta.siteName, href: localizedPath(locale, "home") },
          { name: dict.nav.blog, href: localizedPath(locale, "blog") },
        ])}
      />
      <Navbar locale={locale} dict={dict} />
      <main>
        <PageHeader
          eyebrow="// BLOG"
          title={dict.blog.pageTitle.toUpperCase()}
          lead={dict.blog.pageLead}
          index="B.01"
        />

        {categories.length > 0 && (
          <section className="px-6 lg:px-12 pb-8 flex flex-wrap items-center gap-2">
            <Link
              href={localizedPath(locale, "blog")}
              className={`text-[10px] font-mono tracking-[0.18em] uppercase border-2 px-3 py-1.5 transition-colors ${
                !category
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/40 text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {dict.blog.categoryAll}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`${localizedPath(locale, "blog")}?category=${cat}`}
                className={`text-[10px] font-mono tracking-[0.18em] uppercase border-2 px-3 py-1.5 transition-colors ${
                  category === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/40 text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </Link>
            ))}
          </section>
        )}

        <section className="px-6 lg:px-12 pb-20">
          {posts.length === 0 ? (
            <p className="text-sm font-mono text-muted-foreground">{dict.blog.noPosts}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
              {posts.map((post, i) => {
                const colMod3 = i % 3 !== 2
                const colMod2 = i % 2 === 0
                const totalRows = Math.ceil(posts.length / 3)
                const isLastRow3 = i >= (totalRows - 1) * 3
                return (
                  <Link
                    key={post.slug}
                    href={`${localizedPath(locale, "blog")}/${post.slug}`}
                    className={`group flex flex-col bg-background hover:bg-foreground hover:text-background transition-colors ${
                      colMod3 ? "lg:border-r-2 border-foreground" : ""
                    } ${colMod2 ? "md:border-r-2 lg:[&:nth-child(3n)]:border-r-0 border-foreground" : ""} ${
                      !isLastRow3 ? "border-b-2 border-foreground" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary border-b-2 border-foreground">
                      <Image
                        src={post.coverImage || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {post.category && (
                        <span className="absolute top-3 left-3 bg-foreground text-background text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-1 group-hover:bg-background group-hover:text-foreground transition-colors">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.15em] uppercase opacity-70">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} strokeWidth={1.8} />
                          {post.publishedAt ? formatDate(post.publishedAt, locale) : ""}
                        </span>
                        <span>
                          {post.readingTime} {dict.common.minRead}
                        </span>
                      </div>
                      <h3 className="text-base lg:text-lg font-mono font-bold uppercase tracking-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[11px] font-mono leading-relaxed opacity-80 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.18em] uppercase pt-2">
                        {dict.common.readMore}
                        <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
