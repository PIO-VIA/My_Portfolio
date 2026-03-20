'use client';

import { useState, useMemo, useRef, MouseEvent } from 'react';
import { useI18n } from '@/context/I18nContext';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '@/types';
import { Github, ExternalLink, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* ── Tilt card (mirrors Projects.tsx) ── */
function TiltCard({ project, language }: { project: Project; language: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const title = language === 'fr' ? project.title_fr : project.title_en;
    const description = language === 'fr' ? project.description_fr : project.description_en;

    return (
        <motion.div
            ref={ref}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="group relative h-full rounded-3xl overflow-hidden cursor-default"
        >
            <div className="absolute inset-0 glass rounded-3xl border border-white/8 group-hover:border-brand-primary/30 transition-colors duration-300" />
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={project.image_url || '/next.svg'}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-5">
                    {project.repo_url && (
                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                            className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-white hover:scale-110 transition-all"
                            onClick={e => e.stopPropagation()}>
                            <Github size={22} />
                        </a>
                    )}
                    {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                            className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-white hover:scale-110 transition-all"
                            onClick={e => e.stopPropagation()}>
                            <ExternalLink size={22} />
                        </a>
                    )}
                </div>
            </div>
            <div className="relative z-10 p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors duration-200 line-clamp-1">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                    {project.tech_stack?.map(tech => (
                        <span key={tech}
                            className="tech-pill px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60 border border-white/10 hover:text-brand-primary transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

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
        <section className="py-24 pt-36 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-14 space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-brand-primary hover:gap-3 transition-all duration-200 text-sm font-medium">
                        {t.ui.back_home}
                    </Link>
                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                            {t.nav.projects}
                        </h1>
                        <p className="text-white/50 max-w-2xl text-lg">{t.projects.all_subtitle}</p>
                    </div>

                    {/* Glass search */}
                    <div className="relative max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <input
                            type="text"
                            placeholder={t.ui.search_projects}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 glass rounded-2xl border border-white/8 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-white placeholder-white/30 text-sm"
                            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}
                        />
                        <AnimatePresence>
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Tech filter chips */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveFilter(null)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${!activeFilter
                                ? 'bg-brand-primary text-white border-brand-primary shadow-[0_0_12px_rgba(14,165,233,0.4)] scale-105'
                                : 'glass border-white/8 text-white/50 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {t.ui.filter_all}
                        </button>
                        {allTechs.map(tech => (
                            <motion.button
                                key={tech}
                                onClick={() => setActiveFilter(activeFilter === tech ? null : tech)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${activeFilter === tech
                                    ? 'bg-brand-primary text-white border-brand-primary shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                                    : 'glass border-white/8 text-white/50 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {tech}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.05 }}
                                className="h-full"
                            >
                                <TiltCard project={project} language={language} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-28 space-y-4"
                    >
                        <div className="text-7xl">🔍</div>
                        <p className="text-white/40 text-xl font-medium">{t.ui.no_results}</p>
                        <button onClick={() => { setSearchQuery(''); setActiveFilter(null); }}
                            className="mt-2 text-brand-primary font-bold hover:underline text-sm">
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
