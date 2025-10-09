import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import SEO from '@/components/seo/SEO';
import { ExhibitorsManager } from '@/components/admin/ExhibitorsManager';
import { SponsorsManager } from '@/components/admin/SponsorsManager';
import { DonorsManager } from '@/components/admin/DonorsManager';
import { VisitorsManager } from '@/components/admin/VisitorsManager';
import { SpeakersManager } from '@/components/admin/SpeakersManager';
import { TeamManager } from '@/components/admin/TeamManager';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';
import { ProgrammeManager } from '@/components/admin/ProgrammeManager';
import { FloorPlanManager } from '@/components/admin/FloorPlanManager';
import { MediaBitesManager } from '@/components/admin/MediaBitesManager';
import { SQLEditor } from '@/components/admin/SQLEditor';

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      const hasAdminRole = roles?.some(r => r.role === 'admin');
      setIsAdmin(hasAdminRole || false);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully',
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You don't have admin access.</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Admin Portal - IICF Expo"
        description="Manage IICF Expo content"
      />
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">IICF Expo Admin Portal</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="exhibitors" className="space-y-4">
            <TabsList className="grid grid-cols-5 lg:grid-cols-11 gap-2">
              <TabsTrigger value="exhibitors">Exhibitors</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              <TabsTrigger value="donors">Donors</TabsTrigger>
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="programme">Programme</TabsTrigger>
              <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
              <TabsTrigger value="media">Media Bites</TabsTrigger>
              <TabsTrigger value="sql">SQL Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="exhibitors">
              <ExhibitorsManager />
            </TabsContent>

            <TabsContent value="sponsors">
              <SponsorsManager />
            </TabsContent>

            <TabsContent value="donors">
              <DonorsManager />
            </TabsContent>

            <TabsContent value="visitors">
              <VisitorsManager />
            </TabsContent>

            <TabsContent value="speakers">
              <SpeakersManager />
            </TabsContent>

            <TabsContent value="team">
              <TeamManager />
            </TabsContent>

            <TabsContent value="testimonials">
              <TestimonialsManager />
            </TabsContent>

            <TabsContent value="programme">
              <ProgrammeManager />
            </TabsContent>

            <TabsContent value="floorplan">
              <FloorPlanManager />
            </TabsContent>

            <TabsContent value="media">
              <MediaBitesManager />
            </TabsContent>

            <TabsContent value="sql">
              <SQLEditor />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
