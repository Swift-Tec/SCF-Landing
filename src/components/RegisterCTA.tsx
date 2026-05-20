import { Suspense, lazy } from "react"
import { content } from "@/content"
import FadeIn from "@/components/effects/FadeIn"

const Warp = lazy(() => import("@/components/effects/WarpBackground"))

function BackgroundFallback() {
  return <div className="absolute inset-0 bg-background" aria-hidden />
}

export default function RegisterCTA() {
  const { registerCta } = content

  return (
    <section className="relative overflow-hidden border-t border-border py-32 md:py-48">
      <Suspense fallback={<BackgroundFallback />}>
        <Warp />
      </Suspense>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <FadeIn direction="none">
          <h2 className="font-display text-6xl text-white md:text-7xl lg:text-8xl">
            {registerCta.headline}
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} direction="up">
          <p className="mx-auto mt-6 max-w-2xl font-sans text-xl font-light text-white/80 md:text-2xl">
            {registerCta.description}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
