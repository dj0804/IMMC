// Editable site copy. The admin CMS panel writes to this shape in the store,
// and the landing page reads it — that's the live-sync path.

export const siteContent = {
  tagline: 'Strength is a connection, engineered rep by rep.',
  taglineHighlight: 'connection',
  heroSub:
    "Coach-led training in Vellore. We map the signal from brain to barbell — precise, corrected, repeatable. Machines don't coach. We do.",
  aboutHeading: "The rep doesn't count until the mind arrives first.",
  aboutHighlight: "The rep doesn't count",
  aboutBody:
    "We believe true strength is built through intentional movement. It's not about moving weight; it's about connecting with the muscle. Our philosophy revolves around precision, coaching, and the relentless pursuit of form over ego.",
  principles: [
    { n: '01', title: 'Intentional Movement', body: 'Every rep serves a purpose. No mindless lifting.' },
    { n: '02', title: 'Form Dictates Load', body: 'Weight is earned through perfect execution.' },
    { n: '03', title: 'Coach-Led Always', body: 'You are never left alone on the floor.' },
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Aravind Kumar',
      role: 'VIT student · 8 months',
      quote:
        "I trained for two years before IMMC and never felt my back working. Karthik fixed my row in one session. That's the difference — someone is actually watching.",
    },
    {
      id: 't2',
      name: 'Meera Sundaram',
      role: 'Software engineer · 1 year',
      quote:
        'I came in after a desk-job shoulder injury, nervous about lifting at all. Divya rebuilt my movement from the ground up. I deadlift twice my starting weight now.',
    },
    {
      id: 't3',
      name: 'Rahul Menon',
      role: 'Local resident · 2 years',
      quote:
        "It's not a gym where you swipe in and disappear. They know your name, your split, and exactly which rep you cheated on. That accountability is what kept me here.",
    },
  ],
  contact: {
    address: 'Opposite Tiruvalam Road, Brahmapuram, Vellore, Tamil Nadu 632009',
    landmark: 'Near VIT University',
    hours: '6:00 AM – 10:00 PM · Monday to Saturday',
    hoursSunday: 'Sunday — closed',
    phone: '+91 90000 00000', // PLACEHOLDER — swap in the real gym number
    whatsapp: '919000000000', // PLACEHOLDER — digits only, country code first
    email: 'hello@immcvellore.in', // PLACEHOLDER
    instagram: '@immc.vellore', // PLACEHOLDER
  },
}
