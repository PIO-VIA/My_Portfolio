'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { Card } from '@/components/ui/Card';
import { Github, ExternalLink, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchableProjects({ projects }: { projects: Project[] }) {
    const { t, language } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter(project => {
        const title = language === 'fr' ? project.title_fr : project.title_en;
        const description = language === 'fr' ? project.description_fr : project.description_en;
        const searchLower = searchQuery.toLowerCase();

        return (
            title.toLowerCase().includes(searchLower) ||
            description.toLowerCase().includes(searchLower) ||
            project.tech_stack?.some(tech => tech.toLowerCase().includes(searchLower))
        );
    });

    return (
        <section className="py-24 pt-32 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex flex-col space-y-8 mb-16">
                    <div className="space-y-4">
                        <Link href="/" className="text-brand-primary hover:underline flex items-center gap-2 mb-4">
                            ← {t.nav.home}
                        </Link>
                        <h1 className="text-5xl md:text-6xl font-bold">{t.nav.projects}</h1>
                        <p className="text-gray-500 max-w-2xl text-lg">
                            {language === 'fr'
                                ? "Explorez l'ensemble de mes réalisations, des applications web modernes aux solutions logicielles complexes."
                                : "Explore all my achievements, from modern web applications to complex software solutions."}
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_projects}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                <Card className="group h-full overflow-hidden p-0 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl hover:border-brand-primary/50 transition-all duration-300 flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={project.image_url || '/images/placeholder.png'}
                                            alt={project.title_fr}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6">
                                            {project.repo_url && (
                                                <a href={project.repo_url} target="_blank" className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-white transform hover:scale-110 transition-all">
                                                    <Github size={24} />
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a href={project.live_url} target="_blank" className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-white transform hover:scale-110 transition-all">
                                                    <ExternalLink size={24} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-6 flex-grow flex flex-col">
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold group-hover:text-brand-primary transition-colors line-clamp-1">
                                                {language === 'fr' ? project.title_fr : project.title_en}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                                {language === 'fr' ? project.description_fr : project.description_en}
                                            </p>
                                        </div>
                                        <div className="mt-auto pt-6 flex flex-wrap gap-2">
                                            {project.tech_stack?.map(tech => (
                                                <span key={tech} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-gray-100 dark:border-gray-700">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProjects.length === 0 && (
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
