import SEO from "@/components/seo/SEO";
import SimpleForm from "@/components/forms/SimpleForm";

const sessions = [
  { time: '10:00', title: 'Opening Keynote', speaker: 'Industry Leader' },
  { time: '11:30', title: 'Halal Exports: New Markets', speaker: 'Panel' },
  { time: '14:00', title: 'SME Financing & Grants', speaker: 'Banking Experts' },
]

export default function Programme() {
  return (
    <main>
      <SEO title="Programme & Agenda • MIA Business Expo" description="Explore keynotes, panels and workshops. RSVP to sessions to save your seat." canonical="/programme" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Programme & Agenda</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {sessions.map(s => (
              <article key={s.title} className="rounded-xl border bg-card p-4">
                <div className="text-sm text-muted-foreground">{s.time}</div>
                <h3 className="font-medium">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.speaker}</p>
              </article>
            ))}
          </div>
          <div className="rounded-xl border bg-card p-6 h-fit">
            <SimpleForm title="RSVP to Sessions" sheetName="session_rsvps" />
          </div>
        </div>
      </section>
    </main>
  );
}
