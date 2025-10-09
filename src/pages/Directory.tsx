import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Users, 
  Globe, 
  Phone, 
  Mail, 
  ExternalLink,
  Star,
  Heart,
  Share2,
  Download,
  Calendar,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  Grid3X3,
  List,
  ChevronDown,
  X,
  CheckCircle,
  ArrowRight,
  Eye,
  MessageCircle,
  Bookmark
} from "lucide-react";
import SEO from "@/components/seo/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Exhibitor {
  id: string;
  company_name: string;
  description?: string;
  industry?: string;
  city?: string;
  state?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  package_type?: string;
  booth_number?: string;
  status?: string;
  founded_year?: number;
}

export default function Directory() {
  const [exhibitorData, setExhibitorData] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedPackage, setSelectedPackage] = useState("All Packages");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchExhibitors();
  }, []);

  const fetchExhibitors = async () => {
    try {
      const { data, error } = await supabase
        .from('exhibitors')
        .select('*')
        .eq('status', 'approved')
        .order('company_name');

      if (error) throw error;
      setExhibitorData(data || []);
    } catch (error: any) {
      console.error('Error fetching exhibitors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load exhibitors',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Extract unique sectors and packages from data
  const sectors = useMemo(() => {
    const uniqueSectors = new Set(exhibitorData.map(e => e.industry).filter(Boolean));
    return ["All Sectors", ...Array.from(uniqueSectors)];
  }, [exhibitorData]);

  const packages = useMemo(() => {
    const uniquePackages = new Set(exhibitorData.map(e => e.package_type).filter(Boolean));
    return ["All Packages", ...Array.from(uniquePackages)];
  }, [exhibitorData]);

  const filteredExhibitors = useMemo(() => {
    let filtered = exhibitorData.filter(exhibitor => {
      const matchesSearch = exhibitor.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (exhibitor.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (exhibitor.industry || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSector = selectedSector === "All Sectors" || exhibitor.industry === selectedSector;
      const matchesPackage = selectedPackage === "All Packages" || exhibitor.package_type === selectedPackage;
      
      return matchesSearch && matchesSector && matchesPackage;
    });

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.company_name.localeCompare(b.company_name);
        case "sector":
          return (a.industry || '').localeCompare(b.industry || '');
        case "location":
          return (a.city || '').localeCompare(b.city || '');
        case "package":
          const packageOrder: Record<string, number> = { "Premium": 3, "Standard": 2, "Startup": 1 };
          return (packageOrder[b.package_type || ''] || 0) - (packageOrder[a.package_type || ''] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedSector, selectedPackage, sortBy, exhibitorData]);

  const sectorStats = useMemo(() => {
    const stats: { [key: string]: number } = {};
    exhibitorData.forEach(exhibitor => {
      if (exhibitor.industry) {
        stats[exhibitor.industry] = (stats[exhibitor.industry] || 0) + 1;
      }
    });
    return stats;
  }, [exhibitorData]);

  if (loading) {
    return (
      <main className="container py-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <SEO 
        title="Exhibitor Directory • MIA Business Expo" 
        description="Discover 600+ exhibitors across all sectors. Search, filter, and connect with innovative businesses at MIA Business Expo 2025." 
        canonical="/directory" 
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-20" aria-hidden />
        <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_top_left,hsla(var(--primary)/.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsla(var(--accent)/.25),transparent_50%)]" aria-hidden />
        
        <div className="container relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-brand text-4xl md:text-6xl leading-tight mb-6">
                Exhibitor Directory
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover 600+ innovative exhibitors across all sectors. Connect with businesses 
                from Muslim, Sikh, Christian, Parsi, and Jain communities.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search exhibitors, products, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">{exhibitorData.length}+</div>
                  <div className="text-sm text-muted-foreground">Exhibitors</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">{sectors.length - 1}</div>
                  <div className="text-sm text-muted-foreground">Sectors</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Communities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Exhibitors */}
      {exhibitorData.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-brand text-3xl md:text-4xl mb-6">Our Exhibitors</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover our exhibitors showcasing cutting-edge innovations and solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exhibitorData.slice(0, 6).map((exhibitor, index) => (
                <motion.div
                  key={exhibitor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-glow transition-shadow group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{exhibitor.company_name}</h3>
                            <p className="text-sm text-muted-foreground">{exhibitor.industry || 'N/A'}</p>
                          </div>
                        </div>
                        {exhibitor.package_type === 'Premium' && (
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            <Star className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {exhibitor.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{exhibitor.city && exhibitor.state ? `${exhibitor.city}, ${exhibitor.state}` : 'Location not specified'}</span>
                      </div>
                       
                       <div className="flex items-center justify-between">
                         <Badge variant="outline">{exhibitor.package_type || 'Standard'}</Badge>
                         <Button variant="outline" size="sm" asChild>
                           <Link to={`/exhibitor/${exhibitor.id}`}>
                             <Eye className="h-4 w-4 mr-2" />
                             View Details
                           </Link>
                         </Button>
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sector</label>
                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map(sector => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Package</label>
                    <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map(pkg => (
                          <SelectItem key={pkg} value={pkg}>{pkg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="sector">Sector</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="package">Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSector("All Sectors");
                      setSelectedPackage("All Packages");
                      setSortBy("name");
                    }}
                    className="w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold text-lg">All Exhibitors</h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredExhibitors.length} exhibitors found
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Exhibitor Grid/List */}
              <div className={`grid gap-4 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
                {filteredExhibitors.map((exhibitor, index) => (
                  <motion.div
                    key={exhibitor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-glow transition-shadow group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-8 w-8 text-primary" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg truncate">{exhibitor.company_name}</h3>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                {exhibitor.package_type === 'Premium' && (
                                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                                    <Star className="h-3 w-3 mr-1" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {exhibitor.description || 'No description available'}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                <span>{exhibitor.industry || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{exhibitor.city || 'N/A'}</span>
                              </div>
                              <Badge variant="outline">{exhibitor.package_type || 'Standard'}</Badge>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/exhibitor/${exhibitor.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </Button>
                              
                              {exhibitor.email && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={`mailto:${exhibitor.email}`}>
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Contact
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {filteredExhibitors.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No exhibitors found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters to find more exhibitors.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Exhibitor Statistics</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the diversity and reach of our exhibitor community across sectors and regions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(sectorStats).map(([sector, count], index) => (
              <motion.div
                key={sector}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-glow transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-primary mb-2">{count}</div>
                    <div className="text-sm text-muted-foreground">{sector}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
