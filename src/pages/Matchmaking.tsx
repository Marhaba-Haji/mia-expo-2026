import SEO from "@/components/seo/SEO";
import SimpleForm from "@/components/forms/SimpleForm";

export default function Matchmaking() {
  return (
    <main>
      <SEO title="B2B Matchmaking • MIA Business Expo" description="Connect exhibitors and buyers. Submit your interest and preferences for curated meetings." canonical="/matchmaking" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">B2B Matchmaking</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-card p-6"><SimpleForm title="Exhibitor Interest" sheetName="matchmaking_exhibitors" /></div>
          <div className="rounded-xl border bg-card p-6"><SimpleForm title="Buyer Interest" sheetName="matchmaking_buyers" /></div>
        </div>
      </section>
    </main>
  )
}
