// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ TODO BEFORE THE PITCH — PLACEHOLDER COACH IDENTITIES
// ─────────────────────────────────────────────────────────────────────────────
// These four names came from the project brief, NOT from the gym. They do not
// match the supplied photos:
//
//   coach1 (Karthik Selvam) — shirt in the photo reads "COACH RAJIV"
//   coach3 (Arun Prakash)   — shirt in the photo reads "COACH VIKRAM"
//
// The shirt text is legible at the size these render on the landing page, so a
// card labelled "Karthik Selvam" visibly contradicts itself. coach2 and coach4
// have no text on their clothing and are safe.
//
// Specialties, years, bios and certifications are all invented placeholders.
//
// TO FIX: replace `name` below with the real coach names (and ideally real
// specialties/bios), or supply photos without printed names. Nothing else in
// the app needs changing — the Coaches section and admin Trainers screen both
// read from here, and image slots are generic (coach1–4).
// ─────────────────────────────────────────────────────────────────────────────

export const trainers = [
  {
    id: 'tr1',
    name: 'Karthik Selvam',
    specialty: 'Strength & Powerlifting',
    yearsExperience: 9,
    bio: 'Competitive powerlifter turned coach. Karthik rebuilds the big three from the floor up — if your setup is wrong, you will hear about it before the bar moves.',
    photo: 'coach1',
    certifications: 'NSCA-CSCS · Level 2 Powerlifting Coach',
    active: true,
  },
  {
    id: 'tr2',
    name: 'Divya Ramesh',
    specialty: 'Rehab & Mobility',
    yearsExperience: 7,
    bio: 'Physiotherapy background. Divya takes the members everyone else calls difficult — post-injury, desk-bound, chronically tight — and gets them lifting safely.',
    photo: 'coach2',
    certifications: 'BPT · FMS Level 2',
    active: true,
  },
  {
    id: 'tr3',
    name: 'Arun Prakash',
    specialty: 'Hypertrophy & Body Composition',
    yearsExperience: 6,
    bio: 'The mind-muscle connection specialist. Arun coaches tempo, contraction, and intent — the reason members feel muscles they did not know they had.',
    photo: 'coach3',
    certifications: 'ACE-CPT · Precision Nutrition L1',
    active: true,
  },
  {
    id: 'tr4',
    name: 'Priya Natarajan',
    specialty: 'Functional & Conditioning',
    yearsExperience: 5,
    bio: 'Former state-level athlete. Priya runs the conditioning floor — kettlebells, sleds, and the sessions members describe afterwards in single syllables.',
    photo: 'coach4',
    certifications: 'ACSM-CPT · Kettlebell L1',
    active: true,
  },
]
