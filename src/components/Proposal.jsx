import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Heart } from 'lucide-react';

const Proposal = ({ onAccept, onReject }) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [hoverCount, setHoverCount] = useState(0);
    const { width, height } = useWindowSize();
    const [accepted, setAccepted] = useState(false);

    // Reset position on mount
    useEffect(() => {
        setNoBtnPosition({ x: 0, y: 0 });
    }, []);

    const handleNoHover = () => {
        const x = Math.random() * (window.innerWidth / 2) - (window.innerWidth / 4);
        const y = Math.random() * (window.innerHeight / 2) - (window.innerHeight / 4);
        setNoBtnPosition({ x, y });
        setHoverCount(prev => prev + 1);
    };

    const handleYes = () => {
        setAccepted(true);
        setTimeout(onAccept, 4000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative z-10 overflow-hidden w-full">
            {accepted && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} gravity={0.2} />}

            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="question"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="glass-card p-12 md:p-16 rounded-[3rem] w-full max-w-3xl relative overflow-hidden"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-8 inline-block"
                        >
                            <Heart className="w-20 h-20 text-pink-500 fill-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-100 to-purple-200 mb-8 drop-shadow-sm leading-tight">
                            Will you go out with me?
                        </h1>
                        <p className="text-xl md:text-2xl text-pink-200/80 font-light mb-12 italic">
                            (I promise I'm cool... mostly)
                        </p>

                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative min-h-[100px]">
                            <motion.button
                                whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(74, 222, 128, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleYes}
                                className="px-12 py-5 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full text-white text-2xl font-bold shadow-xl transition-all border-4 border-green-400/30 hover:border-green-400/50 z-20"
                            >
                                YES! ❤️
                            </motion.button>

                            <motion.button
                                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onMouseEnter={handleNoHover}
                                onClick={onReject} // Fallback just in case they catch it
                                className="px-12 py-5 bg-gradient-to-r from-red-500 to-rose-600 rounded-full text-white text-2xl font-bold shadow-xl transition-all border-4 border-red-500/30 w-48 z-10"
                                style={{ position: hoverCount > 0 ? 'absolute' : 'relative' }}
                            >
                                {hoverCount > 3 ? "Try Harder!" : "No"}
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center relative z-50 p-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="text-9xl mb-8 filter drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                        >
                            🥰
                        </motion.div>
                        <h2 className="text-6xl md:text-8xl font-serif text-white font-bold drop-shadow-lg mb-6">
                            YAYYYYY!!!
                        </h2>
                        <p className="text-2xl text-pink-200 font-light">Best decision ever! 💖</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Proposal;
