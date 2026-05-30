import "server-only"
import { prisma } from "@/lib/prisma"
import type { Locale } from "@/lib/i18n/config"

export type ArticleListItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string | null
  category: string | null
  tags: string[]
  publishedAt: Date | null
  readingTime: number
}

export type ArticleDetail = ArticleListItem & {
  body: string
  metaTitle: string
  metaDescription: string
  ogImage: string | null
  hasOtherLocale: boolean
}

function pickLang<T>(locale: Locale, it: T, en: T | null | undefined): T {
  return locale === "en" ? (en ?? it) : it
}

function calcReadingTime(text: string | null | undefined): number {
  if (!text) return 1
  const words = text.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch {
    return fallback
  }
}

type ArticleRow = NonNullable<Awaited<ReturnType<typeof prisma.article.findUnique>>>

function rowToListItem(row: ArticleRow, locale: Locale): ArticleListItem {
  const title = pickLang(locale, row.titleIt, row.titleEn)
  const excerpt = pickLang(locale, row.excerptIt ?? "", row.excerptEn)
  const body = pickLang(locale, row.bodyIt ?? "", row.bodyEn)
  return {
    id: row.id,
    slug: row.slug,
    title,
    excerpt: excerpt ?? "",
    coverImage: row.coverImage,
    category: row.category,
    tags: row.tags ? row.tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
    publishedAt: row.publishedAt,
    readingTime: calcReadingTime(body),
  }
}

export async function getLatestArticles({
  locale,
  limit = 3,
  category,
}: {
  locale: Locale
  limit?: number
  category?: string
}): Promise<ArticleListItem[]> {
  const rows = await safeQuery(
    () =>
      prisma.article.findMany({
        where: {
          status: "published",
          ...(category ? { category } : {}),
        },
        orderBy: { publishedAt: "desc" },
        take: limit,
      }),
    [] as ArticleRow[]
  )
  return rows.map((r) => rowToListItem(r, locale))
}

export async function getAllPublishedArticles({
  locale,
  category,
}: {
  locale: Locale
  category?: string
}): Promise<ArticleListItem[]> {
  const rows = await safeQuery(
    () =>
      prisma.article.findMany({
        where: {
          status: "published",
          ...(category ? { category } : {}),
        },
        orderBy: { publishedAt: "desc" },
      }),
    [] as ArticleRow[]
  )
  return rows.map((r) => rowToListItem(r, locale))
}

export async function getAllCategories(): Promise<string[]> {
  const rows = await safeQuery(
    () =>
      prisma.article.findMany({
        where: { status: "published" },
        select: { category: true },
        distinct: ["category"],
      }),
    [] as { category: string | null }[]
  )
  return rows
    .map((r) => r.category)
    .filter((c): c is string => Boolean(c))
    .sort()
}

export async function getArticleBySlug(slug: string, locale: Locale): Promise<ArticleDetail | null> {
  const row = await safeQuery(
    () => prisma.article.findUnique({ where: { slug } }),
    null
  )
  if (!row || row.status !== "published") return null
  const list = rowToListItem(row, locale)
  const body = pickLang(locale, row.bodyIt ?? "", row.bodyEn) ?? ""
  const metaTitle = pickLang(locale, row.metaTitleIt ?? list.title, row.metaTitleEn ?? null) ?? list.title
  const metaDescription = pickLang(locale, row.metaDescIt ?? list.excerpt, row.metaDescEn ?? null) ?? list.excerpt
  const hasOtherLocale = locale === "it"
    ? Boolean(row.titleEn && row.bodyEn)
    : Boolean(row.titleIt && row.bodyIt)
  return {
    ...list,
    body,
    metaTitle,
    metaDescription,
    ogImage: row.ogImage,
    hasOtherLocale,
  }
}

export async function getRelatedArticles({
  locale,
  excludeSlug,
  category,
  limit = 3,
}: {
  locale: Locale
  excludeSlug: string
  category: string | null
  limit?: number
}): Promise<ArticleListItem[]> {
  const rows = await safeQuery(
    () =>
      prisma.article.findMany({
        where: {
          status: "published",
          slug: { not: excludeSlug },
          ...(category ? { category } : {}),
        },
        orderBy: { publishedAt: "desc" },
        take: limit,
      }),
    [] as ArticleRow[]
  )
  return rows.map((r) => rowToListItem(r, locale))
}
