import { NavLink, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const navItemCls = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground";

export default function SiteHeader() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [programmeMenuOpen, setProgrammeMenuOpen] = useState(false);
  
  // Check if any programme-related page is active
  const isProgrammeActive = ['/programme', '/speakers', '/floor-plan'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/expo_logo.png" 
            alt="MIA Expo Logo" 
            className="h-8 w-auto"
          />
          <span className="font-brand text-lg leading-none">{t('brand')}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/about" className={navItemCls}>{t('nav.about')}</NavLink>
          <NavLink to="/why-exhibit" className={navItemCls}>{t('nav.whyExhibit')}</NavLink>
          <NavLink to="/why-visit" className={navItemCls}>{t('nav.whyVisit')}</NavLink>
          
          <NavLink to="/sponsor-opportunities" className={navItemCls}>{t('nav.sponsors')}</NavLink>
          
          {/* Programme Dropdown Menu */}
          <DropdownMenu open={programmeMenuOpen} onOpenChange={setProgrammeMenuOpen}>
            <DropdownMenuTrigger 
              className={`flex items-center gap-1 transition-colors ${isProgrammeActive ? 'text-primary font-medium' : 'text-foreground/70 hover:text-foreground'}`}
              onMouseEnter={() => setProgrammeMenuOpen(true)}
              onMouseLeave={() => setProgrammeMenuOpen(false)}
            >
              {t('nav.programme')}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-48"
              onMouseEnter={() => setProgrammeMenuOpen(true)}
              onMouseLeave={() => setProgrammeMenuOpen(false)}
            >
              <DropdownMenuItem asChild>
                <Link to="/programme" className="w-full cursor-pointer">
                  {t('nav.programme')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/speakers" className="w-full cursor-pointer">
                  {t('nav.speakers')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/floor-plan" className="w-full cursor-pointer">
                  {t('nav.floor')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <NavLink to="/directory" className={navItemCls}>{t('nav.directory')}</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm" className="inline-flex">
            <Link to="/visitor-info">{t('hero.ctaTickets')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
