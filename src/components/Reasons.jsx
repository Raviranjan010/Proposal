import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Heart, Smile, Star, Coffee, ChevronRight, ArrowRight } from 'lucide-react';

const reasons = [
    {
        icon: <Heart className="w-16 h-16 text-pink-500 drop-shadow-lg" />,
        title: "Your Kindness",
        desc: "The way you treat everyone creates a warmth that I want to be around forever.",
        color: "from-pink-500/20 to-rose-500/20"
    },
    {
        icon: <Smile className="w-16 h-16 text-amber-400 drop-shadow-lg" />,
        title: "That Smile",
        desc: "It lights up the darkest rooms. I find myself trying to make you laugh just to see it.",
        color: "from-amber-400/20 to-orange-500/20"
    },
    {
        icon: <Coffee className="w-16 h-16 text-emerald-500 drop-shadow-lg" />,
        title: "Our Connection",
        desc: "I've never felt so understood by anyone. Talking to you is the best part of my day.",
        color: "from-emerald-500/20 to-teal-500/20"
    },
    {
        icon: <Star className="w-16 h-16 text-purple-500 drop-shadow-lg" />,
        title: "Everything",
        desc: "From the big things to the small details, you are simply amazing.",
        color: "from-purple-500/20 to-indigo-500/20"
    }
];

const Reasons = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextReason = () => {
        setDirection(1);
        if (index < reasons.length - 1) {
            setIndex(index + 1);
        } else {
            onComplete();
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotate: direction > 0 ? 20 : -20,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotate: direction < 0 ? 20 : -20,
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 overflow-hidden w-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 mb-12 drop-shadow-sm text-center"
            >
                Why I like you...
            </motion.h2>

            <div className="relative w-full max-w-sm h-[450px] flex items-center justify-center perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            rotate: { duration: 0.4 }
                        }}
                        className="absolute w-full"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = offset.x > 100 ? -1 : offset.x < -100 ? 1 : 0;
                            if (swipe !== 0) {
                                nextReason();
                            }
                        }}
                    >
                        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000}>
                            <div className="glass-card p-8 rounded-[2rem] border border-white/20 shadow-2xl relative overflow-hidden group">
                                <div className={`absolute inset-0 bg-gradient-to-br ${reasons[index].color} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        {reasons[index].icon}
                                    </div>
                                    <h3 className="text-3xl font-serif text-white mb-4 drop-shadow-sm">{reasons[index].title}</h3>
                                    <p className="text-lg text-gray-200 leading-relaxed font-light">
                                        "{reasons[index].desc}"
                                    </p>
                                </div>
                            </div>
                        </Tilt>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.button
                whileHover={{ scale: 1.05, paddingRight: "2.5rem" }}
                whileTap={{ scale: 0.95 }}
                onClick={nextReason}
                className="mt-12 group relative px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-lg overflow-hidden transition-all shadow-lg hover:bg-white/15"
            >
                <span className="relative z-10 flex items-center gap-2">
                    {index === reasons.length - 1 ? 'Continue' : 'Next Memory'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <div className="flex gap-3 mt-8">
                {reasons.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: i === index ? 32 : 8,
                            backgroundColor: i === index ? "#ec4899" : "rgba(255,255,255,0.2)"
                        }}
                        className="h-2 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
};

export default Reasons;
