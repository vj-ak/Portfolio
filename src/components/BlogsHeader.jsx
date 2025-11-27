import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Header.css'; // Reuse existing header styles

const BlogsHeader = () => {
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
                <Link to="/blogs" className="logo gradient-text">Blogs.</Link>

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
                        <li><Link to="/blogs" className="active" onClick={() => setMenuOpen(false)}>All Posts</Link></li>
                        <li><Link to="/" className="blogs-btn" onClick={() => setMenuOpen(false)}>Back to Portfolio</Link></li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    );
};

export default BlogsHeader;
