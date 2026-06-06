import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FadeIn from "@/components/effects/FadeIn"

export default function FAQSection() {
  const { faq } = content

  return (
    <Section id="faq" fullHeight={false}>
      <SectionHeading
        eyebrow={faq.eyebrow}
        title={faq.title}
      />

      <div className="mt-10 divide-y divide-border/80">
        {faq.items.map((item, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className="py-6">
              <h3 className="font-sans text-lg font-semibold text-foreground">
                {item.question}
              </h3>
              <p className="mt-2 font-sans text-base leading-relaxed tracking-[0.01em] text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
