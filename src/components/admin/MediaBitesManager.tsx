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
import { Pencil, Trash2, Plus } from 'lucide-react';

interface MediaBite {
  id: string;
  title: string;
  content: string;
  media_type: string | null;
  media_url: string | null;
  thumbnail_url: string | null;
  author: string | null;
  published_date: string;
  featured: boolean;
  tags: string[] | null;
}

export function MediaBitesManager() {
  const [mediaBites, setMediaBites] = useState<MediaBite[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media_type: '',
    media_url: '',
    thumbnail_url: '',
    author: '',
    published_date: new Date().toISOString().substring(0, 16),
    featured: false,
    tags: '',
  });

  useEffect(() => {
    fetchMediaBites();
  }, []);

  const fetchMediaBites = async () => {
    const { data, error } = await supabase
      .from('media_bites')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setMediaBites(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(s => s.trim()) : [],
    };

    if (editingId) {
      const { error } = await supabase
        .from('media_bites')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Media bite updated successfully' });
        fetchMediaBites();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('media_bites')
        .insert([dataToSubmit]);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Media bite added successfully' });
        fetchMediaBites();
        resetForm();
      }
    }
  };

  const handleEdit = (mediaBite: MediaBite) => {
    setEditingId(mediaBite.id);
    setFormData({
      title: mediaBite.title,
      content: mediaBite.content,
      media_type: mediaBite.media_type || '',
      media_url: mediaBite.media_url || '',
      thumbnail_url: mediaBite.thumbnail_url || '',
      author: mediaBite.author || '',
      published_date: mediaBite.published_date.substring(0, 16),
      featured: mediaBite.featured,
      tags: mediaBite.tags?.join(', ') || '',
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media bite?')) return;

    const { error } = await supabase
      .from('media_bites')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Media bite deleted successfully' });
      fetchMediaBites();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      media_type: '',
      media_url: '',
      thumbnail_url: '',
      author: '',
      published_date: new Date().toISOString().substring(0, 16),
      featured: false,
      tags: '',
    });
    setEditingId(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Media Bites Management</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Media Bite
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Media Bite' : 'Add Media Bite'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media_type">Media Type</Label>
                  <Input
                    id="media_type"
                    value={formData.media_type}
                    onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
                    placeholder="video, image, article"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="published_date">Published Date</Label>
                  <Input
                    id="published_date"
                    type="datetime-local"
                    value={formData.published_date}
                    onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="media_url">Media URL</Label>
                <Input
                  id="media_url"
                  type="url"
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="press, news, announcement"
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <Label htmlFor="featured">Featured</Label>
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
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mediaBites.map((mediaBite) => (
              <TableRow key={mediaBite.id}>
                <TableCell>{mediaBite.title}</TableCell>
                <TableCell>{mediaBite.author}</TableCell>
                <TableCell>{mediaBite.media_type}</TableCell>
                <TableCell>{new Date(mediaBite.published_date).toLocaleDateString()}</TableCell>
                <TableCell>{mediaBite.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(mediaBite)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(mediaBite.id)}>
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
