// ─────────────────────────────────────────────────────────────────────────────
// ADMIN DESIGN LANGUAGE — how the landing page's tokens translate to utility mode
// ─────────────────────────────────────────────────────────────────────────────
// Same palette and font families as the landing page; different density.
//
//  SURFACES  Landing puts Void Black under full-bleed photography. Admin inverts
//            the emphasis: void-black page, surface-charcoal cards and rows,
//            surface-container-high for table headers and hover. No photography.
//
//  TYPE      Display/headline scale collapses. `label-bold` (14px, uppercase,
//            0.1em) becomes the table-header voice. Body drops 16px → 14px for
//            cells. `headline-md` survives only as page titles and stat figures.
//            No italics — that's the landing page's kinetic register, wrong here.
//
//  ACCENT    Electric Gold is action-only (primary buttons, active nav item),
//            never decorative. Status meaning moves to the accent set DESIGN.md
//            already reserves for it — see `statusTone` in components/ui.jsx:
//            cyan = Active/Paid, gold = Expiring/Pending, red = Expired/Overdue,
//            pink = Cancelled, grey = New/Contacted.
//
//  SPACING   The 120px section-gap is a landing-page rhythm and is dropped.
//            Admin works at 16/24px on the same 8px base.
// ─────────────────────────────────────────────────────────────────────────────

import { Icon } from '../components/ui'

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="font-headline-md text-2xl uppercase text-primary">{title}</h1>
        {subtitle && <p className="text-secondary text-sm mt-1">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}

export function Panel({ className = '', children }) {
  return (
    <div className={`bg-surface-charcoal border border-white/5 rounded ${className}`}>
      {children}
    </div>
  )
}

export function Table({ head, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="bg-surface-container-high">
            {head.map((h) => (
              <th
                key={h}
                className="font-label-bold text-label-sm uppercase tracking-wider text-on-surface-variant px-4 py-3 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-high/60">{children}</tbody>
      </table>
    </div>
  )
}

export const Td = ({ className = '', children, ...p }) => (
  <td className={`px-4 py-3 text-table-cell text-on-surface ${className}`} {...p}>
    {children}
  </td>
)

export const Tr = ({ className = '', children, ...p }) => (
  <tr className={`hover:bg-surface-container-high/40 transition-colors ${className}`} {...p}>
    {children}
  </tr>
)

export function StatCard({ label, value, sub, icon, tone = 'gold' }) {
  const tones = {
    gold: 'text-electric-gold',
    cyan: 'text-tertiary-fixed',
    red: 'text-intensity-red',
    plain: 'text-primary',
  }
  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-label-bold text-label-sm uppercase tracking-wider text-on-surface-variant">
          {label}
        </span>
        {icon && <Icon name={icon} className={`${tones[tone]} text-[20px]`} />}
      </div>
      <div className={`font-headline-md text-headline-md leading-none ${tones[tone]}`}>{value}</div>
      {sub && <div className="text-secondary text-label-sm mt-2">{sub}</div>}
    </Panel>
  )
}

// Compact form controls — admin density, same focus behaviour as the landing page.
export const adminInput =
  'w-full bg-void-black border border-surface-container-high rounded px-3 py-2 text-table-cell text-on-surface placeholder:text-primary/30 outline-none focus:border-electric-gold transition-colors'

export const AInput = ({ className = '', ...p }) => (
  <input className={`${adminInput} ${className}`} {...p} />
)

export const ASelect = ({ className = '', children, ...p }) => (
  <select className={`${adminInput} ${className}`} {...p}>
    {children}
  </select>
)

export const ATextarea = ({ className = '', ...p }) => (
  <textarea className={`${adminInput} resize-none ${className}`} {...p} />
)

export function ALabel({ children }) {
  return (
    <span className="font-label-bold text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1.5">
      {children}
    </span>
  )
}

export function EmptyState({ icon = 'search_off', children }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-secondary/60">
      <Icon name={icon} className="text-[32px]" />
      <span className="text-sm">{children}</span>
    </div>
  )
}
