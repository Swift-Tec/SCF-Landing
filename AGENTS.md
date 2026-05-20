# AGENTS.md — SCF-Landing

## Commands

- **Package manager**: `pnpm` (pinned in `packageManager` field). Do not use npm or yarn.
- `pnpm dev` — Vite dev server at `http://localhost:5173`.
- `pnpm build` — TypeScript project build (`tsc -b`) then Vite production build to `dist/`.
- `pnpm preview` — Preview the production build.
- `pnpm lint` — **Typecheck only** (`tsc -b --noEmit`). There is no ESLint or Prettier in this repo.

## Architecture

- Single-page Vite + React 18 + TypeScript landing site. Entry: `src/main.tsx` → `src/App.tsx`.
- All page copy and photo captions live in **`src/content.ts`**. Edit strings there to update sections without touching components.
- Event photos are in **`src/assets/photos/`**.

## Styling

- **Tailwind CSS v4** with no `tailwind.config.js`. Theme tokens (`@theme inline`) and CSS variables live in `src/index.css`.
- Uses `@tailwindcss/vite` plugin (see `vite.config.ts`).
- `cn()` utility is in `src/lib/utils.ts` (clsx + tailwind-merge).

## UI Components

- shadcn/ui configured with **`base-nova`** style (not new-york). Uses `@base-ui/react` primitives.
- Aliases from `components.json`: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`.

## Supabase / Registration

- Requires `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (copy from `.env.example`).
- The registration form gracefully handles missing config — it shows a hint instead of crashing.
- Expected table schema is commented in `src/lib/supabase.ts`.

## WebGL / Shaders

- Hero background, footer background, and liquid-metal logo use `@paper-design/shaders-react` (Paper Design Shaders).
- Shader components are **`lazy()`-loaded with `Suspense`** fallbacks in `Hero.tsx` and `Footer.tsx`.
- All shaders respect `prefers-reduced-motion` (static frame when enabled).

## TypeScript

- Strict mode with **`noUnusedLocals`** and **`noUnusedParameters`**. Unused imports or variables will fail `pnpm lint` and `pnpm build`.
- `tsconfig.json` uses project references (`tsconfig.app.json`, `tsconfig.node.json`). `tsc -b` from root is the correct way to typecheck.

## Notes

- No test suite, no CI workflows, no linting beyond typecheck.
- `pnpm-workspace.yaml` exists but only contains `allowBuilds: esbuild`; this is not a monorepo.
