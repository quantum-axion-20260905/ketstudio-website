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
    { href: "/grants", label: t.nav.grants },
  ];

  return (
    <div className="site-frame">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Quantum Axion home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>QUANTUM <em>AXION</em></span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} className={pathname.startsWith(link.href) ? "active" : ""} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="topbar-actions">
          <div className="language-switch" role="group" aria-label="Language">
            <button className={language === "uz" ? "selected" : ""} onClick={() => setLanguage("uz")}>UZ</button>
            <button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <a className="github-link" href="https://github.com/quantum-axion-20260905" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-brand"><span className="brand-mark small" aria-hidden="true"><span /></span><div><strong>Quantum Axion</strong><p>{language === "uz" ? "Kvant tadqiqotlarini ko‘rinadigan va takrorlanadigan qilamiz." : "Making quantum research visible and reproducible."}</p></div></div>
        <div className="footer-links"><Link href="/projects">{t.nav.projects}</Link><Link href="/docs">{t.nav.docs}</Link><Link href="/tutorials">{t.nav.tutorials}</Link><a href="https://github.com/quantum-axion-20260905" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        <div className="footer-bottom"><span>MIT · Open source</span><span>© 2026 Quantum Axion</span></div>
      </footer>
    </div>
  );
}
