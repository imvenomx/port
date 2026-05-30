import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import { isLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { auth } from "@/lib/auth"
import { LoginForm } from "@/components/dashboard/login-form"

type Params = { locale: string }

export default async function LoginPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const session = await auth()
  if (session) redirect(`/${locale === "it" ? "" : `${locale}/`}dashboard`.replace(/\/$/, "/"))

  return (
    <div className="min-h-screen flex items-center justify-center px-6 dot-grid-bg">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            // SHARPSB2B / ADMIN
          </span>
          <h1 className="font-pixel text-4xl lg:text-5xl tracking-tight">
            {locale === "it" ? "Accedi" : "Sign in"}
          </h1>
          <p className="text-xs font-mono text-muted-foreground">
            {locale === "it"
              ? "Accesso riservato al team SharpsB2B."
              : "Reserved for the SharpsB2B team."}
          </p>
        </div>

        <LoginForm locale={locale} dict={dict} />
      </div>
    </div>
  )
}
