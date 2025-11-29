import React from 'react';
import { motion } from 'framer-motion';
import './RoutingLoader.css';

const RoutingLoader = () => {
    return (
        <div className="routing-loader-container">
            <motion.div
                className="routing-loader-content glass"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="infinity-container">
                    <svg viewBox="0 0 100 50" className="infinity-svg">
                        <path
                            className="infinity-path"
                            d="M20,25 C20,10 40,10 50,25 C60,40 80,40 80,25 C80,10 60,10 50,25 C40,40 20,40 20,25"
                        />
                    </svg>
                </div>
                <div className="loading-label">Loading...</div>
            </motion.div>
        </div>
    );
};

export default RoutingLoader;
