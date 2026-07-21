import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/AppStore'
import { Icon, Photo, Section, SectionHeading, Input, Field } from '../components/ui'

export default function Location() {
  const { content, addLead } = useStore()
  const c = content.contact
  const [form, setForm] = useState({ name: '', phone: '', notes: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    // Lands in the admin Leads tracker immediately.
    addLead({ ...form, source: 'Website', interest: 'monthly' })
    setSent(true)
    setForm({ name: '', phone: '', notes: '' })
  }

  return (
    <Section id="contact">
      <SectionHeading eyebrow="Find Us" highlight="Opposite Tiruvalam Road." className="mb-12 max-w-3xl">
        Walk in.
      </SectionHeading>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Primary actions: tap-to-call and WhatsApp lead, per the brief */}
        <div className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={`tel:${c.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 bg-electric-gold text-void-black font-label-bold text-label-bold uppercase px-6 py-5 rounded hover:scale-[0.98] transition-transform duration-150"
            >
              <Icon name="call" />
              Call the gym
            </a>
            <a
              href={`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(
                "Hi IMMC — I'd like to know more about membership."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-electric-gold text-electric-gold font-label-bold text-label-bold uppercase px-6 py-5 rounded hover:bg-electric-gold hover:text-void-black transition-colors duration-150"
            >
              <Icon name="chat" />
              WhatsApp us
            </a>
          </div>

          <div className="bg-surface-charcoal border border-white/5 inner-glow rounded p-6 md:p-8 space-y-6">
            <Detail icon="location_on" label="Address">
              {c.address}
              <span className="block text-secondary/60 mt-1">{c.landmark}</span>
            </Detail>
            <Detail icon="schedule" label="Hours">
              {c.hours}
              <span className="block text-secondary/60 mt-1">{c.hoursSunday}</span>
            </Detail>
            <Detail icon="mail" label="Email">
              {c.email}
            </Detail>
            <Detail icon="photo_camera" label="Instagram">
              {c.instagram}
            </Detail>
          </div>

          {/* Map placeholder — a live embed needs an API key; out of scope for a
              frontend-only demo. Stated as a deliberate divergence. */}
          <Photo imgKey="hero" className="h-56 w-full rounded inner-glow" imgClassName="opacity-20 grayscale">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-void-black/70">
              <Icon name="map" className="text-electric-gold text-[32px]" />
              <span className="font-label-bold text-label-bold uppercase text-secondary">
                Map embed goes here
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-sm text-label-sm uppercase text-electric-gold underline underline-offset-4"
              >
                Open in Google Maps
              </a>
            </div>
          </Photo>
        </div>

        {/* Secondary: enquiry form */}
        <div className="bg-surface-charcoal border border-white/5 inner-glow rounded p-6 md:p-8">
          <h3 className="font-headline-md text-xl uppercase italic text-primary mb-2">
            Rather we call you?
          </h3>
          <p className="text-secondary text-sm mb-6">
            Leave a number and a coach will get back within a day.
          </p>

          {sent ? (
            <div className="border border-electric-gold/40 bg-electric-gold/10 rounded p-6 text-center">
              <Icon name="check_circle" className="text-electric-gold text-[32px] mb-2" />
              <p className="font-label-bold text-label-bold uppercase text-electric-gold mb-2">
                Enquiry received
              </p>
              <p className="text-secondary text-sm mb-4">
                We'll be in touch. (Demo: this now appears in the{' '}
                <Link to="/admin" className="text-electric-gold underline underline-offset-2">
                  staff leads tracker
                </Link>
                .)
              </p>
              <button
                onClick={() => setSent(false)}
                className="font-label-sm text-label-sm uppercase text-secondary underline underline-offset-4"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <Field label="Your name">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                  required
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 ..."
                  required
                />
              </Field>
              <Field label="Anything we should know?" hint="Optional">
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={4}
                  placeholder="Goals, injuries, preferred timings…"
                  className="w-full bg-void-black border border-surface-container-high rounded px-4 py-3 text-on-surface placeholder:text-primary/40 outline-none focus:border-electric-gold transition-colors resize-none"
                />
              </Field>
              <button
                type="submit"
                className="w-full bg-electric-gold text-void-black font-label-bold text-label-bold uppercase py-4 rounded hover:scale-[0.98] transition-transform duration-150"
              >
                Request a callback
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}

function Detail({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <Icon name={icon} className="text-electric-gold shrink-0" />
      <div>
        <span className="font-label-bold text-label-bold uppercase text-on-surface-variant block mb-1">
          {label}
        </span>
        <span className="text-on-surface text-sm">{children}</span>
      </div>
    </div>
  )
}
