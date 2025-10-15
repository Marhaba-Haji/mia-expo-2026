import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Globe, 
  Building2, 
  Handshake, 
  Award, 
  Star,
  ArrowRight,
  CheckCircle,
  Calendar,
  MapPin,
  Briefcase,
  Network,
  Lightbulb,
  Zap,
  GraduationCap,
  ShoppingBag,
  Factory,
  Hotel,
  Construction,
  BadgeCheck,
  Rocket,
  LineChart,
  Users2,
  MessageSquare,
  BookOpen,
  Trophy
} from "lucide-react";
import SEO from "@/components/seo/SEO";
import infrastructureImage from '@/assets/infrastructure-real-estate.jpg';
import manufacturingImage from '@/assets/manufacturing-machinery.jpg';
import hospitalityImage from '@/assets/hospitality.jpg';

export default function WhyVisit() {

  const keyBenefits = [
    {
      icon: <Network className="h-8 w-8" />,
      title: "Connect with 600+ Exhibitors",
      description: "Access India's leading businesses and international companies showcasing cutting-edge products and services",
      metric: "600+"
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "B2B Matchmaking",
      description: "Pre-scheduled meetings with key decision-makers and industry leaders relevant to your business",
      metric: "4,500+"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Expert-Led Sessions",
      description: "Attend industry seminars, panel discussions, and keynotes from market leaders",
      metric: "50+"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "International Opportunities",
      description: "Meet exhibitors and buyers from 20+ countries exploring business expansion",
      metric: "20+"
    }
  ];

  const visitorPersonas = [
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: "Infrastructure & Real Estate Professionals",
      personas: [
        "Real Estate Developers & Investors",
        "Construction Companies & Contractors",
        "Architects & Urban Planners",
        "Infrastructure Project Managers",
        "Property Consultants & Brokers",
        "Government Officials & Policy Makers"
      ],
      benefits: [
        "Discover latest construction technologies and materials",
        "Connect with funding and investment opportunities",
        "Learn about government policies and regulations",
        "Network with contractors, suppliers, and consultants",
        "Explore sustainable building solutions"
      ],
      image: infrastructureImage
    },
    {
      icon: <Factory className="h-10 w-10 text-primary" />,
      title: "Manufacturing & Machinery Buyers",
      personas: [
        "Factory Owners & Production Managers",
        "Industrial Engineers & Technicians",
        "Supply Chain & Procurement Officers",
        "Quality Control Managers",
        "Automation & Technology Specialists",
        "Export-Import Business Owners"
      ],
      benefits: [
        "Source cutting-edge machinery and equipment",
        "Find reliable suppliers and distributors",
        "Learn about Industry 4.0 and automation",
        "Compare products and negotiate deals on-site",
        "Access export market opportunities"
      ],
      image: manufacturingImage
    },
    {
      icon: <Hotel className="h-10 w-10 text-primary" />,
      title: "Hospitality & Tourism Stakeholders",
      personas: [
        "Hotel & Restaurant Owners",
        "Tourism Board Representatives",
        "Event Planners & Wedding Consultants",
        "Travel Agencies & Tour Operators",
        "Catering & Food Service Providers",
        "Hospitality Technology Buyers"
      ],
      benefits: [
        "Discover innovative hospitality solutions",
        "Network with tourism promotion boards",
        "Source premium products and services",
        "Learn about guest experience trends",
        "Connect with international tourism partners"
      ],
      image: hospitalityImage
    }
  ];

  const whatYoullGain = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Product Discovery",
      description: "Explore thousands of products, services, and innovations across multiple sectors—all under one roof"
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Market Insights",
      description: "Gain valuable market intelligence, industry trends, and competitive analysis from expert speakers"
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Strategic Networking",
      description: "Build relationships with suppliers, partners, and industry peers that drive long-term business growth"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation Access",
      description: "Be the first to see product launches, technological breakthroughs, and industry innovations"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Direct Sourcing",
      description: "Compare offerings, negotiate prices, and place orders directly with manufacturers and suppliers"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Exclusive Deals",
      description: "Access special expo-only discounts, packages, and partnership opportunities"
    }
  ];

  const whyAttend = [
    {
      title: "Save Time & Money",
      description: "Meet hundreds of suppliers in 3 days instead of months of individual meetings. One trip, countless opportunities.",
      icon: <Zap className="h-8 w-8 text-orange-600" />
    },
    {
      title: "Competitive Advantage",
      description: "Stay ahead of your competition by discovering the latest products, technologies, and market trends first.",
      icon: <Trophy className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Verified Suppliers",
      description: "All exhibitors are pre-screened and verified, ensuring you connect with legitimate, quality businesses.",
      icon: <BadgeCheck className="h-8 w-8 text-green-600" />
    },
    {
      title: "Industry Education",
      description: "Attend free seminars, workshops, and panel discussions led by industry experts and thought leaders.",
      icon: <BookOpen className="h-8 w-8 text-purple-600" />
    }
  ];

  const whatToExpect = [
    {
      title: "Opening Day",
      icon: <Rocket className="h-6 w-6" />,
      activities: [
        "Keynote address from industry leaders",
        "Grand exhibition floor opening",
        "Welcome networking reception",
        "B2B matchmaking sessions begin"
      ]
    },
    {
      title: "Exhibition Days",
      icon: <Building2 className="h-6 w-6" />,
      activities: [
        "600+ exhibitor booths open 9 AM - 6 PM",
        "Live product demonstrations",
        "Industry-specific panel discussions",
        "One-on-one supplier meetings"
      ]
    },
    {
      title: "Networking Opportunities",
      icon: <Users className="h-6 w-6" />,
      activities: [
        "Dedicated networking lounges",
        "Industry-specific buyer meetups",
        "Evening networking events",
        "VIP buyer programs"
      ]
    },
    {
      title: "Knowledge Sessions",
      icon: <GraduationCap className="h-6 w-6" />,
      activities: [
        "Expert-led seminars & workshops",
        "Government policy briefings",
        "Technology showcases",
        "Future trends presentations"
      ]
    }
  ];

  const visitorTestimonials = [
    {
      quote: "In just 2 days, I met 25 potential suppliers and finalized 3 major contracts worth ₹50 lakhs. Incredible ROI!",
      author: "Rajesh Kumar",
      company: "Kumar Construction Pvt Ltd",
      industry: "Infrastructure",
      role: "Procurement Head"
    },
    {
      quote: "The B2B matchmaking connected me with exactly the machinery suppliers I needed. Saved months of research.",
      author: "Fatima Sheikh",
      company: "Sheikh Manufacturing",
      industry: "Manufacturing",
      role: "Operations Director"
    },
    {
      quote: "Found innovative hospitality tech solutions I didn't even know existed. The expo is a goldmine for hoteliers.",
      author: "Thomas Mathew",
      company: "Mathew Hotels Group",
      industry: "Hospitality",
      role: "CEO"
    }
  ];

  return (
    <main>
      <SEO 
        title="Why Visit • MIA Business Expo" 
        description="Discover why 35,000+ business professionals attend MIA Business Expo. Connect with 600+ exhibitors, access exclusive deals, and grow your business across Infrastructure, Manufacturing, and Hospitality sectors." 
        canonical="/why-visit" 
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
                Why Visit MIA Business Expo?
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join 35,000+ business professionals, connect with 600+ exhibitors, and discover 
                unlimited opportunities to grow your business. Whether you're sourcing products, 
                seeking partnerships, or staying ahead of industry trends—this is where business happens.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/visitor-info">
                    Register Free Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/programme">
                    View Programme
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <CheckCircle className="h-4 w-4 inline mr-1 text-green-600" />
                Free entry for pre-registered visitors • Save ₹4,999
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits Overview */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">What You'll Experience</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              MIA Business Expo brings together the best of India's business ecosystem in one place, 
              creating unmatched opportunities for discovery, networking, and growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow text-center">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4 flex justify-center">{benefit.icon}</div>
                    <div className="text-3xl font-bold text-primary mb-2">{benefit.metric}</div>
                    <h3 className="font-semibold text-lg mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Attend - Visitor Personas */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Who Should Attend?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              MIA Business Expo is designed for decision-makers, buyers, and business professionals 
              across our three focus industries. Find your industry below.
            </p>
          </motion.div>

          <div className="space-y-12">
            {visitorPersonas.map((persona, index) => (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-glow transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-video md:aspect-auto overflow-hidden">
                      <img 
                        src={persona.image} 
                        alt={persona.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="mb-4">{persona.icon}</div>
                      <h3 className="font-brand text-2xl mb-6">{persona.title}</h3>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                          Perfect For:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {persona.personas.map((p, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                          What You'll Gain:
                        </h4>
                        <ul className="space-y-2">
                          {persona.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">What's in It for You?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're looking to source products, expand your network, or stay ahead of 
              industry trends, MIA Business Expo delivers tangible value for every visitor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatYoullGain.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4">{benefit.icon}</div>
                    <h3 className="font-semibold text-lg mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">The Smart Business Decision</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Attending MIA Business Expo isn't just an event visit—it's a strategic investment 
              in your business growth and competitive advantage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyAttend.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-glow transition-shadow h-full">
                  <CardContent className="p-0">
                    <div className="mb-4 flex justify-center">{reason.icon}</div>
                    <h3 className="font-semibold text-lg mb-3">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">What to Expect at the Expo</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Three days packed with exhibitions, networking, learning, and business opportunities. 
              Here's how to make the most of your visit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToExpect.map((day, index) => (
              <motion.div
                key={day.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4">{day.icon}</div>
                    <h3 className="font-semibold text-lg mb-4">{day.title}</h3>
                    <ul className="space-y-2">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitor Testimonials */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">What Visitors Say</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from business professionals who have transformed their operations through 
              connections and insights gained at MIA Business Expo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {visitorTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <MessageSquare className="h-8 w-8 text-primary mb-4" />
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      <Badge variant="secondary" className="mt-2">{testimonial.industry}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Highlight */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="bg-hero-gradient text-white rounded-2xl p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="font-brand text-3xl md:text-4xl mb-4">Join Thousands of Success Stories</h2>
              <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto">
                Every year, MIA Business Expo delivers measurable results for visitors
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">35,000+</div>
                <p className="text-primary-foreground/80">Business Visitors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">600+</div>
                <p className="text-primary-foreground/80">Exhibitors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
                <p className="text-primary-foreground/80">Countries Represented</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">₹500Cr+</div>
                <p className="text-primary-foreground/80">Business Generated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4" variant="secondary">
              <Zap className="h-4 w-4 mr-2" />
              Limited Time Offer
            </Badge>
            <h2 className="font-brand text-3xl md:text-4xl mb-6">
              Ready to Accelerate Your Business Growth?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Register now for FREE and join 35,000+ business professionals at India's most 
              impactful inclusive trade show. Don't miss this opportunity to connect, discover, and grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button asChild variant="hero" size="lg">
                <Link to="/visitor-info">
                  <Users className="mr-2 h-5 w-5" />
                  Register Free Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/programme">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Full Programme
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No registration fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Instant QR pass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Priority entry</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

