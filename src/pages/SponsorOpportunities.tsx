import SEO from "@/components/seo/SEO";
import SimpleForm from "@/components/forms/SimpleForm";

export default function SponsorOpportunities() {
  const tiers = [
    { name: 'Title Sponsor', perks: ['Naming rights', 'Keynote slot', 'Prime branding'] },
    { name: 'Gold Sponsor', perks: ['Stage branding', 'Session slots', 'Lead gen support'] },
    { name: 'Silver Sponsor', perks: ['Booth branding', 'Marketing bundles'] },
  ];
  return (
    <main>
      <SEO title="Sponsor Opportunities • MIA Business Expo" description="Explore sponsor tiers and benefits. Submit a direct inquiry to partner with the Expo." canonical="/sponsor-opportunities" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Sponsor Opportunities</h1>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {tiers.map(t => (
            <article key={t.name} className="rounded-xl border bg-card p-6">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                {t.perks.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="rounded-xl border bg-card p-6">
          <SimpleForm title="Submit Sponsor Inquiry" sheetName="sponsor_inquiries" />
        </div>
      </section>
    </main>
  );
}
