'use client';

import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import { useI18n } from '@/context/I18nContext';

const TECH_LOGOS: Record<string, string> = {
    'Next.js': 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    'TypeScript': 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
    'React': 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    'Node.js': 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
    'Firebase': 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg',
    'PostgreSQL': 'https://cdn.worldvectorlogo.com/logos/postgresql.svg',
    'Prisma': 'https://cdn.worldvectorlogo.com/logos/prisma-2.svg',
    'GraphQL': 'https://cdn.worldvectorlogo.com/logos/graphql-1.svg',
    'Docker': 'https://cdn.worldvectorlogo.com/logos/docker-4.svg',
    'AWS': 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
    'Tailwind CSS': 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg',
    'Framer Motion': 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg',
    'Three.js': 'https://cdn.worldvectorlogo.com/logos/three-js-1.svg',
    'Python': 'https://cdn.worldvectorlogo.com/logos/python-5.svg',
    'Redis': 'https://cdn.worldvectorlogo.com/logos/redis-1.svg',
    'Kubernetes': 'https://cdn.worldvectorlogo.com/logos/kubernetes.svg',
    'Git': 'https://cdn.worldvectorlogo.com/logos/git-icon.svg',
    'Cloudinary': 'https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg',
    'Supabase': 'https://cdn.worldvectorlogo.com/logos/supabase.svg',
    'MongoDB': 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg',
};

const row1 = ['Next.js', 'TypeScript', 'React', 'Node.js', 'Firebase', 'PostgreSQL', 'Prisma', 'GraphQL', 'Docker', 'AWS'];
const row2 = ['Tailwind CSS', 'Framer Motion', 'Three.js', 'Python', 'Redis', 'Kubernetes', 'Git', 'Cloudinary', 'Supabase', 'MongoDB'];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
    const doubled = [...items, ...items, ...items, ...items];
    return (
        <div className="marquee-wrapper overflow-hidden py-6">
            <div className={`flex items-center gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} hover:[animation-play-state:paused] pointer-events-auto`}>
                {doubled.map((tech, i) => {
                    const logoUrl = TECH_LOGOS[tech];
                    return (
                        <div
                            key={`${tech}-${i}`}
                            className="flex-shrink-0 flex items-center gap-4 px-8 py-5 glass rounded-[2.5rem] border border-white/5 text-white/50 text-xs font-black uppercase tracking-[0.2em] cursor-default transition-all duration-500 hover:text-brand-primary hover:border-brand-primary/30 hover:scale-105 hover:bg-white/5 select-none shadow-xl"
                        >
                            <div className="w-6 h-6 relative grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100">
                                {logoUrl ? (
                                    <Image src={logoUrl} alt={tech} fill className="object-contain" />
                                ) : (
                                    <div className="w-full h-full bg-white/10 rounded" />
                                )}
                            </div>
                            <span>{tech}</span>
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
        <SectionWrapper className="relative overflow-hidden pt-0! pb-40!">
            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-60 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-60 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />

            <div className="container mx-auto px-6 mb-24 text-center">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/5 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    {t.marquee.badge}
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                    {t.marquee.title} <br />
                    <span className="shimmer-text">{t.marquee.title_shimmer}</span>
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                <MarqueeRow items={row1} />
                <MarqueeRow items={row2} reverse />
            </div>

            {/* Subtle light leak */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-64 bg-brand-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none opacity-50" />
        </SectionWrapper>
    );
}
