import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { content } from "@/content"
import { registerEmail, isSupabaseConfigured } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type Status = "idle" | "submitting" | "success" | "error"

type RegistrationFormProps = {
  className?: string
}

export default function RegistrationForm({ className }: RegistrationFormProps) {
  const { registration } = content
  const reducedMotion = useReducedMotion()
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
    <div className={cn("w-full max-w-xl", className)}>
      <p className="page-eyebrow text-muted-foreground">{registration.eyebrow}</p>
      <h2 className="page-display-sm mt-4">
        {registration.title}
      </h2>
      <p className="page-body mt-6">{registration.description}</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col items-end gap-4 sm:flex-row"
      >
        <div className="w-full flex-1">
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={registration.placeholder}
            disabled={status === "submitting" || status === "success"}
            className="w-full border-0 border-b border-border bg-transparent pb-2 font-sans text-base text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground focus:border-foreground"
          />
        </div>
        <motion.div
          whileHover={reducedMotion ? undefined : { scale: 1.02 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            type="submit"
            variant="cta"
            size="lg"
            disabled={status === "submitting" || status === "success"}
            className="h-11 rounded-full px-8"
          >
            {status === "submitting"
              ? "Sending..."
              : registration.submitLabel}
          </Button>
        </motion.div>
      </form>

      <div className="mt-4 min-h-6" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              key="success"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Alert className="border-emerald-200 bg-emerald-50 text-left">
                <AlertDescription className="font-medium text-emerald-800">
                  {registration.successMessage}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              key="error"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Alert variant="destructive" className="text-left">
                <AlertDescription>
                  {errorMsg ?? registration.errorMessage}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          {status === "idle" && !isSupabaseConfigured && (
            <motion.p
              key="hint"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="page-body !text-sm"
            >
              Supabase not configured yet — set env vars in{" "}
              <code className="font-semibold text-foreground">.env</code> to
              enable.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="page-body mt-4 !text-xs">{registration.privacyNote}</p>
    </div>
  )
}
