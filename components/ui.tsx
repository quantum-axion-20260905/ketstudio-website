import Link from "next/link";

export function Eyebrow({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="eyebrow"><span className="eyebrow-dot" />{children}</div>;
}

export function PageIntro({ eyebrow, title, description }: Readonly<{ eyebrow: string; title: React.ReactNode; description: React.ReactNode }>) {
  return <section className="page-intro container"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p></section>;
}

export function ArrowLink({ href, children, secondary = false }: Readonly<{ href: string; children: React.ReactNode; secondary?: boolean }>) {
  return <Link className={secondary ? "button secondary" : "button"} href={href}>{children}<span aria-hidden="true">→</span></Link>;
}

export function ExternalLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  return <a className="button secondary" href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}

export function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="section-label">{children}</div>;
}
