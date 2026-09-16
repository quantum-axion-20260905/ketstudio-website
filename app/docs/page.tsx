"use client";

import Link from "next/link";
import { PageIntro, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

const examples = [
  {
    id: "histogram",
    titleUz: "Histogram: o‘lchov taqsimoti",
    titleEn: "Histogram: measurement counts",
    descriptionUz: "Bitstring, probability yoki klassifikatsiya natijalarini bucket’lar orqali ko‘rsating.",
    descriptionEn: "Show bitstrings, probabilities or classification results as buckets.",
    code: "import ket_viz\n\ncounts = {'00': 510, '01': 2, '10': 4, '11': 508}\nket_viz.histogram(counts, title='Measurement distribution')",
  },
  {
    id: "heatmap",
    titleUz: "Heatmap: matrix yoki landscape",
    titleEn: "Heatmap: matrix or landscape",
    descriptionUz: "Korrelyatsiya, cost landscape yoki zichlik matritsasi uchun qatorlari teng bo‘lgan sonli matrix yuboring.",
    descriptionEn: "Send a rectangular numeric matrix for correlations, cost landscapes or density-style views.",
    code: "import ket_viz\n\nmatrix = [[1.0, 0.2, 0.0],\n          [0.2, 0.8, 0.1],\n          [0.0, 0.1, 0.4]]\nket_viz.heatmap(matrix, title='Qubit correlation')",
  },
  {
    id: "chart",
    titleUz: "Chart: convergence yoki vaqt qatori",
    titleEn: "Chart: convergence or time series",
    descriptionUz: "Energiya, loss, fidelity yoki boshqa numeric series’ni vaqt bo‘yicha chizing.",
    descriptionEn: "Plot energy, loss, fidelity or another numeric series over time.",
    code: "import ket_viz\n\nenergies = [0.50, 0.31, 0.18, 0.09, 0.04]\nket_viz.chart(energies, title='VQE convergence')",
  },
  {
    id: "table",
    titleUz: "Table: parametr va qisqa report",
    titleEn: "Table: parameters and summary",
    descriptionUz: "Ikki xil signature mavjud: `table(rows)` yoki `table(title, rows)`.",
    descriptionEn: "Two signatures are supported: `table(rows)` or `table(title, rows)`.",
    code: "import ket_viz\n\nrows = [['Metric', 'Value'],\n        ['Qubits', 4],\n        ['Shots', 1024],\n        ['Fidelity', 0.998]]\nket_viz.table('Experiment summary', rows)",
  },
  {
    id: "statevector",
    titleUz: "Statevector: amplitude va phase",
    titleEn: "Statevector: amplitude and phase",
    descriptionUz: "Har bir holat uchun `label`, `mag` va radians’dagi `phase` yuboring.",
    descriptionEn: "Send a `label`, magnitude `mag` and phase in radians for each state.",
    code: "import ket_viz\n\namplitudes = [\n  {'label': '00', 'mag': 0.707, 'phase': 0.0},\n  {'label': '11', 'mag': 0.707, 'phase': 3.14159},\n]\nket_viz.statevector(amplitudes, title='Bell amplitudes')",
  },
  {
    id: "inspector",
    titleUz: "Inspector va Bloch: qadamlar",
    titleEn: "Inspector and Bloch: algorithm steps",
    descriptionUz: "Gate, state description va Bloch koordinatalari bilan muhim qadamlarni hujjatlashtiring.",
    descriptionEn: "Document important steps with a gate, state description and optional Bloch coordinates.",
    code: "import ket_viz\n\nframes = [\n  {'gate': 'H(0)', 'state_description': 'Superposition',\n   'bloch': [{'theta': 1.57, 'phi': 0.0}]},\n]\nket_viz.inspector('Algorithm steps', frames)\nket_viz.bloch({'theta': 1.57, 'phi': 0.0})",
  },
  {
    id: "metrics",
    titleUz: "Metrics: live progress va provenance",
    titleEn: "Metrics: live progress and provenance",
    descriptionUz: "Status, seed, backend, parametrlar va iteration’ni arbitrary JSON object sifatida yuboring.",
    descriptionEn: "Send status, seed, backend, parameters and iteration as an arbitrary JSON object.",
    code: "import ket_viz\n\nket_viz.metrics({\n  'status': 'optimizing',\n  'step': 12, 'energy': -1.1372,\n  'seed': 20260914, 'backend': 'AerSimulator'\n})",
  },
  {
    id: "text",
    titleUz: "Text: izoh va status",
    titleEn: "Text: notes and status",
    descriptionUz: "Odam o‘qiydigan qisqa xabarni alohida text event sifatida chiqaring; exception uchun oddiy Python error’ni ham Terminal’da qoldiring.",
    descriptionEn: "Send a human-readable note as a text event; keep Python exceptions visible in the Terminal for diagnosis.",
    code: "import ket_viz\n\nket_viz.text('Simulation started')\n# Real exception bo‘lsa uni yashirmang:\n# raise RuntimeError('backend failed')",
  },
  {
    id: "estimator",
    titleUz: "Estimator: ish boshlashdan oldingi baho",
    titleEn: "Estimator: pre-run resource estimate",
    descriptionUz: "Qubit, depth, gate count va gate_counts orqali tajriba hajmini oldindan tushuntiring.",
    descriptionEn: "Explain experiment size before execution with qubits, depth, gate count and gate_counts.",
    code: "import ket_viz\n\nket_viz.estimator({\n  'qubits': 8, 'depth': 42,\n  'total_gates': 180,\n  'gate_counts': {'H': 8, 'CX': 64, 'RZ': 108}\n})",
  },
];

const limits = [
  ["Bitta event", "8 MiB", "Ignore + warning"],
  ["Pending queue", "100 event", "Oldest events dropped"],
  ["Session / history", "50 / 50", "Bounded memory"],
  ["Matrix", "128 × 128", "Limit notice"],
  ["Histogram", "64 bucket", "Extra values → other"],
  ["Chart", "2,000 points", "First points shown"],
  ["Table", "100 × 32", "Limit notice"],
  ["Statevector", "64 amplitudes", "First amplitudes shown"],
  ["Inspector / Bloch", "100 items", "Extra items bounded"],
] as const;

const faq = [
  {
    questionUz: "`ket_viz` alohida o‘rnatiladimi?",
    questionEn: "Do I install `ket_viz` separately?",
    answerUz: "Yo‘q. KET Studio Run action vaqtida bu modulni launcher orqali vaqtincha process ichiga beradi. Kodni oddiy terminalda `python experiment.py` qilib ishga tushirsangiz, `ket_viz` topilmasligi tabiiy; vizual event uchun Run/F5’dan foydalaning yoki raw protocol yuboring.",
    answerEn: "No. The KET Studio Run action injects this module into the process through its launcher. If you run `python experiment.py` in a normal terminal, `ket_viz` may not exist; use Run/F5 for visuals or emit the raw protocol.",
  },
  {
    questionUz: "Qiskit, NumPy va Matplotlib bormi?",
    questionEn: "Are Qiskit, NumPy and Matplotlib included?",
    answerUz: "Birinchi desktop setup izolyatsiyalangan `ket_venv` yaratadi va core paketlar — `qiskit[visualization]`, `qiskit-aer`, `numpy` — ni o‘rnatishga urinadi. `matplotlib`, `pandas`, `scipy` va IBM runtime kabi optional paketlar avtomatik o‘rnatilmaydi; kerak bo‘lsa Settings → Environment orqali qo‘shing.",
    answerEn: "The first desktop setup creates an isolated `ket_venv` and attempts to install the core packages `qiskit[visualization]`, `qiskit-aer` and `numpy`. Optional packages such as `matplotlib`, `pandas`, `scipy` and IBM runtime are not installed automatically; add them from Settings → Environment when needed.",
  },
  {
    questionUz: "Katta circuit’larni nechagacha ko‘rsatadi?",
    questionEn: "How large can a circuit be?",
    answerUz: "KET Studio circuit obyektini parse qilmaydi — u render qilingan PNG/SVG artifact’ni ko‘rsatadi. Shuning uchun qat’iy qubit limiti yo‘q, ammo o‘qilishi uchun taxminan 20 qubit va 100 depth ichida saqlash tavsiya etiladi. Katta circuit’ni bo‘lib chizing yoki faqat muhim qadamlarini yuboring.",
    answerEn: "KET Studio does not parse circuit objects; it displays a rendered PNG/SVG artifact. There is no fixed qubit limit for the image, but roughly 20 qubits and depth 100 is a readability recommendation. Split a large circuit or render only important steps.",
  },
  {
    questionUz: "Bu production research backend’mi?",
    questionEn: "Is this a production research backend?",
    answerUz: "Yo‘q. KET Studio lokal execution, terminal, visualization va provenance workflow’idir. U quantum backend aniqligini mustaqil tasdiqlamaydi, credential vault, remote job queue yoki hardware calibration’ni native boshqarmaydi. Ilmiy xulosani raw data va mustaqil baseline bilan tekshiring.",
    answerEn: "No. KET Studio is a local execution, terminal, visualization and provenance workflow. It does not independently validate backend correctness or natively manage credential vaults, remote job queues or hardware calibration. Validate scientific claims with raw data and an independent baseline.",
  },
] as const;

const resources = [
  ["Getting Started", "https://github.com/quantum-axion-20260905/KET-Studio/blob/main/docs/getting-started.md", "O‘rnatishdan birinchi reproducible run’gacha"],
  ["Visualization Guide", "https://github.com/quantum-axion-20260905/KET-Studio/blob/main/docs/visualization-guide.md", "Har bir API va payload maydoni"],
  ["Event Schema", "https://github.com/quantum-axion-20260905/KET-Studio/blob/main/docs/event_schema.md", "Raw `KET_VIZ` protokolining formal shakli"],
  ["Windows Distribution", "https://github.com/quantum-axion-20260905/KET-Studio/blob/main/docs/windows-installer.md", "MSIX, EXE, checksum va release QA"],
] as const;

export default function DocsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";

  return <>
    <PageIntro
      eyebrow="DOCUMENTATION · COMPLETE USER GUIDE"
      title={uz ? <>KET Studio’ni <span className="gradient-text">noldan o‘rganing.</span></> : <>Learn KET Studio from <span className="gradient-text">first run to evidence.</span></>}
      description={uz ? "O‘rnatish, Python muhitini sozlash, birinchi circuit run’i, vizual API, real terminal, sig‘im chegaralari va research arxivigacha bo‘lgan amaliy yo‘l." : "A practical path through installation, Python setup, your first circuit run, the visualization API, the real terminal, capacity limits and research archiving."}
    />
    <section className="section container docs-layout">
      <aside className="docs-index">
        <span>{uz ? "SAHIFADA" : "ON THIS PAGE"}</span>
        <a href="#orientation">{uz ? "Boshlashdan oldin" : "Before you start"}</a>
        <a href="#quickstart">{uz ? "Tezkor start" : "Quick start"}</a>
        <a href="#project">{uz ? "Project setup" : "Project setup"}</a>
        <a href="#run">{uz ? "Birinchi run" : "First run"}</a>
        <a href="#events">{uz ? "Visualization API" : "Visualization API"}</a>
        <a href="#artifacts">{uz ? "Rasm va circuit" : "Images and circuits"}</a>
        <a href="#protocol">{uz ? "Raw protocol" : "Raw protocol"}</a>
        <a href="#limits">{uz ? "Limitlar" : "Limits"}</a>
        <a href="#terminal">{uz ? "Haqiqiy terminal" : "Real terminal"}</a>
        <a href="#research">{uz ? "Research arxivi" : "Research archive"}</a>
        <a href="#troubleshooting">{uz ? "Muammolar" : "Troubleshooting"}</a>
        <a href="#faq">FAQ</a>
      </aside>

      <div className="docs-content">
        <article id="orientation">
          <SectionLabel>00 / ORIENTATION</SectionLabel>
          <h2>{uz ? "Bu dastur nimaga xizmat qiladi?" : "What is this for?"}</h2>
          <p>{uz ? "KET Studio Python tajribasini lokal Windows desktop’da yozish, ishga tushirish, terminal oqimini ko‘rish va natijani tushunarli vizual event’lar bilan tekshirish uchun mo‘ljallangan. Quyidagi oqim dasturning asosiy modelidir:" : "KET Studio is a local Windows desktop workspace for writing Python experiments, running them, inspecting terminal output and reviewing results as structured visual events. This is the core model:"}</p>
          <div className="flow-diagram"><span>Python script</span><b>→</b><span>Run launcher</span><b>→</b><span>stdout / KET_VIZ</span><b>→</b><span>Panels + history</span></div>
          <div className="platform-grid docs-summary-grid">
            <div className="platform-card available"><span>{uz ? "BUGUN" : "TODAY"}</span><strong>Windows 10/11 x64</strong><small>{uz ? "Tekshirilgan desktop release, MSIX va EXE" : "Verified desktop release, MSIX and EXE"}</small></div>
            <div className="platform-card"><span>WEB PREVIEW</span><strong>{uz ? "UI demo" : "UI demo"}</strong><small>{uz ? "Python, local file va shell yo‘q" : "No Python, local files or shell"}</small></div>
            <div className="platform-card"><span>{uz ? "CHEGARA" : "BOUNDARY"}</span><strong>{uz ? "Backend emas" : "Not a backend"}</strong><small>{uz ? "SDK, remote queue va hardware alohida" : "SDK, remote queues and hardware stay separate"}</small></div>
          </div>
          <div className="docs-callout"><strong>{uz ? "Kim uchun:" : "For whom:"}</strong><span>{uz ? "Python va quantum SDK bilan ishlaydigan talaba, contributor yoki researcher. Bu qo‘llanma avval deterministic demo, keyin real backend bilan ishlashni tavsiya qiladi." : "Students, contributors and researchers working with Python and quantum SDKs. Start with a deterministic demo, then move to a real backend."}</span></div>
        </article>

        <article id="quickstart">
          <SectionLabel>01 / QUICK START</SectionLabel>
          <h2>{uz ? "15 daqiqada birinchi natija." : "Your first result in 15 minutes."}</h2>
          <p>{uz ? "Birinchi setup internetga va kompyuterda Python’ga muhtoj. KET Studio core quantum paketlarni o‘zi yaratgan izolyatsiyalangan muhitga o‘rnatishga urinadi; bu jarayon birinchi marta bir necha daqiqa olishi mumkin." : "The first setup needs internet access and Python on the computer. KET Studio attempts to install the core quantum packages into its isolated environment; the first run can take several minutes."}</p>
          <ol className="docs-list">
            <li>{uz ? "Downloads sahifasidan Windows x64 MSIX’ni oling. Self-signed paket bo‘lsa, certificate’ni Trusted People store’ga o‘rnating; trust muammosida EXE fallback’dan foydalaning." : "Download the Windows x64 MSIX from Downloads. For a self-signed package, install its certificate into Trusted People; use the EXE fallback when trust is unavailable."}</li>
            <li>{uz ? "KET Studio’ni oching va Settings → Environment’da Python interpreter’ni tekshiring. `python`, `python3`, `py` yoki aniq `python.exe` manzilidan foydalanish mumkin." : "Open KET Studio and check the Python interpreter in Settings → Environment. You can use `python`, `python3`, `py` or an explicit `python.exe` path."}</li>
            <li>{uz ? "Rebuild environment tugmasini bosing. Dastur `ket_venv` yaratadi, `qiskit[visualization]`, `qiskit-aer` va `numpy` core paketlarini o‘rnatadi hamda verification circuit ishga tushiradi." : "Press Rebuild environment. The app creates `ket_venv`, installs the core packages `qiskit[visualization]`, `qiskit-aer` and `numpy`, then runs a verification circuit."}</li>
            <li>{uz ? "Yangi project papkasini oching, `.py` fayl yarating va Editor’da kod yozing." : "Open a project folder, create a `.py` file and write code in the Editor."}</li>
            <li>{uz ? "Run yoki F5 ni bosing. stdout/stderr Terminal’da, `KET_VIZ` event’lari esa Visualization, Metrics, Inspector, Estimator yoki History panellarida ko‘rinadi." : "Press Run or F5. stdout/stderr appear in Terminal, while `KET_VIZ` events appear in Visualization, Metrics, Inspector, Estimator or History."}</li>
          </ol>
          <div className="docs-callout"><strong>{uz ? "Muhim:" : "Important:"}</strong><span>{uz ? "`ket_viz` KET Studio launcher’i tomonidan faqat Run/F5 jarayonida vaqtincha ineksiya qilinadi. Uni `pip install ket_viz` qilib qidirmang." : "`ket_viz` is injected temporarily by the KET Studio launcher only during Run/F5. Do not look for it with `pip install ket_viz`."}</span></div>
        </article>

        <article id="project">
          <SectionLabel>02 / PROJECT SETUP</SectionLabel>
          <h2>{uz ? "Papka va interpreter qanday ishlaydi?" : "How projects and interpreters work."}</h2>
          <p>{uz ? "Script joylashgan papka project root bo‘ladi. Internal Python environment esa loyiha ichida emas, application support ichidagi `ket_venv`da saqlanadi. Bu loyiha papkasini toza qoldiradi, lekin archive uchun environment ma’lumotini alohida yozib borish kerak." : "The folder containing the script becomes the project root. The internal Python environment lives in application support under `ket_venv`, not inside the project. This keeps projects clean, but you should archive environment information separately."}</p>
          <pre><code>{`my-project/\n├── experiment.py       # your source\n├── requirements-lock.txt\n└── .ket/\n    ├── out/             # PNG/SVG and other artifacts\n    └── temp/            # launcher and temporary runtime files`}</code></pre>
          <table className="docs-table"><thead><tr><th>{uz ? "Path / control" : "Path / control"}</th><th>{uz ? "Vazifasi" : "Purpose"}</th></tr></thead><tbody>
            <tr><td>Settings → Environment</td><td>{uz ? "Interpreter path, setup status, Qiskit version va optional package boshqaruvi." : "Interpreter path, setup status, Qiskit version and optional package management."}</td></tr>
            <tr><td>.ket/out/</td><td>{uz ? "Matplotlib image, rendered circuit va archive qilish kerak bo‘lgan artifact’lar." : "Matplotlib images, rendered circuits and artifacts worth archiving."}</td></tr>
            <tr><td>.ket/temp/</td><td>{uz ? "Launcher va vaqtinchalik runtime fayllari; user source emas." : "Launcher and temporary runtime files; not user source."}</td></tr>
            <tr><td>Run / F5</td><td>{uz ? "Tanlangan Python file’ni alohida process’da, `ket_viz` injection bilan bajaradi." : "Runs the selected Python file in a separate process with `ket_viz` injection."}</td></tr>
          </tbody></table>
          <p>{uz ? "Qiskit’dan tashqari paket kerak bo‘lsa Settings → Environment → package action orqali o‘rnating. Optional paketlar avtomatik o‘rnatilmaydi; package o‘rnatilishi internet, disk joyi va Python versiyasiga bog‘liq." : "When you need packages beyond the core stack, install them from Settings → Environment. Optional packages are not installed automatically; installation depends on internet access, disk space and Python version."}</p>
        </article>

        <article id="run">
          <SectionLabel>03 / FIRST RUN</SectionLabel>
          <h2>{uz ? "Ishlaydigan to‘liq Bell misoli." : "A complete Bell experiment."}</h2>
          <p>{uz ? "Quyidagi template Qiskit circuit’ni yaratadi, AerSimulator’da 1024 shot bajaradi, histogram va metadata yuboradi, so‘ng circuit rasmini `.ket/out`ga saqlaydi. Bu docs oqimini tekshirish uchun eng yaxshi birinchi reproducer." : "This template creates a Qiskit circuit, runs 1,024 shots on AerSimulator, sends a histogram and metadata, then saves a circuit image under `.ket/out`. It is a good first reproducer for the full docs workflow."}</p>
          <pre><code>{`from qiskit import QuantumCircuit\nfrom qiskit_aer import AerSimulator\nimport ket_viz\n\nshots = 1024\nseed = 7\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure([0, 1], [0, 1])\n\nbackend = AerSimulator(seed_simulator=seed)\nresult = backend.run(qc, shots=shots).result()\ncounts = result.get_counts()\n\nket_viz.metrics({\n    'backend': 'AerSimulator',\n    'qubits': qc.num_qubits,\n    'depth': qc.depth(),\n    'shots': shots,\n    'seed': seed,\n    'status': 'completed',\n})\nket_viz.histogram(dict(counts), title='Bell-state measurement')\n\nqc.draw(output='mpl', filename='.ket/out/bell-circuit.png')\nket_viz.circuit('.ket/out/bell-circuit.png', title='Bell circuit')`}</code></pre>
          <p>{uz ? "Kutiladigan natija: Terminal’da process chiqishi; Visualization’da metrics va histogram; artifact ko‘rinishida esa Bell circuit PNG. `counts` qiymatlari seed va simulator versiyasiga qarab ozgina farq qilishi mumkin." : "Expected result: process output in Terminal; metrics and histogram in Visualization; and a Bell circuit PNG as an artifact. Counts may vary slightly with the seed and simulator version."}</p>
          <div className="docs-callout"><strong>{uz ? "Agar import xato bersa:" : "If an import fails:"}</strong><span>{uz ? "Settings → Environment’da setup status va Qiskit version’ni tekshiring, Rebuild environment’ni qayta ishga tushiring. Terminal’da oddiy `python` system interpreter bo‘lishi mumkin; KET Studio Run tanlangan environment’ni ishlatadi." : "Check setup status and the Qiskit version in Settings → Environment, then run Rebuild environment again. A plain `python` in the terminal may be the system interpreter; KET Studio Run uses the selected environment."}</span></div>
        </article>

        <article id="events">
          <SectionLabel>04 / VISUALIZATION API</SectionLabel>
          <h2>{uz ? "Natijani qaysi panelga qanday uzatish kerak?" : "Which code sends results to which panel?"}</h2>
          <p>{uz ? "Quyidagi API’lar Run/F5 jarayonida to‘g‘ridan-to‘g‘ri ishlaydi. Payload JSON-safe bo‘lsin: string, number, boolean, list yoki object. Scientific object’ni avval oddiy Python qiymatlariga aylantiring." : "These APIs work directly during Run/F5. Keep payloads JSON-safe: strings, numbers, booleans, lists or objects. Convert scientific objects to plain Python values first."}</p>
          <div className="api-grid">{examples.map((example) => <div className="api-example" key={example.id}><SectionLabel>{example.id.toUpperCase()}</SectionLabel><h3>{uz ? example.titleUz : example.titleEn}</h3><p>{uz ? example.descriptionUz : example.descriptionEn}</p><pre><code>{example.code}</code></pre></div>)}</div>
          <div className="docs-callout"><strong>{uz ? "Tanlash qoidasi:" : "Selection rule:"}</strong><span>{uz ? "Bir xil run’da histogram’ni o‘lchov taqsimoti, chart’ni ketma-ket metric, table’ni qisqa report, metrics’ni provenance/status, inspector’ni esa algoritm qadamlariga ajrating." : "Use histogram for measurement distributions, chart for metric series, table for compact reports, metrics for provenance/status and inspector for algorithm steps."}</span></div>
        </article>

        <article id="artifacts">
          <SectionLabel>05 / ARTIFACTS</SectionLabel>
          <h2>{uz ? "Rasm, circuit va Matplotlib natijalarini ko‘rsatish." : "Show images, circuits and Matplotlib results."}</h2>
          <p>{uz ? "KET Studio circuit object’ni o‘zi parse qilmaydi. Qiskit yoki boshqa library avval fayl yaratadi, keyin `ket_viz.circuit` yoki `ket_viz.image` shu faylni panelga olib kiradi. Relative path project root’dan hisoblanadi." : "KET Studio does not parse circuit objects itself. Qiskit or another library creates a file first, then `ket_viz.circuit` or `ket_viz.image` sends it to the panel. Relative paths are resolved from the project root."}</p>
          <pre><code>{`from qiskit import QuantumCircuit\nimport matplotlib.pyplot as plt\nimport ket_viz\n\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\nqc.draw(output='mpl', filename='.ket/out/circuit.png')\nket_viz.circuit('.ket/out/circuit.png', title='Rendered circuit')\n\nplt.plot([0, 1, 2, 3], [0.8, 0.4, 0.2, 0.1])\nplt.title('Loss')\nplt.savefig('.ket/out/loss.png', bbox_inches='tight')\nket_viz.image('.ket/out/loss.png', title='Loss curve')`}</code></pre>
          <ul className="docs-list"><li>{uz ? "Event yuborishdan oldin fayl yozilib bo‘lgan bo‘lsin." : "Make sure the file exists before sending the event."}</li><li>{uz ? "Artifact publication yoki review uchun muhim bo‘lsa `.ket/out`ni project bilan birga commit yoki archive qiling." : "If an artifact matters for publication or review, commit or archive `.ket/out` with the project."}</li><li>{uz ? "Katta raw figure’ni diskka saqlang, UI’ga esa kerakli preview’ni yuboring." : "Keep large raw figures on disk and send a useful preview to the UI."}</li></ul>
        </article>

        <article id="protocol">
          <SectionLabel>06 / RAW PROTOCOL</SectionLabel>
          <h2>{uz ? "Har qanday Python yoki boshqa process bilan." : "Use Python or another process."}</h2>
          <p>{uz ? "`ket_viz` ishlamaydigan adapter, subprocess yoki boshqa til uchun stdout’ga bitta UTF-8 qator qilib `KET_VIZ ` + JSON chiqaring. JSON boshqa log bilan bir qatorga aralashmasin." : "For an adapter, subprocess or another language without `ket_viz`, write one UTF-8 stdout line containing `KET_VIZ ` plus JSON. Do not mix JSON with another log on the same line."}</p>
          <pre><code>{`import json\nimport time\n\nevent = {\n  'kind': 'histogram',\n  'payload': {\n    'histogram': {'0': 490, '1': 534},\n    'title': 'Raw protocol'\n  },\n  'ts': int(time.time() * 1000)\n}\nprint('KET_VIZ ' + json.dumps(event, ensure_ascii=False), flush=True)`}</code></pre>
          <ul className="docs-list"><li>{uz ? "`KET_VIZ ` prefiksi, JSON va newline bitta to‘liq qatorda bo‘lsin." : "Keep the `KET_VIZ ` prefix, JSON and newline on one complete line."}</li><li>{uz ? "`kind`ga mos `payload` yuboring; real-time oqim uchun `flush=True` ishlating." : "Send a matching `payload` for the `kind`; use `flush=True` for real-time output."}</li><li>{uz ? "Rasm path event’idan oldin fayl haqiqatda yozilgan bo‘lsin." : "Ensure an image file exists before sending its path event."}</li><li>{uz ? "Noma’lum `kind` rendererga ega emas va UI’da ko‘rsatilmaydi; malformed yoki oversize event warning bilan tashlanadi." : "An unknown `kind` has no renderer and is not displayed; malformed or oversized events are dropped with a warning."}</li></ul>
          <a className="text-link" href="https://github.com/quantum-axion-20260905/KET-Studio/blob/main/docs/event_schema.md" target="_blank" rel="noreferrer">{uz ? "Formal event schema’ni ochish" : "Open the formal event schema"} ↗</a>
        </article>

        <article id="limits">
          <SectionLabel>07 / DATA LIMITS</SectionLabel>
          <h2>{uz ? "Qancha data foydali bo‘lib qoladi?" : "How much data stays useful?"}</h2>
          <p>{uz ? "Limitlar ilmiy hisobni to‘xtatish uchun emas, UI’ni katta oqimda muzlab qolishidan himoya qilish uchun. Katta result’ni JSON/CSV yoki image sifatida diskka saqlang, panelga sparse yoki agregatsiyalangan preview yuboring." : "Limits protect the UI from freezing under large streams; they do not stop the scientific computation. Save large results as JSON/CSV or images and send a sparse or aggregated preview to the panel."}</p>
          <div className="table-scroll"><table className="docs-table"><thead><tr><th>Payload</th><th>Limit</th><th>When exceeded</th></tr></thead><tbody>{limits.map(([name, limit, behavior]) => <tr key={name}><td>{name}</td><td>{limit}</td><td>{behavior}</td></tr>)}</tbody></table></div>
          <div className="docs-callout"><strong>{uz ? "Circuit tavsiyasi:" : "Circuit guidance:"}</strong><span>{uz ? "Circuit image uchun qat’iy qubit limiti yo‘q, chunki native parser yo‘q. Lekin o‘qilishi uchun taxminan 20 qubit va 100 depth ichida chizing; undan katta circuit’ni bo‘lib yoki muhim qadamlar bilan ko‘rsating." : "There is no fixed qubit limit for circuit images because there is no native parser. For readability, render roughly within 20 qubits and depth 100; split larger circuits or show key steps."}</span></div>
        </article>

        <article id="terminal">
          <SectionLabel>08 / REAL TERMINAL</SectionLabel>
          <h2>{uz ? "VS Code’ga yaqin local shell." : "A local shell close to VS Code."}</h2>
          <p>{uz ? "Windows desktop’dagi Terminal paneli xterm3 UI va ConPTY native host bilan ishlaydi. Shell komandalarini yozing, ANSI ranglarni ko‘ring, resize qiling, input bering yoki Ctrl+C bilan process’ni to‘xtating." : "The Windows desktop Terminal uses an xterm3 UI and a ConPTY native host. Type shell commands, see ANSI colors, resize it, provide input or stop a process with Ctrl+C."}</p>
          <pre><code>{`python --version\nwhere python\npython -c "print('stdout OK')"\npython -m pip freeze`}</code></pre>
          <ul className="docs-list"><li>{uz ? "Terminal’dagi `python` va Settings’da tanlangan interpreter har doim bir xil bo‘lmasligi mumkin; `where python` bilan tekshiring." : "The terminal's `python` and the interpreter selected in Settings may differ; verify with `where python`."}</li><li>{uz ? "Run action script process’ini alohida boshqaradi; Terminal qo‘lda berilgan komandalar uchun qoladi." : "The Run action manages the script process separately; Terminal remains available for manual commands."}</li><li>{uz ? "Web preview shell ochmaydi — bu local process va fayl tizimini brauzerdan ajratadigan xavfsizlik chegarasi." : "The web preview does not open a shell; this separates local processes and files from the browser."}</li><li>{uz ? "Process tugagach event’lar bounded session/history’da qoladi; doimiy research archive’ni project fayllari bilan o‘zingiz saqlang." : "After a process ends, events remain in bounded session/history; keep a permanent research archive in project files."}</li></ul>
        </article>

        <article id="research">
          <SectionLabel>09 / RESEARCH ARCHIVE</SectionLabel>
          <h2>{uz ? "Natijani qayta tiklanadigan qiling." : "Make results reproducible."}</h2>
          <p>{uz ? "KET Studio visualization’ni ko‘rsatadi, lekin ilmiy xulosani o‘zi tasdiqlamaydi. Har bir muhim run bilan source, muhit, parametr, raw result va artifact’ni birga saqlang." : "KET Studio displays visualizations but does not validate scientific claims by itself. Keep source, environment, parameters, raw results and artifacts together for every important run."}</p>
          <pre><code>{`research-run/\n├── experiment.py\n├── requirements-lock.txt\n├── metadata.json          # backend, shots, seed, versions\n├── raw/                    # counts, arrays, CSV/JSON\n├── logs/                   # stdout and stderr\n└── .ket/out/               # images and rendered circuits`}</code></pre>
          <ol className="docs-list"><li>{uz ? "KET Studio version, Git commit va script SHA-256’ni yozing." : "Record the KET Studio version, Git commit and script SHA-256."}</li><li>{uz ? "OS, Python version, backend/library version va dependency lockfile’ni saqlang." : "Save the OS, Python version, backend/library versions and a dependency lockfile."}</li><li>{uz ? "Qubit, depth, gate count, shots, optimizer va seed’ni metadata’ga qo‘shing." : "Record qubits, depth, gate count, shots, optimizer and seed in metadata."}</li><li>{uz ? "Raw counts, logs, event JSON va `.ket/out` artifact’larini arxivlang." : "Archive raw counts, logs, event JSON and `.ket/out` artifacts."}</li><li>{uz ? "Rerun qilib, exit code, warning/error va natija farqini yozib qo‘ying." : "Rerun the experiment and record the exit code, warnings/errors and any result difference."}</li></ol>
          <div className="docs-callout"><strong>{uz ? "Research uchun izoh:" : "For research records:"}</strong><span>{uz ? "Session history qulay, ammo u bounded va doimiy registry emas. Doimiy dalil sifatida Git, raw files va `.ket/out` archive’iga tayaning." : "Session history is convenient, but bounded and not a permanent registry. Use Git, raw files and the `.ket/out` archive as the durable evidence."}</span></div>
        </article>

        <article id="troubleshooting">
          <SectionLabel>10 / TROUBLESHOOTING</SectionLabel>
          <h2>{uz ? "Ishlamasa qayerdan boshlash kerak?" : "Where to start when something fails."}</h2>
          <table className="docs-table"><thead><tr><th>Symptom</th><th>{uz ? "Tekshiruv va yechim" : "Check and fix"}</th></tr></thead><tbody>
            <tr><td>{uz ? "Python topilmadi" : "Python not found"}</td><td>{uz ? "Settings → Environment’da `python.exe` yo‘lini tanlang; Terminal’da `python --version` va `where python`ni tekshiring." : "Choose `python.exe` in Settings → Environment; verify `python --version` and `where python` in Terminal."}</td></tr>
            <tr><td>{uz ? "Core package o‘rnatilmadi" : "Core package failed"}</td><td>{uz ? "Internet, disk joyi va Python’ni tekshiring; setup log’ini o‘qing va Rebuild environment’ni qayta bosing." : "Check internet, disk space and Python; read the setup log and press Rebuild environment again."}</td></tr>
            <tr><td>{uz ? "`ket_viz` import xatosi" : "`ket_viz` import error"}</td><td>{uz ? "Script’ni oddiy terminaldan emas, KET Studio Run/F5 orqali ishga tushiring. Raw protocol ishlatsangiz `KET_VIZ ` qatorini o‘zingiz chiqaring." : "Run the script through KET Studio Run/F5, not a plain terminal command. With the raw protocol, emit the `KET_VIZ ` line yourself."}</td></tr>
            <tr><td>{uz ? "Event panelda ko‘rinmadi" : "Event is missing"}</td><td>{uz ? "Prefix, valid JSON, `flush=True`, `kind` va payload shape’ni tekshiring. Noma’lum kind ko‘rsatilmaydi." : "Check the prefix, valid JSON, `flush=True`, `kind` and payload shape. Unknown kinds are not displayed."}</td></tr>
            <tr><td>{uz ? "Matplotlib/circuit rasm yo‘q" : "Matplotlib/circuit image missing"}</td><td>{uz ? "Fayl `.ket/out`da mavjudligini, path project root’ga nisbatan to‘g‘ri ekanini va event fayl yaratilgandan keyin yuborilganini tekshiring." : "Confirm the file exists in `.ket/out`, the path is relative to the project root and the event is sent after the file is written."}</td></tr>
            <tr><td>{uz ? "MSIX yoki EXE bloklandi" : "MSIX or EXE blocked"}</td><td>{uz ? "MSIX uchun test certificate’ni Trusted People’ga o‘rnating. EXE’da SmartScreen yangi yoki unsigned publisher sabab ogohlantirishi mumkin; SHA-256 hash’ni tekshiring." : "For MSIX, install the test certificate into Trusted People. SmartScreen may warn on a new or unsigned EXE publisher; verify the SHA-256 hash."}</td></tr>
            <tr><td>{uz ? "UI sekinlashdi" : "UI is slow"}</td><td>{uz ? "Matrix, chart, table, statevector va event limitlarini saqlang; raw data’ni diskka yozib, UI’ga downsample qilingan ko‘rinishni yuboring." : "Respect matrix, chart, table, statevector and event limits; write raw data to disk and send a downsampled UI view."}</td></tr>
          </tbody></table>
          <p>{uz ? "Muammo report qilganda KET Studio version’i, OS, Python path/version, minimal reproducer, terminal log’i va event JSON’ini birga yuboring." : "When reporting an issue, include the KET Studio version, OS, Python path/version, a minimal reproducer, terminal log and event JSON."}</p>
          <Link className="text-link" href="/tutorials">{uz ? "Tutorial template’lariga o‘tish" : "Open tutorial templates"} →</Link>
        </article>

        <article id="faq">
          <SectionLabel>11 / FAQ + RESOURCES</SectionLabel>
          <h2>{uz ? "Yangi foydalanuvchi bilishi kerak bo‘lgan javoblar." : "Answers a new user needs."}</h2>
          <div className="docs-faq">{faq.map((item) => <div className="docs-faq-item" key={item.questionEn}><h3>{uz ? item.questionUz : item.questionEn}</h3><p>{uz ? item.answerUz : item.answerEn}</p></div>)}</div>
          <h3 className="docs-subheading">{uz ? "Repository’dagi chuqur hujjatlar" : "Deeper repository documentation"}</h3>
          <div className="docs-resource-grid">{resources.map(([title, href, text]) => <a className="docs-resource" href={href} target="_blank" rel="noreferrer" key={title}><strong>{title} ↗</strong><span>{uz ? text : title === "Getting Started" ? "From installation to a reproducible first run" : title === "Visualization Guide" ? "Every API and payload field" : title === "Event Schema" ? "Formal raw KET_VIZ protocol" : "MSIX, EXE, checksums and release QA"}</span></a>)}</div>
          <div className="docs-callout"><strong>{uz ? "O‘rganish tartibi:" : "Recommended order:"}</strong><span>{uz ? "Avval Tutorials’dagi deterministic template’ni Run qiling, keyin yuqoridagi Bell misolini o‘zgartiring, so‘ng API va Event Schema bilan o‘z backend natijangizni ulang." : "Run a deterministic template from Tutorials first, modify the Bell example above, then connect your own backend result using the API and Event Schema."}</span></div>
        </article>
      </div>
    </section>
  </>;
}
