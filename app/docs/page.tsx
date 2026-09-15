"use client";

import { PageIntro, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

const contractExample = [
  "{",
  '  "schema": "quantum-circuit/v1",',
  '  "sourceFormat": "openqasm2-subset",',
  '  "source": "OPENQASM 2.0; ...",',
  '  "numQubits": 4,',
  '  "metadata": { "name": "GHZ" },',
  '  "provenance": {',
  '    "origin": "quantum-circuit-web",',
  '    "appVersion": "0.2.0"',
  "  },",
  '  "analysis": {}',
  "}",
].join("\n");

export default function DocsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";
  return <><PageIntro eyebrow="DOCUMENTATION · ARCHITECTURE" title={uz ? <>Ochiq vositalar uchun <span className="gradient-text">aniq contract.</span></> : <>A clear contract for <span className="gradient-text">open tools.</span></>} description={uz ? "Quantum Circuit va KET Studio mustaqil rivojlanadi. Ularni bog‘laydigan qatlam — OpenQASM va versioned JSON almashinuvi." : "Quantum Circuit and KET Studio evolve independently. They are connected by OpenQASM and a versioned JSON exchange format."} /><section className="section container docs-layout"><aside className="docs-index"><span>ON THIS PAGE</span><a href="#workflow">Workflow</a><a href="#contract">Data contract</a><a href="#limits">Limits</a><a href="#reproducibility">Reproducibility</a></aside><div className="docs-content"><article id="workflow"><SectionLabel>01 / WORKFLOW</SectionLabel><h2>{uz ? "Browser’dan desktop’ga." : "From browser to desktop."}</h2><p>{uz ? "Foydalanuvchi Quantum Circuit’da circuit yaratadi yoki tutorial template’dan boshlaydi. `.qasm` source yoki `.ket.json` report eksport qilinadi va KET Studio’da davom ettiriladi." : "A user creates a circuit in Quantum Circuit or starts from a tutorial template. The `.qasm` source or `.ket.json` report is exported and continued in KET Studio."}</p><div className="flow-diagram"><span>Quantum Circuit</span><b>→</b><span>OpenQASM / JSON</span><b>→</b><span>KET Studio</span></div></article><article id="contract"><SectionLabel>02 / DATA CONTRACT</SectionLabel><h2>{uz ? "Minimal, versiyalangan va kengayadigan." : "Minimal, versioned and extensible."}</h2><pre><code>{contractExample}</code></pre></article><article id="limits"><SectionLabel>03 / HONEST LIMITS</SectionLabel><h2>{uz ? "Foydalanuvchi nimani kutishini biladi." : "Users know what to expect."}</h2><p>{uz ? "Quantum Circuit hozircha kichik, pure-state circuitlar uchun. Max 10 qubit, contiguous cuts, noise va hardware-specific execution mavjud emas. KET Studio esa lokal Python va backend adapterlari uchun kengroq workspace beradi." : "Quantum Circuit currently targets small pure-state circuits: max 10 qubits and contiguous cuts, without noise or hardware-specific execution. KET Studio provides the broader workspace for local Python and backend adapters."}</p></article><article id="reproducibility"><SectionLabel>04 / REPRODUCIBILITY</SectionLabel><h2>{uz ? "Har bir natija iz qoldiradi." : "Every result leaves a trace."}</h2><p>{uz ? "Source, app version, qubit count, metadata, analysis va timestamp birga saqlanadi. Bu grant demo’sini ham, ilmiy notebook’ni ham qayta tiklashni osonlashtiradi." : "Source, app version, qubit count, metadata, analysis and timestamp travel together. This makes both a grant demo and a research notebook easier to reproduce."}</p></article></div></section></>;
}
