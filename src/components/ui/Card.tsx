'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    animate?: boolean;
}

export const Card = ({ children, className, animate = true }: CardProps) => {
    const Component = animate ? motion.div : 'div';
    const animProps = animate ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }
    } : {};

    return (
        <Component
            className={cn(
                'glass rounded-[2rem] p-8 border border-white/5 shadow-2xl transition-all duration-300',
                className
            )}
            {...animProps}
        >
            {children}
        </Component>
    );
};
