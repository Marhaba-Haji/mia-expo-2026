import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img 
              src="/expo_logo.png" 
              alt="MIA Expo Logo" 
              className="h-6 w-auto"
            />
            <h4 className="font-brand text-lg">MIA Business Expo</h4>
          </div>
          <p className="text-muted-foreground">
            A prestigious platform celebrating commerce and culture across India's minority communities.
          </p>
        </div>
        <div>
          <h5 className="font-medium mb-3">Attend</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/visitor-info" className="hover:text-primary">Visitor Information</Link></li>
            <li><Link to="/programme" className="hover:text-primary">Programme</Link></li>
            <li><Link to="/speakers" className="hover:text-primary">Speakers</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium mb-3">Exhibit & Sponsor</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/why-exhibit" className="hover:text-primary">Why Exhibit</Link></li>
            <li><Link to="/exhibitor-packages" className="hover:text-primary">Exhibitor Packages</Link></li>
            <li><Link to="/sponsor-opportunities" className="hover:text-primary">Sponsor Opportunities</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium mb-3">Contact</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/news" className="hover:text-primary">News & Press</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link to="/admin" className="hover:text-primary">Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-xs text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} MIA. All rights reserved.</span>
          <span>Designed with care • WCAG AA</span>
        </div>
      </div>
    </footer>
  );
}
