'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
    threshold?: number;
}

export default function SectionWrapper({
    children,
    id,
    className = "",
    delay = 0,
    threshold = 0.1,
}: SectionWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    return (
        <section id={id} ref={ref} className={`py-20 md:py-32 relative ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.21, 0.47, 0.32, 0.98],
                }}
            >
                {children}
            </motion.div>
        </section>
    );
}
