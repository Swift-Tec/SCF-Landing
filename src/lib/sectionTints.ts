/** Shared accent — rainbow reserved for hero script word and subtle accents */
export const rainbowGradient =
  "linear-gradient(90deg, #FF6B6B 0%, #FF9500 20%, #FFCC00 40%, #4CD964 60%, #007AFF 80%, #AF52DE 100%)"

export const foreground = "#1d1d1f"
export const mutedForeground = "#6e6e73"
export const subtleBorder = "rgba(0, 0, 0, 0.1)"

/** Neutral palette — headings and UI follow hero (black on white) */
export const sectionTints = {
  heroTop: foreground,
  heroBottom: foreground,
  gallery: foreground,
  learn: foreground,
  agenda: foreground,
  about: foreground,
  event: foreground,
  teams: foreground,
  prizes: foreground,
  faq: foreground,
  register: foreground,
  footer: "rgba(255,255,255,0.22)",
} as const

export const progressBarColor = foreground

export type SectionTint = keyof typeof sectionTints

export function tintColor(tint: SectionTint): string {
  return sectionTints[tint]
}
