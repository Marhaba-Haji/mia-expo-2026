import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-20" aria-hidden />
      <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_top_left,hsla(var(--primary)/.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsla(var(--accent)/.25),transparent_50%)]" aria-hidden />

      <div className="container relative py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-muted-foreground mb-2 tracking-wide">
              {t('hero.metaDate')} • {t('hero.metaPlace')}
            </p>
            <h1 className="font-brand text-4xl md:text-5xl leading-tight mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-prose">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/exhibitor-packages">{t('hero.ctaExhibit')}</Link>
              </Button>
              <Button asChild variant="premium" size="lg">
                <Link to="/visitor-info">{t('hero.ctaTickets')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sponsor-opportunities">{t('hero.ctaSponsor')}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-xl bg-soft-gradient shadow-elegant border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
