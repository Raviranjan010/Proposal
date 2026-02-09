import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Heart, Smile, Star, Coffee, ChevronRight } from 'lucide-react';

const reasons = [
    {
        icon: <Heart className="w-20 h-20 text-red-500" />,
        title: "Your Kindness",
        desc: "The way you treat everyone creates a warmth that I want to be around forever.",
        rotate: -2
    },
    {
        icon: <Smile className="w-20 h-20 text-yellow-400" />,
        title: "That Smile",
        desc: "It lights up the darkest rooms. I find myself trying to make you laugh just to see it.",
        rotate: 3
    },
    {
        icon: <Coffee className="w-20 h-20 text-amber-600" />,
        title: "Our Connection",
        desc: "I've never felt so understood by anyone. Talking to you is the best part of my day.",
        rotate: -1
    },
    {
        icon: <Star className="w-20 h-20 text-purple-400" />,
        title: "Everything",
        desc: "From the big things to the small details, you are simply amazing.",
        rotate: 2
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
            rotate: direction > 0 ? 20 : -20,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            rotate: reasons[index].rotate,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 overflow-hidden">
            <h2 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                Why I like you...
            </h2>

            <div className="relative w-full max-w-sm h-[500px] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute cursor-grab active:cursor-grabbing"
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
                        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2500}>
                            <div className="bg-white p-4 pb-12 shadow-2xl rounded-sm transform transition-all hover:scale-105 duration-300 w-80 md:w-96">
                                <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden relative shadow-inner">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50" />
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {reasons[index].icon}
                                    </motion.div>
                                </div>
                                <h3 className="text-3xl font-serif text-gray-800 text-center mb-2">{reasons[index].title}</h3>
                                <p className="font-handwriting text-gray-600 text-center text-lg px-2 leading-tight font-serif italic">
                                    "{reasons[index].desc}"
                                </p>
                            </div>
                        </Tilt>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextReason}
                className="mt-8 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold shadow-lg hover:bg-white/20 transition-all flex items-center gap-2 group z-50"
            >
                Next Memory <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div className="flex gap-3 mt-8">
                {reasons.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-pink-500 w-8' : 'bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Reasons;
