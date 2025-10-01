import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  author_company: string | null;
  content: string;
  photo_url: string | null;
  rating: number | null;
  featured: boolean;
  approved: boolean;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    author_name: '',
    author_title: '',
    author_company: '',
    content: '',
    photo_url: '',
    rating: '5',
    featured: false,
    approved: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setTestimonials(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      rating: parseInt(formData.rating),
    };

    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Testimonial updated successfully' });
        fetchTestimonials();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([dataToSubmit]);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Testimonial added successfully' });
        fetchTestimonials();
        resetForm();
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      author_name: testimonial.author_name,
      author_title: testimonial.author_title || '',
      author_company: testimonial.author_company || '',
      content: testimonial.content,
      photo_url: testimonial.photo_url || '',
      rating: testimonial.rating?.toString() || '5',
      featured: testimonial.featured,
      approved: testimonial.approved,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Testimonial deleted successfully' });
      fetchTestimonials();
    }
  };

  const resetForm = () => {
    setFormData({
      author_name: '',
      author_title: '',
      author_company: '',
      content: '',
      photo_url: '',
      rating: '5',
      featured: false,
      approved: false,
    });
    setEditingId(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Testimonials Management</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author_name">Author Name *</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author_title">Author Title</Label>
                  <Input
                    id="author_title"
                    value={formData.author_title}
                    onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author_company">Author Company</Label>
                  <Input
                    id="author_company"
                    value={formData.author_company}
                    onChange={(e) => setFormData({ ...formData, author_company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo_url">Photo URL</Label>
                <Input
                  id="photo_url"
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="approved"
                    checked={formData.approved}
                    onCheckedChange={(checked) => setFormData({ ...formData, approved: checked as boolean })}
                  />
                  <Label htmlFor="approved">Approved</Label>
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
              <TableHead>Author</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>{testimonial.author_name}</TableCell>
                <TableCell>{testimonial.author_company}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {testimonial.approved && <span className="text-green-600">Approved</span>}
                    {testimonial.featured && <span className="text-blue-600">Featured</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id)}>
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
