# SharpsB2B — Agency Website

Production marketing + content site for **SharpsB2B**, a creative B2B digital agency offering web development, Shopify, WooCommerce/WordPress, Meta & Google Ads, mobile apps, and business automation.

Built with **Next.js 16** (App Router), **Tailwind CSS**, **Prisma + SQLite**, **NextAuth v5**, **Tiptap**, and **Framer Motion**.

---

## Quick start

```bash
npm install --legacy-peer-deps
cp .env.example .env       # then fill in values (see below)
npx prisma generate
npm run db:push            # create SQLite database
npm run db:seed            # seed placeholder case studies + demo articles
npm run dev                # → http://localhost:3000
```

> The project uses `--legacy-peer-deps` because `react-day-picker` (shipped by the
> template) pins an older `date-fns` peer. Safe — only affects install resolution.

Italian is the default locale (served at `/`). English at `/en`. Adding a third locale = adding one JSON file in `lib/i18n/dictionaries/` plus one entry in `lib/i18n/config.ts`.

---

## Environment variables

See [`.env.example`](./.env.example) for the full list. Required for first run:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (sitemap, OG, hreflang) |
| `DATABASE_URL` | Prisma datasource (defaults to local SQLite) |
| `AUTH_SECRET` | NextAuth signing key — `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Dashboard login email |
| `ADMIN_PASSWORD_HASH_B64` | Base64-wrapped bcrypt hash of admin password (see below) |
| `OPENROUTER_API_KEY` | Image generation (optional — falls back to placeholders) |
| `RESEND_API_KEY` | Contact form delivery (optional — stub responds 200) |

**Generate the admin password hash (base64-wrapped):**

```bash
node -e "const b=require('bcryptjs'); console.log(Buffer.from(b.hashSync('your-password-here', 10)).toString('base64'))"
```

Paste the result into `.env`:

```ini
ADMIN_PASSWORD_HASH_B64="JDJiJDEwJC4uLg=="
```

(The hash is base64-wrapped because raw bcrypt hashes contain `$` characters
that the Next.js env loader would otherwise mangle.)

---

## Logging into the dashboard

1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in `.env`.
2. Visit `/dashboard` → redirected to `/login` → enter the email + plaintext password (the one you hashed).

The dashboard lets you:

- Create / edit / delete articles, toggle draft ↔ published
- Edit Italian and English versions side-by-side (add Dutch later without code changes)
- Rich-text editing via Tiptap with inline image embed
- Set SEO meta (title / description per locale, OG image)
- Upload a cover image **or** generate one via OpenRouter

All `/dashboard/**` routes are protected server-side by middleware.

---

## Swapping placeholder case studies for real ones

Three case studies are seeded with `isPlaceholder: true` so the layout is fully testable. To replace them:

**Option A — edit `prisma/seed.ts`** and re-run `pnpm db:seed` (it upserts by slug).

**Option B — add real case studies via the dashboard** (a future iteration; current seed is the source of truth for case studies). For now, edit `prisma/seed.ts` and add entries like:

```ts
{
  slug: "client-name",
  isPlaceholder: false,
  client: "Client Name",
  services: ["shopify", "ads"],
  coverImage: "/work/client-cover.jpg",
  it: { title: "...", problem: "...", solution: "...", results: "..." },
  en: { title: "...", problem: "...", solution: "...", results: "..." },
}
```

The public `/lavori` and `/work` pages read from the same Prisma store.

---

## Image generation (OpenRouter)

`lib/openrouter/generateImage.ts` exposes a single function:

```ts
import { generateImage } from "@/lib/openrouter/generateImage";
const path = await generateImage({ prompt: "...", size: "1024x1024" });
// → "/generated/<hash>.png" or "/placeholder.jpg" on failure
```

It writes the result to `public/generated/`. If `OPENROUTER_API_KEY` is missing or the API call fails, it returns a placeholder path. The build is never blocked by image generation.

The dashboard editor exposes a **"Generate cover"** button that uses this helper.

---

## Project structure

```
app/
  [locale]/
    page.tsx               # home
    services/              # filesystem uses canonical (en) slugs;
    work/[slug]/           # IT slugs are mapped by middleware:
    blog/[slug]/           # /servizi → /it/services, /lavori → /it/work …
    about/
    contact/
    login/
    dashboard/             # protected by auth() in layout
      articles/[id]/
      articles/new/
      actions.ts           # server actions: save/delete/generate-cover
  api/
    contact/route.ts       # Resend or stub
    auth/[...nextauth]/    # NextAuth v5
  sitemap.ts               # localized + hreflang
  robots.ts
  layout.tsx               # root html shell, fonts, theme
  [locale]/
    opengraph-image.tsx    # dynamic 1200×630 OG image (next/og)
components/                # brutalist design-system widgets
lib/
  i18n/
    config.ts              # locales + slug map (add nl here)
    dictionaries/{it,en}.json
    getDictionary.ts
  content/
    articles.ts            # Prisma queries (public site reads here)
    case-studies.ts
  openrouter/generateImage.ts
  seo/structured-data.ts   # JSON-LD builders: Organization, Article, etc.
  prisma.ts
  auth.ts
  services.ts              # service id list (driven by dictionaries)
middleware.ts              # locale + slug rewriting
prisma/
  schema.prisma            # Article + CaseStudy (bilingual)
  seed.ts                  # placeholder case studies + demo articles
public/
  generated/               # OpenRouter outputs (gitignored)
```

### Adding a new locale (e.g. Dutch)

1. Add `nl` to `locales` in [`lib/i18n/config.ts`](./lib/i18n/config.ts) and add its localized slugs to the `routes` map.
2. Create [`lib/i18n/dictionaries/nl.json`](./lib/i18n/dictionaries/) — copy from `it.json` and translate.
3. Import + register in [`lib/i18n/getDictionary.ts`](./lib/i18n/getDictionary.ts).
4. Optionally extend the Prisma schema with `titleNl / excerptNl / bodyNl` columns + add a tab to the dashboard editor. Public reads use IT as a fallback until those fields are filled in.

No other code changes required — pages, nav, footer, sitemap and hreflang adapt automatically.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Generate Prisma client + production build |
| `npm start` | Serve production build |
| `npm run db:push` | Sync Prisma schema to database |
| `npm run db:seed` | Seed placeholder content |
| `npm run db:studio` | Open Prisma Studio (db GUI) |

---

## SEO

What's wired up out of the box:

- **Per-locale `<title>` + meta description** on every page (via `generateMetadata`).
- **Canonical URLs + `hreflang`** alternates (it / en / x-default).
- **Dynamic OG image** (1200×630) generated by `app/[locale]/opengraph-image.tsx` using `next/og` — branded brutalist card, no third-party service needed.
- **JSON-LD structured data**: `Organization` + `WebSite` on home, `BreadcrumbList` everywhere, `Service` list on the services page, `BlogPosting` on articles, `CreativeWork` on case studies.
- **Sitemap.xml** with per-URL `<xhtml:link rel="alternate" hreflang>` entries (auto-includes published articles + case studies).
- **Robots.txt** disallows `/dashboard`, `/login`, `/api/`.
- **Favicon + apple-touch-icon** wired from `public/favicon.png`.
- **One `<h1>` per page**; the home hero combines its two visual lines into a single screen-reader-only h1.
- **Semantic landmarks**: `<header>`, `<main>`, `<footer>`, `<article>`, `aria-label` on the primary nav.
- **No fixed `maximum-scale`** in the viewport meta — users can zoom (a11y).
- **`metadataBase`** uses `NEXT_PUBLIC_SITE_URL` so OG/canonical resolve to absolute URLs in production.

Run `curl -sS https://yourdomain.com/sitemap.xml` and use Google's [Rich Results Test](https://search.google.com/test/rich-results) to verify JSON-LD before deploying.

## Notes

- **Production database**: SQLite is fine for low-traffic. For multi-instance hosting, switch the Prisma datasource provider to `postgresql` and point `DATABASE_URL` at a managed DB. No application code changes required.
- **Middleware deprecation warning**: Next.js 16 deprecates the `middleware.ts` convention in favor of `proxy.ts`. The current file still works; rename when convenient.
- **HTML `lang`**: `<html lang="it">` is set at the root layout; English routes carry `<div lang="en">` on the locale wrapper. Inner `lang` cascades per W3C, so search engines + screen readers see the correct language for content.
- **TypeScript build errors**: previously the template ignored TS errors at build time; that flag has been removed. Type errors will now block the build — keep it strict.
