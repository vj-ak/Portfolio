import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Projects = lazy(() => import('../components/Projects'));
const Certifications = lazy(() => import('../components/Certifications'));

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Suspense fallback={<div style={{ height: '200px' }}>Loading...</div>}>
                <Projects />
                <Certifications />
            </Suspense>
            <Contact />
        </main>
    );
};

export default Home;
