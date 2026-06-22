import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const caseStudies = [
  {
    slug: "piramis-group-corporate-platform",
    isPlaceholder: false,
    client: "Piramis Group",
    services: "web,automation,store",
    coverImage: "/work/piramis-cover.png",
    gallery: "/work/piramis-cover.png",
    liveUrl: "https://piramis.previewb2b.com",
    order: 1,
    titleIt: "Piramis Group — piattaforma corporate multi-servizio",
    problemIt:
      "Piramis Group offre un ventaglio di servizi B2B molto ampio — connettività, privacy & cyber security, noleggio operativo, digital & web marketing, kiosko, assistenza — con una Academy interna, un'area carriere e uno shop dedicato. Il sito legacy non riusciva a comunicare l'idea di \"un unico partner per tante possibilità\" e disperdeva le richieste tra business unit diverse.",
    solutionIt:
      "Sito corporate custom con architettura modulare per le sei business unit, narrazione unificata attorno al claim \"Creiamo insieme il futuro della tua azienda\", sezioni dedicate ad Academy, Sostenibilità e Carriere, shop integrato per i prodotti diretti, form di contatto qualificati con routing automatico al servizio competente e CRM, tracking server-side per misurare la performance di ogni linea.",
    resultsIt:
      "Identità digitale coerente per oltre 55.000 aziende clienti · richieste in ingresso pre-qualificate e instradate automaticamente alla business unit giusta · riduzione del tempo medio di risposta sulle richieste commerciali · presenza unificata di brand, prodotti e Academy in un'unica piattaforma.",
    titleEn: "Piramis Group — multi-service corporate platform",
    problemEn:
      "Piramis Group offers a wide range of B2B services — connectivity, privacy & cyber security, operating leasing, digital & web marketing, kiosk, IT support — alongside an in-house Academy, careers area and dedicated shop. Their legacy site failed to communicate the \"one partner, many possibilities\" proposition and scattered inbound enquiries across business units.",
    solutionEn:
      "Custom corporate site with a modular architecture for the six business units, a unified narrative around the \"Let's build the future of your business together\" claim, dedicated Academy, Sustainability and Careers sections, integrated shop for direct products, qualified contact forms with automatic routing to the right service and CRM, and server-side tracking to measure each line's performance.",
    resultsEn:
      "Consistent digital identity for over 55,000 client companies · inbound requests pre-qualified and automatically routed to the right business unit · reduced average response time on commercial enquiries · brand, products and Academy unified on a single platform.",
  },
  {
    slug: "afflelou-eyewear-platform",
    isPlaceholder: false,
    client: "Alain Afflelou",
    services: "web,shopify,ads,automation",
    coverImage: "/work/afflelou-cover.png",
    gallery: "/work/afflelou-cover.png",
    liveUrl: "https://www.afflelou.com/",
    order: 2,
    titleIt: "Alain Afflelou — esperienza e-commerce per ottica e acustica",
    problemIt:
      "Per supportare le due verticali (ottica e acustica) la piattaforma online doveva combinare e-commerce di prodotto, configuratore visivo, prenotazione appuntamenti in negozio e tracking attribuzione tra digital e retail fisico — il tutto su un brand internazionale con esigenze multi-Paese.",
    solutionIt:
      "Storefront Shopify customizzato con sezioni dedicate a ottica e acustica, modulo di prenotazione appuntamenti integrato con il network di store fisici, configuratore visivo per la prova lenti, tracking server-side e Consent Mode v2, automazioni di follow-up post-appuntamento.",
    resultsIt:
      "Prenotazioni online cresciute a tripla cifra anno-su-anno · tempo medio di caricamento storefront sotto i 1,8s · attribuzione corretta del 92% delle vendite cross-channel grazie al tracking server-side · CSAT post-appuntamento sopra il 4.7/5.",
    titleEn: "Alain Afflelou — eyewear and audiology e-commerce experience",
    problemEn:
      "To support both verticals (optical and audiology) the online platform had to combine product e-commerce, a visual try-on configurator, in-store appointment booking, and cross-channel attribution between digital and physical retail — all on an international brand with multi-country requirements.",
    solutionEn:
      "Custom Shopify storefront with dedicated optical and audiology sections, an appointment-booking module integrated with the physical store network, visual lens try-on configurator, server-side tracking and Consent Mode v2, plus post-appointment follow-up automations.",
    resultsEn:
      "Triple-digit YoY growth in online appointments · average storefront load time under 1.8s · 92% of cross-channel sales correctly attributed thanks to server-side tracking · post-appointment CSAT above 4.7/5.",
  },
  {
    slug: "nerogiardini-shopify-migration",
    isPlaceholder: false,
    client: "NeroGiardini",
    services: "shopify,web,ads,store",
    coverImage: "/work/nerogiardini-cover.png",
    gallery: "/work/nerogiardini-cover.png",
    liveUrl: "https://nerogiardini.it/",
    order: 3,
    titleIt: "NeroGiardini — migrazione su Shopify Plus per il brand calzaturiero",
    problemIt:
      "La piattaforma legacy faticava a reggere i picchi di traffico delle nuove collezioni stagionali, il time-to-market per nuove campagne era lento e l'esperienza mobile non rifletteva la qualità del brand. Servivano performance, scalabilità multi-lingua e maggiore autonomia per il team marketing.",
    solutionIt:
      "Migrazione completa a Shopify Plus con tema custom mobile-first, sistema di gestione collezioni stagionali editabile dal team interno, storefront multi-lingua (IT/EN/FR/DE), ottimizzazione Core Web Vitals e setup di automazioni post-vendita integrate con il CRM.",
    resultsIt:
      "Tempo medio di caricamento ridotto del 58% · conversion rate mobile +34% al primo trimestre post-launch · launch di nuove collezioni gestiti internamente in poche ore · traffico organico cresciuto a doppia cifra sui mercati EU principali.",
    titleEn: "NeroGiardini — Shopify Plus migration for the footwear brand",
    problemEn:
      "The legacy platform struggled with seasonal-collection traffic spikes, time-to-market for new campaigns was slow, and the mobile experience didn't match the brand quality. They needed performance, multi-language scalability, and more autonomy for the marketing team.",
    solutionEn:
      "Full migration to Shopify Plus with a mobile-first custom theme, a seasonal-collection management system editable by the internal team, multi-language storefront (IT/EN/FR/DE), Core Web Vitals optimization, and post-purchase automations connected to the CRM.",
    resultsEn:
      "Average load time down 58% · mobile conversion rate up 34% in the first quarter post-launch · new collection launches now handled in-house in hours · double-digit organic traffic growth across key EU markets.",
  },
  {
    slug: "labocityagdal-lab-supplies",
    isPlaceholder: false,
    client: "Labo City Agdal",
    services: "shopify,web,automation,store",
    coverImage: "/work/labocityagdal-cover.png",
    gallery: "/work/labocityagdal-cover.png",
    liveUrl: "https://www.labocityagdal.com/",
    order: 4,
    titleIt: "Labo City Agdal — e-commerce B2B per forniture di laboratorio",
    problemIt:
      "Distributore specializzato di attrezzature scientifiche, prodotti chimici e materiale di consumo per laboratori di ricerca, didattica, medicali e industriali in Marocco. Il catalogo richiedeva una piattaforma capace di gestire migliaia di SKU con dati tecnici, schede di sicurezza, listini differenziati per cliente e un flusso di richiesta preventivi affidabile in francese.",
    solutionIt:
      "Storefront Shopify con catalogo strutturato (categorie, brand, certificazioni), schede prodotto arricchite con datasheet PDF e schede di dati di sicurezza, sistema di richiesta preventivi B2B integrato col CRM, listini personalizzati per clienti istituzionali, e automazione delle conferme d'ordine + tracking spedizione.",
    resultsIt:
      "Catalogo online di oltre 5.000 referenze con dati tecnici completi · richieste di preventivo gestite in meno di 2 ore (vs 1-2 giorni) · onboarding clienti istituzionali ridotto del 70% · presenza organica francofona consolidata sui termini chiave del settore.",
    titleEn: "Labo City Agdal — B2B e-commerce for laboratory supplies",
    problemEn:
      "Specialized distributor of scientific equipment, chemicals and lab consumables serving research, teaching, medical and industrial laboratories in Morocco. The catalog needed a platform capable of handling thousands of SKUs with technical data, safety datasheets, customer-tiered pricing and a reliable quote-request flow in French.",
    solutionEn:
      "Shopify storefront with a structured catalog (categories, brands, certifications), product pages enriched with PDF datasheets and material safety datasheets, a B2B quote-request system wired into the CRM, custom pricing tiers for institutional buyers, and automated order confirmations + shipment tracking.",
    resultsEn:
      "Online catalog of over 5,000 SKUs with full technical data · quote requests handled in under 2 hours (vs 1–2 days) · institutional-customer onboarding time down 70% · solid francophone organic presence on key industry terms.",
  },
  {
    slug: "lucapellicari-personal-brand",
    isPlaceholder: false,
    client: "Luca Pellicari",
    services: "web,automation",
    coverImage: "/work/lucapellicari-cover.png",
    gallery: "/work/lucapellicari-cover.png",
    liveUrl: "https://www.lucapellicari.it",
    order: 5,
    titleIt: "Luca Pellicari — sito personal brand per la Comunicazione Alpha",
    problemIt:
      "Luca Pellicari aveva bisogno di un sito che traducesse la sua identità di formatore — disciplina, coraggio, identità — in una presenza online coerente, capace di posizionarlo come autorità nel proprio metodo di Comunicazione Alpha e di convertire il pubblico in iscritti a corsi e percorsi 1:1.",
    solutionIt:
      "Sito custom mobile-first con narrazione cinematografica (hero video, sezioni \"Le origini\", team, percorsi, blog), copywriting orientato al posizionamento, sistema di lead capture per richieste corsi, integrazione con il CRM per il follow-up automatico e setup SEO tecnico per le keyword di brand e di metodo.",
    resultsIt:
      "Identità digitale allineata al brand offline · tempo medio sulla home oltre 1m20s · crescita a doppia cifra dei contatti qualificati per i percorsi formativi nei primi 3 mesi · posizionamento organico stabile sulle keyword di metodo (\"Comunicazione Alpha\").",
    titleEn: "Luca Pellicari — personal brand website for Comunicazione Alpha",
    problemEn:
      "Luca Pellicari needed a website that translated his identity as a trainer — discipline, courage, identity — into a coherent online presence, capable of positioning him as the authority on his Comunicazione Alpha method and converting visitors into course and 1:1 program enquiries.",
    solutionEn:
      "Custom mobile-first site with cinematic storytelling (hero video, \"Origins\", team, programs, blog sections), positioning-driven copywriting, lead-capture system for course enquiries, CRM integration for automated follow-up, and technical SEO setup for brand and method keywords.",
    resultsEn:
      "Digital identity fully aligned with the offline brand · average time on homepage above 1m20s · double-digit growth in qualified leads for training programs in the first 3 months · stable organic ranking on method keywords (\"Comunicazione Alpha\").",
  },
  {
    slug: "borgo-machetto-luxury-resort",
    isPlaceholder: false,
    client: "Borgo Machetto",
    services: "web,store,automation",
    coverImage: "/work/borgo-machetto-cover.png",
    gallery: "/work/borgo-machetto-cover.png",
    liveUrl: "https://borgo.previewb2b.com",
    order: 6,
    titleIt: "Borgo Machetto — sito e prenotazioni per il resort di lusso",
    problemIt:
      "Borgo Machetto è una struttura ricettiva di lusso che integra B&B, eventi privati, business meeting, team building e parco golf. Serviva un sito capace di raccontare l'atmosfera del luogo (\"dove lusso e natura si incontrano\"), gestire la prenotazione diretta delle camere e canalizzare richieste eventi e wedding senza dispersione tra le varie offerte.",
    solutionIt:
      "Sito multi-sezione (storia, camere, eventi, parco golf, blog, contatti) con direzione fotografica e video coerente, motore di prenotazione diretta integrato, form dedicati per eventi/wedding/team building con routing automatico alle persone giuste, ottimizzazione mobile e tracking server-side per attribuire correttamente le prenotazioni.",
    resultsIt:
      "Prenotazioni dirette in crescita con riduzione della dipendenza dalle OTA · richieste eventi separate per tipologia e gestite in meno di 24h · aumento del tempo medio sulla pagina camere · esperienza mobile coerente con il posizionamento luxury del brand.",
    titleEn: "Borgo Machetto — website and bookings for the luxury resort",
    problemEn:
      "Borgo Machetto is a luxury hospitality venue combining B&B, private events, business meetings, team building and a golf park. They needed a website able to convey the atmosphere of the place (\"where luxury and nature meet\"), handle direct room bookings, and channel events and wedding enquiries without confusion across offerings.",
    solutionEn:
      "Multi-section site (story, rooms, events, golf park, blog, contacts) with consistent photo and video art direction, integrated direct-booking engine, dedicated forms for events/weddings/team building with automated routing to the right people, mobile-first optimisation, and server-side tracking for accurate booking attribution.",
    resultsEn:
      "Direct bookings up with reduced OTA dependency · event enquiries separated by type and handled in under 24h · increased average time on the rooms page · mobile experience aligned with the brand's luxury positioning.",
  },
] as const

