/**
 * Generate brand-consistent cover images for every published article via
 * OpenRouter, persist them to public/generated/, and update each row's
 * coverImage field.
 *
 * Usage:
 *   npm run blog:covers              # generate covers for articles that
 *                                    # still point at /placeholder.jpg
 *   npm run blog:covers -- --all     # regenerate every published article
 *   npm run blog:covers -- <slug>    # regenerate one specific slug
 */
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { promises as fs } from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const prisma = new PrismaClient()

const SITE_REFERER = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com"
const MODEL = process.env.OPENROUTER_IMAGE_MODEL ?? "openai/gpt-5-image"
const OUT_DIR = path.join(process.cwd(), "public", "generated")
const FALLBACK = "/placeholder.jpg"

// Per-article visual hooks. Each prompt feeds into a shared style suffix so
// the whole blog index reads as one design system.
const PROMPTS: Record<string, string> = {
  "shopify-vs-woocommerce-2026":
    "Two competing storefront panels on the left and right of the composition, separated by a stark vertical seam — one labeled in subtle 'SHOPIFY' typography, the other 'WOOCOMMERCE'. A single warm orange disc sits dead-center on the seam, suggesting the difficult choice.",
  "automazioni-che-fanno-soldi":
    "Five orange geometric shapes arranged as nodes connected by clean black lines on a cream dot-grid background — a hand-drawn flowchart aesthetic showing automation steps. Bold simple shapes, no labels.",
  "core-web-vitals-2026":
    "An abstract performance gauge made of three vertical orange bars rising at different heights against a deep black background, with thin dot-grid texture peeking through. Brutalist data-viz monument.",
  "meta-ads-b2b-2026":
    "A bold orange megaphone silhouette pointing right, casting a long geometric shadow across a cream background with a subtle dot grid. A small target reticle sits where the sound waves would converge.",
  "app-vs-pwa-2026":
    "Two stylized smartphone silhouettes facing each other, one rendered as a solid black brick and the other as an outlined wireframe — between them a single orange dot floats, symbolizing the choice.",
  "headless-commerce-stack":
    "A black architecture diagram of five interconnected blocks stacked on a cream background, with the topmost block highlighted in warm orange. The connecting lines suggest a layered tech stack. Minimal, blueprint-like.",
}

const STYLE_SUFFIX = [
  "Brutalist editorial poster illustration.",
  "Color palette strictly limited to: cream beige #F2F1EA background, near-black #0a0a0a primary, single warm orange #ea580c accent.",
  "Heavy use of sharp geometric forms, thick borders, dot grid texture.",
  "Composition is high-contrast and minimal — feels like a contemporary independent magazine cover.",
  "No photorealistic content. No people. No company logos.",
  "Aspect ratio 16:9. Resolution 1792x1024.",
].join(" ")

async function generate(slug: string, prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    console.warn(`[${slug}] OPENROUTER_API_KEY missing — keeping fallback`)
    return FALLBACK
  }

  const fullPrompt = `${prompt} ${STYLE_SUFFIX}`
  console.log(`[${slug}] requesting image…`)

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": SITE_REFERER,
      "X-Title": "SharpsB2B",
    },
    body: JSON.stringify({
      model: MODEL,
      modalities: ["image", "text"],
      messages: [{ role: "user", content: fullPrompt }],
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    console.error(`[${slug}] HTTP ${res.status}:`, text.slice(0, 300))
    return FALLBACK
  }

  const json = (await res.json()) as {
    choices?: Array<{
      message?: {
        images?: Array<{ image_url?: { url?: string } | string }>
      }
    }>
    usage?: { cost?: number }
  }

  const image = json.choices?.[0]?.message?.images?.[0]
  const url = typeof image?.image_url === "string" ? image.image_url : image?.image_url?.url
  if (!url) {
    console.error(`[${slug}] no image in response`)
    return FALLBACK
  }
  if (json.usage?.cost != null) console.log(`[${slug}] cost: $${json.usage.cost.toFixed(4)}`)

  await fs.mkdir(OUT_DIR, { recursive: true })

  let buffer: Buffer
  let ext = "png"
  if (url.startsWith("data:")) {
    const match = url.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/)
    if (!match) throw new Error("invalid data url")
    ext = match[1].split("/")[1].replace("+xml", "") || "png"
    buffer = Buffer.from(match[2], "base64")
  } else {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`fetch hosted image failed: ${r.status}`)
    ext = (r.headers.get("content-type") || "image/png").split("/")[1]?.replace("+xml", "") || "png"
    buffer = Buffer.from(await r.arrayBuffer())
  }

  // Deterministic filename by slug + content hash → safe to re-run.
  const hash = crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 8)
  const filename = `blog-${slug}-${hash}.${ext}`
  await fs.writeFile(path.join(OUT_DIR, filename), buffer)
  console.log(`[${slug}] saved /generated/${filename} (${(buffer.length / 1024).toFixed(0)} KB)`)
  return `/generated/${filename}`
}

async function main() {
  const args = process.argv.slice(2)
  const regenAll = args.includes("--all")
  const slugArg = args.find((a) => !a.startsWith("--"))

  let articles
  if (slugArg) {
    const a = await prisma.article.findUnique({ where: { slug: slugArg } })
    articles = a ? [a] : []
  } else {
    articles = await prisma.article.findMany({
      where: {
        status: "published",
        ...(regenAll ? {} : { OR: [{ coverImage: null }, { coverImage: "/placeholder.jpg" }] }),
      },
      orderBy: { publishedAt: "asc" },
    })
  }

  if (articles.length === 0) {
    console.log("No articles to process.")
    return
  }
  console.log(`Processing ${articles.length} article(s)…\n`)

  for (const article of articles) {
    const prompt = PROMPTS[article.slug]
    if (!prompt) {
      console.warn(`[${article.slug}] no PROMPT mapping defined — skipping`)
      continue
    }
    try {
      const newPath = await generate(article.slug, prompt)
      if (newPath !== FALLBACK) {
        await prisma.article.update({
          where: { id: article.id },
          data: { coverImage: newPath },
        })
        console.log(`[${article.slug}] DB updated → ${newPath}\n`)
      } else {
        console.log(`[${article.slug}] kept fallback, DB unchanged\n`)
      }
    } catch (err) {
      console.error(`[${article.slug}] failed:`, err instanceof Error ? err.message : err, "\n")
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
