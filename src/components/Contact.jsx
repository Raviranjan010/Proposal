import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Mail, MessageCircle } from 'lucide-react';
import Confetti from 'react-confetti';

const Contact = ({ answers }) => {
    const [formData, setFormData] = useState({
        message: '',
        contact: '',
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers,
                    proposalResponse: answers.proposalResponse,
                    message: formData.message,
                    contact: formData.contact,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success (even if email failed, we consider DB save as success)
                if (data.warning) {
                    console.warn('Backend Warning:', data.warning);
                }
                setStatus('success');
            } else {
                console.error('Failed to send:', data);
                setStatus('error');
<<<<<<< HEAD
                setErrorMessage(data.message || 'Something went wrong. Please try again.');
=======
                // Show the EXACT error from the backend for debugging
                alert(`Error: ${data.message}\nDetails: ${data.error || 'No details'}\n\nPlease screenshot this and send to Ravi! on instagram👉 raviranjankashyap7`);
>>>>>>> 2df8f610a6d7ca5b0a6dc70c829b13578b25c814
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            setErrorMessage(`Network Error: ${error.message}. Please try again.`);
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative z-10 w-full">
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.1}
                />
                <motion.div
                    initial={{ scale: 0, rotate: -5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="glass-card p-12 rounded-[3rem] border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.3)] max-w-lg"
                >
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <Mail className="w-12 h-12 text-pink-400" />
                    </div>
                    <h2 className="text-4xl font-serif text-white mb-6">Message Sent! 💌</h2>
                    <p className="text-xl text-pink-100/90 leading-relaxed font-light">
                        Thank you for playing along.<br />
                        <span className="font-medium text-white">I'll be in touch soon!</span>
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-2xl mx-auto relative z-10 w-full text-white">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12 text-center"
            >
                <h2 className="text-4xl md:text-6xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 drop-shadow-sm">
                    One Last Thing...
                </h2>
                <p className="text-pink-200/60 italic">Don't be shy!</p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                onSubmit={handleSubmit}
                className="glass-card w-full p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group"
            >
                {/* Gradient Border Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

                <div className="mb-8 group/field">
                    <label className="flex items-center gap-2 text-lg mb-3 font-medium text-pink-200 transition-colors group-focus-within/field:text-pink-400">
                        <MessageCircle className="w-5 h-5" />
                        Any final words? (Or sweet nothing?)
                    </label>
                    <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-6 bg-black/20 rounded-2xl border border-white/10 focus:outline-none focus:border-pink-500/50 focus:bg-black/40 focus:ring-2 focus:ring-pink-500/10 h-40 resize-none transition-all placeholder-white/20 text-lg"
                        placeholder="Type your message here..."
                    />
                </div>

                <div className="mb-10 group/field">
                    <label className="flex items-center gap-2 text-lg mb-3 font-medium text-pink-200 transition-colors group-focus-within/field:text-pink-400">
                        <Instagram className="w-5 h-5" />
                        How can I reach you?
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full p-6 bg-black/20 rounded-2xl border border-white/10 focus:outline-none focus:border-pink-500/50 focus:bg-black/40 focus:ring-2 focus:ring-pink-500/10 transition-all placeholder-white/20 text-lg"
                        placeholder="Instagram handle or Phone Number"
                    />
                </div>

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-200 text-sm text-center backdrop-blur-md"
                    >
                        <p className="font-bold mb-1">Oops! {errorMessage}</p>
                        <p className="text-xs opacity-75">Please take a screenshot and send to Ravi on Instagram (@raviranjankashyap7)</p>
                    </motion.div>
                )}

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(236, 72, 153, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'}
                    className="w-full py-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold text-xl text-white shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                        {status === 'sending' ? 'Sending...' : 'Send Proposal Response'}
                        {!status === 'sending' && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </span>
                </motion.button>
            </motion.form>
        </div>
    );
};

export default Contact;
