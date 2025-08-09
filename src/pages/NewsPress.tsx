import SEO from "@/components/seo/SEO";

export default function NewsPress() {
  const posts = [
    { title: 'MIA Expo Announces 2025 Dates', date: '2025-04-12' },
    { title: 'New Sponsor Partnerships Signed', date: '2025-05-03' },
  ];
  return (
    <main>
      <SEO title="News & Press • MIA Business Expo" description="Latest updates, announcements and press releases for the MIA Business Expo." canonical="/news" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">News & Press</h1>
        <div className="space-y-4">
          {posts.map(p => (
            <article key={p.title} className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">{new Date(p.date).toDateString()}</div>
              <h3 className="font-medium">{p.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
