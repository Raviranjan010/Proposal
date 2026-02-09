import React, { useState, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [showHint, setShowHint] = useState(true);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setShowHint(false);
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <audio ref={audioRef} loop>
                <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" type="audio/mp3" />
            </audio>

            <div className="relative">
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-16 top-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white whitespace-nowrap"
                    >
                        Click for vibes 🎵
                    </motion.div>
                )}

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all ${isPlaying ? 'bg-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-white/5'
                        }`}
                >
                    {isPlaying ? (
                        <Volume2 className="w-6 h-6 text-pink-400" />
                    ) : (
                        <VolumeX className="w-6 h-6 text-gray-400" />
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default MusicPlayer;
