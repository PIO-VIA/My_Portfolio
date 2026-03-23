'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const skillLogos: Record<string, string> = {
    'Next.js': 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    'TypeScript': 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
    'React': 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    'Tailwind CSS': 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg',
    'Node.js': 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
    'Firebase': 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg',
    'PostgreSQL': 'https://cdn.worldvectorlogo.com/logos/postgresql.svg',
    'Docker': 'https://cdn.worldvectorlogo.com/logos/docker-4.svg',
    'GraphQL': 'https://cdn.worldvectorlogo.com/logos/graphql-1.svg',
    'Git': 'https://cdn.worldvectorlogo.com/logos/git-icon.svg',
    'AWS': 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
    'Python': 'https://cdn.worldvectorlogo.com/logos/python-5.svg',
};

const skills = [
    { name: 'Next.js', category: 'Frontend', proficiency: 95 },
    { name: 'TypeScript', category: 'Language', proficiency: 92 },
    { name: 'React', category: 'Frontend', proficiency: 94 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90 },
    { name: 'Node.js', category: 'Backend', proficiency: 88 },
    { name: 'Firebase', category: 'Database', proficiency: 85 },
    { name: 'PostgreSQL', category: 'Database', proficiency: 82 },
    { name: 'Docker', category: 'DevOps', proficiency: 78 },
    { name: 'GraphQL', category: 'API', proficiency: 80 },
    { name: 'Git', category: 'DevOps', proficiency: 93 },
    { name: 'AWS', category: 'Cloud', proficiency: 75 },
    { name: 'Python', category: 'Language', proficiency: 85 },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
    const logoUrl = skillLogos[skill.name];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
        >
            <div className="glass rounded-3xl border border-white/5 p-6 flex flex-col items-center gap-4 transition-all duration-500 hover:border-brand-primary/30 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] bg-white/2 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[50px] -z-10 group-hover:bg-brand-primary/10 transition-colors" />

                <div className="w-16 h-16 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:rotate-6">
                    {logoUrl ? (
                        <Image src={logoUrl} alt={skill.name} fill className="object-contain p-2" />
                    ) : (
                        <div className="w-full h-full bg-white/5 rounded-xl" />
                    )}
                </div>

                <div className="text-center space-y-1">
                    <h4 className="text-sm font-black text-white group-hover:text-brand-primary transition-colors">{skill.name}</h4>
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">{skill.category}</p>
                </div>

                {/* Proficiency Bar */}
                <div className="w-full mt-2 space-y-2">
                    <div className="flex justify-between text-[8px] font-black tracking-widest text-white/10 group-hover:text-white/30 transition-colors">
                        <span>PROFICIENCY</span>
                        <span>{skill.proficiency}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
        </div>
    );
}
