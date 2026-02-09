import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setCursorXY({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'A') {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-pink-500 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: cursorXY.x - 16,
                    y: cursorXY.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    opacity: 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-pink-400 pointer-events-none z-[9999]"
                animate={{
                    x: cursorXY.x - 4,
                    y: cursorXY.y - 4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 1500,
                    damping: 50,
                    mass: 0.1,
                }}
            />
        </>
    );
};

export default Cursor;
