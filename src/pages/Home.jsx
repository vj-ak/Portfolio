import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';

const About = lazy(() => import('../components/About'));
const Experience = lazy(() => import('../components/Experience'));
const Skills = lazy(() => import('../components/Skills'));
const Contact = lazy(() => import('../components/Contact'));
const Projects = lazy(() => import('../components/Projects'));
const Certifications = lazy(() => import('../components/Certifications'));

const Home = () => {
    return (
        <main>
            <Hero />
            <Suspense fallback={<div style={{ height: '200px' }}>Loading...</div>}>
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Certifications />
                <Contact />
            </Suspense>
        </main>
    );
};

export default Home;
