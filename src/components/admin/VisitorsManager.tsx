import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

interface Visitor {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  country: string | null;
  interests: string[] | null;
  checked_in: boolean;
  check_in_time: string | null;
  registration_date: string;
}

export function VisitorsManager() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('registration_date', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setVisitors(data || []);
    }
  };

  const handleCheckIn = async (id: string) => {
    const { error } = await supabase
      .from('visitors')
      .update({ checked_in: true, check_in_time: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Visitor checked in successfully' });
      fetchVisitors();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitors Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Checked In</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitors.map((visitor) => (
              <TableRow key={visitor.id}>
                <TableCell>{visitor.full_name}</TableCell>
                <TableCell>{visitor.email}</TableCell>
                <TableCell>{visitor.company}</TableCell>
                <TableCell>{visitor.country}</TableCell>
                <TableCell>{new Date(visitor.registration_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {visitor.checked_in ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {visitor.check_in_time && new Date(visitor.check_in_time).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Not checked in</span>
                  )}
                </TableCell>
                <TableCell>
                  {!visitor.checked_in && (
                    <Button size="sm" onClick={() => handleCheckIn(visitor.id)}>
                      Check In
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
