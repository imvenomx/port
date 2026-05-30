import Link from "next/link"
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import { LogOut, FileText, PlusCircle, ExternalLink } from "lucide-react"
import { isLocale, localizedPath } from "@/lib/i18n/config"
import { auth, signOut } from "@/lib/auth"
import { BrandLogo } from "@/components/brand-logo"

type Params = { locale: string }

export default async function DashboardLayout({
  params,
  children,
}: {
  params: Promise<Params>
  children: React.ReactNode
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const session = await auth()
  if (!session) {
    redirect(`${locale === "it" ? "" : `/${locale}`}/login`)
  }

  const base = `${locale === "it" ? "" : `/${locale}`}/dashboard`

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Sidebar */}
      <aside className="lg:w-60 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground p-5 flex flex-col gap-6">
        <Link href={localizedPath(locale, "home")} className="flex items-center gap-2" aria-label="SharpsB2B — Home">
          <BrandLogo width={120} className="h-6 w-auto" />
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
            / admin
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          <Link
            href={base}
            className="flex items-center gap-2 px-3 py-2 text-[11px] font-mono tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors border border-foreground/0 hover:border-foreground"
          >
            <FileText size={13} /> Articles
          </Link>
          <Link
            href={`${base}/articles/new`}
            className="flex items-center gap-2 px-3 py-2 text-[11px] font-mono tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors border border-foreground/0 hover:border-foreground"
          >
            <PlusCircle size={13} /> New article
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-3 pt-6 border-t-2 border-foreground/20">
          <Link
            href={localizedPath(locale, "home")}
            target="_blank"
            className="flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink size={11} /> View site
          </Link>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: `${locale === "it" ? "" : `/${locale}`}/login` })
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut size={11} /> Log out
            </button>
          </form>
          <span className="text-[10px] font-mono text-muted-foreground truncate">
            {session.user?.email}
          </span>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 max-w-5xl">{children}</main>
    </div>
  )
}
