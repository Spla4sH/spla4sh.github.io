# spla4sh.github.io

My personal portfolio — live at **[spla4sh.github.io](https://spla4sh.github.io)**.

Bilingual (German / English), dark, fast. Built to show who I am and what I build: platform engineering, machine learning, time-series forecasting and web development.

## Stack

- **[Astro 6](https://astro.build)** — static-first, zero JS by default
- **[Tailwind CSS 4](https://tailwindcss.com)** — via the Vite plugin, custom dark theme
- **MDX** — content collections for project pages
- **astro-icon** + Lucide for icons
- Deployed to **GitHub Pages** via GitHub Actions on every push to `main`

## Architecture notes

- **i18n**: `de` (default) and `en` with fully prefixed routes (`/de/...`, `/en/...`). UI strings live in `src/i18n/*.json`, content exists once per language (`*-de.mdx` / `*-en.mdx`), and `hreflang` alternates are emitted per page.
- **Projects** are a typed content collection (`src/content.config.ts`) with category, stack, status (`wip`/`done`) and featured flags — the list sorts finished work first and labels work-in-progress honestly.
- The root `/` redirects to the browser language, falling back to `/de/`.

## Development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # production build to ./dist
npm run preview   # serve the production build locally
```

Node ≥ 22 required.
