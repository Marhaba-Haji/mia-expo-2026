import { Button } from "@/components/ui/button";
import SEO from "@/components/seo/SEO";
import { Link } from "react-router-dom";

const packages = [
  { name: 'Startup', price: '₹25,000', features: ['6 sqm booth', '2 exhibitor passes', 'Listing in directory'] },
  { name: 'Standard', price: '₹75,000', features: ['9 sqm booth', '4 exhibitor passes', 'B2B matchmaking access'] },
  { name: 'Premium', price: '₹1,50,000', features: ['18 sqm booth', '8 exhibitor passes', 'Speaking slot & PR'] },
]

export default function ExhibitorPackages() {
  return (
    <main>
      <SEO title="Exhibitor Packages • MIA Business Expo" description="Choose from startup, standard and premium exhibitor packages designed to maximize ROI." canonical="/exhibitor-packages" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Exhibitor Packages</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <article key={pkg.name} className="rounded-xl border bg-card p-6 shadow-elegant">
              <h3 className="text-xl font-semibold">{pkg.name}</h3>
              <p className="text-primary text-2xl mt-1">{pkg.price}</p>
              <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                {pkg.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <Button asChild variant="hero" className="mt-4 w-full"><Link to="/exhibitor-portal">Apply Now</Link></Button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
