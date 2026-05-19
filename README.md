# SCF-Landing

Landing page con descripción y registro para el Swift Challenge Fest 2026.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4 (CSS-first config in `src/index.css`)
- Supabase (`@supabase/supabase-js`) for the registration email capture

## Getting started

```bash
npm install
cp .env.example .env   # fill in your Supabase project values
npm run dev
```

Open <http://localhost:5173>.

## Editing copy

All landing-page text lives in **`src/content.ts`**. Change strings there and every section updates — no component edits required.

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

- `npm run dev` — start the dev server
- `npm run build` — typecheck + production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — typecheck only
