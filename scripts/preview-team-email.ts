import { mkdirSync, writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildTeamConfirmationEmail } from "../supabase/functions/_shared/email/teamConfirmationTemplate.ts"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

const html = buildTeamConfirmationEmail({
  to: "team-lead@example.com",
  team_name: "The Swift Builders",
  university: "ITESM Campus Monterrey",
  members: [
    { name: "Jane Appleseed", email: "jane@example.com" },
    { name: "Alex Chen", email: "alex@example.com" },
    { name: "Sam Rivera" },
  ],
  siteUrl: "https://swift-challenge-fest.vercel.app",
})

const outDir = resolve(root, "emails")
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, "team-confirmation-preview.html"), html, "utf8")
console.log("Preview written to emails/team-confirmation-preview.html")
