import sf2025 from "./assets/photos/sf2025.png"
import sfganadores2025 from "./assets/photos/sfganadores2025.png"
import participantes from "./assets/photos/participantes.png"
import presentation from "./assets/photos/presentation.png"
import visionPro from "./assets/photos/vision-pro.png"
import swiftLogoOrange from "./assets/photos/swift-logo-orange.png"
import swiftLogoWhite from "./assets/photos/swift-logo-white.png"
import airpodsMaxFront from "./assets/photos/airpods-max-front-trp.png"
import airpodsMaxBack from "./assets/photos/airpods-max-back-trp.png"

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
    { label: "Prizes", href: "#prizes" },
    { label: "Register", href: "#register" },
  ],

  hero: {
    titleTop: "Swift Challenge",
    titleBottom: "Fest 2026",
    photo: {
      src: sf2025,
      alt: "Swift Challenge Fest 2025 community group photo",
    },
  },

  gallery: {
    eyebrow: "Last year",
    title: "Swift Challenge Fest 2025",
    description:
      "Swift Challenge Fest is SwiftTec's community hackathon: a weekend where students and developers build real apps in Swift, learn from mentors, and present their work on stage. The 2025 edition was our first full run — teams shipped prototypes across iOS, macOS, and more, with workshops, mentorship, and a final demo day at the HUB. The photos below are from that weekend.",
    photos: [
      {
        src: sfganadores2025,
        alt: "Winners receiving first place awards on stage",
      },
      {
        src: participantes,
        alt: "Participants collaborating on a whiteboard wireframe",
      },
      {
        src: presentation,
        alt: "Presenters on stage with Swift Challenge Fest branding",
      },
      {
        src: visionPro,
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
  },

  event: {
    eyebrow: "The event",
    title: "What to expect.",
    description:
      "A focused two-day build where teams design, ship, and demo a Swift project from scratch — with mentors, workshops, and a final showcase judged by product and engineering leaders.",
    details: [
      {
        label: "Dates",
        value: "June 11 – 12",
        sub: "Two days of building, workshops, and demos",
      },
      {
        label: "Location",
        value: "HUB Garza T.",
        sub: "HUB de innovación y Emprendimiento Eduardo Garza T. · On-site · meals & swag included",
      },
      {
        label: "Format",
        value: "72-hour hackathon",
        sub: "Workshops · mentorship · final demos",
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

  prizes: {
    eyebrow: "What you can win",
    title: "Worth building for.",
    description:
      "Ship something great over the weekend and walk away with serious hardware. Three places. Three prizes. Zero boring rewards.",
    items: [
      {
        rank: 1,
        place: "First place",
        name: "AirPods Max 2",
        detail:
          "Apple's flagship over-ear headphones with adaptive audio and USB-C. Built for the team that builds the best.",
        tag: "Grand prize",
        image: airpodsMaxFront,
        imageBack: airpodsMaxBack,
        imageAlt: "AirPods Max 2",
      },
      {
        rank: 2,
        place: "Second place",
        name: "iPad",
        detail:
          "A brand-new iPad to keep building, sketching, and shipping long after the hackathon wraps.",
        tag: "Runner-up",
        image: null,
        imageBack: null,
        imageAlt: "",
      },
      {
        rank: 3,
        place: "Third place",
        name: "$1,000 MXN gift card",
        detail:
          "A $1,000 MXN gift card to spend however your team sees fit. Treat yourselves — you earned it.",
        tag: "Third prize",
        image: null,
        imageBack: null,
        imageAlt: "",
      },
    ],
  },

  registerCta: {
    headline: "Are you in?",
    description:
      "Join builders, mentors, and judges for the next edition. Registration opens soon — save your spot today.",
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
    copyright: `All Rights Reserved © ${new Date().getFullYear()} SwiftTec.`,
    privacy: { label: "Privacy & Policy", href: "#" },
    watermark: "SwiftTec",
  },
} as const

export type Content = typeof content
