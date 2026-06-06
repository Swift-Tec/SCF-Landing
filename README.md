# SCF-Landing

Landing page for **Swift Challenge Fest 2026** — description, photo gallery, and email registration.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4 + shadcn/ui (base-nova)
- Framer Motion (scroll reveals, 3D cards, text lens)
- Paper Design Shaders (`@paper-design/shaders-react`) for hero/footer backgrounds and liquid-metal logo
- Supabase (`@supabase/supabase-js`) for registration email capture
- **pnpm** as the package manager

## Getting started

```bash
pnpm install
cp .env.example .env   # fill in your Supabase project values
pnpm dev
```

Open <http://localhost:5173>.

## Editing copy

All landing-page text and photo captions live in **`src/content.ts`**. Change strings there and every section updates — no component edits required.

Event photos are in **`src/assets/photos/`**.

## Supabase setup

Set these in `.env` (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Use the **Project URL** and **anon public** key from Supabase → Project Settings → API. Do not use the `service_role` key in the frontend.

**Important:** Vite only reads `.env` at startup. After creating or editing `.env`, stop and restart the dev server:

```bash
pnpm dev
```

### Database tables

Run `supabase/schema.sql` in the Supabase SQL editor. It creates:

- **`teams`** — team registration form at `/register`
- **`registrations`** — optional email waitlist (`RegistrationForm` component)

Both tables enable RLS with an `anon` insert policy so the browser can submit without auth.

### Confirmation emails (Resend)

Team registration sends a confirmation to the **team leader email** using [Resend](https://resend.com) via the Supabase Edge Function `send-team-confirmation`.

**Important:** Never put `RESEND_API_KEY` in a `VITE_` variable — it would be exposed in the browser. Keep it server-side only.

#### 1. Local `.env`

Add to `.env` (copy from `.env.example`). **Replace `re_xxxxxxxxx` with your real API key:**

```
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM=Swift Challenge Fest <onboarding@resend.dev>
RESEND_TEST_TO=you@example.com
```

Test the key locally:

```bash
pnpm email:test
```

With Resend’s sandbox sender (`onboarding@resend.dev`), you can only email addresses verified in your Resend account.

#### 2. Deploy to Supabase (required for `/register` in production)

Your hosted Edge Function reads secrets from Supabase, not your local `.env`:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set RESEND_API_KEY=re_xxxxxxxxx
supabase secrets set RESEND_FROM="Swift Challenge Fest <onboarding@resend.dev>"
supabase secrets set SITE_URL=https://your-production-url.com
supabase functions deploy send-team-confirmation
```

Preview the HTML locally (opens `emails/team-confirmation-preview.html`):

```bash
pnpm email:preview
```

After deploy, submitting the team form will save the row in `teams` and send the confirmation email.

### Troubleshooting

| Symptom | Fix |
|--------|-----|
| Yellow “Supabase not configured” banner | Check env var names (`VITE_` prefix), restart `pnpm dev` |
| Error mentions `Could not find the table` | Run `supabase/schema.sql` in SQL editor |
| Works locally but not on Vercel | Add the same `VITE_*` vars in Vercel → Project → Settings → Environment Variables, then redeploy |
| `new row violates row-level security policy` | Re-run the RLS policies in `supabase/schema.sql` |

The form shows a hint until env vars are loaded; errors from Supabase include the server message to help debug.

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — typecheck + production build to `dist/`
- `pnpm preview` — preview the production build
- `pnpm lint` — typecheck only

## Performance notes

Shader components (hero background, liquid-metal logo, footer) are lazy-loaded and respect `prefers-reduced-motion` (static frame when enabled). WebGL is required for shader effects.
