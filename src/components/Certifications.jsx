import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaCertificate, FaTrophy, FaGraduationCap } from 'react-icons/fa';
import './Certifications.css';

const certificationsData = [
    {
        id: 1,
        title: 'Foundational in C# with Microsoft',
        issuer: 'freeCodeCamp | Microsoft Certified',
        type: 'certification'
    },
    {
        id: 2,
        title: 'Azure Fundamentals',
        issuer: 'Microsoft Certified',
        badge: 'AZ-900',
        type: 'certification'
    },
    {
        id: 3,
        title: 'Azure Developer Associate',
        issuer: 'Microsoft Certification',
        badge: 'AZ-204 (Attempted)',
        type: 'certification'
    },
    {
        id: 4,
        title: 'Mastering Full Stack .NET Architecture Development with C#',
        issuer: 'Udemy',
        type: 'course'
    },
    {
        id: 5,
        title: 'SPA Development with Angular, ASP.NET and SQL Server',
        issuer: 'Udemy',
        type: 'course'
    },
    {
        id: 6,
        title: 'Deep Learning Training',
        issuer: 'Internshala',
        type: 'course'
    },
    {
        id: 7,
        title: 'Azure OpenAI with Prompt Engineering',
        issuer: 'Udemy',
        type: 'course'
    }
];

const awardsData = [
    {
        id: 1,
        title: 'Hero of the Moment',
        organization: 'Decos Software Development Pvt. Ltd.',
        date: '2025',
        description: 'Identified and implemented key cost-saving initiative'
    },
    {
        id: 2,
        title: 'Shining Star Award',
        organization: 'Decos Software Development Pvt. Ltd.',
        date: '2024',
        description: 'Delivering high-quality solutions and exceeding performance expectations'
    }
];

const Certifications = () => {
    return (
        <section id="certifications" className="section certifications-section">
            <div className="container">
                <motion.h2
                    className="section-title gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Certifications & Courses
                </motion.h2>

                {/* Certifications */}
                {/* Certifications Marquee */}
                <div className="cert-marquee-container">
                    <div className="cert-marquee-track">
                        {/* Duplicate content for seamless loop */}
                        {[...certificationsData, ...certificationsData, ...certificationsData].map((cert, index) => (
                            <div key={`${cert.id}-${index}`} className="cert-card-glass">
                                <div className="cert-icon">
                                    {cert.type === 'certification' ? <FaCertificate /> : <FaGraduationCap />}
                                </div>
                                <h3>{cert.title}</h3>
                                <p className="cert-issuer">{cert.issuer}</p>
                                {cert.badge && <span className="cert-badge">{cert.badge}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Awards */}
                <motion.h3
                    className="subsection-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <FaTrophy /> Awards
                </motion.h3>
                <div className="awards-grid">
                    {awardsData.map((award, index) => (
                        <motion.div
                            key={award.id}
                            className="award-card glass"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="award-icon">
                                <FaAward />
                            </div>
                            <div className="award-content">
                                <h4>{award.title}</h4>
                                <p className="award-org">{award.organization}</p>
                                <p className="award-date">{award.date}</p>
                                <p className="award-desc">{award.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
