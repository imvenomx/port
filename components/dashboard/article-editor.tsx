"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Save,
  Trash2,
  Eye,
  EyeOff,
  Wand2,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code,
} from "lucide-react"
import slugify from "slugify"
import { saveArticle, deleteArticle, generateArticleCover } from "@/app/[locale]/dashboard/actions"

type Article = {
  id?: string
  slug: string
  status: "draft" | "published"
  publishedAt: string | null
  category: string
  tags: string
  coverImage: string
  metaTitleIt: string
  metaDescIt: string
  metaTitleEn: string
  metaDescEn: string
  ogImage: string
  titleIt: string
  excerptIt: string
  bodyIt: string
  titleEn: string
  excerptEn: string
  bodyEn: string
}

const empty: Article = {
  slug: "",
  status: "draft",
  publishedAt: null,
  category: "",
  tags: "",
  coverImage: "",
  metaTitleIt: "",
  metaDescIt: "",
  metaTitleEn: "",
  metaDescEn: "",
  ogImage: "",
  titleIt: "",
  excerptIt: "",
  bodyIt: "",
  titleEn: "",
  excerptEn: "",
  bodyEn: "",
}

export function ArticleEditor({ initial }: { initial?: Partial<Article> & { id?: string } }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [tab, setTab] = useState<"it" | "en">("it")
  const [data, setData] = useState<Article>({ ...empty, ...initial })
  const [error, setError] = useState<string | null>(null)
  const [coverHint, setCoverHint] = useState("")

  function patch<K extends keyof Article>(key: K, value: Article[K]) {
    setData((d) => ({ ...d, [key]: value }))
  }

  function regenerateSlug(from: string) {
    return slugify(from, { lower: true, strict: true, locale: "it" })
  }

  function onSave(newStatus?: "draft" | "published") {
    setError(null)
    const next = newStatus ? { ...data, status: newStatus } : data
    if (!next.slug) next.slug = regenerateSlug(next.titleIt || next.titleEn)
    if (!next.titleIt) {
      setError("Italian title is required")
      return
    }
    if (newStatus === "published" && !next.publishedAt) {
      next.publishedAt = new Date().toISOString()
    }
    startTransition(async () => {
      const result = await saveArticle(next)
      if (result.ok) {
        if (!data.id && result.id) {
          router.replace(`./${result.id}`)
        } else {
          router.refresh()
        }
        setData(next)
      } else {
        setError(result.error ?? "Save failed")
      }
    })
  }

  function onDelete() {
    if (!data.id) return
    if (!confirm("Delete this article? This cannot be undone.")) return
    startTransition(async () => {
      const result = await deleteArticle(data.id!)
      if (result.ok) router.push("../")
      else setError(result.error ?? "Delete failed")
    })
  }

  function onGenerateCover() {
    const prompt = coverHint || data.titleIt || data.titleEn
    if (!prompt) {
      setError("Add a title or hint to generate a cover image.")
      return
    }
    startTransition(async () => {
      const result = await generateArticleCover(prompt)
      if (result.ok) {
        patch("coverImage", result.path)
      } else {
        setError(result.error || "Image generation failed")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b-2 border-foreground">
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            // ARTICLE
          </span>
          <h1 className="font-pixel text-2xl lg:text-3xl tracking-tight mt-1">
            {data.id ? "Edit article" : "New article"}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {data.id && (
            <button
              onClick={onDelete}
              disabled={pending}
              className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase border-2 border-destructive text-destructive px-3 py-2 hover:bg-destructive hover:text-background transition-colors"
            >
              <Trash2 size={12} /> Delete
            </button>
          )}
          <button
            onClick={() => onSave("draft")}
            disabled={pending}
            className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase border-2 border-foreground px-3 py-2 hover:bg-secondary"
          >
            <EyeOff size={12} /> Save draft
          </button>
          <button
            onClick={() => onSave("published")}
            disabled={pending}
            className="flex items-center bg-foreground text-background text-[11px] font-mono tracking-[0.18em] uppercase"
          >
            <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
              <Eye size={14} strokeWidth={2.2} />
            </span>
            <span className="px-3 py-2">Publish</span>
          </button>
        </div>
      </header>

      {error && (
        <div className="border-2 border-destructive bg-destructive/10 px-4 py-2 text-[11px] font-mono text-destructive">
          {error}
        </div>
      )}

      {/* Metadata */}
      <fieldset className="border-2 border-foreground p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <legend className="px-2 text-[10px] font-mono tracking-[0.2em] uppercase">Metadata</legend>
        <FieldInput label="Slug" value={data.slug} onChange={(v) => patch("slug", v)} placeholder="auto-generated-from-title" />
        <FieldInput label="Category" value={data.category} onChange={(v) => patch("category", v)} />
        <FieldInput
          label="Tags (comma-separated)"
          value={data.tags}
          onChange={(v) => patch("tags", v)}
          placeholder="shopify, build-report"
        />
        <FieldInput label="Cover image URL" value={data.coverImage} onChange={(v) => patch("coverImage", v)} placeholder="/placeholder.jpg" />
        <div className="md:col-span-2 flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1">
            <FieldInput
              label="Image prompt (for AI generation)"
              value={coverHint}
              onChange={setCoverHint}
              placeholder="e.g. abstract gradient with shopify orange palette, dot grid background"
            />
          </div>
          <button
            type="button"
            onClick={onGenerateCover}
            disabled={pending}
            className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase border-2 border-foreground px-3 py-2 hover:bg-secondary"
          >
            <Wand2 size={12} /> Generate cover
          </button>
        </div>
        <FieldInput label="OG image (override, optional)" value={data.ogImage} onChange={(v) => patch("ogImage", v)} />
      </fieldset>

      {/* Locale tabs */}
      <div className="flex items-center gap-0 border-b-2 border-foreground">
        {(["it", "en"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-[11px] font-mono tracking-[0.2em] uppercase border-2 border-b-0 -mb-[2px] ${
              tab === t ? "bg-foreground text-background border-foreground" : "border-transparent text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "it" && (
        <LocalePanel
          locale="IT"
          title={data.titleIt}
          excerpt={data.excerptIt}
          body={data.bodyIt}
          metaTitle={data.metaTitleIt}
          metaDesc={data.metaDescIt}
          onTitle={(v) => patch("titleIt", v)}
          onExcerpt={(v) => patch("excerptIt", v)}
          onBody={(v) => patch("bodyIt", v)}
          onMetaTitle={(v) => patch("metaTitleIt", v)}
          onMetaDesc={(v) => patch("metaDescIt", v)}
        />
      )}
      {tab === "en" && (
        <LocalePanel
          locale="EN"
          title={data.titleEn}
          excerpt={data.excerptEn}
          body={data.bodyEn}
          metaTitle={data.metaTitleEn}
          metaDesc={data.metaDescEn}
          onTitle={(v) => patch("titleEn", v)}
          onExcerpt={(v) => patch("excerptEn", v)}
          onBody={(v) => patch("bodyEn", v)}
          onMetaTitle={(v) => patch("metaTitleEn", v)}
          onMetaDesc={(v) => patch("metaDescEn", v)}
        />
      )}

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => onSave()}
          disabled={pending}
          className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase bg-foreground text-background px-4 py-2"
        >
          <Save size={12} /> {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  )
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 border-foreground bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:bg-secondary"
      />
    </label>
  )
}

function LocalePanel({
  locale,
  title,
  excerpt,
  body,
  metaTitle,
  metaDesc,
  onTitle,
  onExcerpt,
  onBody,
  onMetaTitle,
  onMetaDesc,
}: {
  locale: string
  title: string
  excerpt: string
  body: string
  metaTitle: string
  metaDesc: string
  onTitle: (v: string) => void
  onExcerpt: (v: string) => void
  onBody: (v: string) => void
  onMetaTitle: (v: string) => void
  onMetaDesc: (v: string) => void
}) {
  return (
    <div className="border-2 border-foreground border-t-0 p-5 flex flex-col gap-4">
      <FieldInput label={`Title (${locale})`} value={title} onChange={onTitle} />
      <label className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
          Excerpt ({locale})
        </span>
        <textarea
          value={excerpt}
          onChange={(e) => onExcerpt(e.target.value)}
          rows={2}
          className="border-2 border-foreground bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:bg-secondary resize-y"
        />
      </label>

      <div>
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground mb-1.5 block">
          Body ({locale})
        </span>
        <RichEditor value={body} onChange={onBody} />
      </div>

      <fieldset className="border-2 border-foreground/30 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <legend className="px-2 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">SEO ({locale})</legend>
        <FieldInput label="Meta title" value={metaTitle} onChange={onMetaTitle} />
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
            Meta description
          </span>
          <textarea
            value={metaDesc}
            onChange={(e) => onMetaDesc(e.target.value)}
            rows={2}
            className="border-2 border-foreground bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:bg-secondary resize-y"
          />
        </label>
      </fieldset>
    </div>
  )
}

function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Write the article body here…" }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose-blog min-h-[280px] focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  return (
    <div className="border-2 border-foreground bg-background">
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b-2 border-foreground bg-secondary/30">
        <TbBtn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={<Heading2 size={14} />} />
        <TbBtn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} icon={<Heading3 size={14} />} />
        <TbBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold size={14} />} />
        <TbBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic size={14} />} />
        <TbBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List size={14} />} />
        <TbBtn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<ListOrdered size={14} />} />
        <TbBtn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<Quote size={14} />} />
        <TbBtn active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} icon={<Code size={14} />} />
        <TbBtn
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("Link URL")
            if (url === null) return
            if (url === "") {
              editor.chain().focus().unsetLink().run()
              return
            }
            editor.chain().focus().setLink({ href: url }).run()
          }}
          icon={<LinkIcon size={14} />}
        />
        <TbBtn
          onClick={() => {
            const url = window.prompt("Image URL (or /generated/foo.png)")
            if (!url) return
            editor.chain().focus().setImage({ src: url }).run()
          }}
          icon={<ImageIcon size={14} />}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

function TbBtn({ active, onClick, icon }: { active?: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center border ${
        active ? "bg-foreground text-background border-foreground" : "border-foreground/20 hover:border-foreground"
      }`}
    >
      {icon}
    </button>
  )
}
