import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Building2, MapPin, Globe, Mail, Phone, Calendar, 
  Award, CheckCircle2, Facebook, Linkedin, Instagram, 
  Twitter, Youtube, ArrowLeft, User, Users, Package
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Exhibitor {
  id: string;
  company_name: string;
  tagline?: string;
  logo_url?: string;
  description?: string;
  industry?: string;
  founded_year?: number;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  booth_number?: string;
  owner_name?: string;
  owner_title?: string;
  owner_bio?: string;
  owner_photo_url?: string;
  team_info?: string;
  products_services?: string;
  facebook_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  gallery_images?: string[];
  video_url?: string;
  certifications?: string[];
  awards?: string[];
  unique_selling_points?: string[];
  package_type?: string;
  status?: string;
}

export default function ExhibitorDetail() {
  const { id } = useParams<{ id: string }>();
  const [exhibitor, setExhibitor] = useState<Exhibitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  useEffect(() => {
    fetchExhibitor();
  }, [id]);

  const fetchExhibitor = async () => {
    try {
      const { data, error } = await supabase
        .from('exhibitors')
        .select('*')
        .eq('id', id)
        .eq('status', 'approved')
        .single();

      if (error) throw error;
      setExhibitor(data);
    } catch (error: any) {
      console.error('Error fetching exhibitor:', error);
      toast({
        title: 'Error',
        description: 'Failed to load exhibitor details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!exhibitor) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Exhibitor Not Found</h1>
        <p className="text-muted-foreground mb-8">The exhibitor you're looking for doesn't exist or isn't available.</p>
        <Button asChild>
          <Link to="/directory">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>
      </div>
    );
  }

  const socialLinks = [
    { url: exhibitor.facebook_url, icon: Facebook, label: 'Facebook' },
    { url: exhibitor.linkedin_url, icon: Linkedin, label: 'LinkedIn' },
    { url: exhibitor.instagram_url, icon: Instagram, label: 'Instagram' },
    { url: exhibitor.twitter_url, icon: Twitter, label: 'Twitter' },
    { url: exhibitor.youtube_url, icon: Youtube, label: 'YouTube' },
  ].filter(link => link.url);

  return (
    <>
      <SEO
        title={`${exhibitor.company_name} - MIA Business Expo`}
        description={exhibitor.tagline || exhibitor.description || `Visit ${exhibitor.company_name} at MIA Business Expo`}
        canonical={`/exhibitor/${exhibitor.id}`}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 border-b">
          <div className="container">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/directory">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Directory
              </Link>
            </Button>

            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              {/* Company Logo */}
              <div className="flex justify-center md:justify-start">
                {exhibitor.logo_url ? (
                  <img
                    src={exhibitor.logo_url}
                    alt={`${exhibitor.company_name} logo`}
                    className="w-48 h-48 object-contain rounded-lg bg-white p-4 shadow-elegant"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="h-20 w-20 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Company Header */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {exhibitor.industry && (
                    <Badge variant="secondary">{exhibitor.industry}</Badge>
                  )}
                  {exhibitor.package_type && (
                    <Badge variant="default">{exhibitor.package_type}</Badge>
                  )}
                  {exhibitor.booth_number && (
                    <Badge variant="outline">Booth {exhibitor.booth_number}</Badge>
                  )}
                </div>

                <h1 className="text-4xl font-brand font-bold mb-3">{exhibitor.company_name}</h1>
                
                {exhibitor.tagline && (
                  <p className="text-xl text-muted-foreground mb-4">{exhibitor.tagline}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  {exhibitor.founded_year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Est. {exhibitor.founded_year}</span>
                    </div>
                  )}
                  {(exhibitor.city || exhibitor.state) && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{[exhibitor.city, exhibitor.state].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setShowEnquiryForm(true)} size="lg">
                    Get in Touch
                  </Button>
                  {exhibitor.website && (
                    <Button variant="outline" size="lg" asChild>
                      <a href={exhibitor.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>

                {socialLinks.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {socialLinks.map((link) => (
                      <Button key={link.label} variant="ghost" size="icon" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                          <link.icon className="h-5 w-5" />
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="container py-12">
          <div className="grid lg:grid-cols-[1fr_350px] gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              {/* About Company */}
              {exhibitor.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      About {exhibitor.company_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {exhibitor.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Products & Services */}
              {exhibitor.products_services && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Products & Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {exhibitor.products_services}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Owner/Promoter */}
              {exhibitor.owner_name && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Leadership
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-6 items-start">
                      {exhibitor.owner_photo_url ? (
                        <img
                          src={exhibitor.owner_photo_url}
                          alt={exhibitor.owner_name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{exhibitor.owner_name}</h3>
                        {exhibitor.owner_title && (
                          <p className="text-muted-foreground mb-2">{exhibitor.owner_title}</p>
                        )}
                        {exhibitor.owner_bio && (
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {exhibitor.owner_bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Team */}
              {exhibitor.team_info && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Our Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {exhibitor.team_info}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* USPs */}
              {exhibitor.unique_selling_points && exhibitor.unique_selling_points.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Why Choose Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {exhibitor.unique_selling_points.map((usp, index) => (
                        <li key={index} className="flex gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{usp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Gallery */}
              {exhibitor.gallery_images && exhibitor.gallery_images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {exhibitor.gallery_images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${exhibitor.company_name} gallery ${index + 1}`}
                          className="rounded-lg aspect-square object-cover hover:scale-105 transition-transform"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Video */}
              {exhibitor.video_url && (
                <Card>
                  <CardHeader>
                    <CardTitle>Company Video</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video">
                      <iframe
                        src={exhibitor.video_url}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Certifications & Awards */}
              {((exhibitor.certifications && exhibitor.certifications.length > 0) ||
                (exhibitor.awards && exhibitor.awards.length > 0)) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Recognition & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {exhibitor.certifications && exhibitor.certifications.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Certifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {exhibitor.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline">{cert}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {exhibitor.awards && exhibitor.awards.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Awards</h4>
                        <ul className="space-y-2">
                          {exhibitor.awards.map((award, index) => (
                            <li key={index} className="flex gap-2">
                              <Award className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                              <span className="text-sm text-muted-foreground">{award}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exhibitor.email && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                      <a
                        href={`mailto:${exhibitor.email}`}
                        className="text-sm text-primary hover:underline block pl-6"
                      >
                        {exhibitor.email}
                      </a>
                    </div>
                  )}
                  {exhibitor.phone && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Phone className="h-4 w-4" />
                        Phone
                      </div>
                      <a
                        href={`tel:${exhibitor.phone}`}
                        className="text-sm text-primary hover:underline block pl-6"
                      >
                        {exhibitor.phone}
                      </a>
                    </div>
                  )}
                  {exhibitor.address && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <MapPin className="h-4 w-4" />
                        Address
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        {exhibitor.address}
                        {exhibitor.city && <><br />{exhibitor.city}</>}
                        {exhibitor.state && `, ${exhibitor.state}`}
                        {exhibitor.country && <><br />{exhibitor.country}</>}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Booth Information */}
              {exhibitor.booth_number && (
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle>Visit Us at the Expo</CardTitle>
                    <CardDescription>Find us at our booth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <div className="text-5xl font-bold text-primary mb-2">
                        {exhibitor.booth_number}
                      </div>
                      <p className="text-sm text-muted-foreground">Booth Number</p>
                    </div>
                    <Button className="w-full" asChild>
                      <Link to="/floor-plan">View Floor Plan</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Enquiry CTA */}
              <Card className="bg-hero-gradient text-white border-0">
                <CardHeader>
                  <CardTitle className="text-white">Interested?</CardTitle>
                  <CardDescription className="text-white/80">
                    Send us an enquiry and we'll get back to you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowEnquiryForm(true)}
                    variant="secondary"
                    className="w-full"
                  >
                    Send Enquiry
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Enquiry Form Modal */}
        {showEnquiryForm && (
          <EnquiryFormModal
            exhibitorId={exhibitor.id}
            exhibitorName={exhibitor.company_name}
            onClose={() => setShowEnquiryForm(false)}
          />
        )}
      </main>
    </>
  );
}

// Enquiry Form Modal Component
function EnquiryFormModal({
  exhibitorId,
  exhibitorName,
  onClose,
}: {
  exhibitorId: string;
  exhibitorName: string;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    visitor_name: '',
    visitor_email: '',
    visitor_phone: '',
    visitor_company: '',
    interested_in: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('exhibitor_enquiries').insert({
        exhibitor_id: exhibitorId,
        ...formData,
      });

      if (error) throw error;

      toast({
        title: 'Enquiry Sent!',
        description: 'We will get back to you soon.',
      });
      onClose();
    } catch (error: any) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit enquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Send Enquiry to {exhibitorName}</CardTitle>
          <CardDescription>Fill in your details and we'll get back to you</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <input
                type="text"
                required
                className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
                value={formData.visitor_name}
                onChange={(e) => setFormData({ ...formData, visitor_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <input
                type="email"
                required
                className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
                value={formData.visitor_email}
                onChange={(e) => setFormData({ ...formData, visitor_email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
                value={formData.visitor_phone}
                onChange={(e) => setFormData({ ...formData, visitor_phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Company</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
                value={formData.visitor_company}
                onChange={(e) => setFormData({ ...formData, visitor_company: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Interested In</label>
              <input
                type="text"
                placeholder="e.g., Product demo, Partnership"
                className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
                value={formData.interested_in}
                onChange={(e) => setFormData({ ...formData, interested_in: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message *</label>
              <textarea
                required
                rows={4}
                className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? 'Sending...' : 'Send Enquiry'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}