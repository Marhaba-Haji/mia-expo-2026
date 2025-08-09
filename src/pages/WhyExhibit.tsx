import SEO from "@/components/seo/SEO";

export default function WhyExhibit() {
  const points = [
    'High-intent buyers and trade visitors',
    'Curated B2B matchmaking program',
    'Extensive media and press coverage',
    'Diverse audience with international reach',
  ];
  return (
    <main>
      <SEO title="Why Exhibit • MIA Business Expo" description="Discover benefits of exhibiting—meet buyers, grow leads, and close deals at India’s inclusive trade show." canonical="/why-exhibit" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Why Exhibit</h1>
        <ul className="grid md:grid-cols-2 gap-4">
          {points.map(p => (
            <li key={p} className="rounded-lg border bg-card p-5">{p}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
