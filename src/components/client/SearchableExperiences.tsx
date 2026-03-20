'use client';

import { useState, useMemo, useRef } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Experience } from '@/types';
import { Briefcase, Search, X, Calendar, GraduationCap, Star } from 'lucide-react';
import Link from 'next/link';

const TYPE_STYLES: Record<string, { label: string; color: string; bg: string; icon: typeof Briefcase }> = {
    job: { label: 'Job', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: Briefcase },
    education: { label: 'Education', color: 'text-green-400', bg: 'bg-green-400/10', icon: GraduationCap },
    event: { label: 'Event', color: 'text-amber-400', bg: 'bg-amber-400/10', icon: Star },
};

function TimelineCard({ exp, index, language }: { exp: Experience; index: number; language: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const typeStyle = TYPE_STYLES[exp.type] || TYPE_STYLES.job;
    const TypeIcon = typeStyle.icon;
    const title = language === 'fr' ? exp.title_fr : exp.title_en;
    const description = language === 'fr' ? exp.description_fr : exp.description_en;
    const presentLabel = language === 'fr' ? 'Présent' : 'Present';
    const isLeft = index % 2 === 0;

    return (
        <div ref={ref} className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-10`}>
            {/* Timeline dot — center on md+ */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, delay: index * 0.1 }}
                    className="relative w-5 h-5 rounded-full bg-brand-primary border-2 border-[#050505] z-10 flex-shrink-0"
                >
                    {isInView && (
                        <div className="absolute inset-0 rounded-full border-2 border-brand-primary animate-ping opacity-50" />
                    )}
                </motion.div>
                <div className="flex-1 w-px bg-white/8" />
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 18, delay: index * 0.1 }}
                className="flex-1 glass rounded-3xl border border-white/8 p-7 space-y-4 hover:border-brand-primary/30 transition-colors duration-300"
            >
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold leading-snug">{title}</h3>
                        <p className="text-brand-primary font-medium text-sm">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Type badge */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${typeStyle.bg} ${typeStyle.color} border-current/20`}>
                            <TypeIcon size={12} />
                            {typeStyle.label}
                        </span>
                        {/* Date */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-white/40 rounded-full text-xs font-bold border border-white/8">
                            <Calendar size={12} />
                            {exp.start_date} – {exp.end_date || presentLabel}
                        </span>
                    </div>
                </div>
                <p className="text-white/50 leading-relaxed text-sm">{description}</p>
            </motion.div>
        </div>
    );
}

export default function SearchableExperiences({ experiences }: { experiences: Experience[] }) {
    const { t, language } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');
    const lineRef = useRef<HTMLDivElement>(null);
    const isLineInView = useInView(lineRef, { once: true });

    const filtered = useMemo(() => experiences.filter(exp => {
        const title = language === 'fr' ? exp.title_fr : exp.title_en;
        const desc = language === 'fr' ? exp.description_fr : exp.description_en;
        const q = searchQuery.toLowerCase();
        return !q || title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || exp.company.toLowerCase().includes(q);
    }), [experiences, searchQuery, language]);

    return (
        <section className="py-24 pt-36 min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="mb-14 space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-brand-primary hover:gap-3 transition-all text-sm font-medium">
                        {t.ui.back_home}
                    </Link>
                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{t.nav.experiences}</h1>
                        <p className="text-white/50 max-w-2xl text-lg">{t.experiences.subtitle}</p>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_experiences}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 glass rounded-2xl border border-white/8 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-white placeholder-white/30 text-sm"
                            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}
                        />
                        <AnimatePresence>
                            {searchQuery && (
                                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                                    <X size={18} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Timeline */}
                <div ref={lineRef} className="relative">
                    {/* Center vertical line (desktop) */}
                    <div className="hidden md:block absolute left-[10px] top-0 bottom-0 w-px bg-white/5" />
                    <motion.div
                        className="hidden md:block absolute left-[10px] top-0 w-px bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent origin-top"
                        initial={{ height: 0 }}
                        animate={isLineInView ? { height: '100%' } : { height: 0 }}
                        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                    />

                    <AnimatePresence mode="popLayout">
                        {filtered.map((exp, i) => (
                            <TimelineCard key={exp.id} exp={exp} index={i} language={language} />
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-28 space-y-4">
                        <div className="text-7xl">🔍</div>
                        <p className="text-white/40 text-xl font-medium">{t.ui.no_results}</p>
                        <button onClick={() => setSearchQuery('')} className="text-brand-primary font-bold hover:underline text-sm">
                            Clear search
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
