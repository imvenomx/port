import type { MetadataRoute } from "next"
import { locales, defaultLocale, localizedPath, routes } from "@/lib/i18n/config"
import { getAllCaseStudies } from "@/lib/content/case-studies"
import { getAllPublishedArticles } from "@/lib/content/articles"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"

  function entry(key: keyof typeof routes, slug?: string): MetadataRoute.Sitemap[number] {
    const it = `${base}${localizedPath(defaultLocale, key)}${slug ? `/${slug}` : ""}`
    const alternates: Record<string, string> = {}
    for (const loc of locales) {
      alternates[loc] = `${base}${localizedPath(loc, key)}${slug ? `/${slug}` : ""}`
    }
    return {
      url: it,
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: { languages: alternates },
    }
  }

  const staticEntries: MetadataRoute.Sitemap = [
    entry("home"),
    entry("services"),
    entry("work"),
    entry("blog"),
    entry("about"),
    entry("contact"),
  ]

  const [caseStudies, articles] = await Promise.all([
    getAllCaseStudies(),
    getAllPublishedArticles({ locale: defaultLocale }),
  ])

  const workEntries = caseStudies.map((c) => entry("work", c.slug))
  const blogEntries = articles.map((a) => entry("blog", a.slug))

  return [...staticEntries, ...workEntries, ...blogEntries]
}
