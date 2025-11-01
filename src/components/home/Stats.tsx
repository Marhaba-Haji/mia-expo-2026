import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Building2, MapPin, Layers } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  index: number;
}

function StatCard({ icon, value, suffix, label, index }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-card to-card/50 p-8 text-center shadow-elegant hover:shadow-glow transition-all duration-300"
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.5 }}
        className="relative inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:scale-110 transition-transform duration-300"
      >
        {icon}
      </motion.div>

      {/* Number with count-up animation */}
      <div className="relative">
        <motion.div
          className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2"
          animate={isInView ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        >
          {formatNumber(count)}{suffix}
        </motion.div>
        
        {/* Label */}
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { 
      icon: <Building2 className="w-8 h-8" />,
      value: 200,
      suffix: '+',
      label: 'Exhibitors'
    },
    { 
      icon: <Users className="w-8 h-8" />,
      value: 20000,
      suffix: '+',
      label: 'Trade Visitors'
    },
    { 
      icon: <MapPin className="w-8 h-8" />,
      value: 25,
      suffix: '+',
      label: 'Cities'
    },
    { 
      icon: <Layers className="w-8 h-8" />,
      value: 60,
      suffix: '+',
      label: 'Business Categories'
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-brand text-3xl md:text-4xl mb-4">
            Making an Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of businesses creating meaningful connections and driving growth
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
