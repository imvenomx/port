/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Ship the SQLite database file + Prisma engine binaries inside every
  // serverless function on Vercel. Without this Vercel's file tracer drops
  // the .db and the function crashes on cold start with "file not found".
  outputFileTracingIncludes: {
    "/**/*": [
      "./prisma/dev.db",
      "./prisma/schema.prisma",
      "./node_modules/.prisma/client/**/*",
      "./node_modules/@prisma/client/**/*",
    ],
  },
}

export default nextConfig
