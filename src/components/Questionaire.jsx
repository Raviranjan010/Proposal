import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const questions = [
    {
        id: 'single',
        text: "First things first... Are you single?",
        options: ["Yes", "No", "It's complicated"],
        type: 'selection'
    },
    {
        id: 'lookingFor',
        text: "What are you looking for right now?",
        options: ["Relationship", "Friendship", "Just Vibes", "Something Serious"],
        type: 'selection'
    },
    {
        id: 'idealDate',
        text: "What's your idea of a perfect date?",
        options: ["Dinner & Movie", "Late Night Drive", "Stargazing", "Adventure/Hiking", "Cozy Night In"],
        type: 'selection'
    },
    {
        id: 'hobbies',
        text: "What do you love doing in your free time?",
        type: 'text',
        placeholder: "Reading, Traveling, Coding..."
    },
    {
        id: 'curiosity',
        text: "Why did you decide to see this?",
        type: 'text',
        placeholder: "Just curious..."
    }
];

const TypewriterText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        setDisplayText('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 30);
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span className="inline-block min-h-[1.2em]">
            {displayText}
            <span className="animate-pulse ml-1 text-pink-400">|</span>
        </span>
    );
};

const Questionaire = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [inputValue, setInputValue] = useState("");

    const handleOptionClick = (option) => {
        const currentQ = questions[currentIndex];
        const newAnswers = { ...answers, [currentQ.id]: option };
        setAnswers(newAnswers);
        setTimeout(() => handleNext(newAnswers), 300);
    };

    const handleNext = (updatedAnswers = answers) => {
        // If it's a text input, we need to save the input value
        if (questions[currentIndex].type === 'text') {
            if (!inputValue.trim()) return;
            // Use the inputValue state
            const newAnswers = { ...updatedAnswers, [questions[currentIndex].id]: inputValue };
            setAnswers(newAnswers);
            setInputValue("");

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onComplete(newAnswers);
            }
            return;
        }

        // For selection, we already updated answers in handleOptionClick
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onComplete(updatedAnswers);
        }
    };

    const currentQ = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-4xl mx-auto relative z-10 w-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    className="glass-card p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl relative overflow-hidden group"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 group-hover:bg-purple-500/20 transition-all duration-700"></div>

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>

                    <div className="mb-8 flex justify-between items-center text-sm font-medium tracking-wider text-pink-300/80 uppercase">
                        <span>Question {currentIndex + 1}</span>
                        <span>{questions.length} Total</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-10 min-h-[4rem] leading-tight">
                        <TypewriterText text={currentQ.text} />
                    </h2>

                    {currentQ.type === 'selection' ? (
                        <div className="grid grid-cols-1 gap-4">
                            {currentQ.options.map((option, idx) => (
                                <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleOptionClick(option)}
                                    className="p-5 text-lg bg-white/5 border border-white/10 rounded-2xl text-white/90 hover:text-white hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all flex items-center justify-between group/btn"
                                >
                                    {option}
                                    <ChevronRight className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transform -translate-x-2 group-hover/btn:translate-x-0 transition-all text-pink-400" />
                                </motion.button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <motion.input
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                type="text"
                                autoFocus
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={currentQ.placeholder}
                                className="w-full p-6 bg-black/20 border border-white/10 rounded-2xl text-white text-xl placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:bg-black/40 transition-all"
                                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                            />
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleNext()}
                                disabled={!inputValue.trim()}
                                className="w-full p-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-pink-500/40 transition-all flex items-center justify-center gap-2"
                            >
                                Continue <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Questionaire;
