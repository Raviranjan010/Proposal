import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const Intro = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative z-10 perspective-1000">
            <Tilt perspective={1000} trackOnWindow={true} tiltMaxAngleY={5} tiltMaxAngleX={5}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                    className="glass-card p-12 md:p-16 rounded-[2rem] relative overflow-hidden"
                >
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>

                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Sparkles className="w-20 h-20 text-pink-300 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-100 to-purple-200 mb-8 drop-shadow-sm leading-tight">
                        A Question...
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light max-w-lg mx-auto leading-relaxed mb-4">
                        I have something important to ask you.
                    </p>
                    <p className="text-2xl md:text-3xl font-serif text-pink-300 italic mb-2">
                        Are you ready?
                    </p>
                </motion.div>
            </Tilt>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scale: 1.05, paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="mt-12 group relative px-12 py-6 bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-white text-xl font-semibold overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] z-50 hover:bg-white/10"
            >
                <span className="relative z-10 flex items-center gap-3 tracking-wide">
                    Start the Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
        </div>
    );
};

export default Intro;
