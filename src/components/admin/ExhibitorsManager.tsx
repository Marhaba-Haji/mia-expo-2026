import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

interface Exhibitor {
  id: string;
  brand_name?: string | null;
  company_name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  booth_number: string | null;
  package_type: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
  status: string | null;
  industry?: string | null;
  business_type?: string | null;
  address?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  video_url?: string | null;
  youtube_url?: string | null;
  catalog_url?: string | null;
  brochure_url?: string | null;
  tagline?: string | null;
  city?: string | null;
  state?: string | null;
  gallery_images?: string[] | null;
  slug?: string | null;
}

export function ExhibitorsManager() {
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    brand_name: '',
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    booth_number: '',
    package_type: '',
    website: '',
    description: '',
    logo_url: '',
    status: 'pending',
    industry: '',
    business_type: '',
    address: '',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: '',
    video_url: '',
    youtube_url: '',
    catalog_url: '',
    tagline: '',
    city: '',
    state: '',
    gallery_images: [] as string[],
    slug: '',
  });

  useEffect(() => {
    fetchExhibitors();
  }, []);

  const fetchExhibitors = async () => {
    const { data, error } = await supabase
      .from('exhibitors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setExhibitors(data || []);
    }
  };

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicate slug
    if (formData.slug) {
      const { data: existingExhibitors } = await supabase
        .from('exhibitors')
        .select('id, slug')
        .eq('slug', formData.slug);

      if (existingExhibitors && existingExhibitors.length > 0) {
        const isDuplicate = editingId 
          ? existingExhibitors.some(e => e.id !== editingId)
          : existingExhibitors.length > 0;
        
        if (isDuplicate) {
          toast({ 
            title: 'Duplicate Slug', 
            description: 'This slug is already in use. Please modify the slug field.', 
            variant: 'destructive' 
          });
          return;
        }
      }
    }

    // Prepare data for submission - convert empty gallery_images array to null if empty
    const submitData = {
      ...formData,
      gallery_images: formData.gallery_images.length > 0 ? formData.gallery_images : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('exhibitors')
        .update(submitData)
        .eq('id', editingId);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Exhibitor updated successfully' });
        fetchExhibitors();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('exhibitors')
        .insert([submitData]);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Exhibitor added successfully' });
        fetchExhibitors();
        resetForm();
      }
    }
  };

  const handleEdit = (exhibitor: Exhibitor) => {
    setEditingId(exhibitor.id);
    setFormData({
      brand_name: exhibitor.brand_name || '',
      company_name: exhibitor.company_name,
      contact_person: exhibitor.contact_person || '',
      email: exhibitor.email || '',
      phone: exhibitor.phone || '',
      booth_number: exhibitor.booth_number || '',
      package_type: exhibitor.package_type || '',
      website: exhibitor.website || '',
      description: exhibitor.description || '',
      logo_url: exhibitor.logo_url || '',
      status: exhibitor.status || 'pending',
      industry: exhibitor.industry || '',
      business_type: exhibitor.business_type || '',
      address: exhibitor.address || '',
      facebook_url: exhibitor.facebook_url || '',
      twitter_url: exhibitor.twitter_url || '',
      instagram_url: exhibitor.instagram_url || '',
      linkedin_url: exhibitor.linkedin_url || '',
      video_url: exhibitor.video_url || '',
      youtube_url: exhibitor.youtube_url || '',
      catalog_url: exhibitor.catalog_url || '',
      tagline: exhibitor.tagline || '',
      city: exhibitor.city || '',
      state: exhibitor.state || '',
      gallery_images: exhibitor.gallery_images || [],
      slug: exhibitor.slug || '',
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exhibitor?')) return;

    const { error } = await supabase
      .from('exhibitors')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Exhibitor deleted successfully' });
      fetchExhibitors();
    }
  };

  const resetForm = () => {
    setFormData({
      brand_name: '',
      company_name: '',
      contact_person: '',
      email: '',
      phone: '',
      booth_number: '',
      package_type: '',
      website: '',
      description: '',
      logo_url: '',
      status: 'pending',
      industry: '',
      business_type: '',
      address: '',
      facebook_url: '',
      twitter_url: '',
      instagram_url: '',
      linkedin_url: '',
      video_url: '',
      youtube_url: '',
      catalog_url: '',
      tagline: '',
      city: '',
      state: '',
      gallery_images: [],
      slug: '',
    });
    setEditingId(null);
    setIsOpen(false);
  };

  const addGalleryImage = () => {
    if (formData.gallery_images.length < 10) {
      setFormData({
        ...formData,
        gallery_images: [...formData.gallery_images, ''],
      });
    } else {
      toast({
        title: 'Limit Reached',
        description: 'Maximum 10 gallery images allowed',
        variant: 'destructive',
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery_images: formData.gallery_images.filter((_, i) => i !== index),
    });
  };

  const updateGalleryImage = (index: number, value: string) => {
    const updated = [...formData.gallery_images];
    updated[index] = value;
    setFormData({
      ...formData,
      gallery_images: updated,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Exhibitors Management</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Exhibitor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Exhibitor' : 'Add Exhibitor'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand_name">Brand Name</Label>
                  <Input
                    id="brand_name"
                    value={formData.brand_name}
                    onChange={(e) => {
                      const brandName = e.target.value;
                      setFormData({ 
                        ...formData, 
                        brand_name: brandName,
                        slug: brandName ? generateSlug(brandName) : ''
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Page URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., company-name"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Auto-populated from brand name. Must be unique.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Brand Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="Your brand's tagline or slogan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_person">Contact Person Name</Label>
                  <Input
                    id="contact_person"
                    value={formData.contact_person}
                    onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                    placeholder="Name of primary contact"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo_url">Logo</Label>
                  <Input
                    id="logo_url"
                    type="url"
                    placeholder="Logo URL"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g., Technology, Healthcare, Manufacturing"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type</Label>
                  <Select
                    value={formData.business_type}
                    onValueChange={(value) => setFormData({ ...formData, business_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  placeholder="Full address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook Link</Label>
                  <Input
                    id="facebook_url"
                    type="url"
                    placeholder="https://facebook.com/..."
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter_url">X (Twitter) Link</Label>
                  <Input
                    id="twitter_url"
                    type="url"
                    placeholder="https://x.com/..."
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram Link</Label>
                  <Input
                    id="instagram_url"
                    type="url"
                    placeholder="https://instagram.com/..."
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn Link</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    placeholder="https://linkedin.com/company/..."
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">About Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Tell us about your company..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="booth_number">Booth Number in Expo</Label>
                  <Input
                    id="booth_number"
                    value={formData.booth_number}
                    onChange={(e) => setFormData({ ...formData, booth_number: e.target.value })}
                    placeholder="e.g., A-101"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video_url">Podcast/YouTube Video Link</Label>
                  <Input
                    id="video_url"
                    type="url"
                    placeholder="https://youtube.com/... or video URL"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="catalog_url">Product/Service Catalog URL</Label>
                  <Input
                    id="catalog_url"
                    type="url"
                    placeholder="Catalog or brochure URL"
                    value={formData.catalog_url}
                    onChange={(e) => setFormData({ ...formData, catalog_url: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gallery_images">Gallery Images (Max 10)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addGalleryImage}
                    disabled={formData.gallery_images.length >= 10}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.gallery_images.map((imageUrl, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        type="url"
                        placeholder={`Image ${index + 1} URL`}
                        value={imageUrl}
                        onChange={(e) => updateGalleryImage(index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.gallery_images.length === 0 && (
                    <p className="text-sm text-muted-foreground">No gallery images added. Click "Add Image" to add up to 10 images.</p>
                  )}
                  {formData.gallery_images.length >= 10 && (
                    <p className="text-sm text-muted-foreground">Maximum limit of 10 images reached.</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="package_type">Package Type</Label>
                  <Input
                    id="package_type"
                    value={formData.package_type}
                    onChange={(e) => setFormData({ ...formData, package_type: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Booth</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exhibitors.map((exhibitor) => (
              <TableRow key={exhibitor.id}>
                <TableCell>{exhibitor.company_name}</TableCell>
                <TableCell>{exhibitor.contact_person}</TableCell>
                <TableCell>{exhibitor.email}</TableCell>
                <TableCell>{exhibitor.booth_number}</TableCell>
                <TableCell>{exhibitor.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(exhibitor)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(exhibitor.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
