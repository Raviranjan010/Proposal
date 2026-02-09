import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const Intro = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative z-10 perspective-1000">
            <Tilt perspective={1000} trackOnWindow={true} tiltMaxAngleY={5} tiltMaxAngleX={5}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-12 relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
                    <Sparkles className="w-24 h-24 text-pink-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />

                    <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-100 to-purple-200 mb-6 drop-shadow-sm leading-tight">
                        A Question...
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-lg mx-auto leading-relaxed">
                        I have something important to ask you. <br />
                        <span className="text-pink-400 font-medium">Are you ready?</span>
                    </p>
                </motion.div>
            </Tilt>

            <motion.button
                whileHover={{ scale: 1.1, paddingLeft: "3rem", paddingRight: "3rem" }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="group relative px-10 py-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white text-xl font-semibold overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] z-50 hover:bg-white/20"
            >
                <span className="relative z-10 flex items-center gap-3">
                    Start the Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
        </div>
    );
};

export default Intro;
