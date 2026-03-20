'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '@/types';
import { GraduationCap, Search, X, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredCertifications.map((cert, i) => (
                            <motion.div
                                key={cert.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-white dark:bg-gray-900 p-1 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:border-brand-primary/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-6 p-8">
                                    <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                                        <Image
                                            src={cert.image_url || '/images/certifications.png'}
                                            alt={cert.title_fr}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold group-hover:text-brand-primary transition-colors">
                                            {language === 'fr' ? cert.title_fr : cert.title_en}
                                        </h3>
                                        <div className="space-y-1">
                                            <p className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                                                <GraduationCap size={18} className="text-brand-primary" />
                                                {cert.issuer}
                                            </p>
                                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                                <Calendar size={16} />
                                                {cert.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute top-8 right-8 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Award size={24} />
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
