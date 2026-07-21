// Shared source of truth: the landing page Facilities section and the admin
// Equipment inventory both read this. Four zones, per the confirmed anatomy.

export const ZONES = [
  {
    id: 'cardio',
    name: 'Cardio Deck',
    image: 'zoneCardio',
    accent: 'tertiary-fixed',
    blurb:
      'Steady-state and interval work on the upper deck, positioned away from the lifting floor so conditioning never competes with strength work for space.',
  },
  {
    id: 'free-weight',
    name: 'Free-Weight Zone',
    image: 'zoneFreeWeight',
    accent: 'electric-gold',
    blurb:
      'The heart of the floor. Competition-spec bars, calibrated plates, and enough platform space that nobody waits to pull. A coach is always within arm’s reach.',
  },
  {
    id: 'machines',
    name: 'Strength Machines',
    image: 'zoneMachines',
    accent: 'secondary',
    blurb:
      'Plate-loaded and selectorised machines for isolation and controlled overload — the tools we use to build the connection before we add the barbell.',
  },
  {
    id: 'functional',
    name: 'Functional & Conditioning',
    image: 'zoneFunctional',
    accent: 'intensity-red',
    blurb:
      'Open turf for sleds, carries, kettlebells, and battle ropes. Where the conditioning blocks and small-group intensity sessions run.',
  },
]

const iso = (d) => d.toISOString().slice(0, 10)
const daysAgo = (n) => iso(new Date(Date.now() - n * 864e5))

export const equipment = [
  // Cardio Deck
  { id: 'eq1', name: 'Treadmill', zone: 'cardio', quantity: 6, condition: 'Good', lastServiced: daysAgo(40), flagged: false },
  { id: 'eq2', name: 'Upright Cycle', zone: 'cardio', quantity: 4, condition: 'Good', lastServiced: daysAgo(62), flagged: false },
  { id: 'eq3', name: 'Rowing Machine', zone: 'cardio', quantity: 3, condition: 'Needs Service', lastServiced: daysAgo(190), flagged: true },
  { id: 'eq4', name: 'Elliptical Trainer', zone: 'cardio', quantity: 3, condition: 'Good', lastServiced: daysAgo(55), flagged: false },
  { id: 'eq5', name: 'Air Bike', zone: 'cardio', quantity: 2, condition: 'Excellent', lastServiced: daysAgo(15), flagged: false },
  { id: 'eq6', name: 'Stair Climber', zone: 'cardio', quantity: 2, condition: 'Fair', lastServiced: daysAgo(120), flagged: false },

  // Free-Weight Zone
  { id: 'eq7', name: 'Olympic Barbell (20kg)', zone: 'free-weight', quantity: 10, condition: 'Excellent', lastServiced: daysAgo(20), flagged: false },
  { id: 'eq8', name: 'Competition Bumper Plates (set)', zone: 'free-weight', quantity: 8, condition: 'Good', lastServiced: daysAgo(45), flagged: false },
  { id: 'eq9', name: 'Power Rack', zone: 'free-weight', quantity: 4, condition: 'Excellent', lastServiced: daysAgo(30), flagged: false },
  { id: 'eq10', name: 'Adjustable Bench', zone: 'free-weight', quantity: 8, condition: 'Good', lastServiced: daysAgo(50), flagged: false },
  { id: 'eq11', name: 'Dumbbell Set (2.5–50kg)', zone: 'free-weight', quantity: 2, condition: 'Good', lastServiced: daysAgo(70), flagged: false },
  { id: 'eq12', name: 'Deadlift Platform', zone: 'free-weight', quantity: 3, condition: 'Fair', lastServiced: daysAgo(150), flagged: true },
  { id: 'eq13', name: 'EZ Curl Bar', zone: 'free-weight', quantity: 4, condition: 'Good', lastServiced: daysAgo(80), flagged: false },
  { id: 'eq14', name: 'Squat Stand', zone: 'free-weight', quantity: 2, condition: 'Good', lastServiced: daysAgo(65), flagged: false },

  // Strength Machines
  { id: 'eq15', name: 'Lat Pulldown', zone: 'machines', quantity: 2, condition: 'Good', lastServiced: daysAgo(48), flagged: false },
  { id: 'eq16', name: 'Seated Cable Row', zone: 'machines', quantity: 2, condition: 'Good', lastServiced: daysAgo(48), flagged: false },
  { id: 'eq17', name: 'Leg Press (45°)', zone: 'machines', quantity: 2, condition: 'Excellent', lastServiced: daysAgo(25), flagged: false },
  { id: 'eq18', name: 'Chest Press', zone: 'machines', quantity: 2, condition: 'Good', lastServiced: daysAgo(60), flagged: false },
  { id: 'eq19', name: 'Pec Deck', zone: 'machines', quantity: 1, condition: 'Needs Service', lastServiced: daysAgo(210), flagged: true },
  { id: 'eq20', name: 'Leg Extension', zone: 'machines', quantity: 2, condition: 'Good', lastServiced: daysAgo(55), flagged: false },
  { id: 'eq21', name: 'Lying Leg Curl', zone: 'machines', quantity: 2, condition: 'Fair', lastServiced: daysAgo(130), flagged: false },
  { id: 'eq22', name: 'Cable Crossover', zone: 'machines', quantity: 1, condition: 'Excellent', lastServiced: daysAgo(18), flagged: false },
  { id: 'eq23', name: 'Smith Machine', zone: 'machines', quantity: 1, condition: 'Good', lastServiced: daysAgo(72), flagged: false },
  { id: 'eq24', name: 'Hack Squat', zone: 'machines', quantity: 1, condition: 'Good', lastServiced: daysAgo(66), flagged: false },

  // Functional & Conditioning
  { id: 'eq25', name: 'Kettlebell Set (8–40kg)', zone: 'functional', quantity: 2, condition: 'Good', lastServiced: daysAgo(90), flagged: false },
  { id: 'eq26', name: 'Weight Sled', zone: 'functional', quantity: 2, condition: 'Good', lastServiced: daysAgo(85), flagged: false },
  { id: 'eq27', name: 'Battle Ropes', zone: 'functional', quantity: 3, condition: 'Fair', lastServiced: daysAgo(140), flagged: false },
  { id: 'eq28', name: 'Plyo Box (set)', zone: 'functional', quantity: 4, condition: 'Good', lastServiced: daysAgo(75), flagged: false },
  { id: 'eq29', name: 'Medicine Ball Set', zone: 'functional', quantity: 2, condition: 'Excellent', lastServiced: daysAgo(22), flagged: false },
  { id: 'eq30', name: 'Suspension Trainer', zone: 'functional', quantity: 4, condition: 'Good', lastServiced: daysAgo(95), flagged: false },
  { id: 'eq31', name: 'Turf Track (10m)', zone: 'functional', quantity: 1, condition: 'Good', lastServiced: daysAgo(110), flagged: false },
]

export const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Needs Service']
