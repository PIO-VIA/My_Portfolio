'use client';

import { motion } from 'framer-motion';
import {
    Code2,
    Database,
    Globe,
    Layers,
    Cpu,
    Cloud
} from 'lucide-react';

const skills = [
    { name: 'Next.js', icon: Globe, color: 'text-black' },
    { name: 'TypeScript', icon: Code2, color: 'text-blue-500' },
    { name: 'Tailwind CSS', icon: Layers, color: 'text-cyan-400' },
    { name: 'Supabase', icon: Database, color: 'text-emerald-500' },
    { name: 'Framer Motion', icon: Cpu, color: 'text-purple-500' },
    { name: 'Cloudinary', icon: Cloud, color: 'text-sky-500' },
];

export default function SkillsSection() {
    return (
        <section className="py-24 bg-white dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16">Stack Technique</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center space-y-3 p-6 glass rounded-2xl w-32 md:w-40 hover:border-brand-primary transition-colors cursor-default"
                        >
                            <skill.icon size={32} className={skill.color} />
                            <span className="font-medium text-sm">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
