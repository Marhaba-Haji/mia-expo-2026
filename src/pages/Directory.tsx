import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Sample exhibitor data - in production, this would come from an API
const exhibitorData = [
  {
    id: "1",
    name: "Khan Infrastructure Ltd.",
    description: "Leading construction and infrastructure development company specializing in smart cities and sustainable building solutions.",
    sector: "Infrastructure & Real Estate",
    subSector: "Construction",
    location: { country: "India", state: "Maharashtra", city: "Mumbai" },
    contact: {
      email: "contact@khaninfra.com",
      phone: "+91-22-1234-5678",
      website: "https://khaninfra.com",
      socialMedia: { linkedin: "khan-infrastructure", twitter: "khaninfra" }
    },
    booth: { number: "A-101", size: "18 sqm", package: "Premium", location: { x: 100, y: 200 } },
    products: ["Smart Buildings", "Green Construction", "Infrastructure Planning"],
    services: ["Project Management", "Consulting", "Maintenance"],
    keyPersonnel: [{ name: "Ahmed Khan", designation: "CEO", email: "ahmed@khaninfra.com" }],
    certifications: ["ISO 9001", "Green Building Certified"],
    exportMarkets: ["UAE", "Saudi Arabia", "Bangladesh"],
    community: "Muslim",
    establishedYear: 1995,
    employeeCount: "500+",
    logo: "/api/placeholder/80/80",
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    isFeatured: true,
    isNew: false
  },
  {
    id: "2",
    name: "Singh Manufacturing Co.",
    description: "Advanced manufacturing solutions for automotive and industrial sectors with cutting-edge automation technology.",
    sector: "Manufacturing & Machinery",
    subSector: "Industrial Manufacturing",
    location: { country: "India", state: "Punjab", city: "Ludhiana" },
    contact: {
      email: "info@singhmfg.com",
      phone: "+91-161-234-5678",
      website: "https://singhmfg.com",
      socialMedia: { linkedin: "singh-manufacturing" }
    },
    booth: { number: "B-205", size: "9 sqm", package: "Standard", location: { x: 300, y: 150 } },
    products: ["CNC Machines", "Automation Systems", "Industrial Tools"],
    services: ["Machine Installation", "Training", "Maintenance"],
    keyPersonnel: [{ name: "Priya Singh", designation: "Director", email: "priya@singhmfg.com" }],
    certifications: ["ISO 14001", "CE Marking"],
    exportMarkets: ["Germany", "USA", "Japan"],
    community: "Sikh",
    establishedYear: 1988,
    employeeCount: "200+",
    logo: "/api/placeholder/80/80",
    images: ["/api/placeholder/400/300"],
    isFeatured: false,
    isNew: true
  },
  {
    id: "3",
    name: "Mathew Hospitality Group",
    description: "Premium hospitality services with luxury hotels, restaurants, and event management across India.",
    sector: "Hospitality",
    subSector: "Hotels & Restaurants",
    location: { country: "India", state: "Kerala", city: "Kochi" },
    contact: {
      email: "contact@mathewhospitality.com",
      phone: "+91-484-123-4567",
      website: "https://mathewhospitality.com",
      socialMedia: { linkedin: "mathew-hospitality", facebook: "mathewhospitality" }
    },
    booth: { number: "C-310", size: "6 sqm", package: "Startup", location: { x: 200, y: 300 } },
    products: ["Luxury Hotels", "Fine Dining", "Event Venues"],
    services: ["Catering", "Event Management", "Tourism"],
    keyPersonnel: [{ name: "John Mathew", designation: "Managing Director", email: "john@mathewhospitality.com" }],
    certifications: ["HACCP", "ISO 22000"],
    exportMarkets: ["Maldives", "Sri Lanka"],
    community: "Christian",
    establishedYear: 2005,
    employeeCount: "150+",
    logo: "/api/placeholder/80/80",
    images: ["/api/placeholder/400/300"],
    isFeatured: false,
    isNew: false
  },
  {
    id: "4",
    name: "Zaveri Organics",
    description: "Organic farming and sustainable agriculture solutions with premium organic products for health-conscious consumers.",
    sector: "Agriculture",
    subSector: "Organic Farming",
    location: { country: "India", state: "Gujarat", city: "Ahmedabad" },
    contact: {
      email: "info@zaveriorganics.com",
      phone: "+91-79-234-5678",
      website: "https://zaveriorganics.com",
      socialMedia: { linkedin: "zaveri-organics" }
    },
    booth: { number: "D-415", size: "9 sqm", package: "Standard", location: { x: 400, y: 250 } },
    products: ["Organic Spices", "Organic Grains", "Organic Vegetables"],
    services: ["Farm Consulting", "Organic Certification", "Export Services"],
    keyPersonnel: [{ name: "Zara Irani", designation: "Founder", email: "zara@zaveriorganics.com" }],
    certifications: ["USDA Organic", "NPOP Certified"],
    exportMarkets: ["USA", "UK", "Australia"],
    community: "Parsi",
    establishedYear: 2010,
    employeeCount: "75+",
    logo: "/api/placeholder/80/80",
    images: ["/api/placeholder/400/300"],
    isFeatured: true,
    isNew: false
  },
  {
    id: "5",
    name: "Noor Foods",
    description: "Premium halal food products and beverages with international quality standards and innovative packaging solutions.",
    sector: "Food & Beverage",
    subSector: "Food Processing",
    location: { country: "India", state: "Delhi", city: "New Delhi" },
    contact: {
      email: "sales@noorfoods.com",
      phone: "+91-11-2345-6789",
      website: "https://noorfoods.com",
      socialMedia: { linkedin: "noor-foods", twitter: "noorfoods" }
    },
    booth: { number: "E-520", size: "6 sqm", package: "Startup", location: { x: 500, y: 200 } },
    products: ["Halal Snacks", "Beverages", "Ready-to-Eat Meals"],
    services: ["Private Labeling", "Export Services", "Quality Testing"],
    keyPersonnel: [{ name: "Fatima Noor", designation: "CEO", email: "fatima@noorfoods.com" }],
    certifications: ["Halal Certified", "FSSAI Approved"],
    exportMarkets: ["Malaysia", "Indonesia", "UAE"],
    community: "Muslim",
    establishedYear: 2018,
    employeeCount: "50+",
    logo: "/api/placeholder/80/80",
    images: ["/api/placeholder/400/300"],
    isFeatured: false,
    isNew: true
  },
  {
    id: "6",
    name: "St. Mary Healthcare",
    description: "Advanced medical devices and healthcare solutions with focus on telemedicine and patient care technology.",
    sector: "Healthcare",
    subSector: "Medical Devices",
    location: { country: "India", state: "Tamil Nadu", city: "Chennai" },
    contact: {
      email: "info@stmaryhealthcare.com",
      phone: "+91-44-1234-5678",
      website: "https://stmaryhealthcare.com",
      socialMedia: { linkedin: "st-mary-healthcare" }
    },
    booth: { number: "F-625", size: "18 sqm", package: "Premium", location: { x: 600, y: 100 } },
    products: ["Medical Devices", "Telemedicine Solutions", "Health Monitoring"],
    services: ["Medical Training", "Equipment Maintenance", "Consulting"],
    keyPersonnel: [{ name: "Dr. Mary Thomas", designation: "Medical Director", email: "mary@stmaryhealthcare.com" }],
    certifications: ["ISO 13485", "CE Medical Device"],
    exportMarkets: ["South Africa", "Kenya", "Nigeria"],
    community: "Christian",
    establishedYear: 2000,
    employeeCount: "300+",
    logo: "/api/placeholder/80/80",
    images: ["/api/placeholder/400/300"],
    isFeatured: true,
    isNew: false
  }
];

