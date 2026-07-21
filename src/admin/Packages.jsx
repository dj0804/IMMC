import { useState } from 'react'
import { useStore } from '../store/AppStore'
import { formatINR } from '../data/packages'
import { Icon } from '../components/ui'
import { PageHeader, Panel, AInput, ATextarea, ALabel } from './adminUi'

export default function Packages() {
  const { packages, updatePackage, members } = useStore()
  const [editing, setEditing] = useState(null)

  const countFor = (id) => members.filter((m) => m.packageId === id && m.status === 'Active').length

  return (
    <div>
      <PageHeader
        title="Packages"
        subtitle="Edits publish to the landing page immediately"
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {packages.map((p) =>
          editing === p.id ? (
            <EditCard
              key={p.id}
              pkg={p}
              onCancel={() => setEditing(null)}
              onSave={(changes) => {
                updatePackage(p.id, changes)
                setEditing(null)
              }}
            />
          ) : (
            <Panel key={p.id} className="p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-headline-md text-lg uppercase text-primary">{p.name}</h3>
                  <span className="font-label-sm uppercase tracking-wider text-secondary/60">
                    {p.durationLabel}
                  </span>
                </div>
                {p.popular && (
                  <span className="font-label-sm uppercase tracking-wider text-electric-gold border border-electric-gold/40 rounded-full px-2 py-1 whitespace-nowrap">
                    Featured
                  </span>
                )}
              </div>

              <div className="font-headline-md text-headline-md text-electric-gold leading-none mb-4">
                {formatINR(p.priceINR)}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 font-label-sm text-secondary/60 uppercase tracking-wider">
                <span>{countFor(p.id)} active</span>
                {p.studentDiscountPct > 0 && <span>Student −{p.studentDiscountPct}%</span>}
              </div>

              <ul className="space-y-1.5 flex-1 mb-5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-table-cell text-secondary">
                    <Icon name="check" className="text-electric-gold text-[16px] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(p.id)}
                  className="flex-1 font-label-bold text-label-sm uppercase border border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold rounded py-2 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    packages.forEach((q) => updatePackage(q.id, { popular: q.id === p.id }))
                  }
                  disabled={p.popular}
                  className="flex-1 font-label-bold text-label-sm uppercase border border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold rounded py-2 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  Feature
                </button>
              </div>
            </Panel>
          )
        )}
      </div>
    </div>
  )
}

function EditCard({ pkg, onSave, onCancel }) {
  const [draft, setDraft] = useState({
    name: pkg.name,
    priceINR: pkg.priceINR,
    durationLabel: pkg.durationLabel,
    studentDiscountPct: pkg.studentDiscountPct,
    features: pkg.features.join('\n'),
  })

  return (
    <Panel className="p-5 border-electric-gold/50">
      <div className="space-y-4">
        <div>
          <ALabel>Name</ALabel>
          <AInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <ALabel>Price (₹)</ALabel>
            <AInput
              type="number"
              value={draft.priceINR}
              onChange={(e) => setDraft({ ...draft, priceINR: Number(e.target.value) })}
            />
          </div>
          <div>
            <ALabel>Student %</ALabel>
            <AInput
              type="number"
              value={draft.studentDiscountPct}
              onChange={(e) => setDraft({ ...draft, studentDiscountPct: Number(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <ALabel>Duration label</ALabel>
          <AInput
            value={draft.durationLabel}
            onChange={(e) => setDraft({ ...draft, durationLabel: e.target.value })}
          />
        </div>
        <div>
          <ALabel>Features (one per line)</ALabel>
          <ATextarea
            rows={5}
            value={draft.features}
            onChange={(e) => setDraft({ ...draft, features: e.target.value })}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() =>
              onSave({
                ...draft,
                features: draft.features.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
            className="flex-1 bg-electric-gold text-void-black font-label-bold text-label-sm uppercase rounded py-2.5 hover:scale-[0.98] transition-transform"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 border border-surface-container-high text-secondary font-label-bold text-label-sm uppercase rounded py-2.5 hover:text-primary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Panel>
  )
}
