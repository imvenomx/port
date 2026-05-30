/**
 * Inline JSON-LD <script> tag for structured data.
 * Server component — runs at render time, no client JS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Single payload only — never user input — so static stringify is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
