# Calcify International — website

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion · Lenis.
Everything visual is drawn in code; see [DESIGN.md](DESIGN.md) for the system.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Copy lives in `src/lib/content.ts`.

## Contact form email

The contact form sends mail through the `hello@calcifyint.com` mailbox (Spacemail SMTP): an alert to the team and a designed confirmation to the visitor. Copy `.env.example` to `.env.local` for local work, and set the same variables in Vercel for production. Never commit the password.
