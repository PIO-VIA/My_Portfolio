'use client';

import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import { Profile } from '@/types';

export default function ContactSection({ profile }: { profile: Profile }) {
    const { t } = useI18n();

    return (
        <section id="contact" className="py-24 bg-gray-50 dark:bg-[#050505]">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold">{t.nav.contact}</h2>
                            <p className="text-gray-500">
                                Vous avez un projet en tête ? Contactez-moi pour en discuter.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {profile.social_links?.email && (
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 glass rounded-xl text-brand-primary">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="font-bold">{profile.social_links.email}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center space-x-4">
                                <div className="p-3 glass rounded-xl text-brand-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Location</p>
                                    <p className="font-bold">Paris, France</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 md:p-12 rounded-[32px] space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Name" placeholder="Your Name" required />
                            <Input label="Email" type="email" placeholder="your@email.com" required />
                        </div>
                        <Input label="Subject" placeholder="What's this about?" required />
                        <Textarea label="Message" placeholder="Tell me more..." required className="min-h-[150px]" />
                        <Button className="w-full flex items-center justify-center space-x-2 py-4">
                            <span>Send Message</span>
                            <Send size={18} />
                        </Button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
