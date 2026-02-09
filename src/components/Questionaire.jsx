import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        }, 40); // speed
        return () => clearInterval(timer);
    }, [text]);

    return <span>{displayText}</span>;
}

const Questionaire = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [inputValue, setInputValue] = useState("");

    const handleOptionClick = (option) => {
        const currentQ = questions[currentIndex];
        const newAnswers = { ...answers, [currentQ.id]: option };
        setAnswers(newAnswers);
        // Add small delay to show selection feedback
        setTimeout(() => handleNext(newAnswers), 300);
    };

    const handleNext = (updatedAnswers = answers) => {
        if (questions[currentIndex].type === 'text') {
            if (!inputValue.trim()) return;
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

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onComplete({ ...updatedAnswers, [questions[currentIndex].id]: inputValue || updatedAnswers[questions[currentIndex].id] });
        }
    };

    const currentQ = questions[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-4xl mx-auto relative z-10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-black/20 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
                >
                    <div className="mb-4 text-pink-400 text-sm font-bold tracking-widest uppercase">
                        Question {currentIndex + 1}/{questions.length}
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 drop-shadow-md min-h-[4rem]">
                        <TypewriterText text={currentQ.text} />
                    </h2>

                    {currentQ.type === 'selection' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentQ.options.map((option, idx) => (
                                <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: "rgba(236, 72, 153, 0.2)",
                                        borderColor: "rgba(236, 72, 153, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleOptionClick(option)}
                                    className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white text-xl hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all font-light"
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-6">
                            <input
                                type="text"
                                autoFocus
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={currentQ.placeholder}
                                className="w-full p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white text-xl placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all font-light"
                                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNext}
                                disabled={!inputValue.trim()}
                                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-pink-500/25 transition-all"
                            >
                                Next Step
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Questionaire;
