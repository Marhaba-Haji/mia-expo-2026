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

interface Donor {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  amount: number | null;
  donation_type: string | null;
  message: string | null;
  anonymous: boolean;
}

export function DonorsManager() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    donation_type: '',
    message: '',
    anonymous: false,
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setDonors(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      amount: formData.amount ? parseFloat(formData.amount) : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('donors')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Donor updated successfully' });
        fetchDonors();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('donors')
        .insert([dataToSubmit]);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Donor added successfully' });
        fetchDonors();
        resetForm();
      }
    }
  };

  const handleEdit = (donor: Donor) => {
    setEditingId(donor.id);
    setFormData({
      name: donor.name,
      email: donor.email || '',
      phone: donor.phone || '',
      amount: donor.amount?.toString() || '',
      donation_type: donor.donation_type || '',
      message: donor.message || '',
      anonymous: donor.anonymous,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this donor?')) return;

    const { error } = await supabase
      .from('donors')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Donor deleted successfully' });
      fetchDonors();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      amount: '',
      donation_type: '',
      message: '',
      anonymous: false,
    });
    setEditingId(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Donors Management</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Donor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Donor' : 'Add Donor'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
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
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donation_type">Donation Type</Label>
                  <Input
                    id="donation_type"
                    value={formData.donation_type}
                    onChange={(e) => setFormData({ ...formData, donation_type: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.anonymous}
                  onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked as boolean })}
                />
                <Label htmlFor="anonymous">Anonymous</Label>
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
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Anonymous</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>{donor.anonymous ? 'Anonymous' : donor.name}</TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>{donor.amount ? `$${donor.amount.toLocaleString()}` : '-'}</TableCell>
                <TableCell>{donor.donation_type}</TableCell>
                <TableCell>{donor.anonymous ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(donor)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(donor.id)}>
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
