import { useState } from 'react'
import { useStore } from '../store/AppStore'
import { formatINR, PT_ADDON, STUDENT_DISCOUNT_PCT } from '../data/packages'
import { Icon, Section, SectionHeading } from '../components/ui'

export default function Memberships({ onSelect }) {
  const { packages } = useStore()
  const [student, setStudent] = useState(false)
  const [withPT, setWithPT] = useState(false)

  const priceFor = (p) => {
    const base = student && p.studentDiscountPct ? p.priceINR * (1 - p.studentDiscountPct / 100) : p.priceINR
    return Math.round(base) + (withPT && p.durationMonths > 0 ? PT_ADDON.priceINR : 0)
  }

  return (
    <Section id="memberships">
      <SectionHeading eyebrow="Membership" highlight="Pick a duration." className="mb-4 max-w-3xl">
        Nothing else to decide.
      </SectionHeading>
      <p className="font-body-lg text-secondary max-w-2xl mb-8">
        No class credits, no booking windows, no tiers of access. Every membership is the full floor
        and a coach on it. The only choice is how long.
      </p>

      {/* Toggles */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Toggle on={student} onClick={() => setStudent((v) => !v)} icon="school">
          VIT / Student rate · −{STUDENT_DISCOUNT_PCT}%
        </Toggle>
        <Toggle on={withPT} onClick={() => setWithPT((v) => !v)} icon="person_play">
          Add Personal Training · +{formatINR(PT_ADDON.priceINR)}/mo
        </Toggle>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 items-stretch">
        {packages.map((p) => {
          const discounted = student && p.studentDiscountPct > 0
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded p-6 border transition-all duration-200 ${
                p.popular
                  ? 'bg-surface-charcoal border-electric-gold ignite lg:-mt-4 lg:mb-4'
                  : 'bg-surface-charcoal border-white/5 inner-glow hover:border-electric-gold/40'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 bg-electric-gold text-void-black font-label-sm text-label-sm uppercase font-bold px-3 py-1 rounded-full tracking-wider">
                  Most chosen
                </span>
              )}

              <h3 className="font-headline-md text-xl uppercase italic text-primary mb-1">
                {p.name}
              </h3>
              <span className="font-label-sm text-label-sm uppercase text-secondary/60 mb-4">
                {p.durationLabel}
              </span>

              <div className="mb-1">
                <span className="font-headline-md text-headline-md text-electric-gold leading-none">
                  {formatINR(priceFor(p))}
                </span>
              </div>
              {discounted && (
                <span className="font-label-sm text-label-sm text-secondary/50 line-through mb-1">
                  {formatINR(p.priceINR + (withPT && p.durationMonths > 0 ? PT_ADDON.priceINR : 0))}
                </span>
              )}
              <span className="font-label-sm text-label-sm text-secondary/60 mb-6">
                {p.durationMonths > 0 ? `for ${p.durationLabel}` : 'one-time'}
              </span>

              <ul className="space-y-2 flex-1 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-secondary">
                    <Icon name="check" className="text-electric-gold text-[16px] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(p.id, { isStudent: student, ptAddOn: withPT })}
                className={`w-full font-label-bold text-label-bold uppercase py-3 rounded transition-all duration-150 ${
                  p.popular
                    ? 'bg-electric-gold text-void-black hover:scale-[0.98]'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-void-black'
                }`}
              >
                {p.id === 'trial' ? 'Book Trial' : 'Register'}
              </button>
            </div>
          )
        })}
      </div>

      <p className="font-label-sm text-label-sm text-secondary/50 mt-8 max-w-2xl">
        Student rate requires a valid VIT or college ID at the desk. Personal training is billed
        monthly alongside your membership and can be added or dropped at any renewal.
      </p>
    </Section>
  )
}

function Toggle({ on, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-label-bold text-label-bold uppercase px-5 py-3 rounded-full border transition-all duration-150 ${
        on
          ? 'bg-electric-gold text-void-black border-electric-gold'
          : 'border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold'
      }`}
    >
      <Icon name={on ? 'check_circle' : icon} className="text-[18px]" />
      {children}
    </button>
  )
}
