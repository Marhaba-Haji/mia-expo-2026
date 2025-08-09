import SEO from "@/components/seo/SEO";

export default function About() {
  return (
    <main>
      <SEO
        title="About • MIA Business Expo"
        description="Learn about the MIA Business Expo—mission, values, and impact empowering minority communities across India."
        canonical="/about"
      />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-4">About the Expo</h1>
        <p className="text-muted-foreground max-w-prose">
          The MIA Business Expo is India’s premier inclusive trade show spotlighting high-growth sectors and innovators from Muslim, Sikh, Christian, Parsi and Jain communities. With global buyers, curated B2B matchmaking and thought-leadership, the Expo accelerates trade, investment and collaboration.
        </p>
      </section>
    </main>
  );
}
