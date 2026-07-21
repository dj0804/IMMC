import { useState } from 'react'
import { useStore } from '../store/AppStore'
import { ZONES } from '../data/equipment'
import { Photo, Section, SectionHeading, Icon } from '../components/ui'

export default function Facilities() {
  const { equipment } = useStore()
  const [active, setActive] = useState(ZONES[1].id) // Free-Weight Zone leads

  const zone = ZONES.find((z) => z.id === active)
  const items = equipment.filter((e) => e.zone === active)

  return (
    <Section id="facilities">
      <SectionHeading eyebrow="The Floor" highlight="Four zones," className="mb-4 max-w-3xl">
        one continuous session.
      </SectionHeading>
      <p className="font-body-lg text-secondary max-w-2xl mb-12">
        Laid out so you move through a session without queueing or crossing the floor twice —
        warm-up, lift, isolate, condition.
      </p>

      {/* Zone selector — pill tags contrast against the structural cards (DESIGN.md) */}
      <div className="flex flex-wrap gap-3 mb-8">
        {ZONES.map((z) => (
          <button
            key={z.id}
            onClick={() => setActive(z.id)}
            className={`font-label-bold text-label-bold uppercase px-5 py-3 rounded-full border transition-all duration-150 ${
              active === z.id
                ? 'bg-electric-gold text-void-black border-electric-gold ignite'
                : 'border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold'
            }`}
          >
            {z.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <Photo
          imgKey={zone.image}
          className="h-[320px] lg:h-auto lg:min-h-[440px] w-full rounded inner-glow"
          imgClassName="opacity-70 mix-blend-luminosity"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h3 className="font-headline-lg text-[32px] leading-tight uppercase italic text-primary">
              {zone.name}
            </h3>
          </div>
        </Photo>

        <div className="bg-surface-charcoal border border-white/5 inner-glow rounded p-6 md:p-8 flex flex-col">
          <p className="font-body-md text-secondary mb-8">{zone.blurb}</p>

          <span className="font-label-bold text-label-bold uppercase text-electric-gold mb-4">
            In this zone
          </span>

          <ul className="divide-y divide-surface-container-high/60 flex-1">
            {items.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-3 gap-4">
                <span className="flex items-center gap-3 text-on-surface">
                  <Icon name="check" className="text-electric-gold text-[18px]" />
                  {e.name}
                </span>
                <span className="font-label-sm text-label-sm uppercase text-secondary/60 shrink-0">
                  ×{e.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
