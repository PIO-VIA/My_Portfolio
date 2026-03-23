'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTextProps {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export default function AnimatedText({
    words,
    className = "",
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
}: AnimatedTextProps) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) {
            const timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && subIndex === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        if (!isDeleting && subIndex === words[index].length) {
            setIsPaused(true);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={`${className} inline-flex items-center min-h-[1.2em]`}>
            <span className="relative">
                {words[index].substring(0, subIndex)}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[2px] h-[0.9em] bg-brand-primary ml-1 align-middle"
                />
            </span>
        </span>
    );
}
