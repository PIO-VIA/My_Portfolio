'use client';

import { useI18n } from '@/context/I18nContext';
import { Experience, Certification } from '@/types';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function ExperienceSection({
    experiences,
    certifications
}: {
    experiences: Experience[],
    certifications: Certification[]
}) {
    const { language } = useI18n();

    return (
        <section id="about" className="py-24">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
                {/* Experiences */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Briefcase className="text-brand-primary" />
                            Expériences
                        </h2>
                    </div>
                    <div className="space-y-8 border-l-2 border-gray-100 dark:border-gray-900 ml-4 pl-8">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative"
                            >
                                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-brand-primary border-4 border-white dark:border-black" />
                                <div className="space-y-1">
                                    <span className="text-sm font-bold text-brand-primary uppercase tracking-wider">
                                        {exp.start_date} - {exp.end_date || 'Present'}
                                    </span>
                                    <h3 className="text-xl font-bold">
                                        {language === 'fr' ? exp.title_fr : exp.title_en}
                                    </h3>
                                    <p className="font-medium text-gray-600 dark:text-gray-400">{exp.company}</p>
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                        {language === 'fr' ? exp.description_fr : exp.description_en}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {experiences.length >= 3 && (
                        <div className="pt-4 ml-4 pl-8">
                            <a href="/experiences" className="text-brand-primary font-bold hover:underline flex items-center gap-2">
                                {t.ui.view_all_experiences}
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    )}
                </div>

                {/* Certifications */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <GraduationCap className="text-brand-primary" />
                            Certifications
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {certifications.map((cert, i) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white dark:bg-gray-900 p-1 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:border-brand-primary/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-6 p-6">
                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                                        <Image
                                            src={cert.image_url || '/images/placeholder.png'}
                                            alt={cert.title_fr}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-xl group-hover:text-brand-primary transition-colors">
                                            {language === 'fr' ? cert.title_fr : cert.title_en}
                                        </h3>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{cert.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {certifications.length >= 3 && (
                            <div className="pt-4">
                                <a href="/certifications" className="text-brand-primary font-bold hover:underline flex items-center gap-2">
                                    {t.ui.view_all_certifications}
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
