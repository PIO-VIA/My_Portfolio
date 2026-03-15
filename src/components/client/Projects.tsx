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
                            <Card className="group overflow-hidden p-0 border-none bg-gray-50 dark:bg-gray-900 shadow-none">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={project.image_url || '/next.svg'}
                                        alt={project.title_fr}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                        {project.repo_url && (
                                            <a href={project.repo_url} target="_blank" className="p-3 bg-white/10 glass rounded-full hover:bg-white/20 text-white">
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" className="p-3 bg-white/10 glass rounded-full hover:bg-white/20 text-white">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">
                                            {language === 'fr' ? project.title_fr : project.title_en}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2">
                                            {language === 'fr' ? project.description_fr : project.description_en}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack?.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-white dark:bg-black rounded-full text-xs font-medium border border-gray-100 dark:border-gray-800">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
