import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

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
        setMenuOpen(!menuOpen);
    };

    return (
        <motion.header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container header-container">
                <a href="#top" className="logo gradient-text">Portfolio.</a>

                <div
                    className="menu-icon"
                    onClick={toggleMenu}
                    role="button"
                    tabIndex="0"
                    aria-label="Toggle navigation menu"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}
                >
                    <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                </div>

                <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
                        <li><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
                        <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
                        <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
                        <li><a href="/blogs" className="blogs-btn" onClick={() => setMenuOpen(false)}>Blogs</a></li>
                        <li><a href="/Vijay Akash M - Resume.pdf" download className="resume-btn" onClick={() => setMenuOpen(false)}>Resume</a></li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
