'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { Card } from '@/components/ui/Card';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
    const { t, language } = useI18n();

    return (
        <section id="projects" className="py-24 bg-white dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold">{t.nav.projects}</h2>
                        <p className="text-gray-500 max-w-xl">
                            Une sélection de mes travaux récents, allant du développement web aux architectures complexes.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="group overflow-hidden p-0 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl hover:border-brand-primary/50 transition-all duration-300">
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
                                <div className="p-8 space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold group-hover:text-brand-primary transition-colors">
                                            {language === 'fr' ? project.title_fr : project.title_en}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                            {language === 'fr' ? project.description_fr : project.description_en}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
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
                </div>
                <div className="mt-16 text-center">
                    <a
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        {t.ui.view_all_projects}
                        <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
}
