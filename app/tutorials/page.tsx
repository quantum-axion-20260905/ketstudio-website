"use client";

import Link from "next/link";
import { PageIntro, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

const tutorials = {
  uz: [
    { no: "01", level: "BOSHLANG‘ICH", id: "bell-histogram", title: "Bell natijasini chizish", text: "O‘lchov counts’larini histogram sifatida yuboring va birinchi event-driven vizualni oling.", requirements: "Faqat KET Studio Run", result: "Histogram panelida 00 va 11", code: "import ket_viz\ncounts = {'00': 512, '11': 512}\nket_viz.histogram(counts, title='Bell results')" },
    { no: "02", level: "BOSHLANG‘ICH", id: "matrix-heatmap", title: "Zichlik matritsasini ko‘rish", text: "Kichik matritsani heatmap’ga aylantirib, qiymatlar orasidagi farqni tekshiring.", requirements: "Numeric, qatorlari teng matrix", result: "Matrix heatmap preview", code: "import ket_viz\nmatrix = [[0.8, 0.1], [0.1, 0.0]]\nket_viz.heatmap(matrix, title='Density matrix')" },
    { no: "03", level: "RESEARCH", id: "run-metadata", title: "Run metadata va seed", text: "Backend, shots, qubits va seed’ni metrics event’iga qo‘shib, tajriba izini boyiting.", requirements: "JSON-safe metadata", result: "Metrics panelida run konteksti", code: "import ket_viz\nket_viz.metrics({\n  'backend': 'AerSimulator',\n  'qubits': 2, 'shots': 1024, 'seed': 20260914\n})" },
    { no: "04", level: "RESEARCH", id: "table-report", title: "Parameter report jadvali", text: "Tajriba konfiguratsiyasini o‘qilishi oson table event sifatida chiqaring.", requirements: "Ikki o‘lchamli rows", result: "Table panelida qisqa hisobot", code: "import ket_viz\nrows = [['shots', 1024], ['depth', 4], ['seed', 20260914]]\nket_viz.table('Experiment parameters', rows)" },
    { no: "05", level: "ADVANCED", id: "iteration-chart", title: "Iteratsiyani chart’da kuzatish", text: "Optimizer yoki variational loop qiymatlarini chart bilan taqqoslang; UI limitlarini yodda tuting.", requirements: "Numeric series", result: "Chart panelida convergence", code: "import ket_viz\nvalues = [1 / (i + 1) for i in range(8)]\nket_viz.chart(values, title='Loss by iteration')" },
    { no: "06", level: "RESEARCH", id: "reproducible-run", title: "Reproducible run checklist", text: "Script hash, commit, environment va raw result’ni bitta loyiha papkasida saqlashni mashq qiling.", requirements: "Git va metadata yozuvi", result: "Qayta ishlatish uchun run izi", code: "import ket_viz\nket_viz.metrics({\n  'git_commit': '<commit>',\n  'script_sha256': '<sha256>',\n  'environment': 'requirements-lock.txt'\n})" },
    { no: "07", level: "QUANTUM", id: "bell-circuit", title: "Qiskit Bell circuit’ini boshidan oxirigacha ishlatish", text: "Real circuit yarating, AerSimulator’da ishlating, histogram va circuit artifact’ni bir run’da ko‘ring.", requirements: "Core Qiskit setup tayyor", result: "Metrics, histogram va PNG", code: "from qiskit import QuantumCircuit\nfrom qiskit_aer import AerSimulator\nimport ket_viz\n\nqc = QuantumCircuit(2, 2)\nqc.h(0); qc.cx(0, 1)\nqc.measure([0, 1], [0, 1])\nresult = AerSimulator(seed_simulator=7).run(qc, shots=1024).result()\nket_viz.histogram(dict(result.get_counts()), title='Bell counts')\nqc.draw(output='mpl', filename='.ket/out/bell.png')\nket_viz.circuit('.ket/out/bell.png', title='Bell circuit')" },
    { no: "08", level: "ARTIFACT", id: "matplotlib-image", title: "Matplotlib rasmni artifact qilish", text: "Figure’ni `.ket/out`ga yozing va image event orqali Visualization paneliga ulang.", requirements: "Matplotlib o‘rnatilgan", result: "`.ket/out/loss.png` preview", code: "import matplotlib.pyplot as plt\nimport ket_viz\n\nplt.plot([0, 1, 2, 3], [0.8, 0.4, 0.2, 0.1])\nplt.title('Loss')\nplt.savefig('.ket/out/loss.png', bbox_inches='tight')\nket_viz.image('.ket/out/loss.png', title='Loss curve')" },
  ],
  en: [
    { no: "01", level: "BEGINNER", id: "bell-histogram", title: "Plot Bell results", text: "Send measurement counts as a histogram and create your first event-driven visual.", requirements: "KET Studio Run only", result: "00 and 11 in Histogram", code: "import ket_viz\ncounts = {'00': 512, '11': 512}\nket_viz.histogram(counts, title='Bell results')" },
    { no: "02", level: "BEGINNER", id: "matrix-heatmap", title: "Inspect a density matrix", text: "Turn a small matrix into a heatmap and inspect the relationship between values.", requirements: "Rectangular numeric matrix", result: "Matrix heatmap preview", code: "import ket_viz\nmatrix = [[0.8, 0.1], [0.1, 0.0]]\nket_viz.heatmap(matrix, title='Density matrix')" },
    { no: "03", level: "RESEARCH", id: "run-metadata", title: "Record run metadata", text: "Add backend, shots, qubits and seed to a metrics event so the run has context.", requirements: "JSON-safe metadata", result: "Run context in Metrics", code: "import ket_viz\nket_viz.metrics({\n  'backend': 'AerSimulator',\n  'qubits': 2, 'shots': 1024, 'seed': 20260914\n})" },
    { no: "04", level: "RESEARCH", id: "table-report", title: "Create a parameter report", text: "Print experiment configuration as a readable table event for review and sharing.", requirements: "Two-dimensional rows", result: "Compact report in Table", code: "import ket_viz\nrows = [['shots', 1024], ['depth', 4], ['seed', 20260914]]\nket_viz.table('Experiment parameters', rows)" },
    { no: "05", level: "ADVANCED", id: "iteration-chart", title: "Track iterations with a chart", text: "Compare optimizer or variational-loop values while respecting the UI data limits.", requirements: "Numeric series", result: "Convergence in Chart", code: "import ket_viz\nvalues = [1 / (i + 1) for i in range(8)]\nket_viz.chart(values, title='Loss by iteration')" },
    { no: "06", level: "RESEARCH", id: "reproducible-run", title: "Build a reproducible run", text: "Practice keeping the script hash, commit, environment and raw result in one project folder.", requirements: "Git and metadata record", result: "A traceable rerun", code: "import ket_viz\nket_viz.metrics({\n  'git_commit': '<commit>',\n  'script_sha256': '<sha256>',\n  'environment': 'requirements-lock.txt'\n})" },
    { no: "07", level: "QUANTUM", id: "bell-circuit", title: "Run a Qiskit Bell circuit end to end", text: "Create a real circuit, run AerSimulator and review its histogram and circuit artifact in one run.", requirements: "Core Qiskit setup ready", result: "Metrics, histogram and PNG", code: "from qiskit import QuantumCircuit\nfrom qiskit_aer import AerSimulator\nimport ket_viz\n\nqc = QuantumCircuit(2, 2)\nqc.h(0); qc.cx(0, 1)\nqc.measure([0, 1], [0, 1])\nresult = AerSimulator(seed_simulator=7).run(qc, shots=1024).result()\nket_viz.histogram(dict(result.get_counts()), title='Bell counts')\nqc.draw(output='mpl', filename='.ket/out/bell.png')\nket_viz.circuit('.ket/out/bell.png', title='Bell circuit')" },
    { no: "08", level: "ARTIFACT", id: "matplotlib-image", title: "Turn a Matplotlib figure into an artifact", text: "Write a figure to `.ket/out` and connect it to the Visualization panel with an image event.", requirements: "Matplotlib installed", result: "`.ket/out/loss.png` preview", code: "import matplotlib.pyplot as plt\nimport ket_viz\n\nplt.plot([0, 1, 2, 3], [0.8, 0.4, 0.2, 0.1])\nplt.title('Loss')\nplt.savefig('.ket/out/loss.png', bbox_inches='tight')\nket_viz.image('.ket/out/loss.png', title='Loss curve')" },
  ],
} as const;

export default function TutorialsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";
  const items = tutorials[language];

  return <>
    <PageIntro eyebrow="LEARNING PATH · 08 TEMPLATES" title={uz ? <>Kod yozing. <span className="gradient-text">Natijani ko‘ring.</span></> : <>Write code. <span className="gradient-text">See the result.</span></>} description={uz ? "Har bir tutorial KET Studio’da ishga tushadigan template, oldindan kerakli shart, kutiladigan natija va research amaliyotini beradi." : "Each tutorial provides a runnable KET Studio template, prerequisites, an expected result and a research practice you can apply immediately."} />
    <section className="section container tutorial-grid">
      {items.map((item) => <article className="tutorial-card" key={item.id}>
        <div className="tutorial-top"><span>{item.no} · {item.id}</span><span className="tutorial-level">{item.level}</span></div>
        <div className="tutorial-body">
          <SectionLabel>KET STUDIO TEMPLATE</SectionLabel>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
          <div className="tutorial-result"><span><b>{uz ? "Kerak:" : "Before:"}</b>{item.requirements}</span><span><b>{uz ? "Ko‘rasiz:" : "See:"}</b>{item.result}</span></div>
          <pre><code>{item.code}</code></pre>
          <div className="tutorial-actions"><Link href="/downloads">{uz ? "KET Studio’ni o‘rnatish" : "Install KET Studio"} <span>→</span></Link><Link href="/docs">{uz ? "Docs bilan tekshirish" : "Check the docs"} <span>↗</span></Link></div>
        </div>
      </article>)}
    </section>
    <section className="section container limitation-note"><SectionLabel>{uz ? "TEMPLATE QOIDASI" : "TEMPLATE RULE"}</SectionLabel><h2>{uz ? "Avval kichik, keyin katta tajriba." : "Start small, then scale."}</h2><p>{uz ? "Har bir template kichik va tekshiriladigan natijadan boshlanadi. Katta circuit, ko‘p iteratsiya yoki katta matrix yuborishdan oldin docs’dagi renderer limitlarini tekshiring; raw result’ni diskka saqlang." : "Every template starts with a small, inspectable result. Check renderer limits before sending a large circuit, many iterations or a large matrix; keep raw results on disk."}</p></section>
  </>;
}
