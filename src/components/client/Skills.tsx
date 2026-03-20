'use client';

import { motion } from 'framer-motion';
import {
    Code2, Database, Globe, Layers, Cpu, Cloud, Server, GitBranch,
    Container, BarChart, Flame, Boxes
} from 'lucide-react';

const skills = [
    { name: 'Next.js', icon: Globe, color: 'text-white', proficiency: 95, category: 'Frontend' },
    { name: 'TypeScript', icon: Code2, color: 'text-blue-400', proficiency: 92, category: 'Language' },
    { name: 'React', icon: Cpu, color: 'text-cyan-400', proficiency: 94, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: Layers, color: 'text-sky-400', proficiency: 90, category: 'Frontend' },
    { name: 'Node.js', icon: Server, color: 'text-green-400', proficiency: 88, category: 'Backend' },
    { name: 'Firebase', icon: Flame, color: 'text-orange-400', proficiency: 85, category: 'Database' },
    { name: 'PostgreSQL', icon: Database, color: 'text-indigo-400', proficiency: 82, category: 'Database' },
    { name: 'Docker', icon: Container, color: 'text-blue-300', proficiency: 78, category: 'DevOps' },
    { name: 'GraphQL', icon: BarChart, color: 'text-pink-400', proficiency: 80, category: 'API' },
    { name: 'Git / CI-CD', icon: GitBranch, color: 'text-rose-300', proficiency: 93, category: 'DevOps' },
    { name: 'Cloudinary', icon: Cloud, color: 'text-brand-primary', proficiency: 88, category: 'Cloud' },
    { name: 'Three.js', icon: Boxes, color: 'text-purple-400', proficiency: 70, category: 'Frontend' },
];

function SkillFlipCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
    const Icon = skill.icon;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.06 }}
            className="flip-card h-36 cursor-default"
        >
            <div className="flip-card-inner w-full h-full">
                {/* Front */}
                <div className="flip-card-front glass rounded-2xl border border-white/8 hover:border-white/20 transition-colors flex flex-col items-center justify-center gap-3 p-4">
                    <Icon size={30} className={skill.color} />
                    <span className="font-bold text-sm text-center leading-tight">{skill.name}</span>
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{skill.category}</span>
                </div>
                {/* Back */}
                <div className="flip-card-back glass rounded-2xl border border-brand-primary/30 bg-brand-primary/5 flex flex-col items-center justify-center gap-3 p-4">
                    <span className="text-3xl font-bold text-brand-primary">{skill.proficiency}%</span>
                    <div className="w-full px-2">
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                            />
                        </div>
                    </div>
                    <span className="text-xs text-white/40 font-medium">{skill.name}</span>
                </div>
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, i) => (
                <SkillFlipCard key={skill.name} skill={skill} index={i} />
            ))}
        </div>
    );
}
