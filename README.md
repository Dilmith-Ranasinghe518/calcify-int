# Calcify International — website

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion · Lenis.
Everything visual is drawn in code; see [DESIGN.md](DESIGN.md) for the system.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Copy lives in `src/lib/content.ts`. The contact form has no backend yet: it
composes an email and opens the visitor's mail app.
