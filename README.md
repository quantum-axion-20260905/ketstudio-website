# Quantum Axion Website

Public-facing website for the Quantum Axion open-source ecosystem. It presents
KET Studio and Quantum Circuit as distinct but interoperable projects, with
Uzbek/English content, documentation, tutorials and grant positioning.

## Local development

```powershell
cd website
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```powershell
npm run lint
npm run build
npm run start
```

The site is intentionally server-ready and does not require an API yet. It can
also be converted to a static export later for GitHub Pages by enabling
`output: "export"` in `next.config.ts`; server-only features would then remain
disabled.

For a Node.js server managed by PM2, use the included `ecosystem.config.cjs`.
An Nginx reverse-proxy example is available at `deploy/nginx.conf.example`.

## Content direction

- `/projects` explains the separate roles of the two products.
- `/docs` describes the proposed OpenQASM and versioned JSON interoperability.
- `/tutorials` provides runnable learning paths and points to the relevant tool.
- `/grants` keeps the grant theses distinct while documenting the shared outcome.

The default language is Uzbek. The language toggle works across client-side
navigation and is ready to be replaced by route-based localization when
SEO-localized pages are needed.
