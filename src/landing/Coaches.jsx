import { useStore } from '../store/AppStore'
import { Photo, Section, SectionHeading } from '../components/ui'

export default function Coaches() {
  const { trainers } = useStore()
  const active = trainers.filter((t) => t.active)

  return (
    <Section id="coaches">
      <SectionHeading eyebrow="The Coaches" highlight="Machines don't coach." className="mb-4 max-w-3xl">
        These people do.
      </SectionHeading>
      <p className="font-body-lg text-secondary max-w-2xl mb-12">
        Every member is assigned a coach on day one. You are never left to figure out the floor
        alone.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {active.map((t) => (
          <div
            key={t.id}
            className="group bg-surface-charcoal border border-white/5 inner-glow rounded overflow-hidden flex flex-col hover:border-electric-gold/40 transition-colors duration-200"
          >
            <Photo
              imgKey={t.photo}
              className="h-64 w-full"
              imgClassName="object-top opacity-75 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-surface-charcoal via-transparent to-transparent" />
            </Photo>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-headline-md text-xl uppercase italic text-primary mb-1">
                {t.name}
              </h3>
              <span className="font-label-bold text-label-bold uppercase text-electric-gold mb-4 block">
                {t.specialty}
              </span>
              <p className="text-secondary text-sm flex-1 mb-4">{t.bio}</p>
              <div className="pt-4 border-t border-surface-container-high/60 flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase text-secondary/60">
                  {t.yearsExperience} years coaching
                </span>
                <span className="font-label-sm text-label-sm text-secondary/40">
                  {t.certifications}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
