import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import enterpriseImgLarge from '../assets/projects/enterprise-dashboard-large.webp';
import enterpriseImgSmall from '../assets/projects/enterprise-dashboard-small.webp';
import aiWikiImgLarge from '../assets/projects/ai-wiki-large.webp';
import aiWikiImgSmall from '../assets/projects/ai-wiki-small.webp';
import devopsImgLarge from '../assets/projects/devops-insights-large.webp';
import devopsImgSmall from '../assets/projects/devops-insights-small.webp';

const projectsData = [
    {
        id: 1,
        title: "Enterprise Management Dashboard",
        description: "A comprehensive dashboard for managing enterprise resources, featuring real-time data visualization, user management, and reporting tools. Built with Angular and .NET Core.",
        imageLarge: enterpriseImgLarge,
        imageSmall: enterpriseImgSmall,
        tags: ["C#", "Angular", ".NET Core", "SQL Server", "Chart.js", "Docker"],
        category: "Full Stack"
    },
    {
        id: 2,
        title: "AI-Powered Internal Wiki Assistant",
        description: "An intelligent wiki assistant that uses natural language processing to help employees find internal documentation and answer questions. Integrated with Azure OpenAI.",
        imageLarge: aiWikiImgLarge,
        imageSmall: aiWikiImgSmall,
        tags: ["C#", "Angular", "ASP.NET Core", "Azure OpenAI", "Azure Blob Storage"],
        category: "AI / ML"
    },
    {
        id: 3,
        title: "DevOps Issue Insights Integration Tool",
        description: "A tool that aggregates and analyzes issue tracking data from multiple sources to provide actionable insights for DevOps teams. Automates reporting and trend analysis.",
        imageLarge: devopsImgLarge,
        imageSmall: devopsImgSmall,
        tags: ["C#", "ASP.NET Core", "Azure", "Azure DevOps API", "Docker"],
        category: "DevOps"
    }
];

const Projects = () => {
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
                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="project-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="project-image">
                                <img
                                    src={project.imageLarge}
                                    srcSet={`${project.imageSmall} 400w, ${project.imageLarge} 800w`}
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    alt={project.title}
                                    width="800"
                                    height="800"
                                    loading="lazy"
                                />
                            </div>

                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>

                                <div className="project-tags">
                                    {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
