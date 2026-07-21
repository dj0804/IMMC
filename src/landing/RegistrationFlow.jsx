import { useEffect, useState } from 'react'
import { useStore } from '../store/AppStore'
import { formatINR, PT_ADDON, STUDENT_DISCOUNT_PCT } from '../data/packages'
import { Icon, Input, Field } from '../components/ui'

const STEPS = ['Your details', 'Package', 'Health', 'Payment', 'Done']

const HEALTH_ITEMS = [
  'I am not currently under medical advice to avoid physical exercise.',
  'I will disclose any injury, surgery, or chronic condition to my coach before training.',
  'I understand training carries inherent risk and I participate voluntarily.',
  'I will stop and inform a coach immediately if I feel pain, dizziness, or chest discomfort.',
]

const METHODS = [
  ['UPI', 'qr_code_2', 'Pay at the desk via UPI'],
  ['Cash', 'payments', 'Pay in cash at the desk'],
  ['Card', 'credit_card', 'Card machine at reception'],
  ['Bank Transfer', 'account_balance', 'NEFT / IMPS to the gym account'],
]

export default function RegistrationFlow({ open, initial, onClose }) {
  const { packages, registerMember } = useStore()
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [created, setCreated] = useState(null)
  const [form, setForm] = useState(blank())

  function blank() {
    return {
      name: '',
      phone: '',
      email: '',
      packageId: 'quarterly',
      isStudent: false,
      ptAddOn: false,
      health: HEALTH_ITEMS.map(() => false),
      method: '',
    }
  }

  // Re-seed when opened from a specific package card.
  useEffect(() => {
    if (open) {
      setStep(0)
      setErrors({})
      setCreated(null)
      setForm({ ...blank(), ...initial })
    }
  }, [open, initial])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const pkg = packages.find((p) => p.id === form.packageId)
  const base = form.isStudent && pkg?.studentDiscountPct
    ? Math.round(pkg.priceINR * (1 - pkg.studentDiscountPct / 100))
    : pkg?.priceINR ?? 0
  const total = base + (form.ptAddOn && pkg?.durationMonths > 0 ? PT_ADDON.priceINR : 0)

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Required'
      if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number'
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
    }
    if (step === 2 && form.health.some((h) => !h)) {
      e.health = 'All declarations must be accepted to train.'
    }
    if (step === 3 && !form.method) e.method = 'Choose how you will pay.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    if (step === 3) {
      setCreated(registerMember({ ...form, durationMonths: pkg?.durationMonths }))
      setStep(4)
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto bg-void-black/90 backdrop-blur-sm p-0 md:p-6">
      <div className="w-full max-w-2xl bg-surface-charcoal border border-white/10 inner-glow md:rounded my-0 md:my-8">
        {/* Header + segmented progress (DESIGN.md: segmented, not smooth fill) */}
        <div className="sticky top-0 bg-surface-charcoal border-b border-surface-container-high z-10 px-6 md:px-8 py-5 md:rounded-t">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-label-bold text-label-bold uppercase text-electric-gold block">
                Step {Math.min(step + 1, 5)} of 5
              </span>
              <h2 className="font-headline-md text-xl uppercase italic text-primary mt-1">
                {STEPS[step]}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close registration"
              className="text-secondary hover:text-electric-gold transition-colors"
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-sm transition-colors duration-300 ${
                  i <= step ? 'bg-electric-gold' : 'bg-surface-container-high'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 md:px-8 py-8">
          {step === 0 && (
            <div className="space-y-5">
              <Field label="Full name" error={errors.name}>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="As it should appear on your membership"
                  autoFocus
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98400 00000"
                />
              </Field>
              <Field label="Email" error={errors.email} hint="Optional — for receipts and renewal reminders">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </Field>
              <Check
                checked={form.isStudent}
                onChange={(v) => setForm({ ...form, isStudent: v })}
                label="I'm a student (VIT or other college)"
                sub={`Bring a valid ID to the desk — ${STUDENT_DISCOUNT_PCT}% off eligible packages`}
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {packages.map((p) => {
                const sel = form.packageId === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setForm({ ...form, packageId: p.id })}
                    className={`w-full text-left flex items-center justify-between gap-4 p-5 rounded border transition-all duration-150 ${
                      sel
                        ? 'border-electric-gold bg-electric-gold/5 ignite'
                        : 'border-surface-container-high hover:border-electric-gold/40'
                    }`}
                  >
                    <div>
                      <span className="font-headline-md text-lg uppercase italic text-primary block">
                        {p.name}
                      </span>
                      <span className="font-label-sm text-label-sm uppercase text-secondary/60">
                        {p.durationLabel}
                        {p.popular ? ' · Most chosen' : ''}
                      </span>
                    </div>
                    <span className="font-headline-md text-lg text-electric-gold shrink-0">
                      {formatINR(
                        form.isStudent && p.studentDiscountPct
                          ? Math.round(p.priceINR * (1 - p.studentDiscountPct / 100))
                          : p.priceINR
                      )}
                    </span>
                  </button>
                )
              })}

              {pkg?.durationMonths > 0 && (
                <div className="pt-4">
                  <Check
                    checked={form.ptAddOn}
                    onChange={(v) => setForm({ ...form, ptAddOn: v })}
                    label="Add Personal Training"
                    sub={`${formatINR(PT_ADDON.priceINR)}/month — ${PT_ADDON.note}`}
                  />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-secondary text-sm mb-6">
                Read and accept each declaration. Your coach will go through this with you again on
                day one.
              </p>
              {HEALTH_ITEMS.map((item, i) => (
                <Check
                  key={i}
                  checked={form.health[i]}
                  onChange={(v) =>
                    setForm((f) => {
                      const health = [...f.health]
                      health[i] = v
                      return { ...f, health }
                    })
                  }
                  label={item}
                />
              ))}
              {errors.health && (
                <p className="text-intensity-red text-label-sm mt-2">{errors.health}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-secondary text-sm mb-4">
                Choose a method. Nothing is charged here — payment is completed at the desk on your
                first visit.
              </p>
              {METHODS.map(([m, icon, sub]) => (
                <button
                  key={m}
                  onClick={() => setForm({ ...form, method: m })}
                  className={`w-full text-left flex items-center gap-4 p-5 rounded border transition-all duration-150 ${
                    form.method === m
                      ? 'border-electric-gold bg-electric-gold/5'
                      : 'border-surface-container-high hover:border-electric-gold/40'
                  }`}
                >
                  <Icon name={icon} className="text-electric-gold" />
                  <div>
                    <span className="font-label-bold text-label-bold uppercase text-primary block">
                      {m}
                    </span>
                    <span className="text-secondary text-sm">{sub}</span>
                  </div>
                </button>
              ))}
              {errors.method && (
                <p className="text-intensity-red text-label-sm">{errors.method}</p>
              )}

              <div className="mt-6 pt-6 border-t border-surface-container-high space-y-2">
                <Row label={`${pkg?.name} · ${pkg?.durationLabel}`} value={formatINR(base)} />
                {form.isStudent && pkg?.studentDiscountPct > 0 && (
                  <Row label={`Student rate (−${pkg.studentDiscountPct}%)`} value="applied" muted />
                )}
                {form.ptAddOn && pkg?.durationMonths > 0 && (
                  <Row label="Personal training" value={formatINR(PT_ADDON.priceINR)} />
                )}
                <div className="flex justify-between items-center pt-3 border-t border-surface-container-high">
                  <span className="font-label-bold text-label-bold uppercase text-on-surface-variant">
                    Due at desk
                  </span>
                  <span className="font-headline-md text-headline-md text-electric-gold">
                    {formatINR(total)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && created && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-gold/15 border border-electric-gold/40 mb-6">
                <Icon name="check" className="text-electric-gold text-[32px]" />
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile uppercase italic text-primary mb-3">
                You're in, {created.name.split(' ')[0]}.
              </h3>
              <p className="text-secondary mb-8 max-w-md mx-auto">
                Show this membership ID at the desk on your first visit. A coach will run your
                assessment before you touch a bar.
              </p>

              <div className="bg-void-black border border-electric-gold/40 rounded p-6 mb-6 inline-block min-w-[280px]">
                <span className="font-label-bold text-label-bold uppercase text-on-surface-variant block mb-2">
                  Membership ID
                </span>
                <span className="font-headline-md text-headline-md text-electric-gold tracking-wider">
                  {created.id}
                </span>
              </div>

              <div className="text-left bg-void-black/50 rounded p-5 space-y-2 mb-8">
                <Row label="Package" value={pkg?.name} />
                <Row label="Starts" value={created.startDate} />
                <Row label="Valid until" value={created.endDate} />
                <Row label="Payment" value={`${form.method} · ${created.paymentStatus}`} />
                {created.ptAddOn && <Row label="Personal training" value="Included" />}
              </div>

              <p className="font-label-sm text-label-sm uppercase text-secondary/50 mb-6">
                Demo note: this member is now live in the staff portal.
              </p>

              <button
                onClick={onClose}
                className="bg-electric-gold text-void-black font-label-bold text-label-bold uppercase px-8 py-4 rounded hover:scale-[0.98] transition-transform"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="sticky bottom-0 bg-surface-charcoal border-t border-surface-container-high px-6 md:px-8 py-5 flex justify-between items-center gap-4 md:rounded-b">
            <button
              onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
              className="font-label-bold text-label-bold uppercase text-secondary hover:text-electric-gold transition-colors px-2 py-2"
            >
              {step === 0 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={next}
              className="bg-electric-gold text-void-black font-label-bold text-label-bold uppercase px-8 py-4 rounded hover:scale-[0.98] transition-transform"
            >
              {step === 3 ? 'Confirm registration' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Check({ checked, onChange, label, sub }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex gap-4 text-left items-start p-4 rounded border border-surface-container-high hover:border-electric-gold/40 transition-colors"
    >
      <span
        className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
          checked ? 'bg-electric-gold border-electric-gold' : 'border-outline'
        }`}
      >
        {checked && <Icon name="check" className="text-void-black text-[16px]" />}
      </span>
      <span>
        <span className="text-on-surface text-sm block">{label}</span>
        {sub && <span className="text-secondary/60 text-label-sm block mt-1">{sub}</span>}
      </span>
    </button>
  )
}

function Row({ label, value, muted }) {
  return (
    <div className="flex justify-between items-center gap-4 text-sm">
      <span className="text-secondary">{label}</span>
      <span className={muted ? 'text-electric-gold' : 'text-on-surface'}>{value}</span>
    </div>
  )
}
