import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen dot-grid-bg flex items-center justify-center px-6">
      <div className="max-w-lg w-full flex flex-col gap-6 border-2 border-foreground bg-background p-8">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
          // ERROR / 404
        </span>
        <h1 className="font-pixel text-6xl lg:text-8xl tracking-tight text-foreground leading-[1]">
          404
        </h1>
        <p className="text-sm font-mono text-muted-foreground leading-relaxed">
          Page not found. The page may have moved, or never existed.
          <br />
          La pagina non esiste o è stata spostata.
        </p>
        <Link
          href="/"
          className="self-start group flex items-center bg-foreground text-background text-[11px] font-mono tracking-[0.18em] uppercase"
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
            <ArrowLeft size={14} strokeWidth={2} className="text-background" />
          </span>
          <span className="px-4 py-2.5">Home</span>
        </Link>
      </div>
    </div>
  )
}
