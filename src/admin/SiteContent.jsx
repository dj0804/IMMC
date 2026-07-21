import { Link } from 'react-router-dom'
import { useStore } from '../store/AppStore'
import { Icon } from '../components/ui'
import { PageHeader, Panel, AInput, ATextarea, ALabel } from './adminUi'

export default function SiteContent() {
  const { content, updateContent, updateTestimonial } = useStore()

  return (
    <div className="max-w-4xl">
      <PageHeader title="Site Content" subtitle="Every field here is live on the public site">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-2 font-label-bold text-label-sm uppercase border border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold rounded px-4 py-2 transition-colors"
        >
          <Icon name="open_in_new" className="text-[16px]" />
          View site
        </Link>
      </PageHeader>

      <div className="flex gap-3 items-start bg-electric-gold/5 border border-electric-gold/30 rounded p-4 mb-6">
        <Icon name="bolt" className="text-electric-gold shrink-0" />
        <p className="text-table-cell text-secondary">
          Changes apply as you type — no save button, no publish step. Open the landing page in
          another tab and watch it update.
        </p>
      </div>

      <Panel className="p-6 mb-4">
        <h2 className="font-headline-md text-lg uppercase text-primary mb-5">Hero</h2>
        <div className="space-y-4">
          <div>
            <ALabel>Tagline</ALabel>
            <ATextarea
              rows={2}
              value={content.tagline}
              onChange={(e) => updateContent({ tagline: e.target.value })}
            />
          </div>
          <div>
            <ALabel>Word to highlight in gold</ALabel>
            <AInput
              value={content.taglineHighlight}
              onChange={(e) => updateContent({ taglineHighlight: e.target.value })}
            />
            <span className="font-label-sm text-secondary/50 mt-1 block">
              Must appear in the tagline above to take effect.
            </span>
          </div>
          <div>
            <ALabel>Sub-heading</ALabel>
            <ATextarea
              rows={3}
              value={content.heroSub}
              onChange={(e) => updateContent({ heroSub: e.target.value })}
            />
          </div>
        </div>
      </Panel>

      <Panel className="p-6 mb-4">
        <h2 className="font-headline-md text-lg uppercase text-primary mb-5">About / Philosophy</h2>
        <div className="space-y-4">
          <div>
            <ALabel>Heading</ALabel>
            <ATextarea
              rows={2}
              value={content.aboutHeading}
              onChange={(e) => updateContent({ aboutHeading: e.target.value })}
            />
          </div>
          <div>
            <ALabel>Phrase to highlight in gold</ALabel>
            <AInput
              value={content.aboutHighlight}
              onChange={(e) => updateContent({ aboutHighlight: e.target.value })}
            />
          </div>
          <div>
            <ALabel>Body copy</ALabel>
            <ATextarea
              rows={4}
              value={content.aboutBody}
              onChange={(e) => updateContent({ aboutBody: e.target.value })}
            />
          </div>
        </div>
      </Panel>

      <Panel className="p-6 mb-4">
        <h2 className="font-headline-md text-lg uppercase text-primary mb-5">Principles</h2>
        <div className="space-y-4">
          {content.principles.map((p, i) => (
            <div key={p.n} className="grid sm:grid-cols-[auto_1fr] gap-4 items-start">
              <span className="font-headline-md text-2xl text-electric-gold italic opacity-60 pt-6">
                {p.n}
              </span>
              <div className="space-y-3">
                <div>
                  <ALabel>Title</ALabel>
                  <AInput
                    value={p.title}
                    onChange={(e) => {
                      const principles = [...content.principles]
                      principles[i] = { ...p, title: e.target.value }
                      updateContent({ principles })
                    }}
                  />
                </div>
                <div>
                  <ALabel>Description</ALabel>
                  <AInput
                    value={p.body}
                    onChange={(e) => {
                      const principles = [...content.principles]
                      principles[i] = { ...p, body: e.target.value }
                      updateContent({ principles })
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-6 mb-4">
        <h2 className="font-headline-md text-lg uppercase text-primary mb-5">Testimonials</h2>
        <div className="space-y-6">
          {content.testimonials.map((t) => (
            <div key={t.id} className="pb-6 border-b border-surface-container-high last:border-0 last:pb-0">
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <ALabel>Name</ALabel>
                  <AInput
                    value={t.name}
                    onChange={(e) => updateTestimonial(t.id, { name: e.target.value })}
                  />
                </div>
                <div>
                  <ALabel>Role / tenure</ALabel>
                  <AInput
                    value={t.role}
                    onChange={(e) => updateTestimonial(t.id, { role: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <ALabel>Quote</ALabel>
                <ATextarea
                  rows={3}
                  value={t.quote}
                  onChange={(e) => updateTestimonial(t.id, { quote: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-6">
        <h2 className="font-headline-md text-lg uppercase text-primary mb-5">Contact details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <ALabel>Address</ALabel>
            <AInput
              value={content.contact.address}
              onChange={(e) =>
                updateContent({ contact: { ...content.contact, address: e.target.value } })
              }
            />
          </div>
          <div>
            <ALabel>Phone (tap-to-call)</ALabel>
            <AInput
              value={content.contact.phone}
              onChange={(e) =>
                updateContent({ contact: { ...content.contact, phone: e.target.value } })
              }
            />
          </div>
          <div>
            <ALabel>WhatsApp (digits, country code first)</ALabel>
            <AInput
              value={content.contact.whatsapp}
              onChange={(e) =>
                updateContent({ contact: { ...content.contact, whatsapp: e.target.value } })
              }
            />
          </div>
          <div>
            <ALabel>Hours</ALabel>
            <AInput
              value={content.contact.hours}
              onChange={(e) =>
                updateContent({ contact: { ...content.contact, hours: e.target.value } })
              }
            />
          </div>
          <div>
            <ALabel>Email</ALabel>
            <AInput
              value={content.contact.email}
              onChange={(e) =>
                updateContent({ contact: { ...content.contact, email: e.target.value } })
              }
            />
          </div>
          <div>
            <ALabel>Instagram</ALabel>
            <AInput
              value={content.contact.instagram}
              onChange={(e) =>
                updateContent({ contact: { ...content.contact, instagram: e.target.value } })
              }
            />
          </div>
        </div>
      </Panel>
    </div>
  )
}
