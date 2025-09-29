import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";

const navItemCls = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground";

export default function SiteHeader() {
  const { t, i18n } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-hero-gradient shadow-glow animate-float" aria-hidden />
          <span className="font-brand text-lg leading-none">{t('brand')}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/about" className={navItemCls}>{t('nav.about')}</NavLink>
          <NavLink to="/why-exhibit" className={navItemCls}>{t('nav.whyExhibit')}</NavLink>
          <NavLink to="/exhibitor-packages" className={navItemCls}>{t('nav.packages')}</NavLink>
          <NavLink to="/sponsor-opportunities" className={navItemCls}>{t('nav.sponsors')}</NavLink>
          <NavLink to="/programme" className={navItemCls}>{t('nav.programme')}</NavLink>
          <NavLink to="/speakers" className={navItemCls}>{t('nav.speakers')}</NavLink>
          <NavLink to="/floor-plan" className={navItemCls}>{t('nav.floor')}</NavLink>
          <NavLink to="/visitor-info" className={navItemCls}>{t('nav.visitors')}</NavLink>
          <NavLink to="/news" className={navItemCls}>{t('nav.news')}</NavLink>
          <NavLink to="/directory" className={navItemCls}>{t('nav.directory')}</NavLink>
          
          <NavLink to="/contact" className={navItemCls}>{t('nav.contact')}</NavLink>
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
