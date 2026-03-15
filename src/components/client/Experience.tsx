'use client';

import { useI18n } from '@/context/I18nContext';
import { Experience, Certification } from '@/types';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

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
                                className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-brand-primary transition-colors"
                            >
                                <div className="space-y-1">
                                    <h3 className="font-bold">
                                        {language === 'fr' ? cert.title_fr : cert.title_en}
                                    </h3>
                                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                                    <p className="text-xs text-gray-400 font-medium">{cert.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
