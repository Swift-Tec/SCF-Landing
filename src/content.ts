import sf2025 from "./assets/photos/sf2025.png"
import sfganadores2025 from "./assets/photos/sfganadores2025.png"
import participantes from "./assets/photos/participantes.png"
import presentation from "./assets/photos/presentation.png"
import visionPro from "./assets/photos/vision-pro.png"
import swiftLogoOrange from "./assets/photos/swift-logo-orange.png"
import swiftLogoWhite from "./assets/photos/swift-logo-white.png"

export const content = {
  brand: {
    name: "Swift Challenge Fest",
    shortName: "SCF",
    org: "SwiftTec",
    tagline: "A hackathon built for Swift.",
    logo: swiftLogoOrange,
    logoWhite: swiftLogoWhite,
  },

  nav: [
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Event", href: "#event" },
    { label: "Teams", href: "#teams" },
    { label: "Register", href: "#register" },
  ],

  hero: {
    eyebrow: "Second Edition",
    title: "Swift Challenge Fest 2026",
    subtitle:
      "Three days. One language. Endless ideas. Join the SwiftTec community for a hackathon dedicated to building the next generation of apps with Swift.",
    primaryCta: { label: "Register now", href: "#register" },
    secondaryCta: { label: "Learn more", href: "#about" },
    stats: [
      { value: "72h", label: "of building" },
      { value: "100+", label: "Swift developers" },
      { value: "$10K", label: "in prizes" },
    ],
  },

  gallery: {
    eyebrow: "Last year",
    title: "Swift Challenge Fest 2025",
    description:
      "A glimpse at the community, the competition, and the energy that brought the first edition to life.",
    featured: {
      src: sf2025,
      caption: "Swift Challenge Fest 2025 — The community",
      alt: "Large group photo of Swift Challenge Fest 2025 participants and organizers",
    },
    photos: [
      {
        src: sfganadores2025,
        caption: "Swift Challenge Fest 2025 — First place winners",
        alt: "Winners receiving first place awards on stage",
      },
      {
        src: participantes,
        caption: "Swift Challenge Fest 2025 — Designing together",
        alt: "Participants collaborating on a whiteboard wireframe",
      },
      {
        src: presentation,
        caption: "Swift Challenge Fest 2025 — Ensamblando Realidades",
        alt: "Presenters on stage with Swift Challenge Fest branding",
      },
      {
        src: visionPro,
        caption: "Swift Challenge Fest 2025 — Exploring spatial computing",
        alt: "Developer using Apple Vision Pro during the hackathon",
      },
    ],
  },

  about: {
    eyebrow: "Who we are",
    title: "We are SwiftTec.",
    body: [
      "SwiftTec is a community of engineers, designers, and students who believe Swift is one of the most exciting languages to build with today — across iOS, macOS, server, and beyond.",
      "Swift Challenge Fest is our flagship hackathon: a focused weekend where builders ship Swift projects, learn from mentors, and meet the people pushing the language forward.",
    ],
    image: {
      src: presentation,
      caption: "Swift Challenge Fest 2025 — Opening presentation",
      alt: "Team presenting at Swift Challenge Fest 2025",
    },
  },

  event: {
    eyebrow: "The event",
    title: "What to expect.",
    description:
      "A three-day intensive where teams design, build, and demo a Swift project from scratch. Mentors from across the industry, workshops on the latest Swift features, and a final showcase with judges from leading product teams.",
    details: [
      {
        label: "Dates",
        value: "September 26 – 28, 2026",
        sub: "Friday evening kickoff through Sunday demos",
      },
      {
        label: "Location",
        value: "SwiftTec HQ — Buenos Aires, AR",
        sub: "On-site only · meals & swag included",
      },
      {
        label: "Format",
        value: "72-hour hackathon",
        sub: "Workshops · mentorship · final demos",
        image: visionPro,
      },
      {
        label: "Theme",
        value: "Announced at kickoff",
        sub: "Open category — build anything in Swift",
      },
    ],
  },

  teams: {
    eyebrow: "Team structure",
    title: "How teams work.",
    description:
      "You can register solo and we'll match you, or bring your own crew. Every team gets a mentor, a workspace, and access to all workshops.",
    roles: [
      {
        title: "Builders",
        size: "2 – 4 per team",
        body: "Engineers and designers shipping the project. Swift experience is welcome but not required — we have onboarding tracks for beginners.",
      },
      {
        title: "Mentors",
        size: "1 floating per 3 teams",
        body: "Senior Swift engineers and designers from partner companies, available throughout the weekend for unblocks and code review.",
      },
      {
        title: "Judges",
        size: "Panel of 5",
        body: "Product, design, and engineering leaders evaluating final demos on craft, originality, and execution.",
      },
    ],
  },

  registerCta: {
    headline: "Are you in?",
    description:
      "Join builders, mentors, and judges for three days of Swift. Registration opens soon — save your spot today.",
  },

  registration: {
    eyebrow: "Registration",
    title: "Save your spot.",
    description:
      "Drop your email and we'll send you the schedule, team-matching form, and travel details as soon as registration opens.",
    placeholder: "you@swift.dev",
    submitLabel: "Notify me",
    successMessage: "You're on the list. Check your inbox for confirmation.",
    errorMessage: "Something went wrong. Please try again.",
    privacyNote: "We'll only email you about Swift Challenge Fest.",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} SwiftTec. All rights reserved.`,
    links: [
      { label: "Code of Conduct", href: "#" },
      { label: "Contact", href: "mailto:hello@swifttec.dev" },
      { label: "Twitter", href: "#" },
    ],
  },
} as const

export type Content = typeof content
