'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
    const { t, language } = useI18n();

    return (
        <SectionWrapper id="projects" className="bg-[#05a05] relative">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="mb-20 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-[0.2em]">
                        {t.nav.projects}
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                        Crafting Digital <br />
                        <span className="shimmer-text">Masterpieces</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl text-lg leading-relaxed mx-auto lg:mx-0 font-medium">
                        {t.projects.subtitle}
                    </p>
                </div>

                {/* Bento-styleish Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {projects.slice(0, 3).map((project, i) => (
                        <div key={project.id} className={i === 0 ? 'lg:col-span-2' : ''}>
                            <ProjectCard project={project} language={language} index={i} />
                        </div>
                    ))}
                </div>

                {/* View all CTA */}
                <div className="flex justify-center">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-4 px-12 py-5 glass rounded-[2rem] border border-white/5 font-black text-white hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        {t.ui.view_all_projects}
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-brand-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </SectionWrapper>
    );
}
