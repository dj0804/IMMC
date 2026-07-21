---
name: Infinite Mind Muscle Connection
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b24'
  surface-container: '#1d1f29'
  surface-container-high: '#282933'
  surface-container-highest: '#32343e'
  on-surface: '#e1e1ef'
  on-surface-variant: '#cfc6ab'
  inverse-surface: '#e1e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#989078'
  outline-variant: '#4c4732'
  surface-tint: '#e6c500'
  primary: '#fff8ed'
  on-primary: '#3a3000'
  primary-container: '#ffdb17'
  on-primary-container: '#716000'
  inverse-primary: '#6e5d00'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#e6feff'
  on-tertiary: '#003739'
  tertiary-container: '#05f4ff'
  on-tertiary-container: '#006c71'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe25f'
  primary-fixed-dim: '#e6c500'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#534600'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#6af6ff'
  tertiary-fixed-dim: '#00dce6'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f53'
  background: '#11131c'
  on-background: '#e1e1ef'
  surface-variant: '#32343e'
  electric-gold: '#FFDB17'
  void-black: '#0F111A'
  surface-charcoal: '#1B1E2B'
  intensity-red: '#F06055'
  hyper-pink: '#FF3278'
typography:
  display-xl:
    fontFamily: Montserrat
    fontSize: 80px
    fontWeight: '900'
    lineHeight: 88px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 120px
---

## Brand & Style

This design system is built for a high-intensity, premium fitness environment. It draws inspiration from **Bold Minimalism** and **High-Contrast Digital Design**, prioritizing immersive photography and aggressive typography to motivate the user. 

The brand personality is authoritative yet welcoming, emphasizing physical transformation through "Mind-Muscle Connection." The visual language avoids traditional corporate stiffness, opting instead for a "lifestyle-first" aesthetic that feels more like a luxury streetwear brand or a cutting-edge performance app. 

Key visual principles include:
- **Kinetic Energy:** Use of slanted lines and oversized type to imply motion.
- **Dark-First Immersion:** A deep, rich background that makes high-energy accents and muscle definition in photography pop.
- **Premium Rawness:** Mixing high-fidelity imagery with raw, unrefined textures like concrete or carbon fiber.

## Colors

The palette is anchored in a **Void Black** foundation to create a focused, low-distraction environment. The **Electric Gold**, derived from the brand logo, serves as the primary "high-energy" signal for action and achievement.

- **Primary (Electric Gold):** Reserved for CTA buttons, active states, and critical progress indicators. It represents the "Mind Muscle" ignition point.
- **Secondary (Pure White):** Used for primary headings and critical readability. In a dark environment, white acts as a high-contrast beacon.
- **Neutral (Void Black & Surface Charcoal):** The canvas. Use Void Black for the deepest backgrounds and Surface Charcoal for cards, containers, and secondary UI layers to provide subtle depth.
- **Accents (Intensity Red & Hyper Pink):** Used sparingly for specialized workout categories (e.g., HIIT vs. Recovery) or high-urgency alerts.

## Typography

The typography system is built for impact. **Montserrat** provides the heavy, geometric weight needed for headlines to feel "muscular" and commanding. **Inter** handles the functional heavy lifting, ensuring readability during active use (e.g., reading a workout plan on a moving treadmill).

- **Display & Headlines:** Should often be used in "All Caps" for a more aggressive, athletic feel. Letter spacing should be tightened for display sizes to create a dense, powerful block of text.
- **Body Text:** Keep line lengths short to medium to maintain readability against dark backgrounds. Use "Inter" for its neutral, highly legible characteristics.
- **Labeling:** Utilize uppercase labels with increased letter spacing for navigation and metadata to provide a technical, "data-driven" aesthetic.

## Layout & Spacing

This design system utilizes a **12-column fixed grid** on desktop and a **4-column fluid grid** on mobile. The spacing philosophy is "breathable but tight"—large gaps between major sections to allow photography to shine, but tight, functional spacing within components to maintain a sense of precision.

- **Photography Sections:** Should frequently break the grid or bleed edge-to-edge to maximize immersion.
- **Rhythm:** Use an 8px base unit. Component padding should generally follow `16px`, `24px`, or `32px` increments.
- **Mobile Adaptivity:** On mobile, vertical rhythm increases. Elements that are horizontal on desktop (like membership cards) should stack vertically with a consistent `16px` gap.

## Elevation & Depth

Depth in this system is achieved through **Tonal Layering** and **Subtle Glows** rather than traditional drop shadows.

- **Surface Tiers:** Backgrounds start at `Void Black` (#0F111A). Content containers (Cards) sit one level above at `Surface Charcoal` (#1B1E2B).
- **Inner Glows:** For premium elements like membership cards, use a 1px inner border (top and left) with a low-opacity white (10-15%) to simulate a "rim light" effect found in fitness photography.
- **Active Elevation:** When a component is interacted with, instead of moving "up," it should "ignite." Use a soft, subtle outer glow using the `Electric Gold` color at 20% opacity to indicate focus.
- **Photography Overlays:** Use linear gradients (from 60% black to transparent) over images to ensure white typography remains legible without losing the energy of the photo.

## Shapes

The shape language balances the "hard" edges of a gym environment with the "soft" ergonomics of modern app design.

- **Containers & Cards:** Use a **0.5rem (8px)** corner radius. This provides a modern, approachable feel while maintaining enough structural rigidity to look professional.
- **Interactive Elements:** Buttons and input fields follow the same 8px radius.
- **Pill Tags:** Category chips and status indicators (e.g., "Live Class") may use a pill-shape (full roundedness) to contrast against the more structural card shapes.
- **Iconography:** Icons should be "Line" style with a 2px stroke width, maintaining slightly rounded terminals to match the font geometry.

## Components

### Buttons
- **Primary:** Electric Gold background with Void Black text. Bold weight, uppercase. No shadow, but a slight scale-down effect (0.98) on click.
- **Secondary:** Outline style. White 2px border with White text. Transparent background.

### Membership Cards
- Design cards with a "Glassmorphism" influence. Use `Surface Charcoal` with a subtle texture overlay (like a carbon fiber pattern or noise). 
- Include the crown logo from the brand assets as a watermark in the bottom-right corner.
- Use `headline-md` for price/tier and `label-bold` for features.

### Input Fields
- Dark background (#0F111A) with a 1px `Surface Charcoal` border. 
- On focus, the border changes to `Electric Gold`. 
- Placeholder text should be 40% opacity white.

### Lists & Progress
- Workout lists should use high-contrast separators (1px charcoal lines).
- Progress bars should use a "segmented" look rather than a smooth fill, reinforcing the "precision" brand trait.

### Photography-Led Sections
- Every major page should feature at least one full-width, high-contrast black and white image with an `Electric Gold` color-grade overlay or accent element.