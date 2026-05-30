"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/getDictionary"
import type { Locale } from "@/lib/i18n/config"
import { getAllServices } from "@/lib/services"

const ease = [0.22, 1, 0.36, 1] as const

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.contact.form

  const schema = z.object({
    name: z.string().min(1, f.required),
    email: z.string().min(1, f.required).email(f.invalidEmail),
    company: z.string().optional(),
    service: z.string().min(1, f.required),
    message: z.string().min(10, f.minMessage),
    consent: z.literal(true, { errorMap: () => ({ message: f.consentRequired }) }),
  })

  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", service: "", message: "", consent: false as never },
  })

  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle")

  const services = getAllServices(dict)

  async function onSubmit(data: FormData) {
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      })
      if (!res.ok) throw new Error("send failed")
      setStatus("ok")
      reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
        className="border-2 border-foreground p-8 lg:p-12 flex flex-col items-start gap-4 bg-foreground text-background"
      >
        <CheckCircle2 size={32} className="text-[#ea580c]" />
        <h3 className="text-2xl lg:text-3xl font-mono font-bold uppercase tracking-tight">
          {f.successTitle}
        </h3>
        <p className="text-sm font-mono text-background/80 max-w-xl leading-relaxed">
          {f.successBody}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-foreground p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 bg-background">
      <Field label={f.name} error={formState.errors.name?.message}>
        <input
          {...register("name")}
          placeholder={f.namePlaceholder}
          className="w-full border-2 border-foreground bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:bg-secondary"
        />
      </Field>
      <Field label={f.email} error={formState.errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder={f.emailPlaceholder}
          className="w-full border-2 border-foreground bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:bg-secondary"
        />
      </Field>
      <Field label={f.company} error={formState.errors.company?.message}>
        <input
          {...register("company")}
          placeholder={f.companyPlaceholder}
          className="w-full border-2 border-foreground bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:bg-secondary"
        />
      </Field>
      <Field label={f.service} error={formState.errors.service?.message}>
        <select
          {...register("service")}
          className="w-full border-2 border-foreground bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:bg-secondary"
          defaultValue=""
        >
          <option value="" disabled>
            {f.servicePlaceholder}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </Field>
      <div className="md:col-span-2">
        <Field label={f.message} error={formState.errors.message?.message}>
          <textarea
            {...register("message")}
            placeholder={f.messagePlaceholder}
            rows={6}
            className="w-full border-2 border-foreground bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:bg-secondary resize-y"
          />
        </Field>
      </div>
      <div className="md:col-span-2 flex flex-col gap-1">
        <label className="flex items-start gap-3 text-xs font-mono cursor-pointer">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 w-4 h-4 accent-[#ea580c]"
          />
          <span>{f.consent}</span>
        </label>
        {formState.errors.consent && (
          <span className="text-[11px] font-mono text-destructive">
            {formState.errors.consent.message as string}
          </span>
        )}
      </div>

      <div className="md:col-span-2 flex items-center justify-between gap-4 mt-2 pt-4 border-t-2 border-foreground">
        {status === "error" && (
          <span className="flex items-center gap-2 text-[11px] font-mono text-destructive">
            <AlertTriangle size={14} /> {f.errorBody}
          </span>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex items-center bg-foreground text-background text-xs font-mono tracking-[0.18em] uppercase disabled:opacity-60 ml-auto"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
            <ArrowRight size={16} strokeWidth={2} className="text-background transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="px-5 py-2.5">{status === "submitting" ? f.submitting : f.submit}</span>
        </button>
      </div>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">{label}</span>
      {children}
      {error && <span className="text-[11px] font-mono text-destructive">{error}</span>}
    </label>
  )
}
