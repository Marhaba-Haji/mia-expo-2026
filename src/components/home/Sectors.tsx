import infrastructureImage from '@/assets/infrastructure-real-estate.jpg'
import manufacturingImage from '@/assets/manufacturing-machinery.jpg'
import hospitalityImage from '@/assets/hospitality.jpg'

const focusIndustries = [
  { 
    title: 'Infrastructure and Real Estate', 
    image: infrastructureImage,
    description: 'Construction, real estate development, and infrastructure projects'
  },
  { 
    title: 'Manufacturing and Machinery', 
    image: manufacturingImage,
    description: 'Industrial manufacturing, machinery, and production equipment'
  },
  { 
    title: 'Hospitality', 
    image: hospitalityImage,
    description: 'Hotels, restaurants, tourism, and hospitality services'
  },
]

export default function Sectors() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="font-brand text-3xl mb-6">Focus Industries</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {focusIndustries.map((industry) => (
            <article key={industry.title} className="rounded-xl border bg-card overflow-hidden hover:shadow-glow transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={industry.image} 
                  alt={industry.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{industry.title}</h3>
                <p className="text-muted-foreground text-sm">{industry.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
