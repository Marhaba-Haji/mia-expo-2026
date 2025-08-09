export default function Testimonials() {
  const items = [
    { name: 'A. Khan', role: 'Exporter', quote: 'Exceptional buyer meetings. We closed three deals in a week.' },
    { name: 'S. Kaur', role: 'Retailer', quote: 'Truly inclusive and well-organized. We met quality suppliers.' },
    { name: 'R. D’Silva', role: 'Investor', quote: 'Strong pipeline of startups and SMEs with real potential.' },
  ];
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="font-brand text-3xl mb-6">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <blockquote key={t.name} className="rounded-xl border bg-card p-6 shadow-elegant">
              <p className="text-foreground/90">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-muted-foreground">— {t.name}, {t.role}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
