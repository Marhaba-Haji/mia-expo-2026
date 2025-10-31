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
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Building2, 
  MessageCircle, 
  Globe,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Navigation,
  Car,
  Train,
  Plane,
  Wifi,
  Accessibility,
  Star,
  ArrowRight,
  Send,
  CheckCircle,
  Info,
  HelpCircle,
  FileText,
  Headphones,
  Briefcase,
  Megaphone,
  Handshake,
  Settings,
  User,
  Heart
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { postToWebhook } from "@/lib/webhook";
import SEO from "@/components/seo/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    subject: '',
    message: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      description: "Speak directly with our team",
      primary: "+91-11-2345-6789",
      secondary: "+91-11-2345-6790",
      hours: "Mon-Fri: 9 AM - 6 PM IST"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Send us a detailed message",
      primary: "info@miabusinessexpo.com",
      secondary: "support@miabusinessexpo.com",
      hours: "24/7 - Response within 24 hours"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp",
      description: "Quick messaging support",
      primary: "+91-98765-43210",
      secondary: "Business hours only",
      hours: "Mon-Fri: 9 AM - 6 PM IST"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Meet us in person",
      primary: "MIA Headquarters, New Delhi",
      secondary: "Pragati Maidan (Event Venue)",
      hours: "By appointment only"
    }
  ];

  const departments = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Exhibitor Relations",
      description: "Booth bookings, packages, and exhibitor support",
      contact: {
        name: "Ahmed Khan",
        title: "Head of Exhibitor Relations",
        email: "exhibitors@miabusinessexpo.com",
        phone: "+91-11-2345-6781"
      },
      responseTime: "Within 4 hours during business hours"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Visitor Services",
      description: "Registration, tickets, and visitor information",
      contact: {
        name: "Priya Singh",
        title: "Visitor Services Manager",
        email: "visitors@miabusinessexpo.com",
        phone: "+91-11-2345-6782"
      },
      responseTime: "Within 2 hours during business hours"
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Sponsorship",
      description: "Partnership opportunities and sponsorship packages",
      contact: {
        name: "John Mathew",
        title: "Partnership Director",
        email: "sponsors@miabusinessexpo.com",
        phone: "+91-11-2345-6783"
      },
      responseTime: "Within 6 hours during business hours"
    },
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: "Media Relations",
      description: "Press inquiries, interviews, and media coverage",
      contact: {
        name: "Zara Irani",
        title: "Media Relations Manager",
        email: "media@miabusinessexpo.com",
        phone: "+91-11-2345-6784"
      },
      responseTime: "Within 2 hours during business hours"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "B2B Matchmaking",
      description: "Meeting coordination and networking support",
      contact: {
        name: "Dr. Rajesh Kumar",
        title: "B2B Coordinator",
        email: "matchmaking@miabusinessexpo.com",
        phone: "+91-11-2345-6785"
      },
      responseTime: "Within 4 hours during business hours"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Technical Support",
      description: "Website, app, and digital services support",
      contact: {
        name: "Tech Support Team",
        title: "Technical Support",
        email: "support@miabusinessexpo.com",
        phone: "+91-11-2345-6786"
      },
      responseTime: "Within 1 hour during business hours"
    }
  ];

  const eventInfo = {
    date: "05-07 Jun 2026",
    time: "9:00 AM - 6:00 PM IST",
    venue: "Pragati Maidan",
    address: "Pragati Maidan, Mathura Road, New Delhi - 110002, India",
    nearestAirport: "Indira Gandhi International Airport (DEL)",
    nearestMetro: "Pragati Maidan Metro Station (Blue Line)",
    parking: "Available on-site and nearby",
    accessibility: "Wheelchair accessible with dedicated facilities"
  };

  const faqs = [
    {
      question: "How can I register as an exhibitor?",
      answer: "You can register as an exhibitor by visiting our Exhibitor Portal page, selecting your preferred package, and completing the registration form. Our team will contact you within 24 hours to confirm your booking."
    },
    {
      question: "What are the different exhibitor packages available?",
      answer: "We offer three packages: Startup (₹25,000), Standard (₹75,000), and Premium (₹1,50,000). Each package includes different booth sizes, exhibitor passes, and additional benefits. Visit our Exhibitor Packages page for detailed information."
    },
    {
      question: "How do I get visitor tickets?",
      answer: "Visitor tickets can be obtained through our Visitor Info page. You can register online and receive a QR code ticket for entry. Early bird discounts are available until October 2025."
    },
    {
      question: "What is the B2B matchmaking service?",
      answer: "Our B2B matchmaking service connects exhibitors with potential buyers and partners. We facilitate pre-scheduled meetings based on your business interests and requirements. Contact our B2B team for more information."
    },
    {
      question: "Is there parking available at the venue?",
      answer: "Yes, Pragati Maidan has ample parking facilities for both cars and buses. Parking is available on-site and in nearby areas. We recommend arriving early during peak hours."
    },
    {
      question: "What are the accommodation options near the venue?",
      answer: "There are several hotels near Pragati Maidan ranging from budget to luxury options. We have partnered with select hotels to offer special rates for expo attendees. Contact our visitor services team for recommendations."
    }
  ];

  const socialMedia = [
    { name: "LinkedIn", url: "https://linkedin.com/company/mia-business-expo", icon: <Globe className="h-4 w-4" /> },
    { name: "Twitter", url: "https://twitter.com/miabusinessexpo", icon: <Globe className="h-4 w-4" /> },
    { name: "Facebook", url: "https://facebook.com/miabusinessexpo", icon: <Globe className="h-4 w-4" /> },
    { name: "Instagram", url: "https://instagram.com/miabusinessexpo", icon: <Globe className="h-4 w-4" /> }
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({ title: "Copied!", description: `${field} copied to clipboard` });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy to clipboard", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await postToWebhook({
        sheet: "contact_inquiries",
        ...formData,
        ts: new Date().toISOString()
      });
      
      toast({ 
        title: "Message Sent!", 
        description: "We have received your inquiry and will respond within 24 hours." 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiryType: '',
        subject: '',
        message: '',
        department: ''
      });
    } catch (err: any) {
      toast({ 
        title: "Error", 
        description: err.message || "Failed to send message", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <SEO 
        title="Contact • MIA Business Expo" 
        description="Get in touch with MIA Business Expo team. Multiple contact methods, department contacts, venue information, and support for exhibitors, visitors, and partners." 
        canonical="/contact" 
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
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Connect with our team through multiple channels. We're here to help with 
                exhibitor support, visitor services, partnerships, and all your expo needs.
              </p>
              
              {/* Quick Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <Phone className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">+91-11-2345-6789</div>
                  <div className="text-xs text-muted-foreground">Main Line</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <Mail className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">info@miabusinessexpo.com</div>
                  <div className="text-xs text-muted-foreground">General Inquiries</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Pragati Maidan</div>
                  <div className="text-xs text-muted-foreground">New Delhi</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Contact Methods</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the most convenient way to reach us. We're available through 
              multiple channels to ensure you get the support you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow text-center">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4 flex justify-center">{method.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">{method.primary}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(method.primary, method.title)}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === method.title ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      {method.secondary && (
                        <div className="text-muted-foreground">{method.secondary}</div>
                      )}
                      <div className="text-xs text-muted-foreground">{method.hours}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Department Contacts</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get in touch with the right team for your specific needs. 
              Our specialized departments are ready to assist you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-primary flex-shrink-0">{dept.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{dept.title}</h3>
                        <p className="text-muted-foreground text-sm">{dept.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-1">{dept.contact.name}</h4>
                        <p className="text-xs text-muted-foreground">{dept.contact.title}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-1">{dept.contact.email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(dept.contact.email, "Email")}
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "Email" ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-1">{dept.contact.phone}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(dept.contact.phone, "Phone")}
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "Phone" ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{dept.responseTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Information */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Event Information</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about MIA Business Expo 2025, 
              including venue details, travel information, and accessibility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Event Details */}
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold text-xl mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{eventInfo.date}</div>
                      <div className="text-sm text-muted-foreground">{eventInfo.time}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{eventInfo.venue}</div>
                      <div className="text-sm text-muted-foreground">{eventInfo.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Nearest Airport</div>
                      <div className="text-sm text-muted-foreground">{eventInfo.nearestAirport}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Train className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Nearest Metro</div>
                      <div className="text-sm text-muted-foreground">{eventInfo.nearestMetro}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Venue Information */}
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold text-xl mb-4">Venue Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Parking</div>
                      <div className="text-sm text-muted-foreground">{eventInfo.parking}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Accessibility className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Accessibility</div>
                      <div className="text-sm text-muted-foreground">{eventInfo.accessibility}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Facilities</div>
                      <div className="text-sm text-muted-foreground">Free WiFi, Food Courts, Restrooms, First Aid</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Navigation className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Directions</div>
                      <div className="text-sm text-muted-foreground">
                        <a 
                          href="https://maps.google.com/?q=Pragati+Maidan+New+Delhi" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          Get Directions
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Send Us a Message</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Use our contact form to send us a detailed message. 
              We'll route your inquiry to the appropriate department.
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
                      <label className="text-sm font-medium mb-2 block">Company</label>
                      <Input
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Inquiry Type *</label>
                      <Select value={formData.inquiryType} onValueChange={(value) => setFormData({...formData, inquiryType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="exhibitor">Exhibitor Support</SelectItem>
                          <SelectItem value="visitor">Visitor Services</SelectItem>
                          <SelectItem value="sponsorship">Sponsorship</SelectItem>
                          <SelectItem value="media">Media Relations</SelectItem>
                          <SelectItem value="b2b">B2B Matchmaking</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject *</label>
                      <Input
                        placeholder="Brief subject line"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <Textarea
                      placeholder="Please provide details about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find quick answers to common questions. If you don't see your question here, 
              feel free to contact us directly.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Social Media & Newsletter */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Stay Connected</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Follow us on social media and subscribe to our newsletter for the latest 
              updates, news, and exclusive content.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Social Media */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                  <div className="space-y-3">
                    {socialMedia.map((social, index) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="text-primary">{social.icon}</div>
                        <span className="font-medium">{social.name}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Subscribe to receive updates about the expo, industry insights, and exclusive offers.
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Enter your email address" />
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Response Times</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're committed to providing timely responses to all inquiries. 
              Here's what you can expect from our team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">24 Hours</div>
                <div className="text-sm text-muted-foreground mb-2">General Inquiries</div>
                <div className="text-xs text-muted-foreground">Email responses within 24 hours</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">4 Hours</div>
                <div className="text-sm text-muted-foreground mb-2">Urgent Inquiries</div>
                <div className="text-xs text-muted-foreground">Phone and urgent email responses</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">1 Hour</div>
                <div className="text-sm text-muted-foreground mb-2">Technical Support</div>
                <div className="text-xs text-muted-foreground">Website and technical issues</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
