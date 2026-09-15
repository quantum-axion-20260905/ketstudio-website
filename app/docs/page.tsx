"use client";

import { PageIntro, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

const eventExample = [
  "KET_VIZ {",
  '  "schema": "ket-studio/events/v1",',
  '  "kind": "histogram",',
  '  "payload": {',
  '    "title": "Bell results",',
  '    "data": {"00": 480, "11": 494}',
  "  },",
  '  "meta": {"seed": 20260914, "backend": "AerSimulator"}',
  "}",
].join("\n");

export default function DocsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";
  return <><PageIntro eyebrow="DOCUMENTATION · ARCHITECTURE" title={uz ? <>Ishlaydigan workflow uchun <span className="gradient-text">aniq contract.</span></> : <>A clear contract for a <span className="gradient-text">working workflow.</span></>} description={uz ? "KET Studio Python process, real terminal, event parser va renderer’larni aniq chegaralar bilan birlashtiradi." : "KET Studio connects the Python process, real terminal, event parser and renderers through explicit boundaries."} /><section className="section container docs-layout"><aside className="docs-index"><span>ON THIS PAGE</span><a href="#workflow">Workflow</a><a href="#contract">Event contract</a><a href="#limits">Limits</a><a href="#reproducibility">Reproducibility</a></aside><div className="docs-content"><article id="workflow"><SectionLabel>01 / WORKFLOW</SectionLabel><h2>{uz ? "Python’dan vizual dalilgacha." : "From Python to visual evidence."}</h2><p>{uz ? "Skript alohida process sifatida ishga tushadi. stdout va stderr real terminalda ko‘rinadi; `KET_VIZ` prefiksli JSON event’lar esa parser orqali Visualization paneliga yuboriladi." : "A script runs as a separate process. stdout and stderr remain visible in the real terminal; JSON events prefixed with `KET_VIZ` are parsed into the Visualization panel."}</p><div className="flow-diagram"><span>Python process</span><b>→</b><span>stdout / KET_VIZ</span><b>→</b><span>Renderer</span></div></article><article id="contract"><SectionLabel>02 / EVENT CONTRACT</SectionLabel><h2>{uz ? "Minimal, versiyalangan va kengayadigan." : "Minimal, versioned and extensible."}</h2><pre><code>{eventExample}</code></pre><p>{uz ? "`kind` renderer’ni tanlaydi, `payload` event ma’lumotini beradi, `meta` esa seed, backend va parametrlar kabi provenance maydonlarini olib yuradi. Noto‘g‘ri yoki juda katta event UI’ni muzlatmasligi uchun rad etiladi yoki cheklanadi." : "`kind` selects a renderer, `payload` carries event data and `meta` carries provenance such as seed, backend and parameters. Invalid or oversized events are rejected or bounded so they cannot freeze the UI."}</p></article><article id="limits"><SectionLabel>03 / HONEST LIMITS</SectionLabel><h2>{uz ? "Qancha data foydali bo‘lib qoladi?" : "How much data stays useful?"}</h2><p>{uz ? "UI event uchun 8 MiB, pending queue va session uchun 100/50 event, history uchun 50 session, matrix uchun 128×128, histogram uchun 64 bucket, chart uchun 2 000 point va table uchun 100×32 limit qo‘llaydi. Katta hisoblar uchun raw file, sparse output yoki agregatsiya ishlating." : "The UI bounds events at 8 MiB, pending/session data at 100/50 events, history at 50 sessions, matrices at 128×128, histograms at 64 buckets, charts at 2,000 points and tables at 100×32. For larger computations, use raw files, sparse output or aggregation."}</p></article><article id="reproducibility"><SectionLabel>04 / REPRODUCIBILITY</SectionLabel><h2>{uz ? "Har bir natija iz qoldiradi." : "Every result leaves a trace."}</h2><p>{uz ? "Git commit, script hash, KET Studio versiyasi, Python/package snapshot, seed, backend, parametrlar, raw natija va vizual artifact’larni birga arxivlang. KET Studio hozir buni to‘liq immutable bundle sifatida avtomatik yaratmaydi — grant roadmap’ining muhim qismi shu." : "Archive the Git commit, script hash, KET Studio version, Python/package snapshot, seed, backend, parameters, raw result and visual artifacts together. KET Studio does not yet create a complete immutable bundle automatically; that is a core grant roadmap item."}</p></article></div></section></>;
}
