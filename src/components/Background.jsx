import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
            {/* Deep Animated Gradient Mesh */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/40 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-900/20 rounded-full blur-[100px] animate-pulse delay-2000" />
            </div>

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

            {/* Floating Particles/Icons */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-pink-500/20 text-4xl blur-[1px]"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 100,
                        opacity: 0,
                        scale: 0.5,
                        rotate: 0,
                    }}
                    animate={{
                        y: -100,
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 15,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear",
                    }}
                >
                    {['❤', '✨', '♪', '✿'][Math.floor(Math.random() * 4)]}
                </motion.div>
            ))}
        </div>
    );
};

export default Background;
