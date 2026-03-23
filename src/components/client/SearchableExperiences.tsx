'use client';

import { useState, useMemo, useRef } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Experience } from '@/types';
import { Briefcase, Search, X, Calendar, GraduationCap, Star, ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import SectionWrapper from './SectionWrapper';

const TYPE_STYLES: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    job: { label: 'Professional', color: 'text-brand-primary', bg: 'bg-brand-primary/10', icon: Briefcase },
    education: { label: 'Education', color: 'text-brand-secondary', bg: 'bg-brand-secondary/10', icon: GraduationCap },
    event: { label: 'Milestone', color: 'text-brand-accent', bg: 'bg-brand-accent/10', icon: Trophy },
};

function ExperienceCard({ exp, index, language }: { exp: Experience; index: number; language: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const typeStyle = TYPE_STYLES[exp.type] || TYPE_STYLES.job;
    const Icon = typeStyle.icon;

    const title = language === 'fr' ? exp.title_fr : exp.title_en;
    const description = language === 'fr' ? exp.description_fr : exp.description_en;
    const presentLabel = language === 'fr' ? 'Présent' : 'Present';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative pl-12 pb-20 last:pb-0"
        >
            {/* Timeline Line Segment */}
            <div className="absolute left-[7px] top-[24px] bottom-0 w-[2px] bg-white/5 last:hidden" />

            {/* Timeline Dot */}
            <div className={`absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 ${typeStyle.color} bg-[#050505] z-10`}>
                {isInView && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`absolute inset-0 rounded-full ${typeStyle.bg}`}
                    />
                )}
            </div>

            <div className="glass rounded-[2.5rem] border border-white/5 p-8 sm:p-10 space-y-6 hover:border-brand-primary/20 transition-all duration-500 bg-white/2 hover:shadow-2xl group">
                <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${typeStyle.bg} ${typeStyle.color}`}>
                                <Icon size={16} />
                            </div>
                            <span className={`${typeStyle.color} text-[10px] font-black uppercase tracking-[0.2em]`}>
                                {exp.company}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors leading-tight">{title}</h3>
                    </div>
                    <div className="px-5 py-2.5 glass rounded-2xl text-white/40 text-xs font-black border border-white/5 flex items-center gap-3 uppercase tracking-widest">
                        <Calendar size={14} />
                        {exp.start_date} — {exp.end_date || presentLabel}
                    </div>
                </div>

                <p className="text-white/40 text-lg leading-relaxed font-medium">
                    {description}
                </p>

                {exp.tech_stack && (
                    <div className="flex flex-wrap gap-3 pt-2">
                        {exp.tech_stack.map(tech => (
                            <span key={tech} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border border-white/5 group-hover:border-white/10 transition-colors">
                                {tech}
                            </span>
                        ))}
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
                            <ExperienceCard key={exp.id} exp={exp} index={i} language={language} />
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
                        <p className="text-white/40 text-lg mb-8">No experiences match your criteria</p>
                        <button onClick={() => setSearchQuery('')}
                            className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-colors">
                            Clear search
                        </button>
                    </motion.div>
                )}
            </div>
        </SectionWrapper>
    );
}
