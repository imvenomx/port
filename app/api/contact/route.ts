import { NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  company: z.string().max(200).optional(),
  service: z.string().min(1).max(100),
  message: z.string().min(10).max(8000),
  consent: z.literal(true),
  locale: z.enum(["it", "en"]).optional(),
})

export async function POST(req: Request) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 422 })
  }

  const { name, email, company, service, message, locale } = parsed.data
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@sharpsb2b.com"
  const from = process.env.CONTACT_FROM_EMAIL ?? "noreply@sharpsb2b.com"
  const resendKey = process.env.RESEND_API_KEY

  // No provider configured → stub success (still log to server) so the
  // site can run without external dependencies.
  if (!resendKey) {
    console.log("[contact:stub]", { name, email, company, service, locale, message: message.slice(0, 120) })
    return NextResponse.json({ ok: true, stub: true })
  }

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(resendKey)
    const subject = `[SharpsB2B] ${name} — ${service}`
    const html = `
<h2>Nuova richiesta dal sito</h2>
<table cellpadding="6" cellspacing="0" border="0" style="font-family:monospace;font-size:13px;">
<tr><td><b>Nome</b></td><td>${escape(name)}</td></tr>
<tr><td><b>Email</b></td><td>${escape(email)}</td></tr>
<tr><td><b>Azienda</b></td><td>${escape(company ?? "")}</td></tr>
<tr><td><b>Servizio</b></td><td>${escape(service)}</td></tr>
<tr><td><b>Lingua</b></td><td>${escape(locale ?? "it")}</td></tr>
</table>
<hr/>
<p style="font-family:monospace;white-space:pre-wrap">${escape(message)}</p>`

    await resend.emails.send({ from, to, subject, html, replyTo: email })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact:send-failed]", err)
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
  }
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
