"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, copy } from "@/components/language";

export function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const t = copy[language];
  const links = [
    { href: "/projects", label: t.nav.projects },
    { href: "/docs", label: t.nav.docs },
    { href: "/tutorials", label: t.nav.tutorials },
    { href: "/downloads", label: t.nav.downloads },
  ];

  return (
    <div className="site-frame">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="KET Studio home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>KET <em>STUDIO</em></span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} className={pathname.startsWith(link.href) ? "active" : ""} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="topbar-actions">
          <div className="language-switch" role="group" aria-label="Language">
            <button className={language === "uz" ? "selected" : ""} onClick={() => setLanguage("uz")}>UZ</button>
            <button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <a className="github-link" href="https://github.com/quantum-axion-20260905/KET-Studio" target="_blank" rel="noreferrer" aria-label="KET Studio GitHub repository">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-brand"><span className="brand-mark small" aria-hidden="true"><span /></span><div><strong>KET Studio</strong><p>{language === "uz" ? "Kvant research workflow’ini ko‘rinadigan va takrorlanadigan qilamiz." : "Making quantum research workflows visible and reproducible."}</p></div></div>
        <div className="footer-links"><Link href="/projects">{t.nav.projects}</Link><Link href="/docs">{t.nav.docs}</Link><Link href="/tutorials">{t.nav.tutorials}</Link><Link href="/downloads">{t.nav.downloads}</Link><a href="https://github.com/quantum-axion-20260905/KET-Studio" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        <div className="footer-bottom"><span>MIT · Open source</span><span>© 2026 KET Studio</span></div>
      </footer>
    </div>
  );
}
