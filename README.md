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

Set these in `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Then create the `registrations` table (run in the Supabase SQL editor):

```sql
create table registrations (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table registrations enable row level security;

create policy "anon insert" on registrations
  for insert to anon with check (true);
```

The form gracefully handles the "not configured" state — it'll show a hint until the env vars are set.

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — typecheck + production build to `dist/`
- `pnpm preview` — preview the production build
- `pnpm lint` — typecheck only

## Performance notes

Shader components (hero background, liquid-metal logo, footer) are lazy-loaded and respect `prefers-reduced-motion` (static frame when enabled). WebGL is required for shader effects.
