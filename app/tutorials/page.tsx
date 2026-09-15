"use client";

import Link from "next/link";
import { PageIntro, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

const tutorials = {
  uz: [
    { no: "01", level: "BOSHLANG‘ICH", title: "Bell holatini tushunish", text: "H va CX gate’lari orqali bir e-bit entanglementni ko‘ring.", tag: "Quantum Circuit", code: "h q[0]\ncx q[0], q[1]" },
    { no: "02", level: "INTERMEDIATE", title: "GHZ va entropy heatmap", text: "Entanglement circuit bo‘ylab qanday tarqalishini step-by-step kuzating.", tag: "Quantum Circuit", code: "h q[0]\ncx q[0], q[1]\ncx q[1], q[2]" },
    { no: "03", level: "RESEARCH", title: "KET Studio’da histogram", text: "Python kodidan KET_VIZ event yuborib, natijani desktop’da chizing.", tag: "KET Studio", code: "import ket_viz\nket_viz.histogram(counts)" },
    { no: "04", level: "RESEARCH", title: "VQE layer’ini tekshirish", text: "Ansatz layer’lari va circuit pressure’ni taqqoslashga tayyor template.", tag: "Both tools", code: "ry(theta) q[0]\ncx q[0], q[1]" },
  ],
  en: [
    { no: "01", level: "BEGINNER", title: "Understand a Bell state", text: "See one e-bit of entanglement through H and CX gates.", tag: "Quantum Circuit", code: "h q[0]\ncx q[0], q[1]" },
    { no: "02", level: "INTERMEDIATE", title: "GHZ and the entropy heatmap", text: "Follow how entanglement spreads through a circuit step by step.", tag: "Quantum Circuit", code: "h q[0]\ncx q[0], q[1]\ncx q[1], q[2]" },
    { no: "03", level: "RESEARCH", title: "Histogram in KET Studio", text: "Send a KET_VIZ event from Python and render it on desktop.", tag: "KET Studio", code: "import ket_viz\nket_viz.histogram(counts)" },
    { no: "04", level: "RESEARCH", title: "Inspect a VQE layer", text: "A ready template for comparing ansatz layers and circuit pressure.", tag: "Both tools", code: "ry(theta) q[0]\ncx q[0], q[1]" },
  ],
} as const;

export default function TutorialsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";
  return <><PageIntro eyebrow="LEARNING PATH · 04 TUTORIAL" title={uz ? <>Kod yozing. <span className="gradient-text">Natijani ko‘ring.</span></> : <>Write code. <span className="gradient-text">See the result.</span></>} description={uz ? "Har bir tutorial tushuncha, runnable template va keyingi qadam bilan tugaydi. Avval browser’da sinang, kerak bo‘lsa desktop’da davom ettiring." : "Every tutorial ends with a concept, a runnable template and a next step. Try it in the browser first, then continue on desktop when needed."} /><section className="section container tutorial-grid">{tutorials[language].map((item) => <article className="tutorial-card" key={item.no}><div className="tutorial-top"><span>{item.no}</span><span className="tutorial-level">{item.level}</span></div><div className="tutorial-body"><SectionLabel>{item.tag}</SectionLabel><h2>{item.title}</h2><p>{item.text}</p><pre><code>{item.code}</code></pre><Link href={item.tag === "KET Studio" ? "/projects/ket-studio" : "/projects/quantum-circuit"}>{uz ? "Template va yo‘riqnoma" : "Template and guide"} <span>→</span></Link></div></article>)}</section></>;
}
