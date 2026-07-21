// ─────────────────────────────────────────────────────────────────────────────
// PRICING — PLACEHOLDER FIGURES. SWAP REAL IMMC PRICES IN HERE.
// ─────────────────────────────────────────────────────────────────────────────
// These are plausible Vellore / VIT-area rates used so the demo renders. They
// are NOT confirmed by the owner. Every price shown on the landing page, in the
// registration flow, and in the admin portal resolves from this file — edit
// `priceINR` below and the whole app updates.
//
// The ₹300 trial IS confirmed (it appears in the original Stitch hero copy).
// ─────────────────────────────────────────────────────────────────────────────

export const PT_ADDON = {
  id: 'pt',
  name: 'Personal Training Add-On',
  priceINR: 3000, // PLACEHOLDER — per month, on top of any package
  note: 'One-on-one programming with a dedicated coach. Added to any package.',
}

export const STUDENT_DISCOUNT_PCT = 15 // PLACEHOLDER — VIT student rate

export const packages = [
  {
    id: 'trial',
    name: 'Trial Day',
    priceINR: 300, // CONFIRMED — from original Stitch hero copy
    durationMonths: 0,
    durationLabel: 'Single day',
    popular: false,
    studentDiscountPct: 0,
    features: [
      'Full floor access for one day',
      'Intro session with a coach',
      'Movement + posture assessment',
      'No commitment',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    priceINR: 1000, // PLACEHOLDER
    durationMonths: 1,
    durationLabel: '1 month',
    popular: false,
    studentDiscountPct: STUDENT_DISCOUNT_PCT,
    features: [
      'Unlimited floor access',
      'Coach-led form correction',
      'Personalised training split',
      'Body composition check-in',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    priceINR: 2700, // PLACEHOLDER
    durationMonths: 3,
    durationLabel: '3 months',
    popular: true,
    studentDiscountPct: STUDENT_DISCOUNT_PCT,
    features: [
      'Everything in Monthly',
      'Monthly progress review',
      'Nutrition guidance',
      'Save ₹300 vs monthly',
    ],
  },
  {
    id: 'half-yearly',
    name: 'Half-Yearly',
    priceINR: 5000, // PLACEHOLDER
    durationMonths: 6,
    durationLabel: '6 months',
    popular: false,
    studentDiscountPct: STUDENT_DISCOUNT_PCT,
    features: [
      'Everything in Quarterly',
      'Quarterly strength testing',
      'Priority coach access',
      'Save ₹1,000 vs monthly',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    priceINR: 9000, // PLACEHOLDER
    durationMonths: 12,
    durationLabel: '12 months',
    popular: false,
    studentDiscountPct: STUDENT_DISCOUNT_PCT,
    features: [
      'Everything in Half-Yearly',
      'Two free PT sessions',
      'Guest passes (4/year)',
      'Best value — save ₹3,000',
    ],
  },
]

export const formatINR = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })
