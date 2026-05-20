import { useState, type FormEvent } from "react"
import { content } from "@/content"
import { registerEmail, isSupabaseConfigured } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FadeIn from "@/components/effects/FadeIn"

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
      className="border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {registration.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            {registration.title}
          </h2>
          <p className="mt-6 font-sans text-lg font-light text-muted-foreground">
            {registration.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end"
          >
            <div className="w-full flex-1 text-left">
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={registration.placeholder}
                disabled={status === "submitting" || status === "success"}
                className="h-11 rounded-full border-white/20 bg-white/10 px-5 font-sans text-white placeholder:text-white/50 backdrop-blur-xl"
              />
            </div>
            <Button
              type="submit"
              variant="glass"
              size="lg"
              disabled={status === "submitting" || status === "success"}
              className="w-full rounded-full px-8 sm:w-auto"
            >
              {status === "submitting"
                ? "Sending..."
                : registration.submitLabel}
            </Button>
          </form>
        </FadeIn>

        <div className="mt-4 min-h-6" aria-live="polite">
          {status === "success" && (
            <Alert className="border-emerald-500/30 bg-emerald-500/10 text-left">
              <AlertDescription className="text-emerald-400">
                {registration.successMessage}
              </AlertDescription>
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="destructive" className="text-left">
              <AlertDescription>
                {errorMsg ?? registration.errorMessage}
              </AlertDescription>
            </Alert>
          )}
          {status === "idle" && !isSupabaseConfigured && (
            <p className="font-sans text-sm text-muted-foreground">
              Supabase not configured yet — set env vars in{" "}
              <code className="text-foreground">.env</code> to enable.
            </p>
          )}
        </div>

        <p className="mt-4 font-sans text-xs text-muted-foreground">
          {registration.privacyNote}
        </p>
      </div>
    </section>
  )
}
