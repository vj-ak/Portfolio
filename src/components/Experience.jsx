import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const experienceData = [
    {
        id: 1,
        company: 'Publicis Sapient',
        role: 'Senior Associate Technology L1',
        period: 'Dec 2025 - Present',
        location: 'Bangalore, Karnataka',
        description: [
            'Leading development of enterprise-scale applications using modern cloud-native architectures.',
            'Architecting and implementing microservices-based solutions with focus on scalability and performance.',
            'Mentoring junior developers and conducting technical design reviews.',
            'Collaborating with cross-functional teams to deliver high-quality solutions for global clients.',
            'Driving best practices in DevOps, CI/CD, and agile methodologies.'
        ]
    },
    {
        id: 2,
        company: 'Decos Software Development Pvt. Ltd.',
        role: 'Software Engineer',
        period: 'Jan 2024 - Nov 2025',
        location: 'Pune, Maharashtra',
        description: [
            'Developed a custom RBAC system using ASP.NET Core & Entity Framework Core.',
            'Built a real-time Angular admin UI to manage users, roles, and permissions.',
            'Engineered secure REST APIs with JWT authentication.',
            'Automated deployments with Azure DevOps CI/CD, reducing release cycles by 30%.',
            'Improved scalability and performance in .NET + Angular applications.'
        ]
    },
    {
        id: 3,
        company: 'Decos Software Development Pvt. Ltd.',
        role: 'Associate Software Engineer',
        period: 'Aug 2022 – Dec 2023',
        location: 'Pune, Maharashtra',
        description: [
            'Built a Generative AI-powered wiki assistant using Azure OpenAI.',
            'Integrated Azure OpenAI with internal systems and custom UIs.',
            'Developed a custom insights dashboard by integrating Azure DevOps API.',
            'Contributed to modular components with .NET Core and Angular.',
            'Supported backend optimization, debugging, and unit testing.'
        ]
    },
    {
        id: 4,
        company: 'Ask Technology',
        role: 'Software Programmer (Intern)',
        period: 'May 2022 – Aug 2022',
        location: 'Chennai, Tamil Nadu',
        description: [
            'Assisted in backend software development using C# and .NET.',
            'Conducted manual testing of core functionalities.',
            'Prepared test case documentation and collaborated with developers.',
            'Supported debugging and performance optimization activities.'
        ]
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section experience-section">
            <div className="container">
                <motion.h2
                    className="section-title gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Work Experience
                </motion.h2>
                <div className="timeline">
                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className="timeline-item"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="timeline-content glass">
                                <span className="date">{exp.period}</span>
                                <h3>{exp.role}</h3>
                                <h4>{exp.company}</h4>
                                <p className="location">{exp.location}</p>
                                <ul className="description-list">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
