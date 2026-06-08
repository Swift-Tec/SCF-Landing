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
    { label: "Learn", href: "#learn" },
    { label: "Agenda", href: "#agenda" },
    { label: "2025", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    titleTop: "Swift Challenge",
    titleBottom: "Fest 2026",
    date: "June 11 & 12, 2026",
    venue: "Innovation Hub (HUB Garza T.)",
    ctaLabel: "Register",
    photo: {
      src: sf2025,
      alt: "Swift Challenge Fest 2025 community group photo",
    },
  },

  gallery: {
    eyebrow: "Last year",
    title: "Swift Challenge Fest 2025",
    description:
      "Swift Challenge Fest is SwiftTec's community hackathon: a weekend where students and developers build real apps in Swift, learn from mentors, and present their work on stage. The 2025 edition was our first full run — teams shipped prototypes across iOS, macOS, and more, with workshops, mentorship, and a final demo day at the Innovation Hub. The photos below are from that weekend.",
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

  learn: {
    eyebrow: "The experience",
    title: "Learn, build and connect.",
    description:
      "Swift Challenge Fest brings together students passionate about the Apple ecosystem for two days of talks, hands-on workshops, and a hackathon. Whatever your level, you'll find activities built for you.",
    image: presentation,
    imageAlt: "Participants collaborating at Swift Challenge Fest",
    categories: [
      {
        title: "Hackathon",
        body: "Teams of 3. Live mentorship. Present to judges competing for prizes awarded to the best projects.",
      },
      {
        title: "Talks",
        body: "iOS, SwiftUI, UX Design, AI, and career paths — learn from people already working in the industry.",
      },
      {
        title: "Workshops",
        body: "Hands-on sessions covering Swift, SwiftUI, Apple frameworks, and developer tools.",
      },
      {
        title: "Networking",
        body: "Collaborative activities and social spaces to meet students and professionals in the field.",
      },
    ],
  },

  agenda: {
    eyebrow: "Agenda",
    title: "Two intense days.",
    columns: {
      time: "Time",
      event: "Event",
      location: "Location",
    },
    days: [
      {
        day: "Thursday, June 11",
        items: [
          {
            time: "5:30 pm",
            event: "Challenge launch",
            location: "A3-101",
          },
          {
            time: "5:30 pm onwards",
            event: "Dinner",
            location: "A3-101",
          },
        ],
      },
      {
        day: "Friday, June 12",
        items: [
          {
            time: "2:00 – 3:00 pm",
            event: "Roll call (app submission)",
            location: "Innovation Hub",
          },
          {
            time: "2:30 – 3:30 pm",
            event: "App showcase (R&D + general)",
            location: "Innovation Hub",
          },
          {
            time: "3:30 – 4:00 pm",
            event: "Alumni panel (celebration)",
            location: "Innovation Hub",
          },
          {
            time: "4:00 – 6:00 pm",
            event: "Pitches",
            location: "Innovation Hub",
          },
          {
            time: "6:00 – 6:30 pm",
            event: "Deliberation / community builders",
            location: "Innovation Hub",
          },
          {
            time: "6:30 – 7:00 pm",
            event: "Awards ceremony & closing",
            location: "Innovation Hub",
          },
        ],
      },
    ],
  },

  about: {
    eyebrow: "Who we are",
    title: "We are SwiftTec.",
    subtitle:
      "A student-led Apple developer community at Tecnológico de Monterrey. We run workshops, talks, and networking events — and every year we host Swift Challenge Fest, our flagship hackathon.",
    body: [
      "Engineers, designers, and students who build with Swift — across iOS, macOS, and beyond.",
      "Our flagship hackathon: one weekend to ship projects, learn from mentors, and demo on stage.",
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
        value: "Innovation Hub",
        sub: "HUB Garza T. · Innovation & Entrepreneurship Hub · On-site · meals & swag included",
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

  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions.",
    items: [
      {
        question: "Do I need Swift experience?",
        answer:
          "Not at all. We have tracks for every level — from complete beginners to developers already shipping on the Apple ecosystem.",
      },
      {
        question: "How are teams formed?",
        answer:
          "You can register with your own team or solo. If you come alone, we'll help you connect with other participants before the event.",
      },
      {
        question: "What does it cost to participate?",
        answer:
          "It's completely free. Your registration includes access to all workshops, mentorship sessions, food, and event swag.",
      },
      {
        question: "What should I bring?",
        answer:
          "Your laptop with Xcode installed, a charger, and the drive to learn and ship something great.",
      },
      {
        question: "Can I participate if I'm not a student?",
        answer:
          "The event is primarily aimed at university students, though early-career developers are welcome too.",
      },
    ],
  },

  weAreScroll: {
    words: ["innovative", "creative", "designers", "builders", "engineers"],
    photo: sf2025,
    photoAlt: "Swift Challenge Fest 2025 — community photo",
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
