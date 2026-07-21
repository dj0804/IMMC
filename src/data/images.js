// ─────────────────────────────────────────────────────────────────────────────
// IMAGE MANIFEST
// ─────────────────────────────────────────────────────────────────────────────
// Files live in `public/photos/`. See the filename table in chat — save each
// supplied image under the exact name below and it appears automatically.
//
// Every consumer paints the `fallback` gradient underneath, so a missing or
// slow file degrades to an on-brand dark panel rather than a broken image.
// ─────────────────────────────────────────────────────────────────────────────

const P = '/photos/'

const GRAD = {
  gold: 'linear-gradient(135deg, #1B1E2B 0%, #0F111A 55%, #3a3000 100%)',
  steel: 'linear-gradient(135deg, #282933 0%, #0F111A 70%)',
  cyan: 'linear-gradient(135deg, #1B1E2B 0%, #0F111A 55%, #004f53 100%)',
  red: 'linear-gradient(135deg, #1B1E2B 0%, #0F111A 55%, #4a1512 100%)',
}

export const images = {
  logo: {
    src: `${P}logo.png`,
    fallback: GRAD.gold,
    alt: 'IMMC Fit Club crown and physique logo in gold',
  },

  // Wide squat shot — strongest single image, carries the first impression.
  hero: {
    src: `${P}hero-squat.jpg`,
    fallback: GRAD.steel,
    alt: 'Athlete mid-squat under a loaded barbell on a dark training floor',
  },

  // Portrait crop of the dumbbell press. Reused as zone-free-weight further
  // down the page, where the repeat reads as continuity rather than reuse.
  philosophy: {
    src: `${P}zone-free-weight.jpg`,
    fallback: GRAD.steel,
    alt: 'Athlete pressing dumbbells beside a full rack of weights',
  },

  // Renders at 20% opacity — effectively a texture, so the repeat is invisible.
  ctaBand: {
    src: `${P}hero-squat.jpg`,
    fallback: GRAD.gold,
    alt: 'Training floor at IMMC',
  },

  zoneCardio: {
    src: `${P}zone-cardio.jpg`,
    fallback: GRAD.cyan,
    alt: 'Members running on a row of treadmills under Cardio Deck signage',
  },
  zoneFreeWeight: {
    src: `${P}zone-free-weight.jpg`,
    fallback: GRAD.gold,
    alt: 'Dumbbell rack and bench press station',
  },
  zoneMachines: {
    src: `${P}zone-machines.jpg`,
    fallback: GRAD.steel,
    alt: 'Row of selectorised strength machines',
  },
  zoneFunctional: {
    src: `${P}zone-functional.jpg`,
    fallback: GRAD.red,
    alt: 'Athlete working battle ropes on turf beside kettlebells',
  },

  // Generic keys so renaming a coach never requires touching this file —
  // trainers.js maps each coach to a slot.
  coach1: { src: `${P}coach-1.jpg`, fallback: GRAD.gold, alt: 'IMMC coach portrait' },
  coach2: { src: `${P}coach-2.jpg`, fallback: GRAD.cyan, alt: 'IMMC coach portrait' },
  coach3: { src: `${P}coach-3.jpg`, fallback: GRAD.steel, alt: 'IMMC coach portrait' },
  coach4: { src: `${P}coach-4.jpg`, fallback: GRAD.red, alt: 'IMMC coach portrait' },
}

export const getImage = (key) => images[key] ?? { src: '', fallback: GRAD.steel, alt: '' }