const sectors = [
  "All Sectors",
  "Infrastructure & Real Estate",
  "Manufacturing & Machinery", 
  "Hospitality",
  "Food & Beverage",
  "Healthcare",
  "Agriculture",
  "Technology"
];

const communities = [
  "All Communities",
  "Muslim",
  "Sikh", 
  "Christian",
  "Parsi",
  "Jain"
];

const packages = [
  "All Packages",
  "Startup",
  "Standard",
  "Premium"
];

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedCommunity, setSelectedCommunity] = useState("All Communities");
  const [selectedPackage, setSelectedPackage] = useState("All Packages");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [selectedExhibitor, setSelectedExhibitor] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredExhibitors = useMemo(() => {
    let filtered = exhibitorData.filter(exhibitor => {
      const matchesSearch = exhibitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exhibitor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exhibitor.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSector = selectedSector === "All Sectors" || exhibitor.sector === selectedSector;
      const matchesCommunity = selectedCommunity === "All Communities" || exhibitor.community === selectedCommunity;
      const matchesPackage = selectedPackage === "All Packages" || exhibitor.booth.package === selectedPackage;
      
      return matchesSearch && matchesSector && matchesCommunity && matchesPackage;
    });

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "sector":
          return a.sector.localeCompare(b.sector);
        case "location":
          return a.location.city.localeCompare(b.location.city);
        case "package":
          const packageOrder = { "Premium": 3, "Standard": 2, "Startup": 1 };
          return packageOrder[b.booth.package] - packageOrder[a.booth.package];
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedSector, selectedCommunity, selectedPackage, sortBy]);

  const featuredExhibitors = exhibitorData.filter(e => e.isFeatured);
  const newExhibitors = exhibitorData.filter(e => e.isNew);

  const sectorStats = useMemo(() => {
    const stats: { [key: string]: number } = {};
    exhibitorData.forEach(exhibitor => {
      stats[exhibitor.sector] = (stats[exhibitor.sector] || 0) + 1;
    });
    return stats;
  }, []);

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
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-brand text-3xl md:text-4xl mb-6">Featured Exhibitors</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover our premium exhibitors showcasing cutting-edge innovations and solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExhibitors.map((exhibitor, index) => (
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
                          <h3 className="font-semibold text-lg">{exhibitor.name}</h3>
                          <p className="text-sm text-muted-foreground">{exhibitor.sector}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {exhibitor.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{exhibitor.location.city}, {exhibitor.location.state}</span>
                    </div>
                     
                     <div className="flex items-center justify-between">
                       <Badge variant="outline">{exhibitor.booth.package}</Badge>
                       <Button variant="outline" size="sm" asChild>
                         <a href={`/exhibitor/${exhibitor.id}`}>
                           <Eye className="h-4 w-4 mr-2" />
                           View Details
                         </a>
                       </Button>
                     </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                    <label className="text-sm font-medium mb-2 block">Community</label>
                    <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {communities.map(community => (
                          <SelectItem key={community} value={community}>{community}</SelectItem>
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
                      setSelectedCommunity("All Communities");
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
                              <h3 className="font-semibold text-lg truncate">{exhibitor.name}</h3>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                {exhibitor.isFeatured && (
                                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                {exhibitor.isNew && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    New
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {exhibitor.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                <span>{exhibitor.sector}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{exhibitor.location.city}</span>
                              </div>
                              <Badge variant="outline">{exhibitor.booth.package}</Badge>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/exhibitor/${exhibitor.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </a>
                              </Button>
                              
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
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
