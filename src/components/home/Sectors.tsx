import { Building2, Factory, Salad, Stethoscope, Package, Zap } from 'lucide-react'

const sectors = [
  { icon: Building2, title: 'Halal & Ethical F&B' },
  { icon: Factory, title: 'Manufacturing & Machinery' },
  { icon: Salad, title: 'Agri & Organics' },
  { icon: Stethoscope, title: 'Healthcare & Wellness' },
  { icon: Package, title: 'Retail & E-commerce' },
  { icon: Zap, title: 'Technology & Startups' },
]

export default function Sectors() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="font-brand text-3xl mb-6">Industry Sectors</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sectors.map((s) => (
            <article key={s.title} className="rounded-xl border bg-card p-6 hover:shadow-glow transition-shadow">
              <s.icon className="h-6 w-6 text-primary mb-3" aria-hidden />
              <h3 className="font-medium">{s.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
