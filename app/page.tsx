"use client";

import Link from "next/link";
import { ArrowLink, Eyebrow, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

const projects = {
  uz: [
    { number: "01", name: "KET Studio", type: "DESKTOP RESEARCH WORKSPACE", description: "Python tajribalari, haqiqiy terminal, event-driven vizualizatsiya va reproducible research uchun professional desktop muhit.", href: "/projects/ket-studio", accent: "violet" },
    { number: "02", name: "Quantum Circuit", type: "BROWSER DIAGNOSTICS", description: "O‘rnatishsiz ishlaydigan, circuit ichida entanglement qayerda o‘sishini ko‘rsatadigan privacy-first web vosita.", href: "/projects/quantum-circuit", accent: "cyan" },
  ],
  en: [
    { number: "01", name: "KET Studio", type: "DESKTOP RESEARCH WORKSPACE", description: "A professional desktop environment for Python experiments, a real terminal, event-driven visualization and reproducible research.", href: "/projects/ket-studio", accent: "violet" },
    { number: "02", name: "Quantum Circuit", type: "BROWSER DIAGNOSTICS", description: "A privacy-first web tool that shows where entanglement grows inside a circuit — with no installation required.", href: "/projects/quantum-circuit", accent: "cyan" },
  ],
} as const;

export default function HomePage() {
  const { language } = useLanguage();
  const uz = language === "uz";
  const projectList = projects[language];

  return <>
    <section className="hero container">
      <div className="hero-copy">
        <Eyebrow>OPEN QUANTUM TOOLING · 2026</Eyebrow>
        <h1>{uz ? <>Kvant tadqiqotlarini <span>ko‘rinadigan</span> qilamiz.</> : <>Making quantum research <span>visible.</span></>}</h1>
        <p className="hero-lede">{uz ? "Quantum Axion — circuitlarni tushunish, tajribalarni takrorlash va ilmiy g‘oyalarni ochiq ulashish uchun yaratilayotgan open-source vositalar ekotizimi." : "Quantum Axion is an open-source ecosystem for understanding circuits, reproducing experiments and sharing quantum ideas openly."}</p>
        <div className="hero-actions"><ArrowLink href="/projects">{uz ? "Loyihalarni ko‘rish" : "Explore projects"}</ArrowLink><ArrowLink href="/docs" secondary>{uz ? "Qanday ishlaydi?" : "How it works"}</ArrowLink></div>
        <div className="hero-meta"><span><i className="status-dot" />{uz ? "Ochiq manba" : "Open source"}</span><span><i className="status-dot" />Local-first</span><span><i className="status-dot" />MIT</span></div>
      </div>
      <div className="hero-visual" aria-label="Quantum state visualization"><div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="orbital orbital-three" /><div className="visual-core"><span>ψ</span></div><div className="visual-label label-top">STATE / 01</div><div className="visual-label label-right">ENTANGLEMENT<br /><strong>0.82</strong></div><div className="visual-label label-bottom">LOCAL COMPUTE · NO CLOUD</div><div className="signal-line line-one" /><div className="signal-line line-two" /><div className="signal-line line-three" /></div>
    </section>

    <section className="signal-strip"><div className="container signal-grid"><div><span className="signal-number">01</span><strong>{uz ? "Ko‘rish" : "See"}</strong><p>{uz ? "Circuit va holatni intuitiv grafiklarda ko‘ring." : "Read circuits and states through intuitive visuals."}</p></div><div><span className="signal-number">02</span><strong>{uz ? "Tekshirish" : "Inspect"}</strong><p>{uz ? "Xatolar, entropy va execution izlarini bir joyda tahlil qiling." : "Inspect errors, entropy and execution traces in one place."}</p></div><div><span className="signal-number">03</span><strong>{uz ? "Ulashish" : "Share"}</strong><p>{uz ? "Natijani ochiq, tushunarli va takrorlanadigan formatda yuboring." : "Share results in an open, understandable and reproducible format."}</p></div></div></section>

    <section className="section container"><div className="section-heading-row"><div><SectionLabel>01 / {uz ? "LOYIHALAR" : "PROJECTS"}</SectionLabel><h2>{uz ? "Ikki vosita. Bitta maqsad." : "Two tools. One purpose."}</h2></div><Link className="text-link" href="/projects">{uz ? "Barchasini ko‘rish" : "View all"} →</Link></div><div className="project-grid">{projectList.map((project) => <Link className={`project-card ${project.accent}`} key={project.name} href={project.href}><div className="card-top"><span>{project.number}</span><span>↗</span></div><div className="card-icon"><span>{project.accent === "violet" ? "◈" : "⌁"}</span></div><div className="card-content"><p className="card-kicker">{project.type}</p><h3>{project.name}</h3><p>{project.description}</p></div><span className="card-arrow">→</span></Link>)}</div></section>

    <section className="section dark-panel"><div className="container workflow-grid"><div><SectionLabel>02 / {uz ? "ISHLASH TAMOYILI" : "WORKFLOW"}</SectionLabel><h2>{uz ? "G‘oyadan dalilga." : "From idea to evidence."}</h2><p className="muted-copy">{uz ? "Bizning vositalar kodni shunchaki ishga tushirmaydi. U tajriba qanday ishlaganini, qayerda murakkablashganini va natijani boshqa odam qanday takrorlashini ko‘rsatadi." : "Our tools do more than run code. They show how an experiment worked, where it became complex and how someone else can reproduce the result."}</p><ArrowLink href="/docs" secondary>{uz ? "Arxitekturani o‘rganish" : "Explore the architecture"}</ArrowLink></div><div className="workflow-steps">{[{ n: "01", title: "Build", text: uz ? "Circuit yoki Python tajribasini yarating." : "Create a circuit or Python experiment." }, { n: "02", title: "Run", text: uz ? "Lokal muhitda ishga tushiring." : "Run it in a local environment." }, { n: "03", title: "Inspect", text: uz ? "Vizual natija va diagnostikani oling." : "Get visual results and diagnostics." }, { n: "04", title: "Share", text: uz ? "Reproducible report bilan ulashing." : "Share it with a reproducible report." }].map((step) => <div className="workflow-step" key={step.n}><span>{step.n}</span><div><strong>{step.title}</strong><p>{step.text}</p></div><i>↗</i></div>)}</div></div></section>

    <section className="section container grant-callout"><div><SectionLabel>03 / GRANT READY</SectionLabel><h2>{uz ? "Ochiq loyiha. O‘lchanadigan natija." : "Open project. Measurable outcome."}</h2><p>{uz ? "Har bir loyiha alohida grant tezisi bilan rivojlanadi: Quantum Circuit — accessibility va diagnostics; KET Studio — professional research workflow va reproducibility." : "Each project has a distinct grant thesis: Quantum Circuit for accessibility and diagnostics; KET Studio for professional research workflow and reproducibility."}</p></div><div className="grant-stat"><span>2026</span><strong>{uz ? "2 loyiha" : "2 projects"}</strong><small>{uz ? "alohida, o‘zaro mos" : "distinct, interoperable"}</small></div></section>
  </>;
}
