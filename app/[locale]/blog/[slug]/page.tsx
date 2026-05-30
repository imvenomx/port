import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Calendar, Share2 } from "lucide-react"
import { isLocale, localizedPath, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { getArticleBySlug, getRelatedArticles, getAllPublishedArticles } from "@/lib/content/articles"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionLabel } from "@/components/section-label"
import { FinalCta } from "@/components/final-cta"
import { ShareButtons } from "@/components/share-buttons"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, articleJsonLd } from "@/lib/seo/structured-data"

type Params = { locale: string; slug: string }

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const loc of locales) {
    const posts = await getAllPublishedArticles({ locale: loc })
    for (const p of posts) out.push({ locale: loc, slug: p.slug })
  }
  return out
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const article = await getArticleBySlug(slug, locale)
  if (!article) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const canonical = `${siteUrl}${localizedPath(locale, "blog")}/${slug}`
  const languages: Record<string, string> = {}
  if (article.hasOtherLocale) {
    for (const loc of locales) languages[loc] = `${siteUrl}${localizedPath(loc, "blog")}/${slug}`
  } else {
    languages[locale] = canonical
  }
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical, languages },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.ogImage || article.coverImage ? [{ url: article.ogImage ?? article.coverImage! }] : undefined,
    },
  }
}

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date)
}

export default async function BlogArticlePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const article = await getArticleBySlug(slug, locale)
  if (!article) notFound()
  const dict = getDictionary(locale)
  const related = await getRelatedArticles({
    locale,
    excludeSlug: slug,
    category: article.category,
    limit: 3,
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
  const articleUrl = `${siteUrl}${localizedPath(locale, "blog")}/${slug}`

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.meta.siteName, href: localizedPath(locale, "home") },
          { name: dict.nav.blog, href: localizedPath(locale, "blog") },
          { name: article.title, href: `${localizedPath(locale, "blog")}/${slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          locale,
          slug,
          title: article.title,
          description: article.excerpt || article.metaDescription,
          coverImage: article.coverImage,
          publishedAt: article.publishedAt,
          category: article.category,
          hasOtherLocale: article.hasOtherLocale,
        })}
      />
      <Navbar locale={locale} dict={dict} />
      <main>
        <article>
          {/* Header */}
          <section className="px-6 lg:px-12 pt-10 lg:pt-16 pb-8 max-w-5xl">
            <Link
              href={localizedPath(locale, "blog")}
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={12} /> {dict.nav.blog}
            </Link>

            <div className="flex items-center gap-3 mb-6 text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
              {article.category && (
                <span className="bg-foreground text-background px-2 py-1">{article.category}</span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {article.publishedAt ? formatDate(article.publishedAt, locale) : ""}
              </span>
              <span>· {article.readingTime} {dict.common.minRead}</span>
            </div>

            <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05] text-balance">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-base lg:text-lg font-mono text-muted-foreground leading-relaxed mt-5 max-w-3xl">
                {article.excerpt}
              </p>
            )}
          </section>

          {/* Cover */}
          {article.coverImage && (
            <section className="px-6 lg:px-12 pb-10">
              <div className="relative aspect-[16/9] border-2 border-foreground overflow-hidden bg-secondary max-w-5xl">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover"
                  priority
                />
              </div>
            </section>
          )}

          {/* Body + share */}
          <section className="px-6 lg:px-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl">
            <aside className="hidden lg:flex lg:col-span-2 flex-col gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                <Share2 size={12} className="inline mr-1" /> {dict.blog.shareLabel}
              </span>
              <ShareButtons url={articleUrl} title={article.title} />
            </aside>
            <div
              className="lg:col-span-10 prose-blog font-mono text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.body || "" }}
            />
          </section>
        </article>

        {related.length > 0 && (
          <section className="px-6 lg:px-12 pb-16">
            <SectionLabel label="// RELATED" index="R.01" />
            <h2 className="text-xl lg:text-2xl font-mono font-bold uppercase tracking-tight mb-6">
              {dict.blog.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-foreground">
              {related.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`${localizedPath(locale, "blog")}/${post.slug}`}
                  className={`group flex flex-col bg-background hover:bg-foreground hover:text-background transition-colors ${
                    i < related.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2 last:border-r-0 border-foreground" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] bg-secondary border-b-2 border-foreground">
                    <Image
                      src={post.coverImage || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="text-base font-mono font-bold uppercase tracking-tight line-clamp-2">{post.title}</h3>
                    <p className="text-[11px] font-mono leading-relaxed opacity-80 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.18em] uppercase">
                      {dict.common.readMore}
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FinalCta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
