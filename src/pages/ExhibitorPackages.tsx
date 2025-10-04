import { Button } from "@/components/ui/button";
import SEO from "@/components/seo/SEO";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Store, Users, Megaphone, Trophy, TrendingUp, Building2, Mail, Phone, Globe } from "lucide-react";

const packages = [
  {
    name: 'Basic',
    packageType: 'basic',
    price: '₹25,000',
    priceValue: 25000,
    boothSize: '6 sqm',
    description: 'Perfect for startups and small businesses',
    features: [
      '6 sqm exhibition space',
      '2 exhibitor passes',
      'Company listing in event directory',
      'Basic booth furniture (1 table, 2 chairs)',
      'Power outlet connection',
      'WiFi access',
      'Event catalogue listing',
    ],
    notIncluded: [
      'Premium location',
      'B2B matchmaking',
      'Speaking opportunities',
      'Media coverage'
    ]
  },
  {
    name: 'Standard',
    packageType: 'standard',
    price: '₹75,000',
    priceValue: 75000,
    boothSize: '9 sqm',
    description: 'Ideal for growing businesses',
    featured: true,
    features: [
      '9 sqm exhibition space',
      '4 exhibitor passes',
      'Priority listing in directory',
      'Enhanced booth setup (2 tables, 4 chairs)',
      'Premium booth location',
      'B2B matchmaking access (up to 10 meetings)',
      'Lead retrieval system',
      'Social media promotion',
      'Digital catalogue feature',
      'WiFi & power outlets',
    ],
    notIncluded: [
      'Speaking slot',
      'Press release distribution'
    ]
  },
  {
    name: 'Premium',
    packageType: 'premium',
    price: '₹1,50,000',
    priceValue: 150000,
    boothSize: '18 sqm',
    description: 'Maximum visibility and engagement',
    features: [
      '18 sqm prime exhibition space',
      '8 exhibitor passes',
      'VIP booth location',
      'Premium booth design & setup',
      'Unlimited B2B matchmaking meetings',
      '20-minute speaking slot at main stage',
      'Sponsor branding on event materials',
      'Press release & PR coverage',
      'Dedicated social media campaign',
      'Featured in event newsletter',
      'Access to VIP networking lounge',
      'Lead retrieval system (unlimited)',
      'Post-event analytics report',
    ],
    notIncluded: []
  }
];

export default function ExhibitorPackages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    package_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePackageSelect = (packageType: string) => {
    setSelectedPackage(packageType);
    setFormData({ ...formData, package_type: packageType });
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('exhibitors')
        .insert([{ ...formData, status: 'pending' }]);

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Our team will review your application and contact you within 2 business days.",
      });
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err?.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main>
        <SEO 
          title="Application Received • MIA Business Expo" 
          description="Your exhibitor application has been received." 
          canonical="/exhibitor-packages" 
        />
        <section className="container py-16 max-w-3xl text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <Badge className="mb-4">Application Received</Badge>
            <h1 className="font-brand text-4xl mb-3">Thank You for Your Interest!</h1>
            <p className="text-muted-foreground text-lg">
              Your exhibitor application has been successfully submitted.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Application Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your application within 2 business days.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Confirmation & Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll send you a confirmation email with payment details and booth selection options.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Booth Setup & Marketing</h3>
                  <p className="text-sm text-muted-foreground">
                    Access your exhibitor portal for booth design, marketing materials, and pre-event networking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at <a href="mailto:exhibitors@miaexpo.com" className="text-primary hover:underline">exhibitors@miaexpo.com</a>
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <SEO 
        title="Exhibitor Packages • MIA Business Expo" 
        description="Choose from Basic, Standard and Premium exhibitor packages. Showcase your brand to thousands of B2B decision-makers." 
        canonical="/exhibitor-packages" 
      />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient text-primary-foreground py-16">
        <div className="container max-w-6xl text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Exhibitor Registration
          </Badge>
          <h1 className="font-brand text-5xl mb-4">Showcase Your Business</h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Connect with 5,000+ industry professionals, generate qualified leads, and position your brand as an industry leader
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "5,000+ Visitors", desc: "B2B Decision Makers" },
              { icon: Building2, label: "200+ Exhibitors", desc: "Industry Leaders" },
              { icon: TrendingUp, label: "30+ Sessions", desc: "Expert Insights" },
              { icon: Trophy, label: "3 Days", desc: "Business Networking" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <stat.icon className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-lg">{stat.label}</div>
                <div className="text-xs text-primary-foreground/80">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="container py-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-brand text-4xl mb-3">Choose Your Package</h2>
          <p className="text-muted-foreground text-lg">
            Select the exhibitor package that best fits your business goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.name} 
              className={`relative ${pkg.featured ? 'border-2 border-primary shadow-xl scale-105' : ''} ${selectedPackage === pkg.packageType ? 'ring-2 ring-primary' : ''}`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-primary">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.boothSize} exhibition space</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {pkg.notIncluded.length > 0 && (
                    <>
                      {pkg.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 opacity-40">
                          <X className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                <Button 
                  onClick={() => handlePackageSelect(pkg.packageType)}
                  variant={selectedPackage === pkg.packageType ? "default" : pkg.featured ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {selectedPackage === pkg.packageType ? "Selected" : "Select Package"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      {selectedPackage && (
        <section id="registration-form" className="bg-muted/30 py-16">
          <div className="container max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Complete Your Application</CardTitle>
                <CardDescription>
                  Fill in your company details to reserve your exhibition space
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Selected Package</p>
                        <p className="font-semibold text-lg capitalize">{selectedPackage}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {packages.find(p => p.packageType === selectedPackage)?.price}
                        </p>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedPackage(null)}
                        >
                          Change Package
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        placeholder="Your Company Ltd."
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact_person">Contact Person *</Label>
                      <Input
                        id="contact_person"
                        placeholder="Full Name"
                        value={formData.contact_person}
                        onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="contact@company.com"
                          className="pl-9"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="pl-9"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.yourcompany.com"
                        className="pl-9"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your company, products, and what you'd like to showcase at the expo..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be used in the exhibitor directory
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? "Submitting Application..." : "Submit Application"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Our team will review your application and contact you within 2 business days
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="container py-16 max-w-6xl">
        <h2 className="font-brand text-3xl text-center mb-12">Why Exhibit at MIA Business Expo?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Store className="w-10 h-10 text-primary mb-3" />
              <CardTitle>Generate Quality Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Meet pre-qualified buyers actively looking for solutions in your industry. Average exhibitors generate 50+ qualified leads.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Megaphone className="w-10 h-10 text-primary mb-3" />
              <CardTitle>Brand Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Showcase your products to thousands of industry professionals. Get featured in our marketing campaigns across digital and print media.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-3" />
              <CardTitle>Network & Partnerships</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with potential partners, distributors, and investors. Access our B2B matchmaking platform for pre-scheduled meetings.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
