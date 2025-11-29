import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const roles = ["Software Engineer", "Fullstack Developer"];

const Hero = () => {
    const fullName = "Vijay Akash M";

    const [displayedName, setDisplayedName] = useState("");
    const [displayedRole, setDisplayedRole] = useState("");
    const [nameComplete, setNameComplete] = useState(false);
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Type the name first
    useEffect(() => {
        if (displayedName.length < fullName.length) {
            const timeout = setTimeout(() => {
                setDisplayedName(fullName.slice(0, displayedName.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setTimeout(() => setNameComplete(true), 0);
        }
    }, [displayedName, fullName]);

    // Pause effect
    useEffect(() => {
        if (isPaused) {
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2000); // Pause for 2 seconds before erasing
            return () => clearTimeout(pauseTimeout);
        }
    }, [isPaused]);

    // Typing/Deleting effect
    useEffect(() => {
        if (!nameComplete || isPaused) return;

        const currentRole = roles[roleIndex];

        if (!isDeleting && displayedRole.length < currentRole.length) {
            // Typing
            const timeout = setTimeout(() => {
                setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        } else if (!isDeleting && displayedRole.length === currentRole.length) {
            // Finished typing, pause before deleting
            setTimeout(() => setIsPaused(true), 0);
        } else if (isDeleting && displayedRole.length > 0) {
            // Deleting
            const timeout = setTimeout(() => {
                setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
            }, 50);
            return () => clearTimeout(timeout);
        } else if (isDeleting && displayedRole.length === 0) {
            // Finished deleting, move to next role
            setTimeout(() => {
                setIsDeleting(false);
                setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
            }, 0);
        }
    }, [displayedRole, nameComplete, roleIndex, isDeleting, isPaused]);

    return (
        <section id="top" className="hero">
            <div className="container hero-container">
                <div className="hero-content fade-in-up">
                    <h2 className="hero-greeting">Hello, I&apos;m</h2>
                    <h1 className={`hero-name gradient-text ${!nameComplete ? 'typing' : ''}`}>
                        {displayedName}
                    </h1>
                    <p className="hero-role">
                        {displayedRole}
                        <span className="cursor">|</span>
                    </p>
                    <p className="hero-description">
                        Results-driven Software Engineer with 4 years of experience in designing, developing, and delivering scalable software solutions.
                        Specializing in .NET, Angular, and Azure.
                    </p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary">View Work</a>
                        <a href="/Vijay Akash M - Resume.pdf" download className="btn btn-outline">Download Resume</a>
                    </div>
                </div>
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="blob"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
