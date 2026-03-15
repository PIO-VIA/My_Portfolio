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
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 }
    } : {};

    return (
        <Component
            className={cn(
                'glass rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800',
                className
            )}
            {...animProps}
        >
            {children}
        </Component>
    );
};
