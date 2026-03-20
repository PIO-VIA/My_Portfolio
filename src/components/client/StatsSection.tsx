'use client';

import { useI18n } from '@/context/I18nContext';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Briefcase, FolderOpen, Cpu, Heart } from 'lucide-react';

function useCounter(target: number, duration = 1800, active: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [active, target, duration]);
    return count;
}

const statsConfig = [
    { icon: Briefcase, color: 'text-brand-primary', bg: 'bg-brand-primary/10', target: 5, suffix: '+', labelKey: 'years_label' as const },
    { icon: FolderOpen, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10', target: 50, suffix: '+', labelKey: 'projects_label' as const },
    { icon: Cpu, color: 'text-brand-accent', bg: 'bg-brand-accent/10', target: 20, suffix: '+', labelKey: 'technologies_label' as const },
    { icon: Heart, color: 'text-rose-400', bg: 'bg-rose-400/10', target: 100, suffix: '%', labelKey: 'passion_label' as const },
];

function StatCard({ config, index, active }: { config: typeof statsConfig[0]; index: number; active: boolean }) {
    const { t } = useI18n();
    const count = useCounter(config.target, 1600, active);
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: index * 0.1 }}
            className="stat-card glass rounded-3xl border border-white/8 p-8 text-center space-y-4 hover:border-brand-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-default"
        >
            <div className={`inline-flex p-4 rounded-2xl ${config.bg}`}>
                <Icon size={28} className={config.color} />
            </div>
            <div>
                <div className="text-5xl font-bold tracking-tight">
                    <span className={config.color}>{count}</span>
                    <span className="text-white/60">{config.suffix}</span>
                </div>
                <p className="text-white/50 font-medium mt-2 text-sm">{t.stats[config.labelKey]}</p>
            </div>
        </motion.div>
    );
}

export default function StatsSection() {
    const { t } = useI18n();
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="py-20 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="text-center mb-14 space-y-3"
                >
                    <p className="text-brand-primary font-bold tracking-widest uppercase text-sm">— {t.stats.title}</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Numbers that <span className="shimmer-text">speak</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsConfig.map((cfg, i) => (
                        <StatCard key={cfg.labelKey} config={cfg} index={i} active={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
