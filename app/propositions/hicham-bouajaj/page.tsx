import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proposition — Site WordPress à filtres avancés · Hicham Bouajaj",
  description:
    "Proposition commerciale SharpsB2B : site WordPress sur-mesure à moteur de filtres avancés. Délais, livrables et budget estimatif.",
  robots: { index: false, follow: false },
}

const ACCENT = "#ea580c"

const features: { n: string; title: string; desc: string }[] = [
  { n: "01", title: "Filtres à facettes", desc: "Critères multiples combinables, mise à jour instantanée sans rechargement (AJAX)." },
  { n: "02", title: "Recherche instantanée", desc: "Résultats en temps réel avec suggestions dès la saisie." },
  { n: "03", title: "Catalogue structuré", desc: "Types de contenus & champs personnalisés (CPT + ACF) adaptés à vos données." },
  { n: "04", title: "Rapide & responsive", desc: "Mobile-first, cache et images optimisées, bons scores Core Web Vitals." },
  { n: "05", title: "SEO & autonomie", desc: "SEO technique de base + back-office pour tout gérer vous-même, sans code." },
  { n: "06", title: "Hébergement inclus", desc: "Hébergement + nom de domaine (.ma / .com) + SSL + sauvegardes automatiques." },
]

const phases: { n: string; title: string; weeks: string }[] = [
  { n: "0", title: "Cadrage & design UI/UX", weeks: "1–2 sem." },
  { n: "1", title: "Développement & moteur de filtres", weeks: "2–3 sem." },
  { n: "2", title: "Contenu, SEO & performance", weeks: "1 sem." },
  { n: "3", title: "Recette, formation & mise en ligne", weeks: "1 sem." },
]

const budget: { label: string; amount: string }[] = [
  { label: "Cadrage & design UI/UX", amount: "4 000 – 7 000" },
  { label: "Développement WordPress sur-mesure", amount: "9 000 – 15 000" },
  { label: "Moteur de filtres avancés", amount: "5 000 – 9 000" },
  { label: "Contenu, SEO, performance & mise en ligne", amount: "5 000 – 9 000" },
]

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
      {children}
    </span>
  )
}

function SectionHead({ idx, title }: { idx: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-bold tracking-[0.1em]" style={{ color: ACCENT }}>
        {idx}
      </span>
      <h2 className="text-[13px] font-bold tracking-[0.2em] uppercase">{title}</h2>
    </div>
  )
}

