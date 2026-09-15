# KET Studio Website

Public product site for the KET Studio open-source Windows desktop research
workspace. It provides Uzbek/English product copy, serious release notes,
documentation, runnable tutorial templates, grant positioning and direct
installer downloads.

## Local development

```powershell
cd website
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Production

```powershell
npm run lint
npm run build
npm run start -- --hostname 0.0.0.0 --port 3010
```

For a Node.js server managed by PM2, use `ecosystem.config.cjs`. An Nginx
reverse-proxy example is available at `deploy/nginx.conf.example`.

## Release downloads

Place the verified Windows artifacts in `public/downloads/` using these stable
names:

- `ket-studio-windows-x64.msix`
- `ket-studio-windows-x64-setup.exe`
- `ket-studio-msix-test-certificate.cer`
- `SHA256SUMS.txt`

The `/downloads` page treats MSIX as primary and explains self-signed
certificate trust. Linux and macOS are shown as planned platforms only until a
real build, native terminal test and support policy exist.

The public site does not run Python, access local files or open a PTY. Those
capabilities belong to the Windows desktop application.
