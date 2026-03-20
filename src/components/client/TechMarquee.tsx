'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import {
    Globe, Code2, Layers, Database, Cloud, Server, Box, GitBranch,
    Container, Cpu, Zap, Boxes, Flame, BarChart, LayoutGrid
} from 'lucide-react';

const row1 = [
    { name: 'Next.js', icon: Globe },
    { name: 'TypeScript', icon: Code2 },
    { name: 'React', icon: Zap },
    { name: 'Node.js', icon: Server },
    { name: 'Firebase', icon: Flame },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Prisma', icon: Layers },
    { name: 'GraphQL', icon: BarChart },
    { name: 'Docker', icon: Container },
    { name: 'AWS', icon: Cloud },
];

const row2 = [
    { name: 'Tailwind CSS', icon: LayoutGrid },
    { name: 'Framer Motion', icon: Cpu },
    { name: 'Three.js', icon: Boxes },
    { name: 'Python', icon: Code2 },
    { name: 'Redis', icon: Database },
    { name: 'Kubernetes', icon: Box },
    { name: 'CI/CD', icon: GitBranch },
    { name: 'Cloudinary', icon: Cloud },
    { name: 'Supabase', icon: Database },
    { name: 'MongoDB', icon: Server },
];

function MarqueeRow({ items, reverse = false }: { items: typeof row1; reverse?: boolean }) {
    // Duplicate for seamless loop
    const doubled = [...items, ...items];
    return (
        <div className={`marquee-wrapper overflow-hidden py-2 ${reverse ? '' : ''}`}>
            <div className={reverse ? 'marquee-track-reverse' : 'marquee-track'}>
                {doubled.map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                        <div
                            key={`${tech.name}-${i}`}
                            className="tech-pill flex-shrink-0 mx-3 flex items-center gap-2.5 px-5 py-2.5 glass rounded-full border border-white/8 text-white/60 text-sm font-semibold cursor-default transition-all duration-200 hover:text-brand-primary hover:scale-105 select-none"
                        >
                            <Icon size={16} className="flex-shrink-0" />
                            <span>{tech.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function TechMarquee() {
    const { t } = useI18n();

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Subtle separator lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />

            <div className="container mx-auto px-6 mb-12 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3"
                >
                    — Stack
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.08 }}
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                    {t.marquee.title}
                </motion.h2>
            </div>

            <div className="space-y-4">
                <MarqueeRow items={row1} />
                <MarqueeRow items={row2} reverse />
            </div>
        </section>
    );
}
