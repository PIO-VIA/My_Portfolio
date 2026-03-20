'use client';

import { useI18n } from '@/context/I18nContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '@/types';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, MouseEvent } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
};

function TiltCard({ project, isFeatured, language }: { project: Project; isFeatured: boolean; language: string }) {
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
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    const title = language === 'fr' ? project.title_fr : project.title_en;
    const description = language === 'fr' ? project.description_fr : project.description_en;

    return (
        <motion.div
            ref={ref}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-full rounded-3xl overflow-hidden cursor-default"
        >
            {/* Card background with glass */}
            <div className="absolute inset-0 glass rounded-3xl border border-white/8 group-hover:border-brand-primary/30 transition-colors duration-300" />

            {/* Image */}
            <div className={`relative overflow-hidden ${isFeatured ? 'h-72 md:h-80' : 'h-56'}`}>
                <Image
                    src={project.image_url || '/next.svg'}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay always visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-5">
                    {project.repo_url && (
                        <motion.a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ y: 16, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition-all hover:scale-110"
                            aria-label="GitHub repository"
                            onClick={e => e.stopPropagation()}
                        >
                            <Github size={22} />
                        </motion.a>
                    )}
                    {project.live_url && (
                        <motion.a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ y: 16, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05 }}
                            className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition-all hover:scale-110"
                            aria-label="Live project"
                            onClick={e => e.stopPropagation()}
                        >
                            <ExternalLink size={22} />
                        </motion.a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className={`font-bold group-hover:text-brand-primary transition-colors duration-200 ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
                        {title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                    {project.tech_stack?.map(tech => (
                        <span
                            key={tech}
                            className="tech-pill px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60 border border-white/10 transition-all duration-200 hover:text-brand-primary cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
    const { t, language } = useI18n();

    return (
        <section id="projects" className="py-28 relative">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-16 space-y-4"
                >
                    <motion.p variants={itemVariants} className="text-brand-primary font-bold tracking-widest uppercase text-sm">
                        — {t.nav.projects}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight">
                        Featured <span className="shimmer-text">Work</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-white/50 max-w-xl text-lg">
                        {t.projects.subtitle}
                    </motion.p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className={`${i === 0 ? 'lg:col-span-2' : ''} h-full`}
                        >
                            <TiltCard project={project} isFeatured={i === 0} language={language} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View all CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                    className="mt-14 text-center"
                >
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-3 px-8 py-4 glass rounded-full border border-white/10 font-bold text-white hover:border-brand-primary/50 hover:text-brand-primary transition-all duration-300"
                    >
                        {t.ui.view_all_projects}
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ArrowRight size={18} />
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
