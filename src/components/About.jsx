import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container" style={{ padding: '1rem 0 5rem 0' }}>
                <motion.h2
                    className="section-title gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.h2>
                <div className="about-content">
                    <motion.div
                        className="about-text glass"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p>
                            I am a Results-driven Software Engineer with 4 years of experience in designing, developing, and delivering scalable software solutions.
                            Proven track record of improving performance, enhancing system reliability, and contributing to high-impact projects.
                        </p>
                        <p>
                            Recognized for mentoring junior developers, supporting cross-functional teams, and fostering a collaborative environment that drives innovation and project success.
                        </p>
                        <div className="skills-grid">
                            <div className="skill-item">C# | .NET Core</div>
                            <div className="skill-item">Angular</div>
                            <div className="skill-item">Azure | DevOps</div>
                            <div className="skill-item">SQL Server</div>
                            <div className="skill-item">Gen AI's</div>
                            <div className="skill-item">Agile</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="about-visual"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="code-display">
                            <div className="code-header">
                                <span className="code-dot"></span>
                                <span className="code-dot"></span>
                                <span className="code-dot"></span>
                                <span className="code-title">portfolio.js</span>
                            </div>
                            <div className="code-content">
                                <pre>
                                    {`const developer = {
  name: 'Vijay Akash M',
  role: 'Senior Associate Technology L1',
  company: 'Publicis Sapient',
  skills: [
    'Angular', 'React', 
    'C# / .NET Core',
    'SQL', 'MongoDB', 'Agile'
    'Azure', 'Generative AI',
  ],
  passion: 'Building scalable,
           innovative solutions'
};`}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
