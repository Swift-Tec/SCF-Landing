import { content } from "@/content"
import TiltCard from "@/components/effects/TiltCard"
import FadeIn from "@/components/effects/FadeIn"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EventDetails() {
  const { event } = content

  return (
    <section id="event" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn direction="left" className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {event.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl">
            {event.title}
          </h2>
          <p className="mt-6 font-sans text-lg font-light text-muted-foreground md:text-xl">
            {event.description}
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {event.details.map((detail, index) => (
            <FadeIn key={detail.label} delay={index * 0.08}>
              <TiltCard>
                <Card className="h-full border-border bg-card/80 transition-colors hover:border-primary/40">
                  <CardHeader className="pb-4">
                    <Badge
                      variant="outline"
                      className="w-fit border-accent/30 bg-accent/10 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-accent"
                    >
                      {detail.label}
                    </Badge>
                    <CardTitle className="font-sans text-xl font-semibold text-foreground">
                      {detail.value}
                    </CardTitle>
                    <CardDescription className="font-sans text-base font-light">
                      {detail.sub}
                    </CardDescription>
                  </CardHeader>
                  {"image" in detail && detail.image && (
                    <CardContent className="pt-0">
                      <img
                        src={detail.image}
                        alt=""
                        className="aspect-video w-full rounded-xl object-cover"
                        loading="lazy"
                      />
                    </CardContent>
                  )}
                </Card>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
