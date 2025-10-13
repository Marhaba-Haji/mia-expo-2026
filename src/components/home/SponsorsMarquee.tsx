import { motion } from "framer-motion";
import { Star, Award, Crown, Gem } from "lucide-react";

interface Sponsor {
  name: string;
  tier: "platinum" | "gold" | "silver";
  icon: React.ReactNode;
}

export default function SponsorsMarquee() {
  const sponsors: Sponsor[] = [
    { name: "HBL Bank", tier: "platinum", icon: <Crown className="w-4 h-4" /> },
    { name: "Tata Group", tier: "platinum", icon: <Crown className="w-4 h-4" /> },
    { name: "ZamZam Foods", tier: "gold", icon: <Gem className="w-4 h-4" /> },
    { name: "Alif Technologies", tier: "gold", icon: <Gem className="w-4 h-4" /> },
    { name: "Unity Bank", tier: "gold", icon: <Gem className="w-4 h-4" /> },
    { name: "Lotus Ventures", tier: "silver", icon: <Award className="w-4 h-4" /> },
    { name: "Ethos Health", tier: "silver", icon: <Award className="w-4 h-4" /> },
    { name: "Green Earth Hospitality", tier: "silver", icon: <Award className="w-4 h-4" /> },
    { name: "Apex Infrastructure", tier: "gold", icon: <Gem className="w-4 h-4" /> },
    { name: "Phoenix Industries", tier: "silver", icon: <Award className="w-4 h-4" /> },
  ];

  const tierColors = {
    platinum: "from-primary/20 to-accent/20 border-primary/30 text-primary",
    gold: "from-yellow-500/10 to-amber-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-500",
    silver: "from-slate-500/10 to-gray-500/10 border-slate-400/30 text-slate-700 dark:text-slate-400"
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden border-t border-b">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm font-medium uppercase tracking-wider">Our Partners</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
          <h2 className="font-brand text-3xl md:text-4xl mb-3">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Partnering with forward-thinking organizations committed to inclusive business growth
          </p>
        </motion.div>

        {/* Sponsors Marquee - Row 1 (Right to Left) */}
        <div className="mb-6 overflow-hidden">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...sponsors, ...sponsors].map((sponsor, idx) => (
              <div
                key={idx}
                className={`group relative px-8 py-4 rounded-xl border-2 bg-gradient-to-br ${tierColors[sponsor.tier]} shadow-elegant hover:shadow-glow transition-all duration-300 cursor-pointer`}
              >
                {/* Tier Icon Badge */}
                <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-background border shadow-sm">
                  {sponsor.icon}
                </div>
                
                {/* Sponsor Name */}
                <span className="font-semibold text-base inline-flex items-center gap-2">
                  {sponsor.name}
                </span>
                
                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sponsors Marquee - Row 2 (Left to Right) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{
              x: ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...sponsors.slice().reverse(), ...sponsors.slice().reverse()].map((sponsor, idx) => (
              <div
                key={idx}
                className={`group relative px-8 py-4 rounded-xl border-2 bg-gradient-to-br ${tierColors[sponsor.tier]} shadow-elegant hover:shadow-glow transition-all duration-300 cursor-pointer`}
              >
                {/* Tier Icon Badge */}
                <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-background border shadow-sm">
                  {sponsor.icon}
                </div>
                
                {/* Sponsor Name */}
                <span className="font-semibold text-base inline-flex items-center gap-2">
                  {sponsor.name}
                </span>
                
                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tier Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          <div className="flex items-center gap-2 text-sm">
            <Crown className="w-4 h-4 text-primary" />
            <span className="font-medium">Platinum Partners</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gem className="w-4 h-4 text-yellow-600" />
            <span className="font-medium">Gold Partners</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-slate-600" />
            <span className="font-medium">Silver Partners</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
