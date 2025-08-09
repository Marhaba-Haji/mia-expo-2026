import SEO from "@/components/seo/SEO";
import FloorPlanMap from "@/components/floorplan/FloorPlanMap";

export default function FloorPlan() {
  return (
    <main>
      <SEO title="Interactive Floor Plan • MIA Business Expo" description="Explore the interactive floor plan and booth availability for exhibitors." canonical="/floor-plan" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Interactive Floor Plan</h1>
        <FloorPlanMap />
      </section>
    </main>
  );
}
