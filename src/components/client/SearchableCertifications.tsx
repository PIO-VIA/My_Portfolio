'use client';

import { useState, useMemo, useRef } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Certification } from '@/types';
import { GraduationCap, Search, X, Calendar, Award, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

function CertCard({ cert, index, language }: { cert: Certification; index: number; language: string }) {
    const title = language === 'fr' ? cert.title_fr : cert.title_en;
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative glass rounded-[2.5rem] border border-white/5 p-8 flex flex-col sm:flex-row items-center gap-8 hover:border-brand-primary/20 transition-all duration-500 bg-white/2 hover:shadow-2xl"
        >
            <div className="relative w-32 h-32 flex-shrink-0 rounded-3xl overflow-hidden bg-white/5 border border-white/5 group-hover:scale-105 transition-transform duration-700">
                <Image
                    src={cert.image_url || '/next.svg'}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-grow space-y-4 text-center sm:text-left">
                <div className="space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <Award size={14} />
                        {cert.issuer}
                    </div>
                    <h3 className="text-2xl font-black text-white group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">{title}</h3>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-white/30 text-xs font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/5">
                        <Calendar size={14} />
                        {cert.date}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/5">
                        <GraduationCap size={14} />
                        Certification
                    </div>
                </div>
            </div>
            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/20 hover:text-white transition-colors">
                    <ExternalLink size={20} />
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity rounded-[2.5rem] -z-10" />
        </motion.div>
    );
}

export default function SearchableCertifications({ certifications }: { certifications: Certification[] }) {
    const { t, language } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => certifications.filter(cert => {
        const title = language === 'fr' ? cert.title_fr : cert.title_en;
        const q = searchQuery.toLowerCase();
        return !q || title.toLowerCase().includes(q) || cert.issuer.toLowerCase().includes(q);
    }), [certifications, searchQuery, language]);

    return (
        <SectionWrapper id="all-certifications" className="pt-40! min-h-screen">
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
                                {t.nav.certifications}
                            </h1>
                            <p className="text-white/40 max-w-2xl text-xl font-medium leading-relaxed">
                                {t.certifications_page.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative w-full max-w-xl group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_certifications}
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

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((cert, i) => (
                            <CertCard key={cert.id} cert={cert} index={i} language={language} />
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
                            <Award size={40} className="text-white/20" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{t.ui.no_results}</h3>
                        <p className="text-white/40 text-lg mb-8">No certifications match your criteria</p>
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
