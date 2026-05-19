import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null

// Table expected in Supabase:
//   create table registrations (
//     id uuid primary key default gen_random_uuid(),
//     email text not null unique,
//     created_at timestamptz not null default now()
//   );
//   alter table registrations enable row level security;
//   create policy "anon insert" on registrations
//     for insert to anon with check (true);
export async function registerEmail(email: string): Promise<void> {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env",
    )
  }

  const { error } = await supabase
    .from("registrations")
    .insert({ email: email.trim().toLowerCase() })

  if (error) {
    // Treat duplicate-email as a soft success so the UI can tell the user they're already signed up.
    if (error.code === "23505") return
    throw error
  }
}
