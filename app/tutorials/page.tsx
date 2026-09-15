"use client";

import Link from "next/link";
import { PageIntro, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

const tutorials = {
  uz: [
    { no: "01", level: "BOSHLANG‘ICH", id: "bell-histogram", title: "Bell natijasini chizish", text: "O‘lchov counts’larini histogram sifatida yuboring va birinchi event-driven vizualni oling.", code: "import ket_viz\ncounts = {'00': 512, '11': 512}\nket_viz.histogram(counts, title='Bell results')" },
    { no: "02", level: "BOSHLANG‘ICH", id: "matrix-heatmap", title: "Zichlik matritsasini ko‘rish", text: "Kichik matritsani heatmap’ga aylantirib, qiymatlar orasidagi farqni tekshiring.", code: "import ket_viz\nmatrix = [[0.8, 0.1], [0.1, 0.0]]\nket_viz.heatmap(matrix, title='Density matrix')" },
    { no: "03", level: "RESEARCH", id: "run-metadata", title: "Run metadata va seed", text: "Backend, shots, qubits va seed’ni metrics event’iga qo‘shib, tajriba izini boyiting.", code: "import ket_viz\nket_viz.metrics({\n  'backend': 'AerSimulator',\n  'qubits': 2, 'shots': 1024, 'seed': 20260914\n})" },
    { no: "04", level: "RESEARCH", id: "table-report", title: "Parameter report jadvali", text: "Tajriba konfiguratsiyasini o‘qilishi oson table event sifatida chiqaring.", code: "import ket_viz\nrows = [['shots', 1024], ['depth', 4], ['seed', 20260914]]\nket_viz.table('Experiment parameters', rows)" },
    { no: "05", level: "ADVANCED", id: "iteration-chart", title: "Iteratsiyani chart’da kuzatish", text: "Optimizer yoki variational loop qiymatlarini chart bilan taqqoslang; UI limitlarini yodda tuting.", code: "import ket_viz\nvalues = [1 / (i + 1) for i in range(8)]\nket_viz.chart(values, title='Loss by iteration')" },
    { no: "06", level: "RESEARCH", id: "reproducible-run", title: "Reproducible run checklist", text: "Script hash, commit, environment va raw result’ni bitta loyiha papkasida saqlashni mashq qiling.", code: "import ket_viz\nket_viz.metrics({\n  'git_commit': '<commit>',\n  'script_sha256': '<sha256>',\n  'environment': 'requirements-lock.txt'\n})" },
  ],
  en: [
    { no: "01", level: "BEGINNER", id: "bell-histogram", title: "Plot Bell results", text: "Send measurement counts as a histogram and create your first event-driven visual.", code: "import ket_viz\ncounts = {'00': 512, '11': 512}\nket_viz.histogram(counts, title='Bell results')" },
    { no: "02", level: "BEGINNER", id: "matrix-heatmap", title: "Inspect a density matrix", text: "Turn a small matrix into a heatmap and inspect the relationship between values.", code: "import ket_viz\nmatrix = [[0.8, 0.1], [0.1, 0.0]]\nket_viz.heatmap(matrix, title='Density matrix')" },
    { no: "03", level: "RESEARCH", id: "run-metadata", title: "Record run metadata", text: "Add backend, shots, qubits and seed to a metrics event so the run has context.", code: "import ket_viz\nket_viz.metrics({\n  'backend': 'AerSimulator',\n  'qubits': 2, 'shots': 1024, 'seed': 20260914\n})" },
    { no: "04", level: "RESEARCH", id: "table-report", title: "Create a parameter report", text: "Print experiment configuration as a readable table event for review and sharing.", code: "import ket_viz\nrows = [['shots', 1024], ['depth', 4], ['seed', 20260914]]\nket_viz.table('Experiment parameters', rows)" },
    { no: "05", level: "ADVANCED", id: "iteration-chart", title: "Track iterations with a chart", text: "Compare optimizer or variational-loop values while respecting the UI data limits.", code: "import ket_viz\nvalues = [1 / (i + 1) for i in range(8)]\nket_viz.chart(values, title='Loss by iteration')" },
    { no: "06", level: "RESEARCH", id: "reproducible-run", title: "Build a reproducible run", text: "Practice keeping the script hash, commit, environment and raw result in one project folder.", code: "import ket_viz\nket_viz.metrics({\n  'git_commit': '<commit>',\n  'script_sha256': '<sha256>',\n  'environment': 'requirements-lock.txt'\n})" },
  ],
} as const;

export default function TutorialsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";
  return <><PageIntro eyebrow="LEARNING PATH · 06 TEMPLATES" title={uz ? <>Kod yozing. <span className="gradient-text">Natijani ko‘ring.</span></> : <>Write code. <span className="gradient-text">See the result.</span></>} description={uz ? "Har bir tutorial KET Studio’da ishga tushadigan kichik template, kutiladigan natija va research amaliyotini beradi." : "Each tutorial provides a small KET Studio template, an expected result and a research practice you can apply immediately."} /><section className="section container tutorial-grid">{tutorials[language].map((item) => <article className="tutorial-card" key={item.id}><div className="tutorial-top"><span>{item.no} · {item.id}</span><span className="tutorial-level">{item.level}</span></div><div className="tutorial-body"><SectionLabel>KET STUDIO TEMPLATE</SectionLabel><h2>{item.title}</h2><p>{item.text}</p><pre><code>{item.code}</code></pre><div className="tutorial-actions"><Link href="/downloads">{uz ? "KET Studio’ni o‘rnatish" : "Install KET Studio"} <span>→</span></Link><Link href="/docs">{uz ? "Event docs" : "Event docs"} <span>↗</span></Link></div></div></article>)}</section><section className="section container limitation-note"><SectionLabel>{uz ? "TEMPLATE QOIDASI" : "TEMPLATE RULE"}</SectionLabel><h2>{uz ? "Avval kichik, keyin katta tajriba." : "Start small, then scale."}</h2><p>{uz ? "Har bir template deterministic yoki aniq metadata bilan boshlanadi. Katta circuit, ko‘p iteratsiya yoki katta matrix yuborishdan oldin docs’dagi renderer limitlarini tekshiring." : "Every template starts deterministic or with explicit metadata. Check the renderer limits in the docs before sending a large circuit, many iterations or a large matrix."}</p></section></>;
}
