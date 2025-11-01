import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap,
  Handshake,
  Building2,
  Globe,
  Heart
} from "lucide-react";

export default function Collaborations() {
  const collaborations = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Academic Partnerships",
      description: "Connecting industry with leading universities for research, innovation, and skilled talent integration."
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "NGO Collaborations",
      description: "Partnering with NGOs to empower micro and minority enterprises in urban and rural regions."
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Government Alliances",
      description: "Working with MSME, Minority Affairs, and KMDC for policy support and business growth."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Chamber Connections",
      description: "Collaborating with national and international chambers to open new trade routes and global opportunities."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Faith & Community Partnerships",
      description: "In collaboration with Jamiat Ulema-e-Hind to foster ethical entrepreneurship and inclusive economic upliftment."
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(var(--primary)/.08),transparent_50%)]" />
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-brand text-3xl md:text-4xl mb-4">
            Collaborating for Inclusive Growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Building bridges between businesses, academia, government, and communities to drive innovation, empowerment, and trade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {collaborations.map((collab, index) => (
            <motion.div
              key={collab.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-glow transition-shadow border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                    {collab.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{collab.title}</h3>
                  <p className="text-sm text-muted-foreground">{collab.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

