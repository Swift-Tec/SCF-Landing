# Swift Challenge Fest Landing Page — Redesign Changelog

This document summarizes the redesign of the SCF landing page from a static, generic dark theme into a premium, animated challenge landing experience.

---

## Tooling & package manager

| Before | After |
|---|---|
| npm (`package-lock.json`) | **pnpm** (`pnpm-lock.yaml`, `packageManager: pnpm@10.11.0`) |
| No path aliases | `@/` alias in `vite.config.ts` and `tsconfig.app.json` |

### New dependencies

- **framer-motion** — scroll reveals, 3D card tilt, text lens effect
- **@paper-design/shaders-react** — hero/footer shader backgrounds, liquid-metal logo
- **shadcn/ui stack** — `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `lucide-react`
- **@types/node** — Vite path resolution in TypeScript

### Removed

- `package-lock.json` (replaced by pnpm)

---

## Design system

### Color palette (solid colors only — no CSS gradients on UI)

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#f97316` | CTAs, accents, captions |
| `--background` | `#0a0a0f` | Page base |
| `--foreground` | `#f1f5f9` | Body text |
| `--muted-foreground` | `#94a3b8` | Secondary text |
| `--accent` | `#6366f1` | Event detail badges |
| `--secondary` | `#7c3aed` | Team role badges |
| `--card` | `#111827` | Card surfaces |
| `--border` | `rgba(255,255,255,0.08)` | Borders |

### Typography

- **Instrument Serif** (Google Fonts) — display headlines, hero title, “Are you in?”
- **SF Pro / Inter** — body and UI (`-apple-system`, `BlinkMacSystemFont`, `"Inter"`)
- Removed `.text-gradient-flame`, `.glow-flame`, and `.bg-grid` utilities

### shadcn/ui components added

`button`, `input`, `card`, `badge`, `separator`, `label`, `alert` — configured via `components.json` (base-nova style).

---

## Page structure

### Before

```
Navbar → Hero → About → EventDetails → TeamStructure → RegistrationForm → Footer
```

### After

```
Navbar → Hero → PhotoGallery → About → EventDetails → TeamStructure → RegisterCTA → RegistrationForm → Footer
```

Navigation now includes a **Gallery** link (`#gallery`).

---

## New files

### Effect components (`src/components/effects/`)

| File | Purpose |
|---|---|
| `ShaderBackground.tsx` | GrainGradient shader (orange/blue/purple) for hero and footer |
| `LiquidMetalLogo.tsx` | Animated liquid-metal Swift logo using Paper Design shaders |
| `TiltCard.tsx` | 3D perspective card tilt on mouse move (FlipTilt-style) |
| `TextRevealLens.tsx` | Cursor-following circular lens reveal for “Are you in?” |
| `AnimatedPhoto.tsx` | Scroll-triggered photo entrance with hover scale |
| `FadeIn.tsx` | Reusable `whileInView` fade-up wrapper |
| `StaggerChildren.tsx` | Staggered child animations for text blocks |

### Section components

| File | Purpose |
|---|---|
| `PhotoGallery.tsx` | 2025 event photos directly below hero |
| `RegisterCTA.tsx` | “Are you in?” call-to-action with lens effect |

### Utilities & hooks

| File | Purpose |
|---|---|
| `src/lib/utils.ts` | `cn()` helper and `prefersReducedMotion()` |
| `src/hooks/useReducedMotion.ts` | React hook for motion preference |

### Assets (`src/assets/photos/`)

| File | Usage |
|---|---|
| `sf2025.png` | Featured gallery photo (community group shot) |
| `sfganadores2025.png` | First place winners |
| `participantes.png` | Whiteboard brainstorming session |
| `presentation.png` | Opening presentation / About section |
| `vision-pro.png` | Spatial computing / Event Format card |
| `swift-logo-white.png` | Liquid-metal hero logo mask |
| `swift-logo-orange.png` | Navbar logo and favicon |

---

## Section-by-section changes

### Hero (`src/components/Hero.tsx`)

- Full-bleed **GrainGradient** shader background (lazy-loaded)
- **LiquidMetal** animated Swift logo instead of static `<img>`
- Title updated to **“Swift Challenge Fest 2026”**
- **“Second Edition”** badge (shadcn `Badge`)
- shadcn-styled CTA links (Register / Learn more)
- Staggered entrance animations via Framer Motion
- Stats row with shadcn `Separator`

