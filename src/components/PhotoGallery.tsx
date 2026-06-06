import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import AnimatedPhoto from "@/components/effects/AnimatedPhoto"

export default function PhotoGallery() {
  const { gallery } = content

  return (
    <Section
      id="gallery"
    >
      <SectionHeading
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        description={gallery.description}
        size="hero"
      />

      <div className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-5 md:grid-cols-12 md:gap-6">
        {gallery.photos.map((photo, index) => (
          <AnimatedPhoto
            key={photo.alt}
            src={photo.src}
            alt={photo.alt}
            className={
              index === 0
                ? "md:col-span-7"
                : index === 1
                  ? "md:col-span-5 md:translate-y-16"
                  : index === 2
                    ? "md:col-span-5"
                    : "md:col-span-7 md:translate-y-10"
            }
            enterScale={0.98}
            delay={index * 0.1}
            imageClassName={
              index === 0 || index === 3
                ? "aspect-[4/3] rounded-[2rem]"
                : "aspect-[5/4] rounded-[2rem]"
            }
          />
        ))}
      </div>
    </Section>
  )
}
