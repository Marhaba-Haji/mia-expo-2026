import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  ArrowRight,
  Users,
  Handshake,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function WhyVisitTeaser() {
  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Connect with 200+ Exhibitors",
      description: "Access India's leading businesses under one roof"
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "B2B Matchmaking",
      description: "Pre-scheduled meetings with decision-makers"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Latest Innovations",
      description: "Discover cutting-edge products and solutions"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Industry Insights",
      description: "Expert-led seminars and panel discussions"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">For Visitors</span>
          </div>
          <h2 className="font-brand text-3xl md:text-5xl mb-4">
            Why Should You Visit?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            Join 20,000+ business professionals discovering unlimited opportunities to grow, 
            source, and network at India's most impactful inclusive trade show.
          </p>
          <p className="text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 inline text-green-600 mr-1" />
            <span className="font-semibold">Free Entry</span> for pre-registered visitors • Save ₹4,999
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-glow transition-shadow border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-hero-gradient text-white border-0 shadow-elegant overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <h3 className="font-brand text-2xl md:text-3xl mb-4">
                  Whether You're Sourcing Products, Seeking Partnerships, or Staying Ahead of Trends
                </h3>
                <p className="text-lg text-primary-foreground/90 mb-6">
                  MIA Business Expo is where opportunities meet action. From Infrastructure & Real Estate 
                  to Manufacturing & Hospitality—discover what's next for your business.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild variant="secondary" size="lg" className="group">
                    <Link to="/why-visit">
                      Discover All Benefits
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Link to="/visitor-info">
                      Register Free Now
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>No Registration Fee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Priority Entry</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

