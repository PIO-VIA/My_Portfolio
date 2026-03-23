'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import {
    Globe, Code2, Layers, Database, Cloud, Server, Box, GitBranch,
    Container, Cpu, Zap, Boxes, Flame, BarChart, LayoutGrid
} from 'lucide-react';
import SectionWrapper from './SectionWrapper';

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
    const doubled = [...items, ...items, ...items];
    return (
        <div className="marquee-wrapper overflow-hidden py-4">
            <div className={`${reverse ? 'marquee-track-reverse' : 'marquee-track'} group`}>
                {doubled.map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                        <div
                            key={`${tech.name}-${i}`}
                            className="tech-pill flex-shrink-0 mx-4 flex items-center gap-3 px-8 py-4 glass rounded-[2rem] border border-white/5 text-white/40 text-sm font-black uppercase tracking-[0.2em] cursor-default transition-all duration-300 hover:text-brand-primary hover:border-brand-primary/30 hover:scale-105 select-none bg-white/2"
                        >
                            <Icon size={18} className="flex-shrink-0" />
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
        <SectionWrapper className="relative overflow-hidden pt-0! pb-32!">
            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, hsl(240, 10%, 3.9%), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, hsl(240, 10%, 3.9%), transparent)' }} />

            <div className="container mx-auto px-6 mb-20 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                    Technologies
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                    Powering <br />
                    <span className="shimmer-text">Modern Apps</span>
                </h2>
            </div>

            <div className="space-y-6">
                <MarqueeRow items={row1} />
                <MarqueeRow items={row2} reverse />
            </div>

            {/* Background particles or lines could go here */}
        </SectionWrapper>
    );
}
