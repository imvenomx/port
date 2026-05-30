export const locales = ["it", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "it"

export const localeNames: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
}

export const localeShort: Record<Locale, string> = {
  it: "IT",
  en: "EN",
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * Localized URL slug map. Each route has one canonical English slug and
 * per-locale variants. Adding a locale means adding one entry per route.
 */
export const routes = {
  home: { it: "", en: "" },
  services: { it: "servizi", en: "services" },
  work: { it: "lavori", en: "work" },
  blog: { it: "blog", en: "blog" },
  about: { it: "chi-siamo", en: "about" },
  contact: { it: "contatti", en: "contact" },
} as const

export type RouteKey = keyof typeof routes

export function localizedPath(locale: Locale, key: RouteKey, suffix?: string): string {
  const slug = routes[key][locale]
  const localePrefix = locale === defaultLocale ? "" : `/${locale}`
  const path = slug ? `/${slug}` : "/"
  const tail = suffix ? `/${suffix}` : ""
  // Avoid trailing-slash duplication for "/"
  if (!localePrefix && !slug && !suffix) return "/"
  return `${localePrefix}${path}${tail}`.replace(/\/+$/, (m) => (m.length > 1 ? "/" : m))
}

/**
 * Resolve a route key from a path segment in either locale.
 * Used by the locale switcher to map e.g. "lavori" → "work".
 */
export function findRouteKeyBySegment(segment: string): RouteKey | null {
  for (const [key, slugs] of Object.entries(routes)) {
    for (const slug of Object.values(slugs)) {
      if (slug === segment) return key as RouteKey
    }
  }
  return null
}
