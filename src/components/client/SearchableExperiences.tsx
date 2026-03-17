'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '@/types';
import { Briefcase, Search, X, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SearchableExperiences({ experiences }: { experiences: Experience[] }) {
    const { t, language } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredExperiences = experiences.filter(exp => {
        const title = language === 'fr' ? exp.title_fr : exp.title_en;
        const description = language === 'fr' ? exp.description_fr : exp.description_en;
        const searchLower = searchQuery.toLowerCase();

        return (
            title.toLowerCase().includes(searchLower) ||
            description.toLowerCase().includes(searchLower) ||
            exp.company.toLowerCase().includes(searchLower)
        );
    });

    return (
        <section className="py-24 pt-32 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="flex flex-col space-y-8 mb-16">
                    <div className="space-y-4">
                        <Link href="/" className="text-brand-primary hover:underline flex items-center gap-2 mb-4">
                            ← {t.nav.home}
                        </Link>
                        <h1 className="text-5xl md:text-6xl font-bold">{t.nav.experiences}</h1>
                        <p className="text-gray-500 max-w-2xl text-lg">
                            {language === 'fr'
                                ? "Mon parcours professionnel, mes rôles et les entreprises avec lesquelles j'ai collaboré."
                                : "My professional journey, roles, and companies I have collaborated with."}
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_experiences}
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

                <div className="space-y-8 border-l-2 border-gray-100 dark:border-gray-900 ml-4 pl-8">
                    <AnimatePresence mode="popLayout">
                        {filteredExperiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative pb-12"
                            >
                                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-brand-primary border-4 border-white dark:border-black" />
                                <div className="glass p-8 rounded-3xl space-y-4 hover:border-brand-primary/50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-bold">
                                                {language === 'fr' ? exp.title_fr : exp.title_en}
                                            </h3>
                                            <div className="flex items-center gap-4 text-gray-500 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Briefcase size={16} />
                                                    {exp.company}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl text-sm font-bold flex items-center gap-2 w-fit">
                                            <Calendar size={16} />
                                            {exp.start_date} - {exp.end_date || (language === 'fr' ? 'Présent' : 'Present')}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 leading-relaxed text-lg">
                                        {language === 'fr' ? exp.description_fr : exp.description_en}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredExperiences.length === 0 && (
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
