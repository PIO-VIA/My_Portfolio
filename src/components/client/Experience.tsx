'use client';

import { useI18n } from '@/context/I18nContext';
import { Experience, Certification } from '@/types';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, ExternalLink, Calendar, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import SectionWrapper from './SectionWrapper';

function CertCard({ cert, language }: { cert: Certification; language: string }) {
    const title = language === 'fr' ? cert.title_fr : cert.title_en;
    return (
        <div className="group relative glass rounded-3xl border border-white/5 p-6 flex items-center gap-6 hover:border-brand-primary/30 transition-all duration-500 hover:translate-x-2 bg-white/2">
            <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-500">
                <Image
                    src={cert.image_url || '/next.svg'}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-grow space-y-2 min-w-0">
                <div className="flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                    <Award size={14} />
                    {cert.issuer}
                </div>
                <h4 className="font-bold text-lg leading-tight text-white group-hover:text-brand-primary transition-colors line-clamp-2">{title}</h4>
                <div className="flex items-center gap-2 text-white/30 text-xs font-bold">
                    <Calendar size={12} />
                    {cert.date}
                </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                 <ExternalLink size={18} className="text-white/20" />
            </div>
        </div>
    );
}

function ExperienceCard({ exp, index, language }: { exp: Experience; index: number; language: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const title = language === 'fr' ? exp.title_fr : exp.title_en;
    const description = language === 'fr' ? exp.description_fr : exp.description_en;
    const presentLabel = language === 'fr' ? 'Présent' : 'Present';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative pl-12 pb-16 last:pb-0"
        >
            {/* Timeline Line Segment */}
            <div className="absolute left-[7px] top-[24px] bottom-0 w-[2px] bg-white/5 last:hidden" />
            
            {/* Timeline Dot */}
            <div className="absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 border-brand-primary bg-[#050505] z-10 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                {isInView && (
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-brand-primary"
                    />
                )}
            </div>

            <div className="glass rounded-[2rem] border border-white/5 p-8 space-y-4 hover:border-brand-primary/20 transition-all duration-500 bg-white/2 hover:shadow-2xl group">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                        <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">
                             {exp.company}
                        </span>
                        <h3 className="text-2xl font-black text-white group-hover:text-brand-primary transition-colors">{title}</h3>
                    </div>
                    <div className="px-4 py-2 glass rounded-xl text-white/40 text-xs font-bold border border-white/5 flex items-center gap-2">
                        <Calendar size={14} />
                        {exp.start_date} — {exp.end_date || presentLabel}
                    </div>
                </div>
                <p className="text-white/40 text-base leading-relaxed font-medium">
                    {description}
                </p>
                
                {exp.tech_stack && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tech_stack.slice(0, 4).map(tech => (
                            <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-white/30 uppercase tracking-widest border border-white/5">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function ExperienceSection({
    experiences,
    certifications,
}: {
    experiences: Experience[];
    certifications: Certification[];
}) {
    const { t, language } = useI18n();

    return (
        <SectionWrapper id="journey" className="relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="mb-24 space-y-6 text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-secondary/20 bg-brand-secondary/5 text-brand-secondary text-xs font-black uppercase tracking-[0.2em]">
                         Career & Growth
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                        My Professional <br />
                        <span className="shimmer-text">Ecosystem</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* — Experiences — */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4 px-2">
                            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary border border-brand-primary/20">
                                <Briefcase size={22} />
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">{t.experiences.section_title}</h3>
                        </div>

                        <div className="relative">
                            {experiences.slice(0, 3).map((exp, i) => (
                                <ExperienceCard key={exp.id} exp={exp} index={i} language={language} />
                            ))}

                            <div className="pt-8 pl-12">
                                <Link
                                    href="/experiences"
                                    className="group inline-flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest text-xs hover:gap-5 transition-all duration-300"
                                >
                                    {t.ui.view_all_experiences}
                                    <ExternalLink size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* — Certifications — */}
                    <div className="space-y-12">
                         <div className="flex items-center gap-4 px-2">
                            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-secondary border border-brand-secondary/20">
                                <GraduationCap size={22} />
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">{t.nav.certifications}</h3>
                        </div>

                        <div className="grid gap-6">
                            {certifications.slice(0, 4).map((cert, i) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                >
                                    <CertCard cert={cert} language={language} />
                                </motion.div>
                            ))}

                            <div className="pt-8">
                                <Link
                                    href="/certifications"
                                    className="group inline-flex items-center gap-3 text-brand-secondary font-black uppercase tracking-widest text-xs hover:gap-5 transition-all duration-300"
                                >
                                    {t.ui.view_all_certifications}
                                    <ExternalLink size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
