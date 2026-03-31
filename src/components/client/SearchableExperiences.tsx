'use client';

import { useState, useMemo, useRef } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Experience } from '@/types';
import { Briefcase, Search, X, Calendar, GraduationCap, Star, ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import SectionWrapper from './SectionWrapper';

// Types definitions moved inside component for i18n

const TECH_ICONS: Record<string, string> = {
    'react': 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    'nextjs': 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    'node': 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
    'typescript': 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
    'firebase': 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg',
    'docker': 'https://cdn.worldvectorlogo.com/logos/docker-4.svg',
    'aws': 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
    'python': 'https://cdn.worldvectorlogo.com/logos/python-5.svg',
    'javascript': 'https://cdn.worldvectorlogo.com/logos/logo-javascript.svg',
    'tailwind': 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg',
};

function ExperienceCard({ exp, index, language, t }: { exp: Experience; index: number; language: string; t: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

    const typeStyles: Record<string, { label: string; color: string; bg: string; icon: any }> = {
        job: { label: t.ui.type_professional, color: 'text-brand-primary', bg: 'bg-brand-primary/10', icon: Briefcase },
        education: { label: t.ui.type_education, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10', icon: GraduationCap },
        event: { label: t.ui.type_milestone, color: 'text-brand-accent', bg: 'bg-brand-accent/10', icon: Trophy },
    };

    const typeStyle = typeStyles[exp.type] || typeStyles.job;
    const Icon = typeStyle.icon;

    const title = language === 'fr' ? exp.title_fr : exp.title_en;
    const description = language === 'fr' ? exp.description_fr : exp.description_en;
    const presentLabel = t.ui.present;

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            className="relative pl-12 pb-24 last:pb-0"
        >
            {/* ... rest of the card ... */}
            <div className="absolute left-[7px] top-[24px] bottom-0 w-[2px] bg-gradient-to-b from-brand-primary/20 via-brand-primary/5 to-transparent last:hidden" />

            {/* Timeline Dot */}
            <div className={`absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 ${typeStyle.color} bg-[#050505] z-10 shadow-[0_0_15px_rgba(14,165,233,0.3)]`}>
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 rounded-full ${typeStyle.bg}`}
                />
            </div>

            <div className="glass rounded-[3rem] border border-white/5 p-8 sm:p-12 space-y-8 hover:border-brand-primary/20 transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.03] hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10 group-hover:bg-brand-primary/10 transition-colors" />

                <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${typeStyle.bg} ${typeStyle.color} shadow-inner`}>
                                <Icon size={20} />
                            </div>
                            <span className={`${typeStyle.color} text-xs font-black uppercase tracking-[0.3em]`}>
                                {exp.company}
                            </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-white group-hover:text-brand-primary transition-colors leading-tight tracking-tight">{title}</h3>
                    </div>
                    <div className="px-6 py-3 glass rounded-2xl text-white/60 text-[10px] font-black border border-white/10 flex items-center gap-4 uppercase tracking-[0.2em] shadow-xl">
                        <Calendar size={14} className="text-brand-primary" />
                        {exp.start_date} — {exp.end_date || presentLabel}
                    </div>
                </div>

                <p className="text-white/50 text-xl leading-relaxed font-medium max-w-4xl">
                    {description}
                </p>

                {exp.tech_stack && (
                    <div className="flex flex-wrap gap-4 pt-6">
                        {exp.tech_stack.map(tech => {
                            const iconUrl = TECH_ICONS[tech.toLowerCase().replace(/[^a-z]/g, '')];
                            return (
                                <motion.div
                                    key={tech}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl text-[10px] font-black text-white/50 uppercase tracking-[0.2em] border border-white/5 group-hover:border-white/10 transition-all shadow-lg"
                                >
                                    {iconUrl ? (
                                        <div className="w-5 h-5 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                            <Image src={iconUrl} alt={tech} fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-md bg-white/10" />
                                    )}
                                    {tech}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function SearchableExperiences({ experiences }: { experiences: Experience[] }) {
    const { t, language } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => experiences.filter(exp => {
        const title = language === 'fr' ? exp.title_fr : exp.title_en;
        const desc = language === 'fr' ? exp.description_fr : exp.description_en;
        const q = searchQuery.toLowerCase();
        return !q || title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || exp.company.toLowerCase().includes(q);
    }), [experiences, searchQuery, language]);

    return (
        <SectionWrapper id="all-experiences" className="pt-40! min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="mb-24 space-y-12">
                    <div className="space-y-6">
                        <Link href="/" className="group inline-flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest text-[10px] hover:gap-5 transition-all duration-300">
                            <ArrowLeft size={14} />
                            {t.ui.back_home}
                        </Link>
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                                {t.nav.experiences}
                            </h1>
                            <p className="text-white/40 max-w-2xl text-xl font-medium leading-relaxed">
                                {t.experiences.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative w-full max-w-xl group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_experiences}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-16 py-5 glass rounded-[2rem] border border-white/5 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all text-white placeholder-white/10 font-medium text-lg bg-white/2"
                        />
                        <AnimatePresence>
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((exp, i) => (
                            <ExperienceCard key={exp.id} exp={exp} index={i} language={language} t={t} />
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-40 bg-white/2 rounded-[3rem] border border-dashed border-white/10"
                    >
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Briefcase size={40} className="text-white/20" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{t.ui.no_results}</h3>
                        <p className="text-white/40 text-lg mb-8">{t.ui.no_results_subtitle_experiences}</p>
                        <button onClick={() => setSearchQuery('')}
                            className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-colors">
                            {t.ui.clear_search}
                        </button>
                    </motion.div>
                )}
            </div>
        </SectionWrapper>
    );
}
