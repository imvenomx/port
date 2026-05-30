"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { ArrowRight, AlertTriangle } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import type { Locale } from "@/lib/i18n/config"

export function LoginForm({ locale, dict: _dict }: { locale: Locale; dict: Dictionary }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await signIn("credentials", { email, password, redirect: false })
      if (!res || res.error) {
        setError(locale === "it" ? "Credenziali non valide" : "Invalid credentials")
        return
      }
      router.push(locale === "it" ? "/dashboard" : `/${locale}/dashboard`)
      router.refresh()
    } catch {
      setError(locale === "it" ? "Errore inatteso" : "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-2 border-foreground bg-background p-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="border-2 border-foreground bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:bg-secondary"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="border-2 border-foreground bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:bg-secondary"
        />
      </label>

      {error && (
        <p className="flex items-center gap-2 text-[11px] font-mono text-destructive">
          <AlertTriangle size={12} /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group flex items-center bg-foreground text-background text-xs font-mono tracking-[0.18em] uppercase disabled:opacity-60"
      >
        <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
          <ArrowRight size={16} strokeWidth={2} className="text-background transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="px-5 py-2.5">
          {loading ? (locale === "it" ? "Accesso…" : "Signing in…") : locale === "it" ? "Accedi" : "Sign in"}
        </span>
      </button>
    </form>
  )
}
