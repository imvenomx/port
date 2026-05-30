"use server"

import { revalidatePath } from "next/cache"
import slugify from "slugify"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { generateImage } from "@/lib/openrouter/generateImage"

async function requireAdmin() {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")
}

const articleSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).max(160),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().nullable().optional(),
  category: z.string().max(80).optional(),
  tags: z.string().max(500).optional(),
  coverImage: z.string().max(500).optional(),
  metaTitleIt: z.string().max(200).optional(),
  metaDescIt: z.string().max(400).optional(),
  metaTitleEn: z.string().max(200).optional(),
  metaDescEn: z.string().max(400).optional(),
  ogImage: z.string().max(500).optional(),
  titleIt: z.string().min(1).max(200),
  excerptIt: z.string().max(500).optional(),
  bodyIt: z.string().max(80000).optional(),
  titleEn: z.string().max(200).optional(),
  excerptEn: z.string().max(500).optional(),
  bodyEn: z.string().max(80000).optional(),
})

export async function saveArticle(input: z.infer<typeof articleSchema>): Promise<
  { ok: true; id: string } | { ok: false; error: string }
> {
  await requireAdmin()
  const parsed = articleSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" }

  const slug = parsed.data.slug || slugify(parsed.data.titleIt, { lower: true, strict: true })
  const data = {
    slug,
    status: parsed.data.status,
    publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
    category: parsed.data.category || null,
    tags: parsed.data.tags || null,
    coverImage: parsed.data.coverImage || null,
    metaTitleIt: parsed.data.metaTitleIt || null,
    metaDescIt: parsed.data.metaDescIt || null,
    metaTitleEn: parsed.data.metaTitleEn || null,
    metaDescEn: parsed.data.metaDescEn || null,
    ogImage: parsed.data.ogImage || null,
    titleIt: parsed.data.titleIt,
    excerptIt: parsed.data.excerptIt || null,
    bodyIt: parsed.data.bodyIt || null,
    titleEn: parsed.data.titleEn || null,
    excerptEn: parsed.data.excerptEn || null,
    bodyEn: parsed.data.bodyEn || null,
  }

  try {
    const saved = parsed.data.id
      ? await prisma.article.update({ where: { id: parsed.data.id }, data })
      : await prisma.article.create({ data })

    revalidatePath("/", "layout")
    return { ok: true, id: saved.id }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Save failed"
    if (msg.includes("Unique") || msg.includes("UNIQUE")) {
      return { ok: false, error: "Slug already exists. Choose a different one." }
    }
    return { ok: false, error: msg }
  }
}

export async function deleteArticle(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin()
  try {
    await prisma.article.delete({ where: { id } })
    revalidatePath("/", "layout")
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Delete failed" }
  }
}

export async function generateArticleCover(prompt: string): Promise<
  { ok: true; path: string } | { ok: false; error: string }
> {
  await requireAdmin()
  try {
    const path = await generateImage({ prompt, size: "1024x1024" })
    return { ok: true, path }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Image generation failed" }
  }
}
