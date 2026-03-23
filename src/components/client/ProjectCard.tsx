'use client';

import { Project } from '@/types';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
    language: string;
    index: number;
}

export default function ProjectCard({ project, language, index }: ProjectCardProps) {
    const title = language === 'fr' ? project.title_fr : project.title_en;
    const description = language === 'fr' ? project.description_fr : project.description_en;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative h-full flex flex-col rounded-[2rem] overflow-hidden bg-[#0d0d0d] border border-white/5 hover:border-brand-primary/30 transition-all duration-500 hover:translate-y-[-8px] shadow-2xl"
        >
            {/* Image Container */}
            <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                    src={project.image_url || '/next.svg'}
                    alt={title || 'Project Image'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent opacity-80" />

                {/* Tags on Image */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {project.tech_stack?.slice(0, 2).map((tech) => (
                        <span key={tech} className="px-3 py-1.5 glass rounded-full text-[10px] font-bold uppercase tracking-wider text-white/80 border border-white/10">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Link
                        href={`/projects/${project.id}`}
                        className="p-4 bg-brand-primary text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <ArrowUpRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow space-y-4">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex gap-4">
                        {project.repo_url && (
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-brand-primary transition-colors">
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                    <Link href={`/projects/${project.id}`} className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 hover:text-brand-primary group-hover:text-brand-primary/60 transition-colors">
                        Explore Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