export default function PropositionPage() {
  return (
    <main className="dot-grid-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Terminal bar */}
        <div className="flex items-center gap-2.5 border-2 border-foreground bg-foreground text-background px-3.5 py-2 text-[11px]">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 inline-block" style={{ background: ACCENT }} />
            <span className="h-2.5 w-2.5 inline-block border border-background" />
            <span className="h-2.5 w-2.5 inline-block border border-background" />
          </span>
          <span className="text-muted-foreground">
            ~/sharpsb2b/propositions/<b className="text-background font-bold">hicham-bouajaj</b>
          </span>
        </div>

        <div className="border-2 border-t-0 border-foreground bg-card">
          {/* Masthead */}
          <div className="flex flex-wrap items-end justify-between gap-4 px-6 sm:px-8 py-6 border-b-2 border-foreground">
            <div className="flex flex-col gap-1.5">
              <div className="text-2xl font-extrabold tracking-tight">
                Sharps<span style={{ color: ACCENT }}>B2B</span>
              </div>
              <Label>// Agence digitale B2B</Label>
            </div>
            <div className="flex flex-col items-end gap-1.5 text-right">
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-1.5 bg-foreground text-background"
              >
                Proposition commerciale
              </span>
              <span className="text-[11px] text-muted-foreground">Réf. SB2B-2026-034</span>
            </div>
          </div>

          {/* Hero */}
          <div className="px-6 sm:px-8 py-9 border-b-2 border-foreground">
            <p className="text-[11px] font-mono tracking-[0.22em] uppercase mb-4" style={{ color: ACCENT }}>
              // Proposition_projet
            </p>
            <h1 className="text-[27px] sm:text-4xl font-extrabold leading-[1.1] tracking-tight text-balance max-w-[20ch]">
              Site WordPress sur-mesure à moteur de filtres avancés
            </h1>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-foreground/80">
              Une plateforme rapide, évolutive et simple à administrer, pensée pour explorer un large
              catalogue via un système de filtres puissant — multi-critères, combinables et instantanés.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 border-2 border-foreground px-3.5 py-2 text-xs">
              <span style={{ color: ACCENT }}>▸</span> Préparé pour <b>Hicham Bouajaj</b>
              <span className="text-muted-foreground">· 27 août 2026</span>
            </div>
          </div>

          {/* 01 — What you get */}
          <section className="px-6 sm:px-8 py-8 border-b border-foreground/15">
            <SectionHead idx="01" title="Ce que vous obtenez" />
            <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-foreground">
              {features.map((f, i) => (
                <div
                  key={f.n}
                  className={`p-4 border-foreground ${i % 2 === 0 ? "sm:border-r-2" : ""} ${
                    i < features.length - (features.length % 2 === 0 ? 2 : 1) ? "border-b-2" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-2 font-bold text-[13.5px]">
                    <span className="text-[11px]" style={{ color: ACCENT }}>
                      {f.n}
                    </span>
                    {f.title}
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Timeline */}
          <section className="px-6 sm:px-8 py-8 border-b border-foreground/15">
            <SectionHead idx="02" title="Délais" />
            <div className="border-2 border-foreground">
              {phases.map((p, i) => (
                <div
                  key={p.n}
                  className={`grid grid-cols-[48px_1fr_auto] items-center ${
                    i < phases.length - 1 ? "border-b border-foreground/15" : ""
                  }`}
                >
                  <div className="self-stretch flex items-center justify-center bg-foreground text-background font-extrabold py-3.5">
                    {p.n}
                  </div>
                  <div className="px-4 py-3 text-[13.5px] font-medium">{p.title}</div>
                  <div className="px-4 py-3 text-xs font-bold" style={{ color: ACCENT }}>
                    {p.weeks}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-2 border-t-0 border-foreground bg-foreground text-background px-4 py-3 text-[11px] tracking-[0.14em] uppercase">
              <span>Durée totale estimée</span>
              <b className="text-[15px] tracking-normal" style={{ color: ACCENT }}>
                6 à 8 semaines
              </b>
            </div>
          </section>

          {/* 03 — Budget */}
          <section className="px-6 sm:px-8 py-8 border-b border-foreground/15">
            <SectionHead idx="03" title="Budget estimé" />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-foreground text-[13.5px]">
                <thead>
                  <tr className="bg-foreground text-background">
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-bold">
                      Poste
                    </th>
                    <th className="text-right px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-bold whitespace-nowrap">
                      Estimation (MAD, HT)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budget.map((b) => (
                    <tr key={b.label} className="border-b border-foreground/15">
                      <td className="px-4 py-3">{b.label}</td>
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">{b.amount}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-foreground font-extrabold" style={{ background: "rgba(234,88,12,0.08)" }}>
                    <td className="px-4 py-3">Total estimé (HT)</td>
                    <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap text-[15px]" style={{ color: "#c2410c" }}>
                      23 000 – 40 000 MAD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-foreground/70 border-l-[3px] pl-3.5 py-1" style={{ borderColor: ACCENT }}>
              <b style={{ color: "#c2410c" }}>Fourchette indicative.</b> Le montant final dépend du volume de
              contenus, du nombre de critères de filtres et des options (multilingue FR/AR, e-commerce…).
              Prix hors taxes — TVA 20 % en sus.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div className="border-2 border-foreground px-4 py-3">
                <Label>Hébergement & domaine</Label>
                <p className="mt-1.5 text-muted-foreground">1<sup>re</sup> année incluse · SSL inclus</p>
              </div>
              <div className="border-2 border-foreground px-4 py-3">
                <Label>Récurrent annuel</Label>
                <p className="mt-1.5 text-muted-foreground">
                  Domaine + hébergement ≈ 1 300 – 3 500 MAD/an · maintenance (option) 500 – 1 000 MAD/mois
                </p>
              </div>
            </div>
          </section>

          {/* 04 — Payment */}
          <section className="px-6 sm:px-8 py-8 border-b border-foreground/15">
            <SectionHead idx="04" title="Modalités de paiement" />
            <p className="mb-4 text-[13.5px] text-foreground/80">Deux formules au choix :</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-foreground p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] tracking-[0.18em] uppercase px-2 py-1 bg-foreground text-background">
                    Option A
                  </span>
                  <span className="text-[13px] font-bold">Par acompte</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-[13px]">
                  <li className="flex items-center justify-between border-b border-foreground/15 pb-2">
                    <span>À la commande</span>
                    <b style={{ color: ACCENT }}>40%</b>
                  </li>
                  <li className="flex items-center justify-between border-b border-foreground/15 pb-2">
                    <span>À mi-parcours</span>
                    <b style={{ color: ACCENT }}>30%</b>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>À la livraison</span>
                    <b style={{ color: ACCENT }}>30%</b>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-foreground p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] tracking-[0.18em] uppercase px-2 py-1 bg-foreground text-background">
                    Option B
                  </span>
                  <span className="text-[13px] font-bold">Par livrable</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-[13px]">
                  <li className="flex items-center justify-between border-b border-foreground/15 pb-2">
                    <span>Design validé</span>
                    <b style={{ color: ACCENT }}>30%</b>
                  </li>
                  <li className="flex items-center justify-between border-b border-foreground/15 pb-2">
                    <span>Dév. + filtres validés</span>
                    <b style={{ color: ACCENT }}>40%</b>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Mise en ligne</span>
                    <b style={{ color: ACCENT }}>30%</b>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 05 — Next steps */}
          <section className="px-6 sm:px-8 py-8">
            <SectionHead idx="05" title="Prochaines étapes" />
            <p className="text-[14px] leading-relaxed text-foreground/80 max-w-[60ch]">
              Indiquez-nous le volume de contenus et les critères de filtres souhaités : nous établissons
              alors le <b>devis définitif</b>, puis démarrons dès validation et réception de l&apos;acompte.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hello@sharpsb2b.com?subject=Projet%20WordPress%20—%20Hicham%20Bouajaj"
                className="font-bold text-[13px] tracking-[0.06em] px-5 py-3.5 border-2 text-white transition-colors"
                style={{ background: ACCENT, borderColor: ACCENT }}
              >
                Valider &amp; recevoir le devis →
              </a>
              <a
                href="mailto:hello@sharpsb2b.com"
                className="font-bold text-[13px] border-b-2 pb-0.5"
                style={{ borderColor: ACCENT }}
              >
                hello@sharpsb2b.com
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-t-0 border-foreground bg-card px-6 sm:px-8 py-5">
          <div>
            <b className="font-extrabold">
              Sharps<span style={{ color: ACCENT }}>B2B</span>
            </b>
            <span className="block text-[11px] text-muted-foreground mt-1 tracking-[0.05em]">
              sharpsb2b.com · hello@sharpsb2b.com
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            <span className="h-2 w-2 inline-block animate-blink" style={{ background: ACCENT }} />
            Disponibles pour de nouveaux projets
          </span>
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground text-center leading-relaxed tracking-[0.04em]">
          Proposition estimative valable 30 jours à compter du 27 août 2026. Les montants sont des
          fourchettes indicatives (HT) et ne constituent pas un devis contractuel définitif.
        </p>
      </div>
    </main>
  )
}
