import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Speaker {
  id: string;
  full_name: string;
  title: string | null;
  company: string | null;
  bio: string | null;
  photo_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  expertise: string[] | null;
}

export function SpeakersManager() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    title: '',
    company: '',
    bio: '',
    photo_url: '',
    email: '',
    linkedin_url: '',
    twitter_url: '',
    expertise: '',
  });

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setSpeakers(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      expertise: formData.expertise ? formData.expertise.split(',').map(s => s.trim()) : [],
    };

    if (editingId) {
      const { error } = await supabase
        .from('speakers')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Speaker updated successfully' });
        fetchSpeakers();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('speakers')
        .insert([dataToSubmit]);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Speaker added successfully' });
        fetchSpeakers();
        resetForm();
      }
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingId(speaker.id);
    setFormData({
      full_name: speaker.full_name,
      title: speaker.title || '',
      company: speaker.company || '',
      bio: speaker.bio || '',
      photo_url: speaker.photo_url || '',
      email: speaker.email || '',
      linkedin_url: speaker.linkedin_url || '',
      twitter_url: speaker.twitter_url || '',
      expertise: speaker.expertise?.join(', ') || '',
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this speaker?')) return;

    const { error } = await supabase
      .from('speakers')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Speaker deleted successfully' });
      fetchSpeakers();
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      title: '',
      company: '',
      bio: '',
      photo_url: '',
      email: '',
      linkedin_url: '',
      twitter_url: '',
      expertise: '',
    });
    setEditingId(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Speakers Management</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Speaker
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Speaker' : 'Add Speaker'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter_url">Twitter URL</Label>
                  <Input
                    id="twitter_url"
                    type="url"
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
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
                <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                <Input
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  placeholder="AI, Machine Learning, Data Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                />
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
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {speakers.map((speaker) => (
              <TableRow key={speaker.id}>
                <TableCell>{speaker.full_name}</TableCell>
                <TableCell>{speaker.title}</TableCell>
                <TableCell>{speaker.company}</TableCell>
                <TableCell>{speaker.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(speaker)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(speaker.id)}>
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
