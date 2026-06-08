import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Plus, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react"
import {
  registerTeam,
  isSupabaseConfigured,
  MAX_TEAM_MEMBERS,
  type TeamMember,
} from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { content } from "@/content"

type Status = "idle" | "submitting" | "success" | "error"

const EMPTY_MEMBER: TeamMember = { name: "", email: "" }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(
  teamName: string,
  university: string,
  contactEmail: string,
  members: TeamMember[],
): string | null {
  if (teamName.trim().length < 3) return "Team name must be at least 3 characters."
  if (university.trim().length < 3) return "University must be at least 3 characters."
  if (!EMAIL_RE.test(contactEmail.trim())) return "Please enter a valid team leader email."
  for (const [i, m] of members.entries()) {
    if (m.email.trim() && !EMAIL_RE.test(m.email.trim()))
      return `Member ${i + 1} has an invalid email address.`
  }
  return null
}

const inputClass =
  "w-full border-0 border-b border-border bg-transparent pb-2 font-sans text-base text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-foreground/50 transition-colors"

const labelClass =
  "block font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-0">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  )
}

export default function TeamRegisterPage() {
  const [teamName, setTeamName] = useState("")
  const [university, setUniversity] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [members, setMembers] = useState<TeamMember[]>([{ ...EMPTY_MEMBER }])
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  function addMember() {
    if (members.length >= MAX_TEAM_MEMBERS) return
    setMembers((prev) => [...prev, { ...EMPTY_MEMBER }])
  }

  function removeMember(i: number) {
    setMembers((prev) => prev.filter((_, idx) => idx !== i))
  }

  function updateMember(i: number, field: keyof TeamMember, value: string) {
    setMembers((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)),
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      setStatus("error")
      setErrorMsg(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env, then restart pnpm dev.",
      )
      return
    }

    const validationError = validateForm(teamName, university, contactEmail, members)
    if (validationError) {
      setStatus("error")
      setErrorMsg(validationError)
      return
    }

    setStatus("submitting")
    setErrorMsg(null)

    try {
      await registerTeam({
        team_name: teamName,
        contact_email: contactEmail,
        university,
        members: members.filter((m) => m.name.trim()),
      })
      setStatus("success")
    } catch (err) {
      setStatus("error")
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setErrorMsg(
        msg.includes("duplicate") || msg.includes("unique")
          ? "This email is already registered. Each team leader can only register once."
          : msg,
      )
    }
  }

  if (status === "success") {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-lg flex-col items-center text-center"
        >
          <CheckCircle2 className="mb-6 size-16 text-foreground" />
          <h1 className="font-sans text-4xl font-semibold text-foreground">
            You're registered!
          </h1>
          <p className="mt-4 font-sans text-lg text-muted-foreground">
            Team <span className="font-semibold text-foreground/70">"{teamName}"</span> is on the list.
            A confirmation email was sent to{" "}
            <span className="font-semibold text-foreground/70">{contactEmail}</span>.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 font-sans text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground/70"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">

      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground/70 mb-12"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {content.brand.shortName} · {new Date().getFullYear()}
          </p>
          <h1 className="mt-3 font-sans text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Register your team
          </h1>
          <p className="mt-5 font-sans text-lg text-muted-foreground">
            Fill in your team details below. Up to {MAX_TEAM_MEMBERS} members per team.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-14 flex flex-col gap-10">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
              Team Info
            </h2>

            <Field label="Team Name">
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. The Swift Builders"
                className={inputClass}
              />
            </Field>

            <Field label="University / Institution">
              <input
                type="text"
                required
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="e.g. ITESM Campus Monterrey"
                className={inputClass}
              />
            </Field>

            <Field label="Team leader email">
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="team-lead@example.com"
                className={inputClass}
              />
              <p className="mt-2 font-sans text-xs text-muted-foreground">
                We'll send registration updates and event details to this address.
              </p>
            </Field>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                Team Members
              </h2>
              <span className="font-sans text-xs text-muted-foreground/70">
                {members.length} / {MAX_TEAM_MEMBERS}
              </span>
            </div>

            <AnimatePresence initial={false}>
              {members.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-sans text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
                      Member {i + 1}
                    </span>
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(i)}
                        className="text-black/25 transition-colors hover:text-red-400"
                        aria-label="Remove member"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2">
                    <Field label="Full Name">
                      <input
                        type="text"
                        required
                        value={member.name}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder="Jane Appleseed"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email (optional)">
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateMember(i, "email", e.target.value)}
                        placeholder="jane@example.com"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {members.length < MAX_TEAM_MEMBERS && (
              <button
                type="button"
                onClick={addMember}
                className="flex items-center gap-2 self-start rounded-full border border-border px-4 py-2 font-sans text-sm text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground/60"
              >
                <Plus className="size-4" />
                Add member
              </button>
            )}
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 pt-4"
          >
            {!isSupabaseConfigured && (
              <p className="rounded-xl bg-amber-50 px-4 py-3 font-sans text-sm text-amber-900">
                Supabase is not loaded. Check <code className="font-semibold">.env</code>{" "}
                and restart the dev server (<code className="font-semibold">pnpm dev</code>).
              </p>
            )}

            {status === "error" && (
              <p className="rounded-xl bg-red-50 px-4 py-3 font-sans text-sm text-red-600">
                {errorMsg}
              </p>
            )}

            <Button
              type="submit"
              variant="cta"
              size="lg"
              disabled={status === "submitting" || !isSupabaseConfigured}
              className="h-14 w-full rounded-full text-base font-semibold"
            >
              {status === "submitting" ? "Registering…" : "Register Team"}
            </Button>

            <p className="text-center font-sans text-xs text-muted-foreground/70">
              By registering you agree to our event rules and code of conduct.
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
