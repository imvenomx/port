import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "SharpsB2B — Agenzia digitale B2B"

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F2F1EA",
          color: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          fontFamily: "monospace",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #c4c2b8 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* Top: eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          <div style={{ width: 12, height: 12, background: "#ea580c" }} />
          <span>// SharpsB2B / Agenzia digitale B2B</span>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            DESIGN. BUILD.&nbsp;
            <span style={{ color: "#ea580c" }}>SHIP.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#404040",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Siti, Shopify, WooCommerce, app mobili, automazioni e campagne Meta & Google Ads — per aziende ambiziose.
          </div>
        </div>

        {/* Bottom band */}
        <div
          style={{
            marginTop: 44,
            paddingTop: 28,
            borderTop: "3px solid #0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 44,
                height: 44,
                background: "#ea580c",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 28,
              }}
            >
              S
            </div>
            <span>sharpsb2b.com</span>
          </div>
          <span style={{ color: "#737373" }}>IT · EN</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
