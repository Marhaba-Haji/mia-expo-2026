import SEO from "@/components/seo/SEO";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Calendar, MapPin, Users, Briefcase, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const INDUSTRIES = [
  "Hospitality & Tourism",
  "Infrastructure & Real Estate",
  "Manufacturing & Machinery",
  "Technology & IT",
  "Healthcare",
  "Finance & Banking",
  "Retail & E-commerce",
  "Energy & Utilities",
  "Agriculture",
  "Other"
];

export default function VisitorInfo() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company: "",
    job_title: "",
    phone: "",
    country: "",
    interests: [] as string[],
  });
  const [ticket, setTicket] = useState<string | null>(null);
  const [ticketData, setTicketData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert into Supabase visitors table
      const { data, error } = await supabase
        .from('visitors')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      // Generate QR ticket
      const ticketId = `MIA-${Date.now().toString(36).toUpperCase()}`;
      const payload = {
        t: "MIA_TICKET",
        id: ticketId,
        visitor_id: data.id,
        name: formData.full_name,
        email: formData.email,
        company: formData.company,
        event: "MIA Business Expo",
        ts: new Date().toISOString(),
      };
      
      setTicket(JSON.stringify(payload));
      setTicketData(payload);

      toast({ 
        title: "Registration Successful!", 
        description: "Your complimentary pass has been generated. Save your QR code for event entry." 
      });
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err?.message || "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `MIA-Expo-Ticket-${ticketData?.id}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (ticket && ticketData) {
    return (
      <main>
        <SEO 
          title="Registration Confirmed • MIA Business Expo" 
          description="Your registration for MIA Business Expo is confirmed." 
          canonical="/visitor-info" 
        />
        <section className="container py-12 max-w-4xl">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="secondary">
              <Check className="w-3 h-3 mr-1" /> Registration Confirmed
            </Badge>
            <h1 className="font-brand text-4xl mb-3">You're All Set!</h1>
            <p className="text-muted-foreground">Your complimentary visitor pass for MIA Business Expo</p>
          </div>

          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle>Your Event Pass</CardTitle>
              <CardDescription>Present this QR code at the registration desk</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="rounded-xl border bg-background p-6 shadow-elegant mb-4">
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold tracking-wide mb-1">MIA Business Expo</p>
                  <p className="text-xs text-muted-foreground mb-3">{ticketData.name}</p>
                  <p className="text-xs text-muted-foreground">{ticketData.company}</p>
                </div>
                <div className="relative" id="qr-code">
                  <QRCode value={ticket} size={220} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-12 w-12 rounded-lg bg-hero-gradient border-2 border-background shadow-glow flex items-center justify-center text-xs font-bold text-primary-foreground">
                      MIA
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs font-mono text-muted-foreground">
                  ID: {ticketData.id}
                </p>
              </div>
              <Button onClick={downloadQR} variant="outline" className="w-full max-w-xs">
                <Download className="w-4 h-4 mr-2" />
                Download Pass
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><span className="font-medium">Date:</span> To be announced</p>
                <p><span className="font-medium">Time:</span> 9:00 AM - 6:00 PM</p>
                <p><span className="font-medium">Registration:</span> Opens at 8:30 AM</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Venue Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground">
                  Venue details and directions will be sent to your registered email closer to the event date.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to <span className="font-medium text-foreground">{ticketData.email}</span>
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <SEO 
        title="Visitor Registration • MIA Business Expo" 
        description="Register for free online and save INR 4,999. Join industry leaders at the premier B2B business expo." 
        canonical="/visitor-info" 
      />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient text-primary-foreground py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Limited Time Offer
            </Badge>
            <h1 className="font-brand text-5xl mb-4">Visitor Registration</h1>
            <p className="text-xl text-primary-foreground/90 mb-6">
              Register Online for FREE • Save INR 4,999
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
                <Check className="w-4 h-4" />
                <span>Priority Entry</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
                <Check className="w-4 h-4" />
                <span>Networking Lounge Access</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
                <Check className="w-4 h-4" />
                <span>Event Catalogue</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="border-2 border-primary">
              <CardHeader>
                <Badge className="w-fit mb-2">Recommended</Badge>
                <CardTitle className="text-2xl">Online Registration</CardTitle>
                <CardDescription>Register now and save</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">FREE</div>
                <p className="text-sm text-muted-foreground mb-4">Complimentary entry pass</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Skip queues with pre-registered QR pass</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Priority networking opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Digital event materials</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">On-Site Registration</CardTitle>
                <CardDescription>Register at the venue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">₹4,999</div>
                <p className="text-sm text-muted-foreground mb-4">Walk-in registration fee</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-xs mt-1">•</span>
                    <span>Subject to availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xs mt-1">•</span>
                    <span>Longer registration queues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xs mt-1">•</span>
                    <span>Standard entry process</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="container py-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Free Registration</CardTitle>
            <CardDescription>
              Fill in your details to receive your complimentary visitor pass instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input 
                    id="full_name"
                    placeholder="John Doe" 
                    value={formData.full_name} 
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Business Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@company.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input 
                    id="company"
                    placeholder="Your Company" 
                    value={formData.company} 
                    onChange={(e) => setFormData({...formData, company: e.target.value})} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_title">Job Title *</Label>
                  <Input 
                    id="job_title"
                    placeholder="CEO, Manager, Director..." 
                    value={formData.job_title} 
                    onChange={(e) => setFormData({...formData, job_title: e.target.value})} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input 
                    id="country"
                    placeholder="India" 
                    value={formData.country} 
                    onChange={(e) => setFormData({...formData, country: e.target.value})} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Industries of Interest *</Label>
                <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {INDUSTRIES.map((industry) => (
                    <Badge
                      key={industry}
                      variant={formData.interests.includes(industry) ? "default" : "outline"}
                      className="cursor-pointer justify-center py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleInterestToggle(industry)}
                    >
                      {formData.interests.includes(industry) && (
                        <Check className="w-3 h-3 mr-1" />
                      )}
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  type="submit" 
                  disabled={loading || formData.interests.length === 0} 
                  className="w-full"
                  size="lg"
                >
                  {loading ? "Generating Your Pass..." : "Register Free & Get QR Pass"}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  By registering, you agree to receive event updates and communications
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-12">
        <div className="container max-w-6xl">
          <h2 className="font-brand text-3xl text-center mb-8">Why Pre-Register?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-3" />
                <CardTitle>B2B Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with industry leaders, potential partners, and decision-makers from leading companies across sectors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="w-10 h-10 text-primary mb-3" />
                <CardTitle>Business Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover new products, services, and partnerships. Meet exhibitors showcasing the latest innovations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-10 h-10 text-primary mb-3" />
                <CardTitle>Industry Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Attend expert-led sessions, panel discussions, and keynotes on emerging trends and market opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
