import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingSpinner.css';
import PropTypes from 'prop-types';

const CHECKLIST_ITEMS = [
    { id: 1, text: "Initializing Portfolio Protocol...", threshold: 0 },
    { id: 2, text: "Fetching User Data: VJ-AK...", threshold: 30 },
    { id: 3, text: "Syncing Work Experience...", threshold: 60 },
    { id: 4, text: "Downloading Latest Resume...", threshold: 90 }
];

const LoadingSpinner = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [shouldRender, setShouldRender] = useState(!sessionStorage.getItem('hasBooted'));

    // Audio context ref
    const audioContextRef = React.useRef(null);

    const initAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const playSound = (type) => {
        try {
            if (!audioContextRef.current) return;

            const ctx = audioContextRef.current;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            if (type === 'tick') {
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
                gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.05);
            } else if (type === 'success') {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.5);
            }
        } catch (error) {
            console.log("Audio play failed", error);
        }
    };

    const handleStart = () => {
        initAudio();
        setIsStarted(true);
        sessionStorage.setItem('hasBooted', 'true');
        playSound('tick'); // Initial sound
    };

    useEffect(() => {
        if (!shouldRender) {
            onComplete();
        }
    }, [shouldRender, onComplete]);

    useEffect(() => {
        if (!isStarted) return;

        const duration = 3000; // 3 seconds
        const intervalTime = 50;
        const totalSteps = duration / intervalTime;
        const incrementValue = 100 / totalSteps;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    playSound('success');
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 500); // Small delay to show "System Ready"
                    return 100;
                }

                // Play tick sound occasionally
                if (Math.random() > 0.5) playSound('tick');

                return Math.min(prev + incrementValue, 100);
            });
        }, intervalTime);

        return () => {
            clearInterval(interval);
            if (audioContextRef.current && progress >= 100) {
                // Optional cleanup
            }
        };
    }, [isStarted, onComplete]);

    const activeItems = CHECKLIST_ITEMS.filter(item => progress >= item.threshold);

    // Calculate color from Red (0) to Green (120)
    const hue = (progress / 100) * 120;
    const color = `hsl(${hue}, 100%, 50%)`;
    const shadow = `0 0 10px ${color}`;

    const [decodedText, setDecodedText] = useState("");
    const fullText = "INITIALIZE SYSTEM";

    useEffect(() => {
        if (isStarted || shouldRender === false) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDecodedText(prev => fullText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return fullText[index];
                    }
                    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                })
                .join("")
            );

            if (iteration >= fullText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [isStarted, shouldRender]);

    if (!shouldRender) return null;

    if (!isStarted) {
        return (
            <div className="loading-container">
                <motion.button
                    className="tech-button"
                    onClick={handleStart}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <motion.div
                        className="tech-border top"
                        variants={{
                            hidden: { width: 0 },
                            visible: { width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }
                        }}
                    />
                    <motion.div
                        className="tech-border right"
                        variants={{
                            hidden: { height: 0 },
                            visible: { height: "100%", transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" } }
                        }}
                    />
                    <motion.div
                        className="tech-border bottom"
                        variants={{
                            hidden: { width: 0 },
                            visible: { width: "100%", transition: { duration: 0.5, delay: 1.0, ease: "easeInOut" } }
                        }}
                    />
                    <motion.div
                        className="tech-border left"
                        variants={{
                            hidden: { height: 0 },
                            visible: { height: "100%", transition: { duration: 0.5, delay: 1.5, ease: "easeInOut" } }
                        }}
                    />

                    <span className="tech-text">{decodedText}</span>
                </motion.button>
            </div>
        );
    }

    return (
        <div className="loading-container">
            <motion.div
                className="loading-content glass"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="loader-header">
                    <span className="system-status">
                        SYSTEM STATUS: {progress === 100 ? (
                            <span style={{ color: '#00ff00', textShadow: '0 0 10px #00ff00' }}>ONLINE</span>
                        ) : "BOOTING"}
                    </span>
                    <span className="progress-text" style={{ color: color, textShadow: shadow }}>
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="progress-bar-container">
                    <motion.div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="checklist-container">
                    <AnimatePresence>
                        {activeItems.map((item) => (
                            <motion.div
                                key={item.id}
                                className="checklist-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="checklist-icon">
                                    {progress >= item.threshold + 25 || progress === 100 ? "✓" : "➜"}
                                </span>
                                <span className="checklist-text">{item.text}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

LoadingSpinner.propTypes = {
    onComplete: PropTypes.func
};

export default LoadingSpinner;
