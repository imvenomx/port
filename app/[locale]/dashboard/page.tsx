import Link from "next/link"
import { notFound } from "next/navigation"
import { Plus, Edit3 } from "lucide-react"
import { isLocale } from "@/lib/i18n/config"
import { prisma } from "@/lib/prisma"

type Params = { locale: string }

export default async function DashboardHome({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const articles = await prisma.article.findMany({
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  })
  const base = `${locale === "it" ? "" : `/${locale}`}/dashboard`

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between gap-4 border-b-2 border-foreground pb-5">
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            // DASHBOARD
          </span>
          <h1 className="font-pixel text-3xl lg:text-5xl tracking-tight mt-2">Articles</h1>
        </div>
        <Link
          href={`${base}/articles/new`}
          className="group flex items-center bg-foreground text-background text-[11px] font-mono tracking-[0.18em] uppercase"
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
            <Plus size={14} strokeWidth={2.2} className="text-background" />
          </span>
          <span className="px-4 py-2">New</span>
        </Link>
      </header>

      {articles.length === 0 ? (
        <p className="text-sm font-mono text-muted-foreground">No articles yet.</p>
      ) : (
        <div className="border-2 border-foreground">
          <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b-2 border-foreground text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground bg-secondary/50">
            <span className="col-span-6">Title</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-2 text-right">Updated</span>
          </div>
          <ul>
            {articles.map((a) => (
              <li key={a.id} className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-foreground/20 last:border-b-0 items-center hover:bg-secondary/40">
                <Link
                  href={`${base}/articles/${a.id}`}
                  className="col-span-6 flex items-center gap-2 text-sm font-mono font-bold group"
                >
                  <Edit3 size={12} className="opacity-60 group-hover:opacity-100" />
                  <span className="truncate">{a.titleIt}</span>
                </Link>
                <span className="col-span-2">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-mono tracking-[0.15em] uppercase border-2 ${
                      a.status === "published"
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/40 text-muted-foreground"
                    }`}
                  >
                    {a.status}
                  </span>
                </span>
                <span className="col-span-2 text-[11px] font-mono text-muted-foreground truncate">
                  {a.category ?? "—"}
                </span>
                <span className="col-span-2 text-[11px] font-mono text-muted-foreground text-right">
                  {new Date(a.updatedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
