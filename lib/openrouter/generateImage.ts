import "server-only"
import { promises as fs } from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const FALLBACK_IMAGE = "/placeholder.jpg"

export type GenerateImageOptions = {
  prompt: string
  size?: "512x512" | "1024x1024" | "1024x1792" | "1792x1024"
}

/**
 * Generate an image via OpenRouter and persist it under public/generated/.
 * Returns a public URL path, or a safe fallback path if anything goes wrong —
 * builds and runtime requests are never blocked by a missing key or upstream
 * failure.
 */
export async function generateImage(opts: GenerateImageOptions): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    console.warn("[openrouter] OPENROUTER_API_KEY not set — returning fallback image.")
    return FALLBACK_IMAGE
  }

  const model = process.env.OPENROUTER_IMAGE_MODEL || "openai/gpt-5-image"
  const styleSuffix = " Brutalist editorial illustration, monochrome cream and near-black palette with a single warm orange accent, sharp geometric forms, dot grid texture, high-contrast composition."

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpsb2b.com",
        "X-Title": "SharpsB2B",
      },
      body: JSON.stringify({
        model,
        modalities: ["image", "text"],
        messages: [
          {
            role: "user",
            content: `${opts.prompt}.${styleSuffix} Size: ${opts.size ?? "1024x1024"}.`,
          },
        ],
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.warn("[openrouter] non-ok response:", res.status, text.slice(0, 200))
      return FALLBACK_IMAGE
    }

    const json = (await res.json()) as {
      choices?: Array<{
        message?: {
          images?: Array<{ image_url?: { url?: string } | string }>
        }
      }>
    }

    const image = json.choices?.[0]?.message?.images?.[0]
    const url = typeof image?.image_url === "string" ? image.image_url : image?.image_url?.url
    if (!url) {
      console.warn("[openrouter] no image in response")
      return FALLBACK_IMAGE
    }

    return await persistImage(url, opts.prompt)
  } catch (err) {
    console.warn("[openrouter] generation failed:", err)
    return FALLBACK_IMAGE
  }
}

async function persistImage(srcUrl: string, prompt: string): Promise<string> {
  const dir = path.join(process.cwd(), "public", "generated")
  await fs.mkdir(dir, { recursive: true })

  // srcUrl can be either a remote URL or a data:image/png;base64,... URL.
  let buffer: Buffer
  let ext = "png"
  if (srcUrl.startsWith("data:")) {
    const match = srcUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/)
    if (!match) throw new Error("invalid data url")
    ext = match[1].split("/")[1].replace("+xml", "") || "png"
    buffer = Buffer.from(match[2], "base64")
  } else {
    const r = await fetch(srcUrl)
    if (!r.ok) throw new Error(`fetch image failed: ${r.status}`)
    const ct = r.headers.get("content-type") || "image/png"
    ext = ct.split("/")[1]?.replace("+xml", "") || "png"
    buffer = Buffer.from(await r.arrayBuffer())
  }

  const hash = crypto.createHash("sha1").update(`${prompt}:${Date.now()}`).digest("hex").slice(0, 12)
  const filename = `${hash}.${ext}`
  await fs.writeFile(path.join(dir, filename), buffer)
  return `/generated/${filename}`
}
