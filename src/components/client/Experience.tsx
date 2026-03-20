'use client';

import { useI18n } from '@/context/I18nContext';
import { Experience, Certification } from '@/types';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, ExternalLink, Calendar, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
};

function CertFlipCard({ cert, language }: { cert: Certification; language: string }) {
    const title = language === 'fr' ? cert.title_fr : cert.title_en;
    return (
        <div className="flip-card h-40 w-full">
            <div className="flip-card-inner w-full h-full">
                {/* Front */}
                <div className="flip-card-front glass rounded-2xl border border-white/8 p-5 flex items-center gap-5 hover:border-brand-primary/30 transition-colors">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white/5">
                        <Image
                            src={cert.image_url || '/next.svg'}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-1 min-w-0">
                        <h4 className="font-bold text-base leading-tight line-clamp-2">{title}</h4>
                        <p className="text-sm text-brand-primary font-medium truncate">{cert.issuer}</p>
                    </div>
                    <Star size={16} className="flex-shrink-0 text-white/20 ml-auto" />
                </div>
                {/* Back */}
                <div className="flip-card-back glass rounded-2xl border border-brand-primary/30 p-5 flex flex-col justify-center gap-3 bg-brand-primary/5">
                    <div className="flex items-center gap-2 text-brand-primary">
                        <GraduationCap size={18} />
                        <span className="font-bold text-sm">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                        <Calendar size={14} />
                        <span className="font-bold uppercase tracking-widest text-xs">{cert.date}</span>
                    </div>
                    <p className="text-white/40 text-xs line-clamp-2 leading-relaxed">{title}</p>
                </div>
            </div>
        </div>
    );
}

function TimelineDot({ isInView }: { isInView: boolean }) {
    return (
        <div className="absolute -left-[25px] top-5 flex items-center justify-center">
            <div className="relative w-4 h-4 rounded-full bg-brand-primary border-2 border-[#050505] z-10">
                {isInView && (
                    <div className="absolute inset-0 rounded-full border-2 border-brand-primary animate-ping opacity-60" />
                )}
            </div>
        </div>
    );
}

function ExperienceCard({ exp, index, language }: { exp: Experience; index: number; language: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    const title = language === 'fr' ? exp.title_fr : exp.title_en;
    const description = language === 'fr' ? exp.description_fr : exp.description_en;
    const presentLabel = language === 'fr' ? 'Présent' : 'Present';

    return (
        <motion.div
            ref={ref}
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring' as const, stiffness: 100, damping: 18, delay: index * 0.1 }}
            className="relative pb-10"
        >
            <TimelineDot isInView={isInView} />
            <div className="glass rounded-2xl border border-white/8 p-6 space-y-3 hover:border-brand-primary/30 transition-colors duration-300 ml-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-bold leading-tight">{title}</h3>
                        <p className="text-brand-primary font-medium text-sm mt-1">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold flex-shrink-0">
                        <Calendar size={12} />
                        {exp.start_date} – {exp.end_date || presentLabel}
                    </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
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
    const lineRef = useRef<SVGLineElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isLineInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="py-28 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-16 space-y-4"
                >
                    <motion.p variants={itemVariants} className="text-brand-primary font-bold tracking-widest uppercase text-sm">
                        — {t.nav.experiences} & {t.nav.certifications}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight">
                        My <span className="shimmer-text">Journey</span>
                    </motion.h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* — Experiences Timeline Left — */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary">
                                <Briefcase size={22} />
                            </div>
                            <h3 className="text-2xl font-bold">{t.experiences.section_title}</h3>
                        </div>

                        {/* SVG animated line */}
                        <div ref={sectionRef} className="relative ml-5 border-l border-white/8">
                            {/* Animated draw-in overlay */}
                            <motion.div
                                className="absolute top-0 left-[-1px] w-px bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent origin-top"
                                initial={{ height: 0 }}
                                animate={isLineInView ? { height: '100%' } : { height: 0 }}
                                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                            />

                            {experiences.map((exp, i) => (
                                <ExperienceCard key={exp.id} exp={exp} index={i} language={language} />
                            ))}

                            {experiences.length >= 3 && (
                                <div className="pb-2 ml-2">
                                    <Link
                                        href="/experiences"
                                        className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all duration-200 text-sm"
                                    >
                                        {t.ui.view_all_experiences}
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* — Certifications Right — */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2.5 bg-brand-secondary/10 rounded-xl text-brand-secondary">
                                <GraduationCap size={22} />
                            </div>
                            <h3 className="text-2xl font-bold">{t.nav.certifications}</h3>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            className="space-y-5"
                        >
                            {certifications.map((cert, i) => (
                                <motion.div key={cert.id} variants={itemVariants}>
                                    <CertFlipCard cert={cert} language={language} />
                                </motion.div>
                            ))}

                            {certifications.length >= 3 && (
                                <motion.div variants={itemVariants} className="pt-2">
                                    <Link
                                        href="/certifications"
                                        className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all duration-200 text-sm"
                                    >
                                        {t.ui.view_all_certifications}
                                        <ExternalLink size={14} />
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
