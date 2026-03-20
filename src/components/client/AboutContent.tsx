'use client';

import { useI18n } from '@/context/I18nContext';
import { motion } from 'framer-motion';
import { Profile } from '@/types';
import SkillsSection from './Skills';
import ContactSection from './Contact';
import Image from 'next/image';

export default function AboutContent({ profile }: { profile: Profile }) {
    const { t, language } = useI18n();

    return (
        <div className="pt-32">
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Hero Section of About */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-square rounded-[40px] overflow-hidden border-2 border-white/20 shadow-2xl"
                            >
                                <Image
                                    src={profile.profile_image_url || '/next.svg'}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h1 className="text-5xl font-bold">{t.about.title}</h1>
                                <p className="text-xl text-gray-500 leading-relaxed">
                                    {language === 'fr' ? profile.bio_fr : profile.bio_en}
                                </p>
                            </motion.div>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-center">{t.about.skills_title}</h2>
                            <SkillsSection />
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-center">{t.about.contact_title}</h2>
                            <ContactSection profile={profile} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
