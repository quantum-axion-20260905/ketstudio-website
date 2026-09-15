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
    id: "estimator",
    titleUz: "Estimator: ish boshlashdan oldingi baho",
    titleEn: "Estimator: pre-run resource estimate",
    descriptionUz: "Qubit, depth, gate count va gate_counts orqali tajriba hajmini oldindan tushuntiring.",
    descriptionEn: "Explain experiment size before execution with qubits, depth, gate count and gate_counts.",
    code: "import ket_viz\n\nket_viz.estimator({\n  'qubits': 8, 'depth': 42,\n  'total_gates': 180,\n  'gate_counts': {'H': 8, 'CX': 64, 'RZ': 108}\n})",
  },
  {
    id: "files",
    titleUz: "Image va circuit: fayl artifact’lari",
    titleEn: "Image and circuit: file artifacts",
    descriptionUz: "PNG/SVG faylni loyiha papkasiga nisbatan path bilan yuboring; native circuit parser hozircha yo‘q.",
    descriptionEn: "Send a PNG/SVG path relative to the project; a native circuit parser is not available yet.",
    code: "import ket_viz\n\nket_viz.image('.ket/out/landscape.png', title='Cost landscape')\nket_viz.circuit('.ket/out/circuit.png', title='Rendered circuit')",
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

export default function DocsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";
  return <>
    <PageIntro eyebrow="DOCUMENTATION · COMPLETE USER GUIDE" title={uz ? <>KET Studio’ni <span className="gradient-text">amalda ishlating.</span></> : <>Use KET Studio in a <span className="gradient-text">real workflow.</span></>} description={uz ? "O‘rnatishdan birinchi Python run’gacha, vizual event formatidan research archive’gacha — asosiy ish jarayoni shu qo‘llanmada." : "From installation to the first Python run, visual event formats and research archiving — this guide covers the core workflow."} />
    <section className="section container docs-layout">
      <aside className="docs-index"><span>ON THIS PAGE</span><a href="#quickstart">Quick start</a><a href="#project">Project setup</a><a href="#run">Run code</a><a href="#events">Visualization API</a><a href="#protocol">Raw protocol</a><a href="#limits">Limits</a><a href="#terminal">Real terminal</a><a href="#research">Research use</a><a href="#troubleshooting">Troubleshooting</a></aside>
      <div className="docs-content">
        <article id="quickstart"><SectionLabel>01 / QUICK START</SectionLabel><h2>{uz ? "15 daqiqada birinchi natija." : "Your first result in 15 minutes."}</h2><ol className="docs-list"><li>{uz ? "Downloads sahifasidan Windows x64 MSIX’ni oling. Self-signed paket bo‘lsa, certificate’ni Trusted People store’ga o‘rnating; ishonch muammosida EXE fallback’dan foydalaning." : "Download the Windows x64 MSIX from Downloads. For the self-signed package, install its certificate into Trusted People; use the EXE fallback if trust is unavailable."}</li><li>{uz ? "KET Studio’ni oching va Settings’da Python interpreter’ni tekshiring. Birinchi setup virtual environment yaratadi va kerakli package’larni o‘rnatadi." : "Open KET Studio and verify the Python interpreter in Settings. First setup creates an isolated virtual environment and installs core packages."}</li><li>{uz ? "Yangi project papkasini oching, `.py` fayl yarating va Editor’da kod yozing." : "Open a project folder, create a `.py` file and write code in the Editor."}</li><li>{uz ? "Run tugmasini bosing. stdout/stderr Terminal’da, `KET_VIZ` event’lari esa Visualization panelida ko‘rinadi." : "Press Run. stdout/stderr appear in Terminal, while `KET_VIZ` events appear in Visualization."}</li></ol><div className="docs-callout"><strong>{uz ? "Muhim:" : "Important:"}</strong><span>{uz ? "`ket_viz` KET Studio launcher’i tomonidan vaqtincha ineksiya qilinadi. Uni alohida `pip install` qilish shart emas." : "`ket_viz` is injected by the KET Studio launcher for the run. You do not need to `pip install` it separately."}</span></div></article>
        <article id="project"><SectionLabel>02 / PROJECT SETUP</SectionLabel><h2>{uz ? "Papka va interpreter qanday ishlaydi?" : "How projects and interpreters work."}</h2><p>{uz ? "KET Studio tanlangan script joylashgan papkani project root sifatida ishlatadi. `.ket/out` output artifact’lar, `.ket/temp` launcher va vaqtinchalik fayllar uchun yaratiladi." : "KET Studio uses the folder containing the selected script as the project root. It creates `.ket/out` for artifacts and `.ket/temp` for the launcher and temporary files."}</p><table className="docs-table"><thead><tr><th>Path / control</th><th>{uz ? "Vazifasi" : "Purpose"}</th></tr></thead><tbody><tr><td>Settings → Python</td><td>{uz ? "System Python yoki KET venv interpreter’ini tanlash." : "Choose the system Python or the KET venv interpreter."}</td></tr><tr><td>.ket/out/</td><td>{uz ? "Matplotlib image, circuit image va export artifact’lari." : "Matplotlib images, rendered circuits and exported artifacts."}</td></tr><tr><td>.ket/temp/</td><td>{uz ? "Run launcher; foydalanuvchi kodi emas, vaqtinchalik runtime fayli." : "Run launcher; a temporary runtime file, not user source."}</td></tr><tr><td>F5 / Run</td><td>{uz ? "Tanlangan Python file’ni alohida process’da bajarish." : "Execute the selected Python file in a separate process."}</td></tr></tbody></table></article>
        <article id="run"><SectionLabel>03 / RUNNING CODE</SectionLabel><h2>{uz ? "Terminal, Editor va Visualization birga." : "Terminal, Editor and Visualization together."}</h2><p>{uz ? "Oddiy print loglari Terminal’da qoladi. Event chiqishi uchun `ket_viz` API’sidan foydalaning. Bir eventdan keyin output darhol ko‘rinsin desangiz, launcher JSON’ni `flush=True` bilan chiqaradi." : "Ordinary print logs stay in Terminal. Use the `ket_viz` API for structured output. The launcher flushes each event so results become visible immediately."}</p><pre><code>{`import ket_viz\n\nprint('Starting experiment')\nket_viz.estimator({'qubits': 2, 'depth': 2, 'total_gates': 2})\nket_viz.metrics({'status': 'running', 'seed': 20260914})\nket_viz.histogram({'00': 510, '11': 514}, title='Final counts')\nprint('Done')`}</code></pre><p>{uz ? "Kutiladigan natija: Terminal’da uchta print/log qatori, Visualization’da estimator, metrics va histogram event’lari." : "Expected result: three log lines in Terminal and estimator, metrics and histogram events in Visualization."}</p></article>
        <article id="events"><SectionLabel>04 / VISUALIZATION API</SectionLabel><h2>{uz ? "Natijani panelga uzatish kodlari." : "Code examples for sending results."}</h2><p>{uz ? "Quyidagi API’lar KET Studio’da to‘g‘ridan-to‘g‘ri ishlaydi. Har bir event JSON-safe qiymatlardan tuzilishi kerak: string, number, boolean, list yoki object." : "These APIs work directly in KET Studio. Every event must contain JSON-safe values: strings, numbers, booleans, lists or objects."}</p><div className="api-grid">{examples.map((example) => <div className="api-example" key={example.id}><SectionLabel>{example.id.toUpperCase()}</SectionLabel><h3>{uz ? example.titleUz : example.titleEn}</h3><p>{uz ? example.descriptionUz : example.descriptionEn}</p><pre><code>{example.code}</code></pre></div>)}</div></article>
        <article id="protocol"><SectionLabel>05 / RAW PROTOCOL</SectionLabel><h2>{uz ? "Har qanday Python yoki boshqa til bilan." : "Use any Python or other process."}</h2><p>{uz ? "`ket_viz` ishlamaydigan holatda stdout’ga bitta UTF-8 qator qilib `KET_VIZ ` + JSON chiqaring. JSON boshqa log bilan bir qatorga aralashmasin." : "When `ket_viz` is unavailable, print one UTF-8 line containing `KET_VIZ ` plus JSON. Do not mix the JSON with another log on the same line."}</p><pre><code>{`import json\n\nevent = {\n  'kind': 'histogram',\n  'payload': {\n    'histogram': {'0': 490, '1': 534},\n    'title': 'Raw protocol'\n  }\n}\nprint('KET_VIZ ' + json.dumps(event), flush=True)`}</code></pre><p>{uz ? "Parser `kind` bo‘yicha renderer tanlaydi. Noma’lum kind fallback event sifatida saqlanadi, malformed yoki oversize event esa warning bilan cheklanadi." : "The parser selects a renderer by `kind`. Unknown kinds are retained as fallback events; malformed or oversized events are bounded with a warning."}</p></article>
        <article id="limits"><SectionLabel>06 / DATA LIMITS</SectionLabel><h2>{uz ? "Qancha data foydali bo‘lib qoladi?" : "How much data stays useful?"}</h2><p>{uz ? "Limitlar ilmiy hisobni to‘xtatish uchun emas, UI’ni himoya qilish uchun. Katta result’ni diskka saqlang, UI’ga esa sparse yoki agregatsiyalangan ko‘rinishni yuboring." : "Limits protect the UI, not the scientific computation. Save large results to disk and send a sparse or aggregated view to the UI."}</p><div className="table-scroll"><table className="docs-table"><thead><tr><th>Payload</th><th>Limit</th><th>When exceeded</th></tr></thead><tbody>{limits.map(([name, limit, behavior]) => <tr key={name}><td>{name}</td><td>{limit}</td><td>{behavior}</td></tr>)}</tbody></table></div></article>
        <article id="terminal"><SectionLabel>07 / REAL TERMINAL</SectionLabel><h2>{uz ? "VS Code’ga yaqin local shell." : "A local shell close to VS Code."}</h2><p>{uz ? "Windows desktop’da Terminal paneli xterm3 UI va ConPTY native host bilan ishlaydi. Shell komandalarini yozing, ANSI ranglarni ko‘ring, terminalni resize qiling yoki Ctrl+C bilan process’ni to‘xtating." : "On Windows desktop, Terminal uses an xterm3 UI and a ConPTY native host. Type shell commands, see ANSI colors, resize the terminal or stop a process with Ctrl+C."}</p><pre><code>{`python --version\nwhere python\npython your_experiment.py\npython -m pip freeze`}</code></pre><ul className="docs-list"><li>{uz ? "Web preview shell ochmaydi; bu xavfsizlik chegarasi." : "The web preview does not open a shell; this is an intentional security boundary."}</li><li>{uz ? "Run action script process’ini alohida boshqaradi; Terminal qo‘lda berilgan komandalar uchun qoladi." : "The Run action manages the script process separately; Terminal remains available for manual commands."}</li><li>{uz ? "Process tugagach session history’da event’lar bounded holatda qoladi." : "After a process ends, events remain in bounded session history."}</li></ul></article>
        <article id="research"><SectionLabel>08 / RESEARCH USE</SectionLabel><h2>{uz ? "Natijani publication-grade qilish uchun." : "For publication-grade evidence."}</h2><p>{uz ? "KET Studio exploratory research, education va prototyping uchun mos. Ilmiy da’vo uchun quyidagi metadata’ni har run bilan saqlang:" : "KET Studio is suitable for exploratory research, education and prototyping. For a scientific claim, keep this metadata with every run:"}</p><ul className="docs-list"><li>Git commit va script SHA-256</li><li>Python version va `pip freeze` snapshot</li><li>{uz ? "backend, qubits, depth, shots, optimizer va seed" : "backend, qubits, depth, shots, optimizer and seed"}</li><li>{uz ? "raw counts, metrics, logs va visual artifacts" : "raw counts, metrics, logs and visual artifacts"}</li><li>{uz ? "KET Studio version, OS va qayta ishga tushirish yozuvi" : "KET Studio version, OS and rerun record"}</li></ul><div className="docs-callout"><strong>{uz ? "Halol chegarasi:" : "Honest boundary:"}</strong><span>{uz ? "KET Studio backend credential vault, remote job queue yoki hardware calibration’ni native boshqarmaydi. Bu ishlar Python SDK va alohida lab workflow’ida qoladi." : "KET Studio does not natively manage credential vaults, remote job queues or hardware calibration. Those remain in the Python SDK and lab workflow."}</span></div></article>
        <article id="troubleshooting"><SectionLabel>09 / TROUBLESHOOTING</SectionLabel><h2>{uz ? "Ishlamasa qayerdan boshlash kerak?" : "Where to start when something fails."}</h2><table className="docs-table"><thead><tr><th>Symptom</th><th>{uz ? "Tekshiruv" : "Check"}</th></tr></thead><tbody><tr><td>Python topilmadi</td><td>{uz ? "Settings → Python’da `python.exe` yo‘lini tanlang; Terminal’da `python --version`ni tekshiring." : "Choose `python.exe` in Settings → Python; verify `python --version` in Terminal."}</td></tr><tr><td>Event panelda ko‘rinmadi</td><td>{uz ? "`KET_VIZ` qatori JSON ekanini, `flush=True` borligini va script Run action bilan ishga tushganini tekshiring." : "Check that the `KET_VIZ` line is valid JSON, uses `flush=True` and was run through the Run action."}</td></tr><tr><td>Matplotlib rasm yo‘q</td><td>{uz ? "`matplotlib` o‘rnatilganini va `plt.show()` chaqirilganini tekshiring; output `.ket/out` ichiga tushadi." : "Verify `matplotlib` is installed and `plt.show()` is called; output is written under `.ket/out`."}</td></tr><tr><td>MSIX install bloklandi</td><td>{uz ? "Test certificate’ni Trusted People’ga o‘rnating yoki EXE fallback’dan foydalaning." : "Install the test certificate into Trusted People or use the EXE fallback."}</td></tr><tr><td>UI sekinlashdi</td><td>{uz ? "Matrix, chart, table va event limitlarini tekshiring; katta raw data’ni diskka yozing." : "Check matrix, chart, table and event limits; write large raw data to disk."}</td></tr></tbody></table><p>{uz ? "To‘liq formal field’lar uchun repository’dagi `docs/event_schema.md`, amaliy API uchun `docs/visualization-guide.md`, development va release uchun `docs/development.md` hamda `docs/windows-installer.md`ni o‘qing." : "For formal fields read `docs/event_schema.md`; for API practice read `docs/visualization-guide.md`; for development and release read `docs/development.md` and `docs/windows-installer.md`."}</p><Link className="text-link" href="/tutorials">{uz ? "Tutorial template’lariga o‘tish" : "Open tutorial templates"} →</Link></article>
      </div>
    </section>
  </>;
}
