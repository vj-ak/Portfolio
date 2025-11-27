import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillsData = [
    // Row 1: Languages & Frontend
    ['C#', 'JavaScript', 'TypeScript', 'SQL', 'Angular', 'React', 'Bootstrap', 'Tailwind CSS', 'jQuery', 'Ignite UI', 'PrimeNG', 'Ng-Zorro', 'Framer Motion'],
    // Row 2: Backend, Database & Cloud
    ['ASP.NET Core', '.NET 6/7/8/9', 'Web API', 'Entity Framework Core', 'Node.js', 'SQL Server', 'Azure Cosmos DB', 'MongoDB', 'NoSQL', 'Microsoft Azure', 'Azure DevOps', 'Docker'],
    // Row 3: AI, Tools & Practices
    ['Azure OpenAI', 'ChatGPT', 'GitHub Copilot', 'Gemini', 'Claude', 'Dall-E', 'Git', 'GitHub', 'VS Code', 'Visual Studio', 'Postman', 'Agile/Scrum', 'CI/CD Pipelines']
];

const Skills = () => {
    return (
        <section id="skills" className="section skills-section">
            <div className="container-fluid">
                <motion.h2
                    className="section-title gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Technical Skills
                </motion.h2>

                <div className="skills-marquee-container">
                    {skillsData.map((row, rowIndex) => (
                        <div key={rowIndex} className="marquee-row">
                            <div className={`marquee-track ${rowIndex % 2 === 0 ? 'scroll-left' : 'scroll-right'}`}>
                                {/* Duplicate content for seamless loop */}
                                {[...row, ...row, ...row].map((skill, idx) => (
                                    <div key={`${rowIndex}-${idx}`} className="skill-tag-glass">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