### PhotoGallery (`src/components/PhotoGallery.tsx`) — new

- Placed **immediately below the hero**
- Full-width featured community photo
- 2-column grid for four additional photos
- Every photo captioned: `Swift Challenge Fest 2025 — [description]`
- Scroll-reveal animations on each image

### About (`src/components/About.tsx`)

- Split layout: copy + presentation photo
- Staggered paragraph reveals
- shadcn semantic colors and typography

### EventDetails (`src/components/EventDetails.tsx`)

- Plain div cards → shadcn `Card` inside `TiltCard`
- `Badge` labels for Dates, Location, Format, Theme
- Vision Pro photo inset on the Format card

### TeamStructure (`src/components/TeamStructure.tsx`)

- 3-column `TiltCard` + shadcn `Card` layout
- Purple secondary badges for role sizes
- Hover border shifts to primary orange

### RegisterCTA (`src/components/RegisterCTA.tsx`) — new

- **“Are you in?”** headline with `TextRevealLens` mouse effect
- Supporting copy above the registration form

### RegistrationForm (`src/components/RegistrationForm.tsx`)

- Migrated to shadcn `Input`, `Button`, `Label`, `Alert`
- Supabase registration logic unchanged (`src/lib/supabase.ts`)

### Navbar & Footer

- **Navbar**: shadcn `buttonVariants`, brand logo from `content.ts`, Gallery nav link
- **Footer**: subtle shader background, shadcn `Separator`, updated styling

---

## Content updates (`src/content.ts`)

- Hero title → **Swift Challenge Fest 2026**, eyebrow → **Second Edition**
- Added `gallery` section with photo metadata and captions
- Added `registerCta` copy block
- Brand logos reference imported assets (`logo`, `logoWhite`)
- Nav includes `#gallery`

---

## Motion & accessibility

- Shader components lazy-loaded via `React.lazy` + `Suspense`
- `prefers-reduced-motion: reduce` disables shader animation, 3D tilt, and lens tracking
- Shader layers marked `aria-hidden`
- Photos use descriptive `alt` text from content
- Smooth scroll preserved for hash navigation

---

## Config & docs

| File | Change |
|---|---|
| `index.html` | Google Fonts (Instrument Serif, Inter), favicon → `/favicon.png`, updated meta title |
| `src/index.css` | shadcn CSS variables, font tokens, removed gradient utilities |
| `vite.config.ts` | `@/` path alias |
| `tsconfig.app.json` | Path mapping for `@/*` |
| `README.md` | pnpm commands, new stack description, asset paths, shader performance notes |

---

## Framer Marketplace → React equivalents

The Framer Marketplace components referenced in the design brief are Framer-only. Equivalent behavior was implemented as follows:

| Framer component | Implementation |
|---|---|
| Grainient Bloom | `@paper-design/shaders-react` → `GrainGradient` |
| Liquid Metal Logo | `@paper-design/shaders-react` → `LiquidMetal` |
| FlipTilt | Custom `TiltCard` with Framer Motion |
| Text Reveal Lens | Custom `TextRevealLens` with Framer Motion clip-path |

---

## Unchanged

- **Supabase** email waitlist flow (`src/lib/supabase.ts`, `.env.example`)
- **Vite + React 18 + TypeScript** core stack
- **Tailwind CSS v4** (CSS-first config)
- Event location/date copy (Buenos Aires, Sep 26–28 2026) — photo captions reference the 2025 edition

---

## How to run

```bash
pnpm install
cp .env.example .env   # optional: Supabase registration
pnpm dev
pnpm build
```

---

## Iteration 2 — Framer Marketplace shaders, glassmorphism, light/dark mode, scroll animations

### New dependencies

- **three** + **@types/three** — Grainient Bloom shader (Three.js WebGL)

### New files

| File | Purpose |
|---|---|
| `src/components/effects/GrainientBloom.tsx` | Three.js port of Grainient Bloom (purple/orange) |
| `src/components/effects/WarpBackground.tsx` | `@paper-design/shaders-react` Warp preset for RegisterCTA |
| `src/components/effects/ScrollProgress.tsx` | Scroll progress bar (`useScroll` + `useSpring`) |
| `src/hooks/useTheme.ts` | `localStorage` + `matchMedia` theme toggle hook |
| `src/components/ThemeProvider.tsx` | Hydrates `data-theme` attribute on mount |
| `AGENTS.md` | Repo-specific instructions for future agent sessions |

