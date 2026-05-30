"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Renders the SharpsB2B wordmark.
 *
 * The asset is 1090×250 (≈ 4.36:1). We pass those exact intrinsic
 * dimensions to next/image and lock the rendered size with an inline
 * `style`, which guarantees the aspect ratio is preserved regardless
 * of what container constraints the parent has.
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

  return (
    <Image
      src={src}
      alt="SharpsB2B"
      width={1090}
      height={250}
      priority={priority}
      className={className}
      style={{ width: `${width}px`, height: "auto" }}
    />
  )
}
