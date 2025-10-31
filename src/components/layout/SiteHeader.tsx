import { NavLink, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";

const navItemCls = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground";

export default function SiteHeader() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [programmeMenuOpen, setProgrammeMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
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
          <span className="font-brand text-lg leading-none hidden sm:inline">{t('brand')}</span>
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
          {/* Mobile menu toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {/* Mobile nav panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.button
              aria-label="Close menu overlay"
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="md:hidden z-40 border-t bg-popover/95 supports-[backdrop-filter]:bg-popover/80 backdrop-blur shadow-lg"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="container py-4">
                <div className="flex flex-col gap-1 text-sm">
                  <NavLink to="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted/70 transition-colors">
                    {t('nav.about')}
                  </NavLink>
                  <NavLink to="/why-exhibit" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted/70 transition-colors">
                    {t('nav.whyExhibit')}
                  </NavLink>
                  <NavLink to="/why-visit" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted/70 transition-colors">
                    {t('nav.whyVisit')}
                  </NavLink>
                  <NavLink to="/sponsor-opportunities" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted/70 transition-colors">
                    {t('nav.sponsors')}
                  </NavLink>
                  {/* Programme sub-links */}
                  <div className="mt-2 mb-1 px-3 text-xs uppercase tracking-wide text-foreground/60">{t('nav.programme')}</div>
                  <div className="ml-2 flex flex-col gap-1 border-l pl-3">
                    <Link to="/programme" onClick={() => setMobileOpen(false)} className="px-3 py-2 -ml-3 rounded-md hover:bg-muted/70 transition-colors">{t('nav.programme')}</Link>
                    <Link to="/speakers" onClick={() => setMobileOpen(false)} className="px-3 py-2 -ml-3 rounded-md hover:bg-muted/70 transition-colors">{t('nav.speakers')}</Link>
                    <Link to="/floor-plan" onClick={() => setMobileOpen(false)} className="px-3 py-2 -ml-3 rounded-md hover:bg-muted/70 transition-colors">{t('nav.floor')}</Link>
                  </div>
                  <div className="h-px my-2 bg-border" />
                  <NavLink to="/directory" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted/70 transition-colors">
                    {t('nav.directory')}
                  </NavLink>
                  <div className="pt-2">
                    <Button asChild variant="hero" size="sm" className="w-full">
                      <Link to="/visitor-info" onClick={() => setMobileOpen(false)}>{t('hero.ctaTickets')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