### Removed / replaced

| File | Reason |
|---|---|
| `ShaderBackground.tsx` | Replaced by `GrainientBloom.tsx` |
| `LiquidMetalLogo.tsx` | Removed in favor of plain `swift-logo-white.png` |
| `FramerLiquidMetal.tsx` | Built then removed — user preferred static logo |

### Design system updates

#### Light / dark mode

- Added `data-theme="light"` CSS overrides in `src/index.css`
- `useTheme` hook persists choice to `localStorage` and listens to `prefers-color-scheme`
- Navbar, hero text, RegisterCTA text remain **explicit white** so they stay readable on vibrant shader backgrounds regardless of theme

#### New button variant: `glass`

Added to `buttonVariants` CVA in `src/components/ui/button.tsx`:
- `border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-xl`
- Hover: `bg-white/20 border-white/30`
- Used for: hero CTAs, navbar Register, navbar theme toggle, registration submit

### Hero (`src/components/Hero.tsx`)

| Change | Detail |
|---|---|
| Background | `GrainientBloom` (Three.js) with `#7c3aed` / `#f97316` / `#4c1d95` |
| Sizing | `min-h-[100dvh]` — full viewport height |
| Logo | Static `swift-logo-white.png` at `h-48 w-48 md:h-64 md:w-64` (no liquid metal) |
| Text colors | Explicit `text-white`, `text-white/70`, `text-white/60` (theme-independent) |
| CTAs | Glass variant buttons (see above) |
| Parallax | Scroll-driven background translateY (`useScroll` + `useTransform`) |
| Logo scroll fade | Scale `1 → 0.85` and opacity `1 → 0.5` as user scrolls down |
| Fallback | Shader wrapped in oversized `motion.div` (`-inset-[60px]`) to prevent edge gaps during parallax |

### Navbar (`src/components/Navbar.tsx`)

| Change | Detail |
|---|---|
| Shape | Floating **rounded pill** (`rounded-full`, `top-4`, centered with `left-1/2 -translate-x-1/2`) |
| Width | `w-[calc(100%-2rem)] max-w-5xl` — responsive but not full-width |
| Background | `bg-black/50 backdrop-blur-2xl` — **always dark**, so white text/buttons are always visible |
| Text | `text-white` / `text-white/70` — fixed, not theme-dependent |
| Logo | Switched to `swift-logo-white.png` |
| Theme toggle | Glass-style icon button |
| Register | Glass variant button |

### RegisterCTA (`src/components/RegisterCTA.tsx`)

| Change | Detail |
|---|---|
| Background | `Warp` shader (`@paper-design/shaders-react`) with purple/orange |
| Size | Enlarged to `py-32 md:py-48` |
| Vision Pro image | **Removed** per user request |
| Layout | Centered headline + description only |
| Text | `text-white` headline (`text-6xl md:text-7xl lg:text-8xl`) + `text-white/80` description |

### Footer (`src/components/Footer.tsx`)

- Replaced `ShaderBackground` with `GrainientBloom` (same purple/orange config as hero)

### About (`src/components/About.tsx`)

| Change | Detail |
|---|---|
| Image size | `lg:scale-105` on photo |
| Animations | Heading slides from **left**, image slides from **right** (`direction` prop) |

### EventDetails (`src/components/EventDetails.tsx`)

| Change | Detail |
|---|---|
| Cards | Larger gaps (`gap-6`), bigger titles (`text-xl`) and descriptions (`text-base`) |
| Animations | Heading slides from **left** |

### Global scroll feel

| Addition | Detail |
|---|---|
| `ScrollProgress` | Animated orange bar at top of viewport (`scaleX` driven by `useSpring`) |
| `FadeIn` enhancement | New `direction` prop: `up` (default), `down`, `left`, `right`, `none` |
| Parallax | Hero shader background moves slower than scroll |
| Accessibility | All scroll-driven motion checks `prefers-reduced-motion` and disables transforms when active |

### RegistrationForm (`src/components/RegistrationForm.tsx`)

- Email input: glassmorphism style (`border-white/20 bg-white/10 placeholder:text-white/50 backdrop-blur-xl`)
- Submit button: `variant="glass"`

