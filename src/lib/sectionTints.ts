/** Warm Swift orange — large display titles */
export const swiftOrange = "#FA7343"

export const sectionTints = {
  heroTop: swiftOrange,
  heroBottom: swiftOrange,
  gallery: swiftOrange,
  about: swiftOrange,
  event: swiftOrange,
  teams: swiftOrange,
  prizes: swiftOrange,
  register: swiftOrange,
  footer: swiftOrange,
} as const

export const progressBarColor = swiftOrange

export type SectionTint = keyof typeof sectionTints

export function tintColor(tint: SectionTint): string {
  return sectionTints[tint]
}
