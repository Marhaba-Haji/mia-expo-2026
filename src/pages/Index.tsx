import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Sectors from "@/components/home/Sectors";
import WhyVisitTeaser from "@/components/home/WhyVisitTeaser";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import SponsorsMarquee from "@/components/home/SponsorsMarquee";
import SEO from "@/components/seo/SEO";

const Index = () => {
  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BusinessEvent',
    name: 'MIA Business Expo',
    startDate: '2025-12-12',
    endDate: '2025-12-14',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'Pragati Maidan',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressRegion: 'DL',
        addressCountry: 'IN'
      }
    },
    organizer: { '@type': 'Organization', name: 'Muslim Industrialists Association' }
  };

  return (
    <main>
      <SEO
        title="MIA Business Expo • Inclusive Trade Show India"
        description="Exhibit, sponsor and attend India’s premier inclusive trade show. B2B matchmaking, floor plan, tickets and more."
        canonical="/"
        jsonLd={eventJsonLd}
      />
      <Hero />
      <Stats />
      <Sectors />
      <WhyVisitTeaser />
      <Gallery />
      <Testimonials />
      <SponsorsMarquee />
    </main>
  );
};

export default Index;
