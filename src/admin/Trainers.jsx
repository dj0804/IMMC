import { useState } from 'react'
import { useStore } from '../store/AppStore'
import { Icon, Photo, Pill } from '../components/ui'
import { PageHeader, Panel, AInput, ATextarea, ALabel } from './adminUi'

export default function Trainers() {
  const { trainers, updateTrainer, members } = useStore()
  const [editing, setEditing] = useState(null)

  const ptMembers = members.filter((m) => m.ptAddOn && m.status === 'Active').length

  return (
    <div>
      <PageHeader
        title="Trainers"
        subtitle={`${trainers.filter((t) => t.active).length} on the floor · ${ptMembers} members on PT`}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {trainers.map((t) =>
          editing === t.id ? (
            <EditCard
              key={t.id}
              trainer={t}
              onCancel={() => setEditing(null)}
              onSave={(changes) => {
                updateTrainer(t.id, changes)
                setEditing(null)
              }}
            />
          ) : (
            <Panel key={t.id} className={`p-5 flex flex-col ${t.active ? '' : 'opacity-60'}`}>
              <div className="flex items-start gap-4 mb-4">
                <Photo
                  imgKey={t.photo}
                  className="h-16 w-16 rounded shrink-0"
                  imgClassName="object-top grayscale opacity-80"
                />
                <div className="min-w-0">
                  <h3 className="font-headline-md text-lg uppercase text-primary truncate">
                    {t.name}
                  </h3>
                  <span className="font-label-sm uppercase tracking-wider text-electric-gold block">
                    {t.specialty}
                  </span>
                  <span className="font-label-sm text-secondary/60">
                    {t.yearsExperience} yrs
                  </span>
                </div>
              </div>

              <p className="text-table-cell text-secondary flex-1 mb-3">{t.bio}</p>
              <p className="font-label-sm text-secondary/50 mb-4">{t.certifications}</p>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-surface-container-high">
                <Pill tone={t.active ? 'active' : 'neutral'}>
                  {t.active ? 'On floor' : 'Hidden'}
                </Pill>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTrainer(t.id, { active: !t.active })}
                    className="font-label-bold text-label-sm uppercase text-secondary hover:text-electric-gold transition-colors"
                  >
                    {t.active ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => setEditing(t.id)}
                    className="font-label-bold text-label-sm uppercase text-electric-gold hover:underline underline-offset-4"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </Panel>
          )
        )}
      </div>

      <p className="font-label-sm text-secondary/50 mt-4 flex items-center gap-2">
        <Icon name="info" className="text-[16px]" />
        Hidden trainers are removed from the landing page Coaches section immediately.
      </p>
    </div>
  )
}

function EditCard({ trainer, onSave, onCancel }) {
  const [draft, setDraft] = useState({
    name: trainer.name,
    specialty: trainer.specialty,
    yearsExperience: trainer.yearsExperience,
    certifications: trainer.certifications,
    bio: trainer.bio,
  })

  return (
    <Panel className="p-5 border-electric-gold/50">
      <div className="space-y-4">
        <div>
          <ALabel>Name</ALabel>
          <AInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div>
          <ALabel>Specialty</ALabel>
          <AInput
            value={draft.specialty}
            onChange={(e) => setDraft({ ...draft, specialty: e.target.value })}
          />
        </div>
        <div>
          <ALabel>Years experience</ALabel>
          <AInput
            type="number"
            value={draft.yearsExperience}
            onChange={(e) => setDraft({ ...draft, yearsExperience: Number(e.target.value) })}
          />
        </div>
        <div>
          <ALabel>Certifications</ALabel>
          <AInput
            value={draft.certifications}
            onChange={(e) => setDraft({ ...draft, certifications: e.target.value })}
          />
        </div>
        <div>
          <ALabel>Bio</ALabel>
          <ATextarea
            rows={5}
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onSave(draft)}
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
