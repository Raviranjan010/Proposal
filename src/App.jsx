import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Intro from './components/Intro';
import Questionaire from './components/Questionaire';
import Reasons from './components/Reasons';
import Proposal from './components/Proposal';
import Contact from './components/Contact';
import MusicPlayer from './components/MusicPlayer';
import Cursor from './components/Cursor';

function App() {
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setStep('questionaire');
  };

  const handleQuestionaireComplete = (collectedAnswers) => {
    setAnswers(collectedAnswers);
    setStep('reasons');
  };

  const handleReasonsComplete = () => {
    setStep('proposal');
  }

  const handleAccept = () => {
    // Add logic to save acceptance
    setAnswers({ ...answers, proposalResponse: 'Accepted' });
    setStep('contact');
  };

  const handleReject = () => {
    setAnswers({ ...answers, proposalResponse: 'Rejected' });
    setStep('contact');
  };

  const variants = {
    initial: { opacity: 0, y: 50, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -50, filter: "blur(10px)" },
  };

  return (
    <div className="font-sans antialiased text-white selection:bg-pink-500 selection:text-white overflow-x-hidden cursor-none">
      <Cursor />
      <Background />
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Intro onStart={handleStart} />
          </motion.div>
        )}

        {step === 'questionaire' && (
          <motion.div
            key="questionaire"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Questionaire onComplete={handleQuestionaireComplete} />
          </motion.div>
        )}

        {step === 'reasons' && (
          <motion.div
            key="reasons"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Reasons onComplete={handleReasonsComplete} />
          </motion.div>
        )}

        {step === 'proposal' && (
          <motion.div
            key="proposal"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Proposal onAccept={handleAccept} onReject={handleReject} />
          </motion.div>
        )}

        {step === 'contact' && (
          <motion.div
            key="contact"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Contact answers={answers} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
