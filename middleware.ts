import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { defaultLocale, isLocale, locales, routes, type Locale } from "@/lib/i18n/config"

const PUBLIC_FILE = /\.[^/]+$/

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml|generated|images|placeholder.*).*)"],
}

const fsKeyForRouteKey: Record<keyof typeof routes, string> = {
  home: "",
  services: "services",
  work: "work",
  blog: "blog",
  about: "about",
  contact: "contact",
}

function findRouteKeyFromSlug(locale: Locale, slug: string): keyof typeof routes | null {
  for (const [key, slugs] of Object.entries(routes)) {
    if (slugs[locale] === slug) return key as keyof typeof routes
  }
  return null
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  if (PUBLIC_FILE.test(pathname)) return NextResponse.next()

  const segments = pathname.split("/").filter(Boolean)
  const first = segments[0]

  if (first === defaultLocale) {
    const rest = "/" + segments.slice(1).join("/")
    const url = req.nextUrl.clone()
    url.pathname = rest === "/" ? "/" : rest
    return NextResponse.redirect(url)
  }

  if (first && isLocale(first)) {
    const locale = first as Locale
    const rest = segments.slice(1)
    const sectionSlug = rest[0]
    if (!sectionSlug) return NextResponse.next()

    const ownKey = findRouteKeyFromSlug(locale, sectionSlug)
    if (ownKey) {
      const fsKey = fsKeyForRouteKey[ownKey]
      const tail = rest.slice(1)
      const target = `/${locale}${fsKey ? `/${fsKey}` : ""}${tail.length ? `/${tail.join("/")}` : ""}`
      if (target !== pathname) {
        const url = req.nextUrl.clone()
        url.pathname = target
        return NextResponse.rewrite(url)
      }
      return NextResponse.next()
    }

    for (const otherLocale of locales) {
      if (otherLocale === locale) continue
      const otherKey = findRouteKeyFromSlug(otherLocale, sectionSlug)
      if (otherKey) {
        const fixed = routes[otherKey][locale]
        const url = req.nextUrl.clone()
        url.pathname = `/${locale}${fixed ? `/${fixed}` : ""}${
          rest.slice(1).length ? `/${rest.slice(1).join("/")}` : ""
        }`
        return NextResponse.redirect(url)
      }
    }
    return NextResponse.next()
  }

  if (!first) {
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}`
    return NextResponse.rewrite(url)
  }

  const ownKey = findRouteKeyFromSlug(defaultLocale, first)
  if (ownKey) {
    const fsKey = fsKeyForRouteKey[ownKey]
    const tail = segments.slice(1)
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}${fsKey ? `/${fsKey}` : ""}${tail.length ? `/${tail.join("/")}` : ""}`
    return NextResponse.rewrite(url)
  }

  for (const otherLocale of locales) {
    if (otherLocale === defaultLocale) continue
    const otherKey = findRouteKeyFromSlug(otherLocale, first)
    if (otherKey) {
      const fixed = routes[otherKey][defaultLocale]
      const url = req.nextUrl.clone()
      url.pathname = `/${fixed}${segments.slice(1).length ? `/${segments.slice(1).join("/")}` : ""}`
      url.search = search
      return NextResponse.redirect(url)
    }
  }

  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}
