'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '@/types';
import { GraduationCap, Search, X, Calendar, Award } from 'lucide-react';
import Link from 'next/link';

export default function SearchableCertifications({ certifications }: { certifications: Certification[] }) {
    const { t, language } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCertifications = certifications.filter(cert => {
        const title = language === 'fr' ? cert.title_fr : cert.title_en;
        const searchLower = searchQuery.toLowerCase();

        return (
            title.toLowerCase().includes(searchLower) ||
            cert.issuer.toLowerCase().includes(searchLower)
        );
    });

    return (
        <section className="py-24 pt-32 min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col space-y-8 mb-16">
                    <div className="space-y-4">
                        <Link href="/" className="text-brand-primary hover:underline flex items-center gap-2 mb-4">
                            ← {t.nav.home}
                        </Link>
                        <h1 className="text-5xl md:text-6xl font-bold">{t.nav.certifications}</h1>
                        <p className="text-gray-500 max-w-2xl text-lg">
                            {language === 'fr'
                                ? "Mes certifications et diplômes obtenus au cours de ma formation continue."
                                : "My certifications and degrees obtained throughout my continuous training."}
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_certifications}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredCertifications.map((cert, i) => (
                            <motion.div
                                key={cert.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="glass p-8 rounded-3xl flex items-start gap-6 group hover:border-brand-primary transition-all">
                                    <div className="p-4 bg-brand-primary/10 text-brand-primary rounded-2xl group-hover:scale-110 transition-transform">
                                        <Award size={32} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold">
                                            {language === 'fr' ? cert.title_fr : cert.title_en}
                                        </h3>
                                        <div className="space-y-1">
                                            <p className="text-gray-500 font-medium flex items-center gap-2">
                                                <GraduationCap size={16} />
                                                {cert.issuer}
                                            </p>
                                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                                <Calendar size={14} />
                                                {cert.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCertifications.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <p className="text-gray-500 text-xl">{t.ui.no_results}</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
