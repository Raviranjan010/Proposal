import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Proposal = ({ onAccept, onReject }) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [hoverCount, setHoverCount] = useState(0);
    const { width, height } = useWindowSize();
    const [accepted, setAccepted] = useState(false);

    const handleNoHover = () => {
        const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
        const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
        setNoBtnPosition({ x, y });
        setHoverCount(prev => prev + 1);
    };

    const handleYes = () => {
        setAccepted(true);
        setTimeout(onAccept, 4000); // Wait for confetti before moving on
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative z-10 overflow-hidden">
            {accepted && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />}

            <AnimatePresence>
                {!accepted ? (
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="bg-black/20 backdrop-blur-lg p-12 rounded-3xl border border-white/10 shadow-2xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-8 drop-shadow-sm leading-tight">
                            Will you go out with me?
                            <span className="block text-2xl md:text-3xl mt-6 font-sans font-light text-pink-200/80">
                                (I promise I'm cool)
                            </span>
                        </h1>

                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-12">
                            <motion.button
                                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleYes}
                                className="px-16 py-6 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full text-white text-2xl font-bold shadow-xl transition-all ring-4 ring-green-500/20"
                            >
                                YES! ❤️
                            </motion.button>

                            <motion.button
                                animate={noBtnPosition}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onMouseEnter={handleNoHover}
                                onClick={onReject}
                                className="px-16 py-6 bg-gradient-to-r from-red-500 to-rose-600 rounded-full text-white text-2xl font-bold shadow-xl transition-all ring-4 ring-red-500/20 z-50 cursor-pointer"
                            >
                                {hoverCount > 4 ? (
                                    <span className="text-sm">Cannot escape!</span>
                                ) : (
                                    "No"
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-8xl md:text-9xl text-center"
                    >
                        🎉❤️🥰
                        <p className="text-4xl text-white font-serif mt-8">YAYYYYY!!!</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Proposal;
