/**
 * Local Resend smoke test — verifies your API key from .env works.
 * Run: pnpm email:test
 *
 * Replace re_xxxxxxxxx in .env with your real Resend API key first.
 */
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { Resend } from "resend"

function loadEnv() {
  const path = resolve(process.cwd(), ".env")
  try {
    const raw = readFileSync(path, "utf8")
    for (const line of raw.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    // .env optional if vars already exported
  }
}

loadEnv()

const apiKey = process.env.RESEND_API_KEY
const to = process.env.RESEND_TEST_TO ?? "luisboltech005@outlook.com"
const from =
  process.env.RESEND_FROM ?? "Swift Challenge Fest <onboarding@resend.dev>"

if (!apiKey || apiKey === "re_xxxxxxxxx") {
  console.error(
    "Missing RESEND_API_KEY. Add your real key to .env (replace re_xxxxxxxxx).",
  )
  process.exit(1)
}

const resend = new Resend(apiKey)

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: "Swift Challenge Fest — test email",
  html: "<p>Congrats — your <strong>Resend API key</strong> is working!</p>",
})

if (error) {
  console.error("Resend error:", error)
  process.exit(1)
}

console.log("Email sent:", data)
