'use client';

import { useState, useMemo } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { Github, ExternalLink, Search, X, Filter, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import SectionWrapper from './SectionWrapper';

export default function SearchableProjects({ projects }: { projects: Project[] }) {
    const { t, language } = useI18n();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // Extract unique techs
    const allTechs = useMemo(() => {
        const set = new Set<string>();
        projects.forEach(p => p.tech_stack?.forEach(t => set.add(t)));
        return Array.from(set).sort();
    }, [projects]);

    const filteredProjects = useMemo(() => projects.filter(project => {
        const title = language === 'fr' ? project.title_fr : project.title_en;
        const description = language === 'fr' ? project.description_fr : project.description_en;
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q || title.toLowerCase().includes(q) || description.toLowerCase().includes(q) || project.tech_stack?.some(t => t.toLowerCase().includes(q));
        const matchesFilter = !activeFilter || project.tech_stack?.includes(activeFilter);
        return matchesSearch && matchesFilter;
    }), [projects, searchQuery, activeFilter, language]);

    return (
        <SectionWrapper id="all-projects" className="pt-40! min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-20 space-y-12">
                    <div className="space-y-6">
                        <Link href="/" className="group inline-flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest text-[10px] hover:gap-5 transition-all duration-300">
                            <ArrowLeft size={14} />
                            {t.ui.back_home}
                        </Link>
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                                {t.nav.projects}
                            </h1>
                            <p className="text-white/40 max-w-2xl text-xl font-medium leading-relaxed">
                                {t.projects.all_subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                        {/* Glass search */}
                        <div className="relative w-full max-w-xl group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder={t.ui.search_projects}
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

                        {/* Tech filter chips */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mr-2 flex items-center gap-2">
                                <Filter size={14} />
                                Filter By
                            </div>
                            <button
                                onClick={() => setActiveFilter(null)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${!activeFilter
                                    ? 'bg-white text-black border-white'
                                    : 'glass border-white/5 text-white/40 hover:text-white hover:border-white/20 bg-white/2'
                                    }`}
                            >
                                All
                            </button>
                            {allTechs.map(tech => (
                                <button
                                    key={tech}
                                    onClick={() => setActiveFilter(activeFilter === tech ? null : tech)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${activeFilter === tech
                                        ? 'bg-brand-primary text-white border-brand-primary'
                                        : 'glass border-white/5 text-white/40 hover:text-white hover:border-white/20 bg-white/2'
                                        }`}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-40 bg-white/2 rounded-[3rem] border border-dashed border-white/10"
                    >
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Search size={40} className="text-white/20" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{t.ui.no_results}</h3>
                        <p className="text-white/40 text-lg mb-8">Try adjusting your search or filters</p>
                        <button onClick={() => { setSearchQuery(''); setActiveFilter(null); }}
                            className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-colors">
                            Reset all filters
                        </button>
                    </motion.div>
                )}
            </div>
        </SectionWrapper>
    );
}
