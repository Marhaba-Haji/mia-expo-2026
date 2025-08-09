import SEO from "@/components/seo/SEO";

export default function Speakers() {
  const speakers = Array.from({ length: 8 }).map((_, i) => ({ name: `Speaker ${i+1}`, role: 'Industry Expert' }))
  return (
    <main>
      <SEO title="Speakers • MIA Business Expo" description="Meet esteemed speakers and thought-leaders shaping trade and innovation." canonical="/speakers" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Speakers</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {speakers.map(s => (
            <article key={s.name} className="rounded-xl border bg-card p-4 text-center">
              <div className="h-32 rounded-lg bg-soft-gradient mb-3" aria-hidden />
              <h3 className="font-medium">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.role}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
