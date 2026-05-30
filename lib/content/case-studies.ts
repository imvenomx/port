import "server-only"
import { prisma } from "@/lib/prisma"
import type { Locale } from "@/lib/i18n/config"

export type CaseStudyView = {
  id: string
  slug: string
  isPlaceholder: boolean
  client: string
  services: string[]
  coverImage: string
  gallery: string[]
  order: number
  it: { title: string; problem: string; solution: string; results: string }
  en: { title: string; problem: string; solution: string; results: string }
}

function rowToView(row: {
  id: string
  slug: string
  isPlaceholder: boolean
  client: string
  services: string
  coverImage: string
  gallery: string | null
  order: number
  titleIt: string
  problemIt: string
  solutionIt: string
  resultsIt: string
  titleEn: string | null
  problemEn: string | null
  solutionEn: string | null
  resultsEn: string | null
}): CaseStudyView {
  return {
    id: row.id,
    slug: row.slug,
    isPlaceholder: row.isPlaceholder,
    client: row.client,
    services: row.services ? row.services.split(",").map((s) => s.trim()).filter(Boolean) : [],
    coverImage: row.coverImage,
    gallery: row.gallery ? row.gallery.split(",").map((s) => s.trim()).filter(Boolean) : [],
    order: row.order,
    it: {
      title: row.titleIt,
      problem: row.problemIt,
      solution: row.solutionIt,
      results: row.resultsIt,
    },
    en: {
      title: row.titleEn ?? row.titleIt,
      problem: row.problemEn ?? row.problemIt,
      solution: row.solutionEn ?? row.solutionIt,
      results: row.resultsEn ?? row.resultsIt,
    },
  }
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch {
    return fallback
  }
}

export async function getAllCaseStudies(): Promise<CaseStudyView[]> {
  const rows = await safeQuery(
    () => prisma.caseStudy.findMany({ orderBy: { order: "asc" } }),
    [] as Awaited<ReturnType<typeof prisma.caseStudy.findMany>>
  )
  return rows.map(rowToView)
}

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudyView[]> {
  const rows = await safeQuery(
    () => prisma.caseStudy.findMany({ orderBy: { order: "asc" }, take: limit }),
    [] as Awaited<ReturnType<typeof prisma.caseStudy.findMany>>
  )
  return rows.map(rowToView)
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyView | null> {
  const row = await safeQuery(
    () => prisma.caseStudy.findUnique({ where: { slug } }),
    null
  )
  return row ? rowToView(row) : null
}

export async function getAdjacentCaseStudy(currentSlug: string): Promise<CaseStudyView | null> {
  const all = await getAllCaseStudies()
  if (all.length === 0) return null
  const idx = all.findIndex((c) => c.slug === currentSlug)
  if (idx === -1) return null
  return all[(idx + 1) % all.length]
}

export function localizedCaseStudy(view: CaseStudyView, locale: Locale) {
  return locale === "en" ? view.en : view.it
}
