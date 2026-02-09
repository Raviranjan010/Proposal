import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Instagram, Phone, Mail } from 'lucide-react';
import { questions } from './Questionaire';

const Contact = ({ answers }) => {
    const [formData, setFormData] = useState({
        message: '',
        contact: '',
    });
    const [status, setStatus] = useState('idle');

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

            if (response.ok) {
                setStatus('success');
            } else {
                const data = await response.json();
                console.error('Failed to send:', data);
                setStatus('error');
                alert(data.message || "Failed to send. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            alert("An error occurred. Please try again.");
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative z-10">
                <motion.div
                    initial={{ scale: 0, rotate: -5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="bg-white/10 p-12 rounded-3xl backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.3)]"
                >
                    <Mail className="w-20 h-20 text-pink-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-serif text-white mb-4">Message Sent! 💌</h2>
                    <p className="text-xl text-gray-200">
                        Thank you for playing along.<br /> I'll be in touch soon!
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-2xl mx-auto relative z-10 text-white">
            <motion.h2
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-serif mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200"
            >
                One Last Thing...
            </motion.h2>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="w-full bg-black/30 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>

                <div className="mb-8">
                    <label className="block text-lg mb-3 font-medium text-pink-200">Any final words? (Or sweet nothing?)</label>
                    <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-5 bg-white/5 rounded-2xl border border-white/10 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 focus:ring-2 focus:ring-pink-500/20 h-32 resize-none transition-all placeholder-gray-500"
                        placeholder="Type your message here..."
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-lg mb-3 font-medium text-pink-200">How can I reach you?</label>
                    <div className="relative">
                        <Instagram className="absolute top-5 left-5 w-5 h-5 text-pink-400" />
                        <input
                            type="text"
                            required
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            className="w-full p-5 pl-14 bg-white/5 rounded-2xl border border-white/10 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-gray-500"
                            placeholder="Instagram handle or Phone Number"
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'}
                    className="w-full py-5 bg-gradient-to-r from-pink-600 to-purple-700 rounded-xl font-bold text-xl shadow-lg hover:shadow-pink-500/40 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group border border-white/10"
                >
                    {status === 'sending' ? (
                        'Sending...'
                    ) : (
                        <>
                            Send Proposal Response <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default Contact;
