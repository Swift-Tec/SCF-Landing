import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null

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
    if (error.code === "23505") return
    throw error
  }
}

export type TeamMember = {
  name: string
  role: string
  email: string
}

export type TeamRegistration = {
  team_name: string
  contact_email: string
  university: string
  project_idea: string
  members: TeamMember[]
}

export async function registerTeam(data: TeamRegistration): Promise<void> {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env",
    )
  }

  const { error } = await supabase.from("teams").insert({
    team_name: data.team_name.trim(),
    contact_email: data.contact_email.trim().toLowerCase(),
    university: data.university.trim(),
    project_idea: data.project_idea.trim(),
    members: data.members,
  })

  if (error) throw error
}
