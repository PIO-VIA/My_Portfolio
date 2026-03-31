'use client';

import { useI18n } from '@/context/I18nContext';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Briefcase, FolderOpen, Cpu, Heart } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

function Counter({ value, active }: { value: number; active: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!active) return;
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [active, value]);

    return <span>{displayValue}</span>;
}

const statsConfig = [
    { icon: Briefcase, color: 'text-brand-primary', bg: 'bg-brand-primary/10', target: 5, suffix: '+', labelKey: 'years_label' as const },
    { icon: FolderOpen, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10', target: 50, suffix: '+', labelKey: 'projects_label' as const },
    { icon: Cpu, color: 'text-brand-accent', bg: 'bg-brand-accent/10', target: 20, suffix: '+', labelKey: 'technologies_label' as const },
    { icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10', target: 100, suffix: '%', labelKey: 'passion_label' as const },
];

function StatCard({ config, index, active }: { config: typeof statsConfig[0]; index: number; active: boolean }) {
    const { t } = useI18n();
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative glass rounded-[2.5rem] border border-white/5 p-10 text-center space-y-6 hover:border-brand-primary/20 transition-all duration-500 bg-white/2 hover:shadow-2xl"
        >
            <div className={`inline-flex p-5 rounded-3xl ${config.bg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon size={32} className={config.color} />
            </div>
            <div className="space-y-2">
                <div className="text-6xl font-black tracking-tighter text-white">
                    <Counter value={config.target} active={active} />
                    <span className="text-white/20 ml-1">{config.suffix}</span>
                </div>
                <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">{t.stats[config.labelKey]}</p>
            </div>

            {/* Hover Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] blur-2xl -z-10`} />
        </motion.div>
    );
}

export default function StatsSection() {
    const { t } = useI18n();
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <SectionWrapper id="stats" className="relative group/section">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24 space-y-8">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-inner">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                        {t.stats.badge}
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                        {t.stats.title} <br />
                        <span className="shimmer-text">{t.stats.title_shimmer}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {statsConfig.map((cfg, i) => (
                        <StatCard key={cfg.labelKey} config={cfg} index={i} active={isInView} />
                    ))}
                </div>
            </div>

            {/* Background line accent */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -z-20" />
        </SectionWrapper>
    );
}
