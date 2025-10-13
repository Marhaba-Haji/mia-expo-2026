import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import WhyExhibit from "./pages/WhyExhibit";
import ExhibitorPackages from "./pages/ExhibitorPackages";
import SponsorOpportunities from "./pages/SponsorOpportunities";
import Programme from "./pages/Programme";
import Speakers from "./pages/Speakers";
import FloorPlan from "./pages/FloorPlan";
import VisitorInfo from "./pages/VisitorInfo";
import NewsPress from "./pages/NewsPress";
import Contact from "./pages/Contact";
import ExhibitorPortal from "./pages/ExhibitorPortal";
import AdminPortal from "./pages/AdminPortal";
import Directory from "./pages/Directory";
import ExhibitorDetail from "./pages/ExhibitorDetail";
import Matchmaking from "./pages/Matchmaking";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-exhibit" element={<WhyExhibit />} />
            <Route path="/exhibitor-packages" element={<ExhibitorPackages />} />
            <Route path="/sponsor-opportunities" element={<SponsorOpportunities />} />
            <Route path="/programme" element={<Programme />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/floor-plan" element={<FloorPlan />} />
            <Route path="/visitor-info" element={<VisitorInfo />} />
            <Route path="/news" element={<NewsPress />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/exhibitor-portal" element={<ExhibitorPortal />} />
            <Route path="/admin-portal" element={<AdminPortal />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/exhibitor/:id" element={<ExhibitorDetail />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SiteFooter />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
