import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Globe, 
  Building2, 
  Handshake, 
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import SEO from "@/components/seo/SEO";
import Stats from "@/components/home/Stats";
import Sectors from "@/components/home/Sectors";

export default function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Inclusivity",
      description: "Creating equal opportunities for all minority communities to showcase their businesses and innovations."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Excellence",
      description: "Maintaining the highest standards in trade show organization and business facilitation."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Innovation",
      description: "Embracing new technologies and methodologies to enhance business connections and growth."
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Collaboration",
      description: "Fostering partnerships and networks that drive mutual success and community development."
    }
  ];

  const whyMatters = [
    {
      title: "Inclusive Growth",
      description: "Leveling the playing field for minority businesses to access global markets and opportunities.",
      icon: <Globe className="h-8 w-8 text-primary" />
    },
    {
      title: "Economic Impact",
      description: "Driving significant trade, investment, and job creation across diverse communities.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    },
    {
      title: "Cultural Bridge",
      description: "Celebrating diversity in commerce while building bridges between different communities.",
      icon: <Heart className="h-8 w-8 text-primary" />
    },
    {
      title: "Global Reach",
      description: "Connecting Indian minority businesses with international partners and markets.",
      icon: <Building2 className="h-8 w-8 text-primary" />
    }
  ];

  const leadership = [
    {
      name: "Dr. Ahmed Khan",
      role: "Chairman, MIA",
      description: "Leading advocate for minority business development with 25+ years in industrial relations."
    },
    {
      name: "Ms. Priya Singh",
      role: "Vice Chair, Sikh Business Council",
      description: "Expert in international trade and B2B matchmaking with extensive global network."
    },
    {
      name: "Mr. John Mathew",
      role: "Director, Christian Business Association",
      description: "Specialist in manufacturing and infrastructure development across India."
    },
    {
      name: "Ms. Zara Irani",
      role: "Advisor, Parsi Business Guild",
      description: "Hospitality industry leader with expertise in luxury and premium service sectors."
    }
  ];

  return (
    <main>
      <SEO
        title="About • MIA Business Expo"
        description="Learn about the MIA Business Expo—mission, values, and impact empowering minority communities across India."
        canonical="/about"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-20" aria-hidden />
        <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_top_left,hsla(var(--primary)/.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsla(var(--accent)/.25),transparent_50%)]" aria-hidden />
        
        <div className="container relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                December 12-14, 2025
              </Badge>
              <h1 className="font-brand text-4xl md:text-6xl leading-tight mb-6">
                About MIA Business Expo
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                India's premier inclusive trade show empowering minority communities through commerce, 
                collaboration, and cultural celebration. Join us in building bridges and creating opportunities 
                for Muslim, Sikh, Christian, Parsi, and Jain businesses.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/exhibitor-packages">
                    Register as Exhibitor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/visitor-info">
                    Get Visitor Tickets
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="font-brand text-3xl">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                To empower minority communities across India by creating a world-class platform that 
                showcases their innovations, facilitates meaningful business connections, and drives 
                inclusive economic growth.
              </p>
              <div className="flex items-center gap-3">
                <Eye className="h-8 w-8 text-primary" />
                <h3 className="font-brand text-2xl">Our Vision</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                To become India's most impactful and inclusive business platform, where diversity 
                in commerce is celebrated and every community has equal opportunities to thrive 
                in the global marketplace.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => (
                <Card key={value.title} className="p-6 hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-primary mb-3">{value.icon}</div>
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About MIA Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-brand text-3xl md:text-4xl mb-6">About Muslim Industrialists Association</h2>
              <p className="text-lg text-muted-foreground mb-8">
                The Muslim Industrialists Association (MIA) has been at the forefront of promoting 
                inclusive business development in India for over two decades. Our organization 
                represents a diverse network of entrepreneurs, industrialists, and business leaders 
                committed to fostering economic growth across minority communities.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-primary mb-2">20+</div>
                    <div className="text-sm text-muted-foreground">Years of Experience</div>
                  </CardContent>
                </Card>
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                    <div className="text-sm text-muted-foreground">Member Businesses</div>
                  </CardContent>
                </Card>
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-primary mb-2">₹500Cr+</div>
                    <div className="text-sm text-muted-foreground">Business Generated</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expo Overview */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">MIA Business Expo 2025</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join us for India's most comprehensive inclusive trade show, bringing together 
              businesses, investors, and partners from around the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-glow transition-shadow">
              <CardContent className="p-0">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">When</h3>
                <p className="text-muted-foreground">
                  December 12-14, 2025<br />
                  Three days of intensive networking and business development
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-glow transition-shadow">
              <CardContent className="p-0">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Where</h3>
                <p className="text-muted-foreground">
                  Pragati Maidan, New Delhi<br />
                  India's premier exhibition and convention center
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-glow transition-shadow">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Who</h3>
                <p className="text-muted-foreground">
                  Muslim, Sikh, Christian, Parsi, and Jain<br />
                  Business communities and their partners
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Stats />

      {/* Focus Industries */}
      <Sectors />

      {/* Why MIA Expo Matters */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Why MIA Expo Matters</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our expo goes beyond traditional trade shows to create lasting impact and meaningful change.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyMatters.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0 text-center">
                    <div className="mb-4 flex justify-center">{item.icon}</div>
                    <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the visionary leaders driving inclusive business growth across India's minority communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{leader.name}</h3>
                    <p className="text-primary text-sm mb-3">{leader.role}</p>
                    <p className="text-muted-foreground text-sm">{leader.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-hero-gradient text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Join the Movement</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of India's most inclusive business platform. Whether you're an exhibitor, 
              visitor, or sponsor, your participation drives meaningful change.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link to="/exhibitor-packages">
                  <Building2 className="mr-2 h-4 w-4" />
                  Register as Exhibitor
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/visitor-info">
                  <Users className="mr-2 h-4 w-4" />
                  Get Visitor Tickets
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/sponsor-opportunities">
                  <Handshake className="mr-2 h-4 w-4" />
                  Become a Sponsor
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm opacity-75">
              <CheckCircle className="h-4 w-4" />
              <span>Early bird discounts available until October 2025</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
