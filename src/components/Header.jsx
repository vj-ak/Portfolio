import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        playClickSound();
        setMenuOpen(!menuOpen);
    };

    const handleNavClick = () => {
        playClickSound();
        setMenuOpen(false);
    };

    return (
        <motion.header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container header-container">
                <a href="#top" className="logo gradient-text" onMouseEnter={playHoverSound} onClick={playClickSound}>Portfolio.</a>

                <div
                    className="menu-icon"
                    onClick={toggleMenu}
                    role="button"
                    tabIndex="0"
                    aria-label="Toggle navigation menu"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}
                    onMouseEnter={playHoverSound}
                >
                    <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                </div>

                <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><a href="#about" onClick={handleNavClick} onMouseEnter={playHoverSound}>About</a></li>
                        <li><a href="#experience" onClick={handleNavClick} onMouseEnter={playHoverSound}>Experience</a></li>
                        <li><a href="#projects" onClick={handleNavClick} onMouseEnter={playHoverSound}>Projects</a></li>
                        <li><a href="#contact" onClick={handleNavClick} onMouseEnter={playHoverSound}>Contact</a></li>
                        <li><a href="/blogs" className="blogs-btn" onClick={handleNavClick} onMouseEnter={playHoverSound}>Blogs</a></li>
                        <li><a href="/Vijay Akash M - Resume.pdf" download className="resume-btn" onClick={handleNavClick} onMouseEnter={playHoverSound}>Resume</a></li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
