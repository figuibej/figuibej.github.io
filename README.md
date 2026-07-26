# figuibej.github.io

Source for my personal resume site, served via GitHub Pages.

## Structure

- `src/data.js` — career history (`JOBS`), skills (`STACK`) and ES/EN copy (`COPY`)
- `src/app.jsx` — the React app: nav, 5 hero layouts (A–E), timeline, stack, contact, plus a Console and an IDE mode
- `src/style.css` — all styling
- `src/index.html` — HTML shell (fonts, mount point, template for the build)
- `build.js` — bundles `src/app.jsx` with esbuild and injects it + the CSS into `src/index.html`, emitting the final self-contained `index.html` at the repo root

## Build

```bash
npm install
npm run build
```

This regenerates the root `index.html` that GitHub Pages serves. Commit the rebuilt `index.html` along with any source changes.
