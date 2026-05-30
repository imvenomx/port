"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Renders the SharpsB2B wordmark, swapping between black and white variants
 * based on the active theme. Used by the navbar, footer, and login page.
 *
 * The "inverted" prop forces the white variant — useful inside dark-colored
 * containers (e.g. the FinalCta block) regardless of the page theme.
 */
export function BrandLogo({
  width = 150,
  className,
  priority = false,
  inverted = false,
}: {
  width?: number
  className?: string
  priority?: boolean
  inverted?: boolean
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const src = inverted
    ? "/logo-white.png"
    : mounted && resolvedTheme === "dark"
      ? "/logo-white.png"
      : "/logo-black.png"

  const height = Math.round(width * (250 / 1090))

  return (
    <Image
      src={src}
      alt="SharpsB2B"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  )
}
