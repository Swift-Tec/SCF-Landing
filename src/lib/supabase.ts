import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const MAX_TEAM_MEMBERS = 3

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null

type SupabaseErrorLike = {
  message?: string
  details?: string | null
  hint?: string | null
  code?: string
}

export function formatSupabaseError(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Something went wrong. Please try again."
  }

  const e = error as SupabaseErrorLike
  const parts = [e.message, e.details, e.hint].filter(
    (part): part is string => Boolean(part),
  )

  if (parts.length > 0) return parts.join(" — ")

  if (error instanceof Error && error.message) return error.message

  return "Something went wrong. Please try again."
}

export async function registerEmail(email: string): Promise<void> {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, then restart the dev server.",
    )
  }

  const { error } = await supabase
    .from("registrations")
    .insert({ email: email.trim().toLowerCase() })

  if (error) {
    if (error.code === "23505") return
    throw new Error(formatSupabaseError(error))
  }
}

export type TeamMember = {
  name: string
  email: string
}

export type TeamRegistration = {
  team_name: string
  contact_email: string
  university: string
  members: TeamMember[]
}

async function sendTeamConfirmationEmail(data: TeamRegistration): Promise<void> {
  if (!supabase) return

  const { data: result, error } = await supabase.functions.invoke(
    "send-team-confirmation",
    {
      body: {
        to: data.contact_email.trim().toLowerCase(),
        team_name: data.team_name.trim(),
        university: data.university.trim(),
        members: data.members.map((m) => ({
          name: m.name.trim(),
          email: m.email.trim() || undefined,
        })),
      },
    },
  )

  if (error) {
    throw new Error(formatSupabaseError(error))
  }

  if (result && typeof result === "object" && "error" in result) {
    const msg =
      typeof result.error === "string"
        ? result.error
        : "Confirmation email could not be sent."
    throw new Error(msg)
  }
}

export async function registerTeam(data: TeamRegistration): Promise<void> {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, then restart the dev server.",
    )
  }

  const members = data.members
    .filter((m) => m.name.trim())
    .map((m) => ({
      name: m.name.trim(),
      email: m.email.trim().toLowerCase(),
    }))

  if (members.length > MAX_TEAM_MEMBERS) {
    throw new Error(`Teams can have at most ${MAX_TEAM_MEMBERS} members.`)
  }

  const { error } = await supabase.from("teams").insert({
    team_name: data.team_name.trim(),
    contact_email: data.contact_email.trim().toLowerCase(),
    university: data.university.trim(),
    members,
  })

  if (error) throw new Error(formatSupabaseError(error))

  await sendTeamConfirmationEmail({ ...data, members })
}
