import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { Resend } from "npm:resend@4"
import {
  buildTeamConfirmationEmail,
  teamConfirmationSubject,
  type TeamConfirmationEmailData,
} from "../_shared/email/teamConfirmationTemplate.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

type RequestPayload = TeamConfirmationEmailData

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const apiKey = Deno.env.get("RESEND_API_KEY")
  const fromEmail =
    Deno.env.get("RESEND_FROM") ?? "Swift Challenge Fest <onboarding@resend.dev>"
  const siteUrl = Deno.env.get("SITE_URL")

  if (!apiKey || apiKey === "re_xxxxxxxxx") {
    return new Response(
      JSON.stringify({
        error:
          "Email service not configured. Set RESEND_API_KEY (replace re_xxxxxxxxx with your real key) in Supabase secrets or .env for local serve.",
      }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }

  try {
    const body = (await req.json()) as RequestPayload
    const to = body.to?.trim().toLowerCase()
    const teamName = body.team_name?.trim()

    if (!to || !teamName || !body.university?.trim()) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const members = Array.isArray(body.members)
      ? body.members.filter((m) => m?.name?.trim())
      : []

    const emailData = {
      to,
      team_name: teamName,
      university: body.university.trim(),
      members,
      siteUrl,
    }

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: teamConfirmationSubject(teamName),
      html: buildTeamConfirmationEmail(emailData),
    })

    if (error) {
      console.error("Resend error:", error)
      return new Response(
        JSON.stringify({
          error: "Failed to send confirmation email",
          detail: error.message,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
