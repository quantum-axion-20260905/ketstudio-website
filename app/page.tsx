"use client";

import Link from "next/link";
import { ArrowLink, Eyebrow, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

export default function HomePage() {
  const { language } = useLanguage();
  const uz = language === "uz";

  return <>
    <section className="hero container">
      <div className="hero-copy">
        <Eyebrow>OPEN-SOURCE DESKTOP TOOLING · 2026</Eyebrow>
        <h1>{uz ? <>Kvant research’ni <span>ko‘rinadigan</span> qiling.</> : <>Make quantum research <span>visible.</span></>}</h1>
        <p className="hero-lede">{uz ? "KET Studio — Python tajribalarini yozish, haqiqiy terminalda ishlatish, vizual dalilga aylantirish va qayta tiklash uchun Windows desktop ish muhiti." : "KET Studio is a Windows desktop workspace for writing Python experiments, running them in a real terminal, turning output into visual evidence and reproducing the run."}</p>
        <div className="hero-actions"><ArrowLink href="/downloads">{uz ? "Windows uchun yuklab olish" : "Download for Windows"}</ArrowLink><ArrowLink href="/docs" secondary>{uz ? "Hujjatlarni o‘qish" : "Read the docs"}</ArrowLink></div>
        <div className="hero-meta"><span><i className="status-dot" />{uz ? "Ochiq manba" : "Open source"}</span><span><i className="status-dot" />Windows 10/11 x64</span><span><i className="status-dot" />MIT</span></div>
      </div>
      <div className="hero-visual" aria-label="KET Studio quantum state visualization"><div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="orbital orbital-three" /><div className="visual-core"><span>ψ</span></div><div className="visual-label label-top">RUN / 01</div><div className="visual-label label-right">VISUAL OUTPUT<br /><strong>READY</strong></div><div className="visual-label label-bottom">LOCAL COMPUTE · NO CLOUD</div><div className="signal-line line-one" /><div className="signal-line line-two" /><div className="signal-line line-three" /></div>
    </section>

    <section className="signal-strip"><div className="container signal-grid"><div><span className="signal-number">01</span><strong>{uz ? "Yozing" : "Write"}</strong><p>{uz ? "Python va tajriba template’lari bilan boshlang." : "Start with Python and experiment templates."}</p></div><div><span className="signal-number">02</span><strong>{uz ? "Ishlating" : "Run"}</strong><p>{uz ? "Haqiqiy terminalda process, input va output’ni boshqaring." : "Control process, input and output in a real terminal."}</p></div><div><span className="signal-number">03</span><strong>{uz ? "Dalillang" : "Prove"}</strong><p>{uz ? "Event-driven vizuallar va session izlari bilan natijani saqlang." : "Keep visual evidence and session traces with event-driven output."}</p></div></div></section>

    <section className="section container"><div className="section-heading-row"><div><SectionLabel>01 / PRODUCT</SectionLabel><h2>{uz ? "Bitta fokus. To‘liq workflow." : "One focused workspace."}</h2></div><Link className="text-link" href="/projects/ket-studio">{uz ? "Mahsulotni ko‘rish" : "View product"} →</Link></div><div className="project-grid single-project"><Link className="project-card violet" href="/projects/ket-studio"><div className="card-top"><span>01</span><span>↗</span></div><div className="card-icon"><span>◈</span></div><div className="card-content"><p className="card-kicker">DESKTOP RESEARCH WORKSPACE</p><h3>KET Studio</h3><p>{uz ? "Python, real terminal, event-driven visualization va reproducible research uchun Windows desktop muhit." : "A Windows desktop environment for Python, a real terminal, event-driven visualization and reproducible research."}</p></div><span className="card-arrow">→</span></Link></div></section>

    <section className="section dark-panel"><div className="container workflow-grid"><div><SectionLabel>02 / WORKFLOW</SectionLabel><h2>{uz ? "G‘oyadan tekshiriladigan dalilga." : "From idea to inspectable evidence."}</h2><p className="muted-copy">{uz ? "KET Studio kodni shunchaki ishga tushirmaydi. Process chiqishi, vizual event’lar, xatolar va session konteksti bir ish oqimida ko‘rinadi." : "KET Studio does more than run code. Process output, visual events, errors and session context remain visible in one workflow."}</p><ArrowLink href="/tutorials" secondary>{uz ? "Tutorialni boshlash" : "Start a tutorial"}</ArrowLink></div><div className="workflow-steps">{[{ n: "01", title: "Build", text: uz ? "Python tajribasi yoki circuit logic yozing." : "Write a Python experiment or circuit logic." }, { n: "02", title: "Run", text: uz ? "Lokal Windows muhitida ishga tushiring." : "Run it locally on Windows." }, { n: "03", title: "Inspect", text: uz ? "Histogram, heatmap, table va metrics oling." : "Get histograms, heatmaps, tables and metrics." }, { n: "04", title: "Archive", text: uz ? "Commit, parametr va natijani birga saqlang." : "Keep commit, parameters and results together." }].map((step) => <div className="workflow-step" key={step.n}><span>{step.n}</span><div><strong>{step.title}</strong><p>{step.text}</p></div><i>↗</i></div>)}</div></div></section>

    <section className="section container grant-callout"><div><SectionLabel>03 / GRANT READY</SectionLabel><h2>{uz ? "Ochiq loyiha. O‘lchanadigan natija." : "Open project. Measurable outcomes."}</h2><p>{uz ? "Grant yo‘nalishi: Windows desktop research workflow’ini reproducibility, provenance, testlar va xavfsiz distribution bilan kuchaytirish." : "Grant focus: strengthen the Windows desktop research workflow with reproducibility, provenance, testing and safe distribution."}</p></div><div className="grant-stat"><span>v1.3.1</span><strong>{uz ? "Windows tayyor" : "Windows ready"}</strong><small>{uz ? "MSIX + EXE fallback" : "MSIX + EXE fallback"}</small></div></section>
  </>;
}
