import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Projects.css';
import { playHoverSound, playClickSound } from '../utils/soundEffects';
import enterpriseImgLarge from '../assets/projects/enterprise-dashboard-large.webp';
import enterpriseImgSmall from '../assets/projects/enterprise-dashboard-small.webp';
import aiWikiImgLarge from '../assets/projects/ai-wiki-large.webp';
import aiWikiImgSmall from '../assets/projects/ai-wiki-small.webp';
import devopsImgLarge from '../assets/projects/devops-insights-large.webp';
import devopsImgSmall from '../assets/projects/devops-insights-small.webp';

import portfolioImg from '../assets/projects/portfolio-project.webp';

const projectsData = [
    {
        id: 0,
        title: "Personal Portfolio & Blog System",
        description: "A modern, responsive portfolio website featuring a blog system, dark mode theme, and SEO optimization. Built with React, Vite, and Framer Motion.",
        imageLarge: portfolioImg,
        imageSmall: portfolioImg,
        tags: ["React", "Vite", "Framer Motion", "CSS3", "SEO"],
        category: "Frontend",
        type: "Personal",
        github: "https://github.com/vj-ak/Portfolio.git", // Replace with actual link
        link: "https://www.vijayakash.com" // Removed as user is already here
    },
    {
        id: 1,
        title: "Enterprise Management Dashboard",
        description: "A comprehensive dashboard for managing enterprise resources, featuring real-time data visualization, user management, and reporting tools. Built with Angular and .NET Core.",
        imageLarge: enterpriseImgLarge,
        imageSmall: enterpriseImgSmall,
        tags: ["C#", "Angular", ".NET Core", "SQL Server", "Chart.js", "Docker"],
        category: "Full Stack",
        type: "Company"
    },
    {
        id: 2,
        title: "AI-Powered Internal Wiki Assistant",
        description: "An intelligent wiki assistant that uses natural language processing to help employees find internal documentation and answer questions. Integrated with Azure OpenAI.",
        imageLarge: aiWikiImgLarge,
        imageSmall: aiWikiImgSmall,
        tags: ["C#", "Angular", "ASP.NET Core", "Azure OpenAI", "Azure Blob Storage"],
        category: "AI / ML",
        type: "Company"
    },
    {
        id: 3,
        title: "DevOps Issue Insights Integration Tool",
        description: "A tool that aggregates and analyzes issue tracking data from multiple sources to provide actionable insights for DevOps teams. Automates reporting and trend analysis.",
        imageLarge: devopsImgLarge,
        imageSmall: devopsImgSmall,
        tags: ["C#", "ASP.NET Core", "Azure", "Azure DevOps API", "Docker"],
        category: "DevOps",
        type: "Company"
    }
];

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
    };

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.h2
                    className="section-title gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Featured Projects
                </motion.h2>

                <div
                    className="carousel-container"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <button
                        className="carousel-btn prev"
                        onClick={() => { prevSlide(); playClickSound(); }}
                        onMouseEnter={playHoverSound}
                        aria-label="Previous project"
                    >
                        <FiChevronLeft />
                    </button>

                    <div className="carousel-track">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentIndex}
                                className="project-card glass"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                onMouseEnter={playHoverSound}
                            >
                                <div className="project-image">
                                    <div className={`project-badge ${projectsData[currentIndex].type.toLowerCase()}`}>
                                        {projectsData[currentIndex].type}
                                    </div>
                                    <img
                                        src={projectsData[currentIndex].imageLarge}
                                        srcSet={`${projectsData[currentIndex].imageSmall} 400w, ${projectsData[currentIndex].imageLarge} 800w`}
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        alt={projectsData[currentIndex].title}
                                        width="800"
                                        height="800"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="project-content">
                                    <div className="project-header">
                                        <h3>{projectsData[currentIndex].title}</h3>
                                        <div className="project-links">
                                            {projectsData[currentIndex].github && (
                                                <a
                                                    href={projectsData[currentIndex].github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="icon-link"
                                                    aria-label="GitHub Repo"
                                                    onMouseEnter={playHoverSound}
                                                    onClick={playClickSound}
                                                >
                                                    <FiGithub />
                                                </a>
                                            )}
                                            {projectsData[currentIndex].link && (
                                                <a
                                                    href={projectsData[currentIndex].link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="icon-link"
                                                    aria-label="Live Demo"
                                                    onMouseEnter={playHoverSound}
                                                    onClick={playClickSound}
                                                >
                                                    <FiExternalLink />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p>{projectsData[currentIndex].description}</p>

                                    <div className="project-tags">
                                        {projectsData[currentIndex].tags.map(tag => <span key={tag}>{tag}</span>)}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        className="carousel-btn next"
                        onClick={() => { nextSlide(); playClickSound(); }}
                        onMouseEnter={playHoverSound}
                        aria-label="Next project"
                    >
                        <FiChevronRight />
                    </button>
                </div>

                <div className="carousel-dots">
                    {projectsData.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => { setCurrentIndex(index); playClickSound(); }}
                            onMouseEnter={playHoverSound}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </div >
        </section >
    );
};

export default Projects;
