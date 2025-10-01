import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface FloorPlanItem {
  id: string;
  booth_number: string;
  exhibitor_id: string | null;
  position_x: number | null;
  position_y: number | null;
  width: number | null;
  height: number | null;
  status: string | null;
  price: number | null;
}

interface Exhibitor {
  id: string;
  company_name: string;
}

export function FloorPlanManager() {
  const [items, setItems] = useState<FloorPlanItem[]>([]);
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    booth_number: '',
    exhibitor_id: '',
    position_x: '',
    position_y: '',
    width: '',
    height: '',
    status: 'available',
    price: '',
  });

  useEffect(() => {
    fetchItems();
    fetchExhibitors();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('floor_plan')
      .select('*')
      .order('booth_number', { ascending: true });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setItems(data || []);
    }
  };

  const fetchExhibitors = async () => {
    const { data, error } = await supabase
      .from('exhibitors')
      .select('id, company_name')
      .order('company_name', { ascending: true });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setExhibitors(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      booth_number: formData.booth_number,
      exhibitor_id: formData.exhibitor_id || null,
      position_x: formData.position_x ? parseInt(formData.position_x) : null,
      position_y: formData.position_y ? parseInt(formData.position_y) : null,
      width: formData.width ? parseInt(formData.width) : null,
      height: formData.height ? parseInt(formData.height) : null,
      status: formData.status,
      price: formData.price ? parseFloat(formData.price) : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('floor_plan')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Floor plan item updated successfully' });
        fetchItems();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('floor_plan')
        .insert([dataToSubmit]);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Floor plan item added successfully' });
        fetchItems();
        resetForm();
      }
    }
  };

  const handleEdit = (item: FloorPlanItem) => {
    setEditingId(item.id);
    setFormData({
      booth_number: item.booth_number,
      exhibitor_id: item.exhibitor_id || '',
      position_x: item.position_x?.toString() || '',
      position_y: item.position_y?.toString() || '',
      width: item.width?.toString() || '',
      height: item.height?.toString() || '',
      status: item.status || 'available',
      price: item.price?.toString() || '',
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booth?')) return;

    const { error } = await supabase
      .from('floor_plan')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Booth deleted successfully' });
      fetchItems();
    }
  };

  const resetForm = () => {
    setFormData({
      booth_number: '',
      exhibitor_id: '',
      position_x: '',
      position_y: '',
      width: '',
      height: '',
      status: 'available',
      price: '',
    });
    setEditingId(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Floor Plan Management</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Booth
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Booth' : 'Add Booth'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="booth_number">Booth Number *</Label>
                  <Input
                    id="booth_number"
                    value={formData.booth_number}
                    onChange={(e) => setFormData({ ...formData, booth_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exhibitor_id">Exhibitor</Label>
                  <Select
                    value={formData.exhibitor_id}
                    onValueChange={(value) => setFormData({ ...formData, exhibitor_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exhibitor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {exhibitors.map((exhibitor) => (
                        <SelectItem key={exhibitor.id} value={exhibitor.id}>
                          {exhibitor.company_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_x">Position X</Label>
                  <Input
                    id="position_x"
                    type="number"
                    value={formData.position_x}
                    onChange={(e) => setFormData({ ...formData, position_x: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_y">Position Y</Label>
                  <Input
                    id="position_y"
                    type="number"
                    value={formData.position_y}
                    onChange={(e) => setFormData({ ...formData, position_y: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
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
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
              <TableHead>Booth #</TableHead>
              <TableHead>Exhibitor</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.booth_number}</TableCell>
                <TableCell>
                  {exhibitors.find(e => e.id === item.exhibitor_id)?.company_name || '-'}
                </TableCell>
                <TableCell>
                  {item.position_x !== null && item.position_y !== null
                    ? `${item.position_x}, ${item.position_y}`
                    : '-'}
                </TableCell>
                <TableCell>
                  {item.width && item.height ? `${item.width}x${item.height}` : '-'}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.price ? `$${item.price.toLocaleString()}` : '-'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
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
