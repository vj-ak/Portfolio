import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingSpinner.css';
import PropTypes from 'prop-types';

const CHECKLIST_ITEMS = [
    { id: 1, text: "Initializing Core Systems...", threshold: 0 },
    { id: 2, text: "Loading Assets...", threshold: 30 },
    { id: 3, text: "Configuring Environment...", threshold: 60 },
    { id: 4, text: "System Ready", threshold: 90 }
];

const LoadingSpinner = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 500); // Small delay to show "System Ready"
                    return 100;
                }
                // Random increment for realistic effect
                const increment = Math.random() * 2;
                return Math.min(prev + increment, 100);
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    const activeItems = CHECKLIST_ITEMS.filter(item => progress >= item.threshold);

    // Calculate color from Red (0) to Green (120)
    const hue = (progress / 100) * 120;
    const color = `hsl(${hue}, 100%, 50%)`;
    const shadow = `0 0 10px ${color}`;

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
                        SYSTEM STATUS: {progress === 100 ? "ONLINE" : "BOOTING"}
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
