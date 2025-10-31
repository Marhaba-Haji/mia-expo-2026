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
      description: "MIA Business Expo offers a platform to minority communities to showcase their offerings in a wholesome and inclusive environment that offers equal opportunity to all."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Excellence",
      description: "Showcasing the finest offerings from both established and young businesses in a dynamic business environment"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Innovation",
      description: "Adapting and showcasing the latest technology and innovation that is shaping the future of the industries under spotlight"
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Collaboration",
      description: "Curated to encourage collaborations between businesses in allied industries to create a self sufficient ecosystem"
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
                05-07 Jun 2026
              </Badge>
              <h1 className="font-brand text-4xl md:text-6xl leading-tight mb-6">
                MIA Business EXPO 2026
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                A unique business exhibition and networking platform for minority communities, specially curated by MIA, Business Expo 2026 is the perfect opportunity for you to showcase your business to potential partners, customers and investors while networking with industry giants, experts and potential collaborators from allied industries.
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
                At Muslim Industrialists Association (MIA), we strongly believe that networking and collaboration is one of the driving forces for continued success in business. By empowering each other and collaborating, we can create a self-sufficient ecosystem that thrives on positivity and shared enthusiasm. The minorities in India comprise of Muslims, Sikhs, Parsis, Christians etc., and MIA Business Expo 2026 is especially curated to offer a dynamic business and networking platform to help businesses from minority communities to network, collaborate and take their businesses to greater heights.
              </p>
              <div className="flex items-center gap-3">
                <Eye className="h-8 w-8 text-primary" />
                <h3 className="font-brand text-2xl">Our Vision</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                We aim to become the leading business exhibition and networking platforms for minorities to come together and showcase their offerings and services to potential clients from across the world. Businesses in India have a great potential and MIA Business Expo is not just a showcase, but a celebration of our diversity and untapped talents and abilities that would make India the superpower on the global map.
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
                committed to fostering economic growth across minority communities. For more details visit 
                {" "}
                <a href="https://www.miaindia.org">www.miaindia.org</a>
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
                    <div className="text-3xl font-bold text-primary mb-2">650+</div>
                    <div className="text-sm text-muted-foreground">Member Businesses</div>
                  </CardContent>
                </Card>
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-primary mb-2">₹10Cr+</div>
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
            <h2 className="font-brand text-3xl md:text-4xl mb-6">When, Where and Who</h2>
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
                  05-07 Jun 2026<br />
                  Three days of intensive networking and business development
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-glow transition-shadow">
              <CardContent className="p-0">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Where</h3>
                <p className="text-muted-foreground">
                  Tripura Vasini, Palace Grounds, Bangalore<br />
                  One of India's premier exhibition and convention venues
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-glow transition-shadow">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Who</h3>
                <p className="text-muted-foreground">
                  Open to industrialists, entrepreneurs, business owners, startup founders, MSMEs, and the general public worldwide.
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
            
          </motion.div>
        </div>
      </section>
    </main>
  );
}
