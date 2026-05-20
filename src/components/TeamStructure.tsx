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

export default function TeamStructure() {
  const { teams } = content

  return (
    <section id="teams" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {teams.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl">
            {teams.title}
          </h2>
          <p className="mt-6 font-sans text-lg font-light text-muted-foreground">
            {teams.description}
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {teams.roles.map((role, index) => (
            <FadeIn key={role.title} delay={index * 0.1}>
              <TiltCard className="h-full">
                <Card className="h-full border-border bg-card/80 transition-colors hover:border-primary/40">
                  <CardHeader>
                    <Badge
                      variant="outline"
                      className="w-fit border-secondary/30 bg-secondary/10 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-secondary-foreground"
                    >
                      {role.size}
                    </Badge>
                    <CardTitle className="font-display text-2xl text-foreground">
                      {role.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-sans text-base font-light leading-relaxed">
                      {role.body}
                    </CardDescription>
                  </CardContent>
                </Card>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
