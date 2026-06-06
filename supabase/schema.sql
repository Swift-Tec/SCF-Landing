-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run: uses IF NOT EXISTS where possible.

-- members jsonb shape: [{ "name": "...", "email": "..." }]  (email optional, max 4 members enforced in app)

-- Team registrations (used by /register)
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  team_name text not null,
  contact_email text not null,
  university text not null,
  members jsonb not null default '[]'::jsonb,
  status text not null default 'pending'
);

alter table public.teams enable row level security;

drop policy if exists "anon insert teams" on public.teams;
create policy "anon insert teams"
  on public.teams for insert to anon with check (true);

-- Optional: email waitlist (RegistrationForm component)
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

drop policy if exists "anon insert registrations" on public.registrations;
create policy "anon insert registrations"
  on public.registrations for insert to anon with check (true);
