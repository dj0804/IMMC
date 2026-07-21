import { useMemo, useState } from 'react'
import { useStore } from '../store/AppStore'
import { ZONES, CONDITIONS } from '../data/equipment'
import { Icon, Pill, statusTone } from '../components/ui'
import { PageHeader, Panel, Table, Td, Tr, AInput, ASelect, EmptyState, ALabel, StatCard } from './adminUi'

export default function Equipment() {
  const { equipment, updateEquipment } = useStore()
  const [zone, setZone] = useState('All')
  const [q, setQ] = useState('')
  const [onlyFlagged, setOnlyFlagged] = useState(false)

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return equipment.filter((e) => {
      if (zone !== 'All' && e.zone !== zone) return false
      if (onlyFlagged && !e.flagged) return false
      if (!needle) return true
      return e.name.toLowerCase().includes(needle)
    })
  }, [equipment, zone, q, onlyFlagged])

  const totalUnits = equipment.reduce((s, e) => s + e.quantity, 0)
  const flagged = equipment.filter((e) => e.flagged).length
  const needService = equipment.filter((e) => e.condition === 'Needs Service').length

  const zoneName = (id) => ZONES.find((z) => z.id === id)?.name ?? id

  return (
    <div>
      <PageHeader title="Equipment" subtitle={`${equipment.length} line items · ${totalUnits} units`} />

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Total units" value={totalUnits} icon="fitness_center" tone="plain" />
        <StatCard label="Flagged for maintenance" value={flagged} icon="build" tone="gold" />
        <StatCard label="Needs service" value={needService} icon="warning" tone="red" />
      </div>

      <Panel className="p-4 mb-4">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 items-end">
          <div>
            <ALabel>Search</ALabel>
            <div className="relative">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 text-[18px]"
              />
              <AInput
                className="pl-10"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Equipment name"
              />
            </div>
          </div>
          <div>
            <ALabel>Zone</ALabel>
            <ASelect value={zone} onChange={(e) => setZone(e.target.value)}>
              <option value="All">All zones</option>
              {ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </ASelect>
          </div>
          <button
            onClick={() => setOnlyFlagged((v) => !v)}
            className={`font-label-bold text-label-sm uppercase px-4 py-2 rounded border transition-colors whitespace-nowrap ${
              onlyFlagged
                ? 'bg-electric-gold text-void-black border-electric-gold'
                : 'border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold'
            }`}
          >
            Flagged only
          </button>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState>No equipment matches</EmptyState>
        ) : (
          <Table head={['Equipment', 'Zone', 'Qty', 'Last serviced', 'Condition', 'Maintenance']}>
            {rows.map((e) => (
              <Tr key={e.id} className={e.flagged ? 'bg-electric-gold/[0.03]' : ''}>
                <Td>
                  <span className="flex items-center gap-2 text-on-surface">
                    {e.flagged && <Icon name="build" className="text-electric-gold text-[16px]" />}
                    {e.name}
                  </span>
                </Td>
                <Td className="text-secondary whitespace-nowrap">{zoneName(e.zone)}</Td>
                <Td>
                  <input
                    type="number"
                    min="0"
                    value={e.quantity}
                    onChange={(ev) =>
                      updateEquipment(e.id, { quantity: Math.max(0, Number(ev.target.value)) })
                    }
                    className="w-16 bg-void-black border border-surface-container-high rounded px-2 py-1 text-table-cell text-on-surface outline-none focus:border-electric-gold transition-colors"
                  />
                </Td>
                <Td className="text-secondary whitespace-nowrap">{e.lastServiced}</Td>
                <Td>
                  <select
                    value={e.condition}
                    onChange={(ev) => updateEquipment(e.id, { condition: ev.target.value })}
                    className="bg-void-black border border-surface-container-high rounded px-2 py-1.5 text-label-sm uppercase tracking-wider text-on-surface outline-none focus:border-electric-gold transition-colors"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <div className="mt-1.5">
                    <Pill tone={statusTone(e.condition)}>{e.condition}</Pill>
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-col gap-1.5 items-start">
                    <button
                      onClick={() => updateEquipment(e.id, { flagged: !e.flagged })}
                      className={`font-label-bold text-label-sm uppercase px-3 py-1.5 rounded border transition-colors whitespace-nowrap ${
                        e.flagged
                          ? 'border-electric-gold text-electric-gold'
                          : 'border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold'
                      }`}
                    >
                      {e.flagged ? 'Unflag' : 'Flag'}
                    </button>
                    <button
                      onClick={() =>
                        updateEquipment(e.id, {
                          lastServiced: new Date().toISOString().slice(0, 10),
                          flagged: false,
                          condition: 'Good',
                        })
                      }
                      className="font-label-bold text-label-sm uppercase text-secondary/60 hover:text-electric-gold transition-colors whitespace-nowrap"
                    >
                      Mark serviced
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Panel>

      <p className="font-label-sm text-secondary/50 mt-4 flex items-center gap-2">
        <Icon name="info" className="text-[16px]" />
        Quantities shown here drive the equipment lists in the landing page Facilities section.
      </p>
    </div>
  )
}
