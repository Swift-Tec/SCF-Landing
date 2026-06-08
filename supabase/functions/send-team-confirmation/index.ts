import "jsr:@supabase/functions-js/edge-runtime.d.ts"
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

  const apiKey = Deno.env.get("BREVO_API_KEY")
  const fromEmail = Deno.env.get("BREVO_FROM_EMAIL") ?? ""
  const fromName = Deno.env.get("BREVO_FROM_NAME") ?? "Swift Challenge Fest"
  const siteUrl = Deno.env.get("SITE_URL")

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Email service not configured. Set BREVO_API_KEY in Supabase secrets." }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }

  if (!fromEmail) {
    return new Response(
      JSON.stringify({ error: "Email service not configured. Set BREVO_FROM_EMAIL in Supabase secrets." }),
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

    const htmlContent = buildTeamConfirmationEmail({
      to,
      team_name: teamName,
      university: body.university.trim(),
      members,
      siteUrl,
    })

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: to }],
        subject: teamConfirmationSubject(teamName),
        htmlContent,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error("Brevo error:", detail)
      return new Response(
        JSON.stringify({ error: "Failed to send confirmation email", detail }),
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
