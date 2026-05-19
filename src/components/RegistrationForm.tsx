import { useState, type FormEvent } from "react"
import { content } from "../content"
import { registerEmail, isSupabaseConfigured } from "../lib/supabase"

type Status = "idle" | "submitting" | "success" | "error"

export default function RegistrationForm() {
  const { registration } = content
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return

    setStatus("submitting")
    setErrorMsg(null)

    try {
      await registerEmail(email)
      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setErrorMsg(
        err instanceof Error ? err.message : registration.errorMessage,
      )
    }
  }

  return (
    <section
      id="register"
      className="border-t border-white/5 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-flame-400">
          {registration.eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          {registration.title}
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          {registration.description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={registration.placeholder}
            disabled={status === "submitting" || status === "success"}
            className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-flame-500/60 focus:bg-white/[0.06] disabled:opacity-60"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="rounded-full bg-flame-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-flame-500/30 transition hover:bg-flame-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : registration.submitLabel}
          </button>
        </form>

        <div className="mt-4 min-h-[1.5rem] text-sm" aria-live="polite">
          {status === "success" && (
            <p className="text-emerald-400">{registration.successMessage}</p>
          )}
          {status === "error" && (
            <p className="text-rose-400">
              {errorMsg ?? registration.errorMessage}
            </p>
          )}
          {status === "idle" && !isSupabaseConfigured && (
            <p className="text-slate-500">
              Supabase not configured yet — set env vars in <code>.env</code> to
              enable.
            </p>
          )}
        </div>

        <p className="mt-2 text-xs text-slate-500">
          {registration.privacyNote}
        </p>
      </div>
    </section>
  )
}
