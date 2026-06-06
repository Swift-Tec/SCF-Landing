/** Brand tokens — keep in sync with src/index.css & src/lib/sectionTints.ts */
export const emailTheme = {
  swiftOrange: "#FA7343",
  background: "#FFFFFF",
  foreground: "#1D1D1F",
  muted: "#6E6E73",
  mutedBg: "#F5F5F7",
  border: "rgba(0, 0, 0, 0.10)",
  cardRadius: "32px",
  fontStack:
    'ui-rounded, "SF Pro Rounded", "SF Compact Rounded", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
} as const

export type TeamMember = {
  name: string
  email?: string
}

export type TeamConfirmationEmailData = {
  to: string
  team_name: string
  university: string
  members: TeamMember[]
  /** Optional public site URL for CTA button (e.g. https://yoursite.com) */
  siteUrl?: string
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function memberRows(members: TeamMember[]): string {
  if (members.length === 0) return ""

  const rows = members
    .map(
      (m, i) => `
        <tr>
          <td style="padding: ${i === 0 ? "0" : "12px"} 0 0; font-family: ${emailTheme.fontStack}; font-size: 15px; line-height: 1.5; color: ${emailTheme.foreground};">
            <span style="display: inline-block; min-width: 24px; color: ${emailTheme.muted}; font-size: 12px; font-weight: 600; letter-spacing: 0.08em;">${String(i + 1).padStart(2, "0")}</span>
            <strong style="font-weight: 600;">${escapeHtml(m.name)}</strong>
            ${m.email ? `<br /><span style="color: ${emailTheme.muted}; font-size: 14px;">${escapeHtml(m.email)}</span>` : ""}
          </td>
        </tr>`,
    )
    .join("")

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 28px;">
      <tr>
        <td style="font-family: ${emailTheme.fontStack}; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${emailTheme.muted}; padding-bottom: 12px;">
          Team members
        </td>
      </tr>
      ${rows}
    </table>`
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid ${emailTheme.border};">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="font-family: ${emailTheme.fontStack}; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: ${emailTheme.muted}; width: 38%; vertical-align: top;">
              ${escapeHtml(label)}
            </td>
            <td style="font-family: ${emailTheme.fontStack}; font-size: 16px; font-weight: 600; letter-spacing: 0.02em; color: ${emailTheme.foreground}; vertical-align: top;">
              ${escapeHtml(value)}
            </td>
          </tr>
        </table>
      </td>
    </tr>`
}

export function buildTeamConfirmationEmail(data: TeamConfirmationEmailData): string {
  const t = emailTheme
  const siteUrl = data.siteUrl?.replace(/\/$/, "") ?? "https://swiftchallengefest.com"
  const membersHtml = memberRows(data.members)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Swift Challenge Fest — Registration confirmed</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${t.mutedBg}; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    You're registered for Swift Challenge Fest 2026 — team ${escapeHtml(data.team_name)}.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${t.mutedBg};">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: ${t.background}; border-radius: ${t.cardRadius}; border: 1px solid ${t.border}; overflow: hidden;">

          <!-- Orange accent bar -->
          <tr>
            <td height="4" style="background-color: ${t.swiftOrange}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 8px; font-family: ${t.fontStack};">
              <p style="margin: 0 0 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${t.muted};">
                SwiftTec · SCF 2026
              </p>
              <p style="margin: 0; font-size: clamp(28px, 8vw, 42px); font-weight: 600; line-height: 0.95; letter-spacing: 0.05em; color: ${t.swiftOrange};">
                Swift Challenge
              </p>
              <p style="margin: 4px 0 0; font-size: clamp(28px, 8vw, 42px); font-weight: 600; line-height: 0.95; letter-spacing: 0.05em; color: ${t.swiftOrange};">
                Fest 2026
              </p>
            </td>
          </tr>

          <!-- Hero copy -->
          <tr>
            <td style="padding: 24px 40px 0; font-family: ${t.fontStack};">
              <h1 style="margin: 0 0 12px; font-size: 28px; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; color: ${t.foreground};">
                You're registered!
              </h1>
              <p style="margin: 0; font-size: 17px; line-height: 1.65; color: ${t.muted};">
                Hi there — we received your team registration for
                <strong style="color: ${t.foreground}; font-weight: 600;">${escapeHtml(data.team_name)}</strong>.
                We'll use this email for schedule updates, venue info, and next steps.
              </p>
            </td>
          </tr>

          <!-- Team details card -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${t.background}; border: 1px solid ${t.border}; border-radius: 24px;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <p style="margin: 0 0 4px; font-family: ${t.fontStack}; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${t.muted};">
                      Your registration
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 8px;">
                      ${detailRow("Team", data.team_name)}
                      ${detailRow("University", data.university)}
                      ${detailRow("Leader email", data.to)}
                    </table>
                    ${membersHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Event snapshot -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${t.mutedBg}; border-radius: 24px;">
                <tr>
                  <td style="padding: 24px 28px; font-family: ${t.fontStack};">
                    <p style="margin: 0 0 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${t.muted};">
                      The event
                    </p>
                    <p style="margin: 0 0 16px; font-size: 22px; font-weight: 600; line-height: 1.2; letter-spacing: 0.02em; color: ${t.swiftOrange};">
                      June 11 – 12
                    </p>
                    <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: ${t.foreground};">
                      HUB Garza T.
                    </p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: ${t.muted};">
                      A focused weekend hackathon — build in Swift, learn from mentors, and demo on stage. Meals &amp; swag included.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 36px 40px 12px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="border-radius: 999px; background-color: ${t.background}; border: 1px solid ${t.border};">
                    <a href="${escapeHtml(siteUrl)}" target="_blank" style="display: inline-block; padding: 14px 32px; font-family: ${t.fontStack}; font-size: 16px; font-weight: 600; color: ${t.foreground}; text-decoration: none; border-radius: 999px;">
                      Visit the event site →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 40px; font-family: ${t.fontStack};">
              <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.6; color: ${t.muted};">
                Questions? Reply to this email and we'll get back to you.
              </p>
              <p style="margin: 24px 0 0; font-size: 36px; font-weight: 600; line-height: 0.9; letter-spacing: 0.04em; color: ${t.swiftOrange}; opacity: 0.35;">
                SwiftTec
              </p>
              <p style="margin: 12px 0 0; font-size: 12px; color: ${t.muted};">
                © ${new Date().getFullYear()} SwiftTec · Swift Challenge Fest
              </p>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
</body>
</html>`
}

export function teamConfirmationSubject(teamName: string): string {
  return `Swift Challenge Fest — ${teamName} is registered`
}
