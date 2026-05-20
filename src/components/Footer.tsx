import { Suspense, lazy } from "react"
import { content } from "@/content"
import { Separator } from "@/components/ui/separator"

const GrainientBloom = lazy(() => import("@/components/effects/GrainientBloom"))

export default function Footer() {
  const { footer, brand } = content

  return (
    <footer className="relative overflow-hidden border-t border-border py-12">
      <Suspense fallback={null}>
        <GrainientBloom
          className="absolute inset-0"
          color1="#7c3aed"
          color2="#f97316"
          color3="#4c1d95"
          timeSpeed={0.15}
          grainAnimated
          style={{ opacity: 0.35 }}
        />
      </Suspense>

      <div className="relative mx-auto max-w-6xl px-6">
        <Separator className="mb-10 bg-border" />
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={brand.logo} alt="" className="size-8" />
            <span className="font-sans text-sm text-muted-foreground">
              {brand.name} · by {brand.org}
            </span>
          </div>

          <nav className="flex items-center gap-6">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="font-sans text-xs text-muted-foreground">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
