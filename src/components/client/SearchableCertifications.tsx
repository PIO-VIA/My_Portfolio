'use client';

import { useState, useMemo } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '@/types';
import { GraduationCap, Search, X, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function CertFlipCard({ cert, index, language }: { cert: Certification; index: number; language: string }) {
    const title = language === 'fr' ? cert.title_fr : cert.title_en;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, delay: index * 0.05 }}
            className="flip-card h-52"
        >
            <div className="flip-card-inner w-full h-full">
                {/* Front */}
                <div className="flip-card-front glass rounded-3xl border border-white/8 hover:border-brand-primary/30 transition-colors p-6 flex items-center gap-5">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/8">
                        <Image
                            src={cert.image_url || '/next.svg'}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-2 min-w-0">
                        <h3 className="text-lg font-bold leading-snug line-clamp-2">{title}</h3>
                        <p className="text-brand-primary font-medium text-sm truncate flex items-center gap-1.5">
                            <GraduationCap size={14} />
                            {cert.issuer}
                        </p>
                        <p className="text-white/30 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <Calendar size={12} />
                            {cert.date}
                        </p>
                    </div>
                    <Award size={16} className="flex-shrink-0 text-white/15 ml-auto self-start mt-1" />
                </div>

                {/* Back */}
                <div className="flip-card-back glass rounded-3xl border border-brand-primary/30 p-8 flex flex-col justify-center gap-4 bg-brand-primary/5">
                    <div className="space-y-1 text-center">
                        <Award size={36} className="text-brand-primary mx-auto mb-3" />
                        <h3 className="font-bold text-lg">{title}</h3>
                        <p className="text-brand-primary font-medium text-sm">{cert.issuer}</p>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">{cert.date}</p>
                    </div>
                </div>
            </div>
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
        <section className="py-24 pt-36 min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="mb-14 space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-brand-primary hover:gap-3 transition-all text-sm font-medium">
                        {t.ui.back_home}
                    </Link>
                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{t.nav.certifications}</h1>
                        <p className="text-white/50 max-w-2xl text-lg">{t.certifications_page.subtitle}</p>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_certifications}
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

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((cert, i) => (
                            <CertFlipCard key={cert.id} cert={cert} index={i} language={language} />
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-28 space-y-4">
                        <div className="text-7xl">🎓</div>
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
