import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Users, Handshake, Award, TrendingUp, Globe, Building2 } from "lucide-react";

interface HighlightItem {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  stat: string;
}

export default function Gallery() {
  const highlights: HighlightItem[] = [
    {
      title: "Opening Ceremony 2024",
      description: "Grand opening with 500+ exhibitors and industry leaders",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      icon: <Users className="w-5 h-5" />,
      stat: "500+ Attendees"
    },
    {
      title: "B2B Networking Sessions",
      description: "Successful matchmaking connecting businesses across sectors",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      icon: <Handshake className="w-5 h-5" />,
      stat: "1,200+ Meetings"
    },
    {
      title: "Award Ceremony",
      description: "Recognizing excellence in minority entrepreneurship",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      icon: <Award className="w-5 h-5" />,
      stat: "25+ Awards"
    },
    {
      title: "Exhibition Floor",
      description: "Diverse businesses showcasing innovative products and services",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      icon: <Building2 className="w-5 h-5" />,
      stat: "200+ Exhibitors"
    },
    {
      title: "International Pavilion",
      description: "Global businesses connecting with Indian entrepreneurs",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
      icon: <Globe className="w-5 h-5" />,
      stat: "10+ Countries"
    },
    {
      title: "Success Stories Panel",
      description: "Inspiring discussions from leading business personalities",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
      icon: <TrendingUp className="w-5 h-5" />,
      stat: "15+ Speakers"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-brand text-3xl md:text-4xl mb-4">Past Highlights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Glimpses from our previous successful events showcasing incredible moments of connection, collaboration, and growth
          </p>
        </motion.div>

        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {highlights.map((item, index) => (
              <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-80 rounded-xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300"
                >
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Stat Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                      {item.icon}
                      <span>{item.stat}</span>
                    </div>
                    
                    {/* Title & Description */}
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-xl mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative left-0 translate-x-0 translate-y-0" />
            <CarouselNext className="relative right-0 translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
