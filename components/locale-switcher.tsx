"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { locales, defaultLocale, routes, type Locale, localeShort } from "@/lib/i18n/config"

/**
 * Maps the current path on `locale` to the equivalent path on `targetLocale`,
 * translating localized slugs along the way (e.g. /lavori ↔ /en/work).
 */
function translatePath(pathname: string, fromLocale: Locale, toLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] === fromLocale) segments.shift()

  if (segments.length === 0) {
    return toLocale === defaultLocale ? "/" : `/${toLocale}`
  }

  const firstSlug = segments[0]
  // Find which route key the first slug belongs to under fromLocale.
  let matchedKey: keyof typeof routes | null = null
  for (const [key, slugs] of Object.entries(routes)) {
    if (slugs[fromLocale] === firstSlug) {
      matchedKey = key as keyof typeof routes
      break
    }
  }

  const newFirst = matchedKey ? routes[matchedKey][toLocale] : firstSlug
  const rest = segments.slice(1)
  const tail = [newFirst, ...rest].filter(Boolean).join("/")

  const prefix = toLocale === defaultLocale ? "" : `/${toLocale}`
  return `${prefix}/${tail}` || "/"
}

export function LocaleSwitcher() {
  const params = useParams<{ locale?: string }>()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const current = (params?.locale && (locales as readonly string[]).includes(params.locale)
    ? params.locale
    : defaultLocale) as Locale

  return (
    <div className="flex items-center gap-1 border border-foreground/30">
      {locales.map((loc, i) => {
        const active = loc === current
        const target = translatePath(pathname || "/", current, loc)
        return (
          <button
            key={loc}
            onClick={() => startTransition(() => router.push(target))}
            disabled={isPending}
            aria-label={`Switch language to ${loc}`}
            aria-current={active ? "true" : undefined}
            className={`px-2 py-1 text-[10px] font-mono tracking-[0.15em] uppercase transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            } ${i > 0 ? "border-l border-foreground/30" : ""}`}
          >
            {localeShort[loc]}
          </button>
        )
      })}
    </div>
  )
}
