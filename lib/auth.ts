import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

const credSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  // In production behind a proxy we trust the host header. Override with
  // AUTH_TRUST_HOST=false if running an unknown reverse proxy.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8h dashboard session
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credSchema.safeParse(credentials)
        if (!parsed.success) return null

        const adminEmail = process.env.ADMIN_EMAIL
        // Bcrypt hashes contain `$` characters that @next/env interprets as
        // variable references. We accept either ADMIN_PASSWORD_HASH_B64 (base64)
        // or ADMIN_PASSWORD_HASH (raw — only works if `$` chars don't collide).
        let adminHash = process.env.ADMIN_PASSWORD_HASH
        const adminHashB64 = process.env.ADMIN_PASSWORD_HASH_B64
        if (adminHashB64) {
          try {
            adminHash = Buffer.from(adminHashB64, "base64").toString("utf-8")
          } catch {
            adminHash = undefined
          }
        }

        if (!adminEmail || !adminHash) {
          console.warn("[auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH not set — admin login disabled.")
          return null
        }

        if (parsed.data.email.toLowerCase() !== adminEmail.toLowerCase()) return null
        const valid = await bcrypt.compare(parsed.data.password, adminHash)
        if (!valid) return null

        return {
          id: "admin",
          email: adminEmail,
          name: "SharpsB2B Admin",
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin"
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl
      // Only enforced when called via the auth() middleware export, but
      // most routes don't use that — we protect via per-route checks instead.
      if (pathname.startsWith("/dashboard") || pathname.match(/^\/[a-z]{2}\/dashboard/)) {
        return !!session
      }
      return true
    },
  },
})
