import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Heart,
  Crown,
  Gem,
  Medal,
  Trophy,
  Download,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Eye,
  Megaphone,
  Briefcase,
  FileText,
  Headphones,
  Settings,
  User,
  Clock,
  Check,
  X,
  Plus,
  Minus,
  Calculator,
  PieChart,
  TrendingDown,
  Activity,
  Zap as Lightning
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { postToWebhook } from "@/lib/webhook";
import SEO from "@/components/seo/SEO";
import { Link } from "react-router-dom";

export default function SponsorOpportunities() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    package: '',
    budget: '',
    message: '',
    interest: ''
  });
  const [loading, setLoading] = useState(false);

  const sponsorshipPackages = [
    {
      name: "Title Sponsor",
      price: "₹50,00,000+",
      description: "Maximum visibility and exclusive positioning",
      icon: <Crown className="h-8 w-8" />,
      popular: true,
      benefits: {
        branding: [
          "Naming rights to entire expo",
          "Logo on all marketing materials",
          "Prime booth location (50 sqm)",
          "Exclusive stage branding"
        ],
        networking: [
          "50+ complimentary passes",
          "VIP networking events",
          "Private meeting rooms",
          "Exclusive dinner with leadership"
        ],
        marketing: [
          "Full digital marketing campaign",
          "PR and media coverage",
          "Social media amplification",
          "Content co-creation"
        ],
        leadGeneration: [
          "500+ qualified leads",
          "Lead database access",
          "Follow-up support",
          "CRM integration"
        ],
        speaking: [
          "Keynote speaking slot",
          "Panel discussion moderation",
          "Workshop hosting",
          "Industry thought leadership"
        ],
        exclusive: [
          "Dedicated account manager",
          "Custom partnership opportunities",
          "Multi-year agreements",
          "First right of refusal"
        ]
      },
      metrics: {
        passes: 50,
        boothSize: "50 sqm",
        leads: "500+",
        impressions: "10M+"
      }
    },
    {
      name: "Platinum Sponsor",
      price: "₹25,00,000+",
      description: "Premium positioning with high impact",
      icon: <Gem className="h-8 w-8" />,
      popular: false,
      benefits: {
        branding: [
          "Main stage branding",
          "Logo on key materials",
          "Premium booth location (36 sqm)",
          "Session sponsorship"
        ],
        networking: [
          "25+ complimentary passes",
          "VIP networking access",
          "Priority meeting scheduling",
          "Industry roundtables"
        ],
        marketing: [
          "Digital marketing campaign",
          "Media partnership",
          "Social media promotion",
          "Content collaboration"
        ],
        leadGeneration: [
          "300+ qualified leads",
          "Lead database access",
          "Follow-up assistance",
          "Contact management"
        ],
        speaking: [
          "Speaking slot in main sessions",
          "Panel participation",
          "Workshop opportunities",
          "Industry insights sharing"
        ],
        exclusive: [
          "Dedicated support team",
          "Custom branding options",
          "Partnership opportunities",
          "Priority access"
        ]
      },
      metrics: {
        passes: 25,
        boothSize: "36 sqm",
        leads: "300+",
        impressions: "5M+"
      }
    },
    {
      name: "Gold Sponsor",
      price: "₹15,00,000+",
      description: "Strong visibility with networking focus",
      icon: <Medal className="h-8 w-8" />,
      popular: false,
      benefits: {
        branding: [
          "Session branding",
          "Booth location (18 sqm)",
          "Directory listing",
          "Marketing materials"
        ],
        networking: [
          "15+ complimentary passes",
          "Networking event access",
          "B2B matchmaking priority",
          "Industry connections"
        ],
        marketing: [
          "Digital promotion",
          "Social media mentions",
          "Content sharing",
          "Brand visibility"
        ],
        leadGeneration: [
          "200+ qualified leads",
          "Lead database access",
          "Follow-up support",
          "Contact information"
        ],
        speaking: [
          "Session participation",
          "Workshop opportunities",
          "Industry discussions",
          "Expert positioning"
        ],
        exclusive: [
          "Support team access",
          "Custom options",
          "Partnership potential",
          "Priority consideration"
        ]
      },
      metrics: {
        passes: 15,
        boothSize: "18 sqm",
        leads: "200+",
        impressions: "2M+"
      }
    },
    {
      name: "Silver Sponsor",
      price: "₹8,00,000+",
      description: "Cost-effective with good visibility",
      icon: <Trophy className="h-8 w-8" />,
      popular: false,
      benefits: {
        branding: [
          "Booth branding",
          "Standard location (9 sqm)",
          "Directory listing",
          "Marketing bundles"
        ],
        networking: [
          "8+ complimentary passes",
          "Networking access",
          "B2B opportunities",
          "Industry connections"
        ],
        marketing: [
          "Digital listing",
          "Social media mentions",
          "Content inclusion",
          "Brand visibility"
        ],
        leadGeneration: [
          "100+ qualified leads",
          "Lead database access",
          "Follow-up assistance",
          "Contact details"
        ],
        speaking: [
          "Workshop opportunities",
          "Industry participation",
          "Expert positioning",
          "Thought leadership"
        ],
        exclusive: [
          "Support access",
          "Custom options",
          "Partnership potential",
          "Future opportunities"
        ]
      },
      metrics: {
        passes: 8,
        boothSize: "9 sqm",
        leads: "100+",
        impressions: "1M+"
      }
    },
    {
      name: "Bronze Sponsor",
      price: "₹3,00,000+",
      description: "Entry-level with essential benefits",
      icon: <Award className="h-8 w-8" />,
      popular: false,
      benefits: {
        branding: [
          "Basic branding",
          "Standard location (6 sqm)",
          "Directory listing",
          "Marketing support"
        ],
        networking: [
          "4+ complimentary passes",
          "General networking",
          "B2B access",
          "Industry presence"
        ],
        marketing: [
          "Digital listing",
          "Basic promotion",
          "Content inclusion",
          "Brand visibility"
        ],
        leadGeneration: [
          "50+ qualified leads",
          "Lead database access",
          "Follow-up support",
          "Contact information"
        ],
        speaking: [
          "Industry participation",
          "Expert positioning",
          "Thought leadership",
          "Future opportunities"
        ],
        exclusive: [
          "Basic support",
          "Custom options",
          "Partnership potential",
          "Growth opportunities"
        ]
      },
      metrics: {
        passes: 4,
        boothSize: "6 sqm",
        leads: "50+",
        impressions: "500K+"
      }
    }
  ];

  const whySponsor = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "35,000+ Qualified Visitors",
      description: "High-intent business leaders and decision makers from across India and 20+ countries",
      metric: "35,000+"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "4,500+ B2B Meetings",
      description: "Pre-scheduled meetings with decision makers and key stakeholders",
      metric: "4,500+"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "50M+ Media Reach",
      description: "Extensive press coverage and digital marketing across international platforms",
      metric: "50M+"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "600+ Exhibitors",
      description: "Connect with Muslim, Sikh, Christian, Parsi, and Jain business communities",
      metric: "600+"
    }
  ];

  const audienceDemographics = [
    {
      category: "Decision Makers",
      percentage: "65%",
      description: "C-level executives and business owners"
    },
    {
      category: "Industry Breakdown",
      breakdown: [
        { sector: "Infrastructure & Real Estate", percentage: "30%" },
        { sector: "Manufacturing & Machinery", percentage: "25%" },
        { sector: "Hospitality", percentage: "20%" },
        { sector: "Healthcare", percentage: "15%" },
        { sector: "Technology", percentage: "10%" }
      ]
    },
    {
      category: "Geographic Reach",
      percentage: "20+",
      description: "Countries represented with pan-India presence"
    },
    {
      category: "Community Representation",
      breakdown: [
        { community: "Muslim", percentage: "40%" },
        { community: "Sikh", percentage: "25%" },
        { community: "Christian", percentage: "20%" },
        { community: "Parsi", percentage: "10%" },
        { community: "Jain", percentage: "5%" }
      ]
    }
  ];

  const roiMetrics = [
    {
      title: "Lead Generation",
      value: "200+",
      description: "Average qualified leads per sponsor",
      icon: <Target className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Brand Awareness",
      value: "50M+",
      description: "Media impressions across all channels",
      icon: <Eye className="h-6 w-6 text-green-600" />
    },
    {
      title: "Sales Conversion",
      value: "25%",
      description: "Average conversion rate from leads to sales",
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Cost per Lead",
      value: "₹500",
      description: "Highly cost-effective compared to other channels",
      icon: <DollarSign className="h-6 w-6 text-orange-600" />
    }
  ];

  const customOpportunities = [
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: "Session Sponsorship",
      description: "Sponsor individual sessions, workshops, or panel discussions",
      benefits: ["Session branding", "Speaking opportunities", "Lead generation", "Networking access"]
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Networking Event Sponsorship",
      description: "Exclusive networking dinner, reception, or cocktail events",
      benefits: ["Event branding", "VIP access", "Exclusive networking", "Premium positioning"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Digital Sponsorship",
      description: "Website, app, and digital platform branding opportunities",
      benefits: ["Digital visibility", "Online engagement", "Content integration", "Analytics access"]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Media Partnership",
      description: "Co-branded content, PR opportunities, and media coverage",
      benefits: ["Media coverage", "Content co-creation", "PR support", "Brand amplification"]
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Awards Sponsorship",
      description: "Industry awards and recognition programs",
      benefits: ["Award branding", "Industry recognition", "Thought leadership", "Credibility building"]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Technology Partnership",
      description: "Innovation showcase and technology demonstrations",
      benefits: ["Tech showcase", "Innovation positioning", "Industry leadership", "Future partnerships"]
    }
  ];

  const testimonials = [
    {
      quote: "Our partnership with MIA Business Expo delivered exceptional ROI. We generated 300+ qualified leads and closed deals worth ₹5 crores within 6 months.",
      author: "Rajesh Kumar",
      company: "Tech Solutions Ltd.",
      role: "CEO",
      package: "Gold Sponsor"
    },
    {
      quote: "The networking opportunities and brand visibility exceeded our expectations. We've established long-term partnerships that continue to drive our business growth.",
      author: "Priya Singh",
      company: "Infrastructure Partners",
      role: "Business Development Director",
      package: "Platinum Sponsor"
    },
    {
      quote: "MIA Expo provided us with direct access to underserved markets. The ROI was immediate and the long-term value continues to grow.",
      author: "Ahmed Khan",
      company: "Manufacturing Excellence",
      role: "Managing Director",
      package: "Silver Sponsor"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Schedule a call with our sponsorship team to discuss your objectives and requirements",
      duration: "1-2 days"
    },
    {
      step: 2,
      title: "Custom Proposal",
      description: "Receive a tailored sponsorship proposal with detailed benefits and pricing",
      duration: "3-5 days"
    },
    {
      step: 3,
      title: "Package Selection",
      description: "Choose your sponsorship package or customize based on your needs",
      duration: "1-2 days"
    },
    {
      step: 4,
      title: "Agreement & Payment",
      description: "Sign the sponsorship agreement and complete payment arrangements",
      duration: "2-3 days"
    },
    {
      step: 5,
      title: "Implementation",
      description: "Our team implements your sponsorship benefits and begins campaign execution",
      duration: "Ongoing"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await postToWebhook({
        sheet: "sponsor_inquiries",
        ...formData,
        ts: new Date().toISOString()
      });
      
      toast({ 
        title: "Inquiry Submitted!", 
        description: "We have received your sponsorship inquiry and will respond within 24 hours." 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        package: '',
        budget: '',
        message: '',
        interest: ''
      });
    } catch (err: any) {
      toast({ 
        title: "Error", 
        description: err.message || "Failed to submit inquiry", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <SEO 
        title="Sponsor Opportunities • MIA Business Expo" 
        description="Partner with India's premier inclusive business expo. Reach 35,000+ qualified visitors, 600+ exhibitors, and 20+ countries. Multiple sponsorship packages available." 
        canonical="/sponsor-opportunities" 
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
              <h1 className="font-brand text-4xl md:text-6xl leading-tight mb-6">
                Partner with India's Premier Inclusive Business Expo
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Reach 35,000+ qualified business leaders, 600+ exhibitors, and 20+ countries. 
                Join us in creating meaningful connections and driving inclusive economic growth.
              </p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">35,000+</div>
                  <div className="text-xs text-muted-foreground">Trade Visitors</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">600+</div>
                  <div className="text-xs text-muted-foreground">Exhibitors</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">4,500+</div>
                  <div className="text-xs text-muted-foreground">B2B Meetings</div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="#packages">
                    <Crown className="mr-2 h-4 w-4" />
                    Explore Packages
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="border border-border shadow-elegant">
                  <a href="#contact">
                    <Download className="mr-2 h-4 w-4" />
                    Download Kit
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Why Sponsor MIA Business Expo?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join India's most comprehensive inclusive business platform and connect with 
              diverse business communities driving economic growth across sectors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whySponsor.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow text-center">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <div className="text-2xl font-bold text-primary">{item.metric}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section id="packages" className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Sponsorship Packages</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose from our comprehensive sponsorship packages designed to maximize your 
              brand visibility, lead generation, and business impact.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {sponsorshipPackages.slice(0, 3).map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`p-6 h-full hover:shadow-glow transition-shadow relative ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-0">
                    <div className="text-center mb-6">
                      <div className="text-primary mb-4 flex justify-center">{pkg.icon}</div>
                      <h3 className="font-semibold text-xl mb-2">{pkg.name}</h3>
                      <p className="text-primary text-3xl font-bold mb-2">{pkg.price}</p>
                      <p className="text-muted-foreground text-sm">{pkg.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Benefits</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {pkg.benefits.branding.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">{pkg.metrics.passes}</div>
                          <div className="text-muted-foreground">Passes</div>
                        </div>
                        <div>
                          <div className="font-medium">{pkg.metrics.boothSize}</div>
                          <div className="text-muted-foreground">Booth</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6" 
                      variant={pkg.popular ? "hero" : "outline"}
                      onClick={() => setSelectedPackage(pkg.name)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sponsorshipPackages.slice(3).map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-primary flex-shrink-0">{pkg.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{pkg.name}</h3>
                        <p className="text-primary text-xl font-bold mb-1">{pkg.price}</p>
                        <p className="text-muted-foreground text-sm">{pkg.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Benefits</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {pkg.benefits.branding.slice(0, 2).map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="font-medium">{pkg.metrics.passes}</div>
                          <div className="text-muted-foreground">Passes</div>
                        </div>
                        <div>
                          <div className="font-medium">{pkg.metrics.boothSize}</div>
                          <div className="text-muted-foreground">Booth</div>
                        </div>
                        <div>
                          <div className="font-medium">{pkg.metrics.leads}</div>
                          <div className="text-muted-foreground">Leads</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => setSelectedPackage(pkg.name)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & Business Impact */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">ROI & Business Impact</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our sponsors consistently achieve exceptional returns on investment through 
              targeted lead generation, brand visibility, and strategic networking.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roiMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow text-center">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4 flex justify-center">{metric.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{metric.title}</h3>
                    <p className="text-3xl font-bold text-primary mb-2">{metric.value}</p>
                    <p className="text-muted-foreground text-sm">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Demographics */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Audience Demographics</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Connect with a diverse, qualified audience of business leaders and decision makers 
              from across India and international markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {audienceDemographics.map((demo, index) => (
              <motion.div
                key={demo.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-lg mb-4">{demo.category}</h3>
                    {demo.percentage && (
                      <div className="text-3xl font-bold text-primary mb-2">{demo.percentage}</div>
                    )}
                    {demo.description && (
                      <p className="text-muted-foreground text-sm">{demo.description}</p>
                    )}
                    {demo.breakdown && (
                      <div className="space-y-2">
                        {demo.breakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-sm">{item.sector || item.community}</span>
                            <span className="font-medium text-primary">{item.percentage}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Sponsorship Opportunities */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Custom Sponsorship Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Beyond our standard packages, we offer customized sponsorship opportunities 
              tailored to your specific objectives and budget.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4 flex justify-center">{opportunity.icon}</div>
                    <h3 className="font-semibold text-lg mb-2 text-center">{opportunity.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 text-center">{opportunity.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Benefits</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {opportunity.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
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
              Hear from our previous sponsors about their experience and the business impact 
              they achieved through MIA Business Expo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4 flex justify-center">
                      <Quote className="h-8 w-8" />
                    </div>
                    <blockquote className="text-muted-foreground text-sm mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <div className="font-medium text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {testimonial.package}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Timeline */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Sponsorship Process</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process ensures you get the most value from your sponsorship 
              investment with dedicated support every step of the way.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Next Steps */}
      <section id="contact" className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Ready to Partner with Us?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our sponsorship team to discuss your objectives and 
              receive a customized proposal tailored to your needs.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name *</label>
                      <Input
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input
                        type="email"
                        placeholder="your.email@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input
                        placeholder="+91-98765-43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company *</label>
                      <Input
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Package Interest</label>
                      <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="title">Title Sponsor</SelectItem>
                          <SelectItem value="platinum">Platinum Sponsor</SelectItem>
                          <SelectItem value="gold">Gold Sponsor</SelectItem>
                          <SelectItem value="silver">Silver Sponsor</SelectItem>
                          <SelectItem value="bronze">Bronze Sponsor</SelectItem>
                          <SelectItem value="custom">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Budget Range</label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-8">₹3-8 Lakhs</SelectItem>
                          <SelectItem value="8-15">₹8-15 Lakhs</SelectItem>
                          <SelectItem value="15-25">₹15-25 Lakhs</SelectItem>
                          <SelectItem value="25-50">₹25-50 Lakhs</SelectItem>
                          <SelectItem value="50+">₹50+ Lakhs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Interest</label>
                    <Select value={formData.interest} onValueChange={(value) => setFormData({...formData, interest: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="branding">Brand Visibility</SelectItem>
                        <SelectItem value="networking">Networking & B2B</SelectItem>
                        <SelectItem value="leads">Lead Generation</SelectItem>
                        <SelectItem value="speaking">Thought Leadership</SelectItem>
                        <SelectItem value="partnership">Strategic Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us about your objectives and how we can help..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Handshake className="h-4 w-4 mr-2" />
                        Submit Sponsorship Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
