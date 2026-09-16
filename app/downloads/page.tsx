"use client";

import Link from "next/link";
import { PageIntro, SectionLabel } from "@/components/ui";
import { useLanguage } from "@/components/language";

export default function DownloadsPage() {
  const { language } = useLanguage();
  const uz = language === "uz";

  return <>
    <PageIntro eyebrow="RELEASES · WINDOWS DESKTOP" title={uz ? <>KET Studio’ni <span className="gradient-text">yuklab oling.</span></> : <>Download KET Studio for <span className="gradient-text">Windows.</span></>} description={uz ? "v1.3.1 Windows 10/11 x64 uchun tayyor. MSIX asosiy paket, EXE esa sertifikat trust mavjud bo‘lmagan kompyuterlar uchun fallback installer." : "v1.3.1 is ready for Windows 10/11 x64. MSIX is the primary package; EXE is the fallback when certificate trust is unavailable."} />
    <section className="section container download-grid">
      <article className="download-card primary-download">
        <div className="download-card-top"><span>WINDOWS 10/11 · X64</span><span>v1.3.1</span></div>
        <h2>MSIX package</h2>
        <p>{uz ? "Tavsiya etilgan Windows package. Self-signed build bo‘lsa, o‘rnatishdan oldin certificate trust qadamlarini o‘qing." : "Preferred Windows package. For a self-signed build, read the certificate trust steps before installing."}</p>
        <a className="download-button" href="/downloads/ket-studio-windows-x64.msix" download>{uz ? "MSIX’ni yuklab olish" : "Download MSIX"}<span>↓</span></a>
        <small>{uz ? "Windows desktop · x64 · 1.3.1.0" : "Windows desktop · x64 · 1.3.1.0"}</small>
        <a className="download-note" href="/downloads/ket-studio-msix-test-certificate.cer" download>{uz ? "Test certificate’ni yuklab olish" : "Download test certificate"}</a>
      </article>
      <article className="download-card">
        <div className="download-card-top"><span>COMPATIBILITY</span><span>EXE</span></div>
        <h2>Setup fallback</h2>
        <p>{uz ? "Per-user Inno Setup installer. KET Studio va native terminal uchun VC++ runtime DLL’lari paket ichida bor. MSIX certificate trust muammosi bo‘lsa yoki pilot foydalanuvchiga qulay o‘rnatish kerak bo‘lsa ishlating." : "Per-user Inno Setup installer. The package bundles the VC++ runtime DLLs required by KET Studio and the native terminal. Use it when MSIX certificate trust is unavailable or a pilot needs a familiar setup flow."}</p>
        <a className="download-button secondary-download" href="/downloads/ket-studio-windows-x64-setup.exe" download>{uz ? "EXE’ni yuklab olish" : "Download EXE"}<span>↓</span></a>
        <small>{uz ? "Windows desktop · x64 · per-user" : "Windows desktop · x64 · per-user"}</small>
      </article>
    </section>
    <section className="section container platform-section">
      <SectionLabel>{uz ? "PLATFORMA TANLOVI" : "PLATFORM SELECTOR"}</SectionLabel>
      <h2>{uz ? "Hozir Windows. Keyin boshqa desktop’lar." : "Windows now. More desktops later."}</h2>
      <div className="platform-grid"><div className="platform-card available"><span>WINDOWS</span><strong>{uz ? 'Mavjud' : 'Available now'}</strong><small>{uz ? "MSIX + EXE · x64" : "MSIX + EXE · x64"}</small></div><div className="platform-card" aria-disabled="true"><span>LINUX</span><strong>{uz ? 'Rejada' : 'Planned'}</strong><small>{uz ? "Yuklab olish hozircha yo‘q" : "No download yet"}</small></div><div className="platform-card" aria-disabled="true"><span>MACOS</span><strong>{uz ? 'Rejada' : 'Planned'}</strong><small>{uz ? "Yuklab olish hozircha yo‘q" : "No download yet"}</small></div></div>
    </section>
    <section className="section dark-panel"><div className="container statement"><SectionLabel>INSTALLATION NOTES</SectionLabel><h2>{uz ? "Ishonchli o‘rnatish uchun uch qadam." : "Three steps for a trustworthy install."}</h2><p>{uz ? "MSIX self-signed bo‘lsa certificate’ni Trusted People store’ga o‘rnating, publisher nomini tekshiring va keyin app’ni ishga tushiring. EXE va MSIX clean-PC runtime DLL’larini o‘z ichiga oladi, ammo imzolanmagan yangi build’da SmartScreen ogohlantirishi mumkin. To‘liq signing, checksum, upgrade va terminal smoke-test yo‘riqnomasi docs’da bor." : "If the MSIX is self-signed, install its certificate into the Trusted People store, confirm the publisher and then launch the app. Both EXE and MSIX bundle the clean-PC runtime DLLs, but SmartScreen may still warn about a new unsigned build. Full signing, checksum, upgrade and terminal smoke-test guidance is in the docs."}</p><div className="download-links"><Link className="text-link light-link" href="/docs">{uz ? "Release hujjatlarini ochish" : "Open release documentation"} →</Link><a className="text-link light-link" href="/downloads/SHA256SUMS.txt">SHA-256 checksums →</a></div></div></section>
  </>;
}