const articles = [
  {
    slug: "shopify-vs-woocommerce-2026",
    status: "published",
    category: "ecommerce",
    tags: "shopify,woocommerce,strategia",
    coverImage: "/blog/shopify-vs-woocommerce-2026.png",
    publishedAt: new Date("2026-04-12T10:00:00Z"),
    titleIt: "Shopify o WooCommerce nel 2026? Scegliere senza pentirsi",
    excerptIt:
      "Quando un brand vale Shopify Plus, quando WooCommerce è ancora la scelta giusta e i tre errori che vediamo ripetere ogni mese.",
    bodyIt:
      "<p>Ogni settimana ci capita la stessa conversazione: \"Shopify o WooCommerce?\". La risposta onesta è che dipende da come fai impresa, non da quale piattaforma è più cool quest'anno.</p><p>In questo articolo passiamo in rassegna costi reali, vincoli operativi e tre errori che vediamo ripetere ogni mese dai team marketing.</p><h2>1. La scelta dipende dal tuo modello di business</h2><p>Se vendi in dropshipping a basso margine con catalogo che cambia ogni settimana, Shopify ti fa risparmiare mesi di lavoro. Se hai logica B2B complessa con sconti personalizzati e bundle dinamici, WooCommerce ti dà più libertà.</p><h2>2. Costi nascosti che nessuno ti racconta</h2><p>App, transazioni, sviluppatori — i costi veri non sono mai quelli del piano mensile.</p>",
    titleEn: "Shopify or WooCommerce in 2026? Choosing without regrets",
    excerptEn:
      "When a brand is worth Shopify Plus, when WooCommerce is still the right call, and three mistakes we see teams repeat every month.",
    bodyEn:
      "<p>We have the same conversation every week: \"Shopify or WooCommerce?\" The honest answer is: it depends on how you actually run the business, not on which platform is trendy this year.</p><p>In this article we go through real costs, operational constraints, and three mistakes we see marketing teams repeat every single month.</p><h2>1. The choice depends on your business model</h2><p>If you dropship low-margin products with a weekly-changing catalog, Shopify saves you months of work. If you have complex B2B logic with custom discounts and dynamic bundles, WooCommerce gives you more freedom.</p><h2>2. Hidden costs nobody tells you about</h2><p>Apps, transactions, developers — the real costs are never the ones on the monthly plan.</p>",
    metaTitleIt: "Shopify o WooCommerce 2026: la guida senza fronzoli",
    metaDescIt: "Una guida onesta alla scelta tra Shopify e WooCommerce nel 2026: costi reali, vincoli operativi, errori comuni.",
    metaTitleEn: "Shopify vs WooCommerce 2026: the no-bs guide",
    metaDescEn: "An honest guide to choosing between Shopify and WooCommerce in 2026: real costs, operational constraints, common mistakes.",
  },
  {
    slug: "automazioni-che-fanno-soldi",
    status: "published",
    category: "automation",
    tags: "automation,n8n,workflow",
    coverImage: "/blog/automazioni-che-fanno-soldi.webp",
    publishedAt: new Date("2026-04-22T09:00:00Z"),
    titleIt: "5 automazioni che pagano da sole il loro sviluppo",
    excerptIt:
      "Casi reali di automazioni semplici che hanno restituito 10x in pochi mesi — dal recupero carrelli all'onboarding clienti.",
    bodyIt:
      "<p>Non tutte le automazioni servono. Queste cinque sì, e nei nostri progetti hanno restituito un multiplo del costo entro tre mesi.</p><h2>1. Recupero ordini sospesi</h2><p>Un workflow che incrocia ordini Shopify e pagamenti in pending, manda follow-up automatici e marca i recuperati. Risultato medio: +6% revenue immediato.</p><h2>2. Onboarding clienti B2B</h2><p>Da 'cliente nuovo' a 'cliente attivo con account, listino e contatti referenti' in 4 ore invece di 4 giorni.</p>",
    titleEn: "5 automations that pay for their own development",
    excerptEn:
      "Real cases of simple automations that returned 10x in a few months — from cart recovery to client onboarding.",
    bodyEn:
      "<p>Not every automation is worth building. These five are, and on our projects they have returned a multiple of their cost within three months.</p><h2>1. Suspended-order recovery</h2><p>A workflow that cross-references Shopify orders with pending payments, sends automated follow-ups, and tags the recovered ones. Average outcome: +6% immediate revenue.</p><h2>2. B2B client onboarding</h2><p>From \"new client\" to \"active client with account, pricing, and referent contacts\" in 4 hours instead of 4 days.</p>",
    metaTitleIt: "5 automazioni B2B che si pagano da sole",
    metaDescIt: "Cinque automazioni concrete, testate in produzione, che pagano da sole il loro sviluppo entro tre mesi.",
    metaTitleEn: "5 B2B automations that pay for themselves",
    metaDescEn: "Five concrete automations, tested in production, that pay for their own development within three months.",
  },
  {
    slug: "core-web-vitals-2026",
    status: "published",
    category: "performance",
    tags: "web,performance,seo",
    coverImage: "/blog/core-web-vitals-2026.png",
    publishedAt: new Date("2026-05-05T08:30:00Z"),
    titleIt: "Core Web Vitals nel 2026: quello che davvero conta",
    excerptIt:
      "INP, LCP e CLS sono ancora vivi e vegeti. Cosa è cambiato, quali metriche sottovaluti e i 7 fix che fanno la differenza.",
    bodyIt:
      "<p>Le Core Web Vitals non sono più una novità, ma continuano a essere uno dei fattori che separano siti che convertono da siti che non convertono.</p><p>Questo è il nostro playbook 2026 — quello che applichiamo a ogni progetto in fase di build.</p>",
    titleEn: "Core Web Vitals in 2026: what really matters",
    excerptEn: "INP, LCP and CLS are alive and well. What changed, which metrics you underestimate, and 7 fixes that make a difference.",
    bodyEn:
      "<p>Core Web Vitals aren't news anymore, but they keep separating sites that convert from sites that don't.</p><p>This is our 2026 playbook — what we apply to every project at build time.</p>",
    metaTitleIt: "Core Web Vitals 2026: il playbook completo",
    metaDescIt: "Cosa è cambiato nelle Core Web Vitals nel 2026 e i sette fix che spostano davvero il punteggio.",
    metaTitleEn: "Core Web Vitals 2026: the complete playbook",
    metaDescEn: "What changed in Core Web Vitals for 2026 and the seven fixes that actually move the score.",
  },
  {
    slug: "meta-ads-b2b-2026",
    status: "published",
    category: "ads",
    tags: "meta-ads,b2b,strategia,performance",
    coverImage: "/blog/meta-ads-b2b-2026.webp",
    publishedAt: new Date("2026-05-15T09:00:00Z"),
    titleIt: "Meta Ads per B2B nel 2026: smettere di sprecare budget",
    excerptIt:
      "Targeting che funziona davvero, creatività che genera lead qualificati, e gli errori di setup che vediamo su 9 account B2B su 10.",
    bodyIt:
      "<p>Il riflesso classico quando ti dicono \"B2B su Meta\" è: \"non funziona, i decision-maker non stanno su Instagram\". È falso. Funziona — quando smetti di fare le stesse tre cose che vedo ovunque.</p><h2>1. Il targeting per ruoli non funziona più</h2><p>Meta ha smontato gran parte degli interest detail nel 2024 e 2025. Il targeting per titoli professionali oggi rende meno della tua audience broad + algoritmo + creatività ben scritta. Lascia che sia l'algoritmo a scovare il segmento — tu dagli dei segnali puliti.</p><h2>2. Il vero lavoro è il signal</h2><p>Senza conversion API server-side e CAPI bene tracciato, stai illuminando il modello con candele. Investi i primi 30 giorni a sistemare il tracking, prima di mettere budget significativo.</p><h2>3. Creatività: pensa B2C, parla B2B</h2><p>Il decision-maker B2B è una persona — scrolla la sera, ride dei reel, è stanco. La creatività che funziona nel 2026: video brevi (15s), un beneficio chiaro, una proof point numerica, una CTA non commerciale (\"guarda la demo\", \"scarica il report\").</p><h2>4. Funnel a due step, non a uno</h2><p>Lead generation diretta = lead spazzatura. Funnel a due step (lead magnet / contenuto → retargeting sul demo / call) = lead qualificati. Costa più tempo da settare, paga meno per MQL.</p><h2>5. Misurazione: incrementality, non last-click</h2><p>Last-click su B2B sottostima Meta del 40-60%. Usa geo holdout test, conversion lift o brand lift studies almeno una volta al trimestre. Decidi su quello, non su un dashboard di GA.</p><p>Nei nostri account B2B gestiti, l'applicazione di questi cinque punti ha portato in media a -38% CAC nei primi 90 giorni. Non è magia — è basics fatti bene.</p>",
    titleEn: "Meta Ads for B2B in 2026: stop wasting budget",
    excerptEn:
      "Targeting that actually works, creative that drives qualified leads, and the setup mistakes we see on 9 out of 10 B2B accounts.",
    bodyEn:
      "<p>The classic reflex when someone says \"B2B on Meta\" is: \"it doesn't work, decision-makers aren't on Instagram\". Wrong. It works — when you stop doing the same three things I see everywhere.</p><h2>1. Role-based targeting is dead</h2><p>Meta dismantled most interest details across 2024 and 2025. Targeting by job titles now performs worse than a broad audience + algorithm + well-written creative. Let the algorithm find the segment — feed it clean signal instead.</p><h2>2. Signal is the real work</h2><p>Without server-side Conversion API and properly mapped CAPI events, you're lighting the model with candles. Spend the first 30 days fixing tracking before scaling budget.</p><h2>3. Creative: think B2C, speak B2B</h2><p>The B2B decision-maker is a human — scrolls at night, laughs at reels, is tired. Creative that works in 2026: short video (15s), one clear benefit, one numeric proof point, a non-salesy CTA (\"watch the demo\", \"download the report\").</p><h2>4. Two-step funnel, not one</h2><p>Direct lead-gen = junk leads. Two-step funnel (lead magnet / content → retargeting to demo / call) = qualified leads. Costs more time to set up, pays less per MQL.</p><h2>5. Measurement: incrementality, not last-click</h2><p>Last-click on B2B undersells Meta by 40–60%. Run geo holdout tests, conversion lift, or brand lift studies at least once a quarter. Decide on that, not on a GA dashboard.</p><p>On the B2B accounts we manage, applying these five points has driven an average −38% CAC in the first 90 days. Not magic — just basics, done right.</p>",
    metaTitleIt: "Meta Ads B2B 2026: la guida pratica anti-spreco",
    metaDescIt: "Targeting, creatività e setup che funzionano davvero nelle campagne Meta Ads B2B nel 2026. Cinque mosse, esempi reali.",
    metaTitleEn: "Meta Ads for B2B 2026: a no-waste playbook",
    metaDescEn: "Targeting, creative and setup that actually work for Meta Ads B2B campaigns in 2026. Five moves, real examples.",
  },
  {
    slug: "app-vs-pwa-2026",
    status: "published",
    category: "mobile",
    tags: "mobile,pwa,react-native,strategia",
    coverImage: "/blog/app-vs-pwa-2026.png",
    publishedAt: new Date("2026-05-22T08:00:00Z"),
    titleIt: "App nativa o PWA? La decisione in 6 domande",
    excerptIt:
      "Quando vale spendere 80.000 € per un'app nativa, quando una PWA basta, e i tre criteri che spesso vengono ignorati nella valutazione.",
    bodyIt:
      "<p>Ogni mese ci arriva la stessa richiesta: \"vogliamo un'app\". Metà delle volte la risposta giusta è \"non vi serve\". Le altre volte serve davvero, ma non come pensavano. Ecco la nostra checklist in sei domande.</p><h2>1. L'app è il prodotto, o è un canale?</h2><p>Se è il prodotto (es. fintech, fitness, social) → nativa, no debate. Se è un canale aggiuntivo (es. catalogo, prenotazioni, fidelity card) → considera seriamente una PWA o un'app sottile sopra il sito.</p><h2>2. Avete bisogno di funzioni native che la PWA non copre?</h2><p>Nel 2026 la PWA fa quasi tutto: push, offline, camera, geolocalizzazione, file system. Ma NON fa bene: Bluetooth LE complesso, NFC scrittura, integrazioni profonde con CarPlay o widget homescreen iOS. Lì la nativa vince.</p><h2>3. Quanto vale stare nello store?</h2><p>App Store e Play Store sono canali di distribuzione + un canale di trust. Se i tuoi utenti cercano il tuo brand nello store, vuoi esserci. Una PWA non risolve quello (ancora).</p><h2>4. Frequenza d'uso reale?</h2><p>Se le tue persone usano il servizio meno di una volta al mese, l'app probabilmente verrà disinstallata. PWA o web ottimizzato mobile rendono di più.</p><h2>5. Budget di manutenzione, non solo di build</h2><p>Un'app nativa costa 60-120k€ per essere costruita bene. E poi costa 20-40% del build all'anno per aggiornamenti, compatibilità nuove versioni iOS/Android, security patches. La PWA: una codebase, costo di mantenimento vicino allo zero.</p><h2>6. Performance reali sul tuo target</h2><p>Le PWA sono velocissime su iPhone moderni e Android di fascia alta. Diventano lente su device più vecchi e su connessioni 3G/4G instabili. Se il tuo target ha device vecchi → nativa.</p><p>La nostra euristica: 80% delle volte una PWA o un'app cross-platform (React Native) è la scelta giusta. 20% delle volte serve nativo. Mai partire dalla tecnologia: parti dal problema.</p>",
    titleEn: "Native app or PWA? The decision in 6 questions",
    excerptEn:
      "When €80k for a native app is worth it, when a PWA is enough, and the three criteria most people skip in the evaluation.",
    bodyEn:
      "<p>Every month we get the same brief: \"we want an app\". Half the time, the right answer is \"you don't need one\". The other half, you do — but not the way you thought. Here's our six-question checklist.</p><h2>1. Is the app the product, or a channel?</h2><p>If it IS the product (fintech, fitness, social) → native, no debate. If it's an additional channel (catalog, bookings, loyalty card) → seriously consider a PWA or a thin app on top of the website.</p><h2>2. Do you need native features PWAs can't reach?</h2><p>In 2026 a PWA covers nearly everything: push, offline, camera, geo, file system. It still doesn't cover well: complex Bluetooth LE, NFC writing, deep CarPlay or iOS home-screen widgets. There native wins.</p><h2>3. How much do you value being in the stores?</h2><p>App Store and Play Store are distribution + trust signals. If your users search your brand inside the store, you want to be there. A PWA doesn't solve that (yet).</p><h2>4. Real usage frequency?</h2><p>If your people use the service less than once a month, the app will likely get uninstalled. A PWA or a well-optimized mobile web pays back better.</p><h2>5. Maintenance budget, not just build budget</h2><p>A native app costs €60–120k to build well. Then it costs 20–40% of that every year — updates, new iOS/Android compatibility, security patches. PWA: one codebase, near-zero maintenance.</p><h2>6. Real-world performance on your audience</h2><p>PWAs fly on modern iPhones and high-end Android. They get slow on older devices and unstable 3G/4G. If your audience runs older hardware → go native.</p><p>Our rule of thumb: 80% of the time a PWA or cross-platform app (React Native) is the right call. 20% of the time you need native. Never start from the tech: start from the problem.</p>",
    metaTitleIt: "App nativa o PWA: la decisione spiegata in 6 domande",
    metaDescIt: "Sei domande chiare per scegliere tra app nativa e PWA nel 2026. Budget, store, performance, manutenzione — con esempi reali.",
    metaTitleEn: "Native app vs PWA: a 6-question decision framework",
    metaDescEn: "Six clear questions to choose between a native app and a PWA in 2026. Budget, stores, performance, maintenance — with real examples.",
  },
  {
    slug: "headless-commerce-stack",
    status: "published",
    category: "ecommerce",
    tags: "shopify,hydrogen,headless,e-commerce",
    coverImage: "/blog/headless-commerce-stack.png",
    publishedAt: new Date("2026-05-28T11:00:00Z"),
    titleIt: "Lo stack che usiamo per ogni e-commerce headless nel 2026",
    excerptIt:
      "Hydrogen + Next.js + Shopify Plus + Vercel + Sanity. Perché abbiamo abbandonato i monoliti, e quali compromessi accettare.",
    bodyIt:
      "<p>Negli ultimi 18 mesi abbiamo costruito una decina di e-commerce headless. Lo stack che usiamo di default è quasi sempre lo stesso. Qui sotto il \"perché\" di ogni pezzo, e il prezzo che paghi per arrivarci.</p><h2>Lo stack di default</h2><ul><li><strong>Shopify Plus</strong> per il commerce engine (catalogo, ordini, checkout, fiscalità).</li><li><strong>Hydrogen + Next.js / Remix</strong> per lo storefront (rendering, performance, UX).</li><li><strong>Sanity</strong> o <strong>Storyblok</strong> per il CMS editoriale.</li><li><strong>Vercel</strong> per hosting + edge runtime.</li><li><strong>Klaviyo</strong> per email & SMS, agganciato via webhook a Shopify.</li><li><strong>Stripe Tax</strong> dove Shopify Tax non basta.</li></ul><h2>Perché lasciamo Shopify a Shopify</h2><p>Sembra ovvio ma non lo è: il valore di Shopify Plus è il <em>checkout</em> e tutto ciò che ci sta dietro (fraud, PCI, fiscalità, ordini, abbonamenti). Costruire il checkout da zero ti porta via 6 mesi e ti compra problemi per anni. Headless significa: rendiamo il front-end nostro, lasciamo il back-end a Shopify.</p><h2>Perché Hydrogen e non solo Next.js</h2><p>Hydrogen ha caching primitives e Storefront API helpers che ti risparmiano settimane. Su Next.js puro li dovremmo riscrivere. Su progetti molto custom o non-Shopify → Next puro. Per Shopify → Hydrogen, sempre.</p><h2>Il compromesso che la gente non racconta</h2><p>Headless non è gratis. Paghi: complessità (più sistemi da orchestrare), velocità di iterazione (cambiare il tema Shopify è 1 click, cambiare uno storefront custom è una PR), e costo di manutenzione. Vale solo se il tuo brand vende un valore di prodotto / esperienza che il tema standard non riesce a esprimere.</p><h2>Quando NON andare headless</h2><p>Sotto i 2M€ di GMV, in 9 casi su 10 un tema Shopify ben fatto rende di più. Headless è un investimento che si ripaga su volume e su brand premium. Sotto quella soglia, è quasi sempre una distrazione.</p>",
    titleEn: "The stack we use for every headless e-commerce in 2026",
    excerptEn:
      "Hydrogen + Next.js + Shopify Plus + Vercel + Sanity. Why we left monoliths behind, and the trade-offs to accept.",
    bodyEn:
      "<p>In the last 18 months we've built about ten headless e-commerce sites. Our default stack is almost always the same. Below — the \"why\" behind each piece, and the price you pay to get there.</p><h2>The default stack</h2><ul><li><strong>Shopify Plus</strong> for the commerce engine (catalog, orders, checkout, tax).</li><li><strong>Hydrogen + Next.js / Remix</strong> for the storefront (rendering, performance, UX).</li><li><strong>Sanity</strong> or <strong>Storyblok</strong> for editorial CMS.</li><li><strong>Vercel</strong> for hosting + edge runtime.</li><li><strong>Klaviyo</strong> for email & SMS, hooked via webhook into Shopify.</li><li><strong>Stripe Tax</strong> where Shopify Tax falls short.</li></ul><h2>Why we leave Shopify to Shopify</h2><p>Sounds obvious, isn't: the value of Shopify Plus is the <em>checkout</em> and everything behind it (fraud, PCI, tax, orders, subscriptions). Building checkout from scratch eats 6 months and buys problems for years. Headless means: front-end is ours, back-end stays Shopify's.</p><h2>Why Hydrogen and not just Next.js</h2><p>Hydrogen ships caching primitives and Storefront API helpers that save you weeks. On vanilla Next.js you'd rewrite them. On very custom or non-Shopify projects → vanilla Next. On Shopify → Hydrogen, always.</p><h2>The trade-off nobody tells you</h2><p>Headless isn't free. You pay: complexity (more systems to orchestrate), iteration speed (changing a Shopify theme = 1 click, changing a custom storefront = a PR), and maintenance cost. Worth it only when your brand sells product or experience value that the standard theme can't express.</p><h2>When NOT to go headless</h2><p>Under €2M GMV, in 9 out of 10 cases a well-built Shopify theme will outperform. Headless is an investment that pays back on volume and premium-brand positioning. Below that threshold, it's almost always a distraction.</p>",
    metaTitleIt: "Lo stack headless e-commerce che usiamo nel 2026",
    metaDescIt: "Hydrogen, Next.js, Shopify Plus, Vercel, Sanity: lo stack headless di default e i compromessi che nessuno racconta.",
    metaTitleEn: "The headless e-commerce stack we ship in 2026",
    metaDescEn: "Hydrogen, Next.js, Shopify Plus, Vercel, Sanity: the default headless stack and the trade-offs nobody talks about.",
  },
] as const

async function main() {
  console.log("Seeding case studies…")
  const caseStudySlugs = caseStudies.map((c) => c.slug)
  // Case studies are owned exclusively by this seed file — drop rows that are
  // no longer listed here. Articles are managed via the dashboard, so we never
  // delete those.
  const removedCases = await prisma.caseStudy.deleteMany({
    where: { slug: { notIn: caseStudySlugs } },
  })
  if (removedCases.count > 0) console.log(`  removed ${removedCases.count} stale case studies`)
  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    })
  }

  console.log("Seeding articles…")
  for (const a of articles) {
    // On update, do NOT overwrite the cover image — the cover-generation
    // script writes the canonical path after each article is initially seeded,
    // and re-running this script must preserve it.
    const { coverImage: _initialCover, ...articleUpdate } = a
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: articleUpdate,
      create: a,
    })
  }

  console.log("Done.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
