import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
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
  DollarSign,
  BarChart3,
  Network,
  Shield,
  Zap,
  Quote,
  ChevronRight,
  Play,
  Heart
} from "lucide-react";
import { Factory, Utensils, LineChart, Ruler, Landmark, Palette } from "lucide-react";
import { Rocket, Crown } from "lucide-react";
import SEO from "@/components/seo/SEO";
import Stats from "@/components/home/Stats";
import Sectors from "@/components/home/Sectors";

export default function WhyExhibit() {
  const { t } = useTranslation();

  const keyBenefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Potential Buyers and Visitors",
      description: "High-intent buyers and trade visitors from across India",
      metric: "20,000+"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Curated B2B Matchmaking",
      description: "Schedule meetings with decision makers and key stakeholders",
      metric: "1000+"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Publicity Reach",
      description: "Extensive press coverage and digital marketing across social media platforms",
      metric: "100K"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Partner & Collaborate",
      description: "Collaborate with 200+ exhibitors to forge partnerships that complement and amplify business synergies",
      metric: "200+"
    }
  ];

  const roiMetrics = [
    {
      title: "Average ROI",
      value: "300%",
      description: "Return on investment within 6 months",
      icon: <TrendingUp className="h-6 w-6 text-green-600" />
    },
    {
      title: "Lead Generation",
      value: "150+",
      description: "Qualified leads per exhibitor on average",
      icon: <Target className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Sales Conversion",
      value: "25%",
      description: "Average conversion rate from leads to sales",
      icon: <BarChart3 className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Cost per Lead",
      value: "₹500",
      description: "Highly cost-effective compared to other channels",
      icon: <DollarSign className="h-6 w-6 text-orange-600" />
    }
  ];

  const exclusiveBenefits = [
    {
      icon: <Network className="h-6 w-6" />,
      title: "Premium Networking",
      description: "Access to industry leaders, government bodies, and buyers from across the country"
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Market Intelligence",
      description: "Exclusive insights into industry trends, policies, and market opportunities"
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Partnership Opportunities",
      description: "Connect with suppliers, distributors, and strategic business partners"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Industry Recognition",
      description: "Showcase your innovations and gain recognition within your industry"
    }
  ];

  const testimonials = [
    {
      quote: "MIA Expo helped us secure ₹2.5 crore in new business deals. The B2B matchmaking was exceptional.",
      author: "Ahmed Khan",
      company: "Khan Infrastructure Ltd.",
      industry: "Construction",
      rating: 5
    },
    {
      quote: "We met 15 potential international partners in just 3 days. The networking opportunities are unmatched.",
      author: "Priya Singh",
      company: "Singh Manufacturing Co.",
      industry: "Manufacturing",
      rating: 5
    },
    {
      quote: "The media coverage we received was worth more than our entire marketing budget for the year.",
      author: "John Mathew",
      company: "Mathew Hospitality Group",
      industry: "Hospitality",
      rating: 5
    }
  ];

  const industryBenefits = [
    {
      title: "Infrastructure & Real Estate",
      benefits: [
        "Government policy insights",
        "Construction technology showcase",
        "Investment opportunities",
        "Regulatory compliance guidance"
      ],
      icon: <Building2 className="h-8 w-8 text-primary" />
    },
    {
      title: "Manufacturing & Machinery",
      benefits: [
        "Industrial automation solutions",
        "Supply chain partnerships",
        "Technology transfer opportunities",
        "Export market access"
      ],
      icon: <Factory className="h-8 w-8 text-primary" />
    },
    {
      title: "Hospitality",
      benefits: [
        "Tourism promotion",
        "Service excellence standards",
        "International partnerships",
        "Cultural exchange programs"
      ],
      icon: <Utensils className="h-8 w-8 text-primary" />
    }
  ];

  const supportServices = [
    {
      title: "Pre-Event Marketing",
      description: "Promotional support, press releases, podcast video shoot, and promotion on Inspire Podcast YouTube and Instagram channels",
      icon: <Globe className="h-6 w-6" />
    },
    {
      title: "Booth Design & Setup",
      description: "Professional booth design and complete setup assistance on request*",
      icon: <Ruler className="h-6 w-6" />
    },
    {
      title: "Lead Management",
      description: "Dedicated SEO-optimized business landing page with pre/post-event contact options.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Post-Event Support",
      description: "Continued relationship building and business development",
      icon: <Handshake className="h-6 w-6" />
    }
  ];

  const competitiveAdvantages = [
    {
      title: "Inclusive Platform",
      description: "Only trade show specifically designed for minority business communities",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Cultural Understanding",
      description: "Deep understanding of community-specific business needs and practices",
      icon: <Palette className="h-6 w-6" />
    },
    {
      title: "Government Support",
      description: "Direct access to policy makers and regulatory insights",
      icon: <Landmark className="h-6 w-6" />
    },
    {
      title: "International Reach",
      description: "Global business networks and cross-border opportunities",
      icon: <Globe className="h-6 w-6" />
    }
  ];

  return (
    <main>
      <SEO 
        title="Why Exhibit • MIA Business Expo" 
        description="Discover the compelling benefits of exhibiting at MIA Business Expo—ROI, networking, global reach, and exclusive opportunities for minority businesses." 
        canonical="/why-exhibit" 
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
                Why Exhibit at MIA Business Expo?
              </h1>
              <p className="text-lg text-muted-foreground mb-4 max-w-3xl mx-auto">
                Your hunt for the perfect platform to showcase your business to potential clients and collaborators is here!
              </p>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Business EXPO by MIA is a unique platform to meet industry leaders, experts, entrepreneurs, and service providers—network, collaborate, and grow.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/exhibitor-packages">
                    View Exhibitor Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
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
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Unlock Your Business Potential</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Promising deals and collaborations await as you showcase your offerings in a dynamic 
              business environment curated to drive sales and visibility
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

      

      {/* Exclusive Exhibitor Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Exclusive Exhibitor Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access premium opportunities and exclusive benefits designed to maximize 
              your business impact and growth potential.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exclusiveBenefits.map((benefit, index) => (
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

      {/* Success Stories & Testimonials */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from our successful exhibitors who have transformed their businesses 
              through MIA Business Expo participation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold">{testimonial.author}</h4>
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

      {/* Focus Industries Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Industry-Specific Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tailored opportunities and benefits designed specifically for your industry 
              and business sector.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {industryBenefits.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4 flex justify-center">{industry.icon}</div>
                    <h3 className="font-semibold text-xl mb-4 text-center">{industry.title}</h3>
                    <ul className="space-y-2">
                      {industry.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          {benefit}
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

      {/* Support & Services */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Comprehensive Support & Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From pre-event marketing to post-event follow-up, we provide end-to-end 
              support to ensure your success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4">{service.icon}</div>
                    <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Why Choose MIA Business Expo?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Unlike other trade shows, MIA Business Expo offers unique advantages 
              specifically designed for minority business communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitiveAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4">{advantage.icon}</div>
                    <h3 className="font-semibold text-lg mb-3">{advantage.title}</h3>
                    <p className="text-muted-foreground text-sm">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Choose Your Perfect Package</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible packages designed to meet your business needs and budget, 
              from startups to established enterprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-glow transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="text-primary mb-3 flex justify-center"><Rocket className="h-6 w-6" /></div>
                <h3 className="font-semibold text-xl mb-2">Startup Package</h3>
                <div className="text-3xl font-bold text-primary mb-4">₹25,000</div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    6 sqm booth space
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    2 exhibitor passes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Directory listing
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/exhibitor-portal">Choose Startup</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-primary hover:shadow-glow transition-shadow relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
              <CardContent className="p-0 text-center">
                <div className="text-primary mb-3 flex justify-center"><Award className="h-6 w-6" /></div>
                <h3 className="font-semibold text-xl mb-2">Standard Package</h3>
                <div className="text-3xl font-bold text-primary mb-4">₹75,000</div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    9 sqm booth space
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    4 exhibitor passes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    B2B matchmaking access
                  </li>
                </ul>
                <Button asChild variant="hero" className="w-full">
                  <Link to="/exhibitor-portal">Choose Standard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="text-primary mb-3 flex justify-center"><Crown className="h-6 w-6" /></div>
                <h3 className="font-semibold text-xl mb-2">Premium Package</h3>
                <div className="text-3xl font-bold text-primary mb-4">₹1,50,000</div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    18 sqm booth space
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    8 exhibitor passes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Speaking slot & PR
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/exhibitor-portal">Choose Premium</Link>
                </Button>
              </CardContent>
            </Card>
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
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of successful exhibitors who have grown their businesses through 
              MIA Business Expo. Limited spaces available - secure your spot today!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button asChild variant="secondary" size="lg">
                <Link to="/exhibitor-packages">
                  <Building2 className="mr-2 h-4 w-4" />
                  View All Packages
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/contact">
                  <Handshake className="mr-2 h-4 w-4" />
                  Contact Sales
                </Link>
              </Button>
            </div>
            
          </motion.div>
        </div>
      </section>
    </main>
  );
}
