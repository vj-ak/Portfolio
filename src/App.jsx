import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import SEO from './components/SEO';
import SnowfallManager from './components/SnowfallManager';
import { playStartupSound, initAudio, getAudioContext, playPageTransitionSound } from './utils/soundEffects';

const BlogList = lazy(() => import('./pages/blogs/BlogList'));
const BlogPost = lazy(() => import('./pages/blogs/BlogPost'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Blogs = lazy(() => import('./pages/Blogs'));

function SoundWrapper({ children }) {
  const location = useLocation();

  React.useEffect(() => {
    playPageTransitionSound();
  }, [location]);

  return children;
}

function App() {
  // Only show initial load animation if not on blogs pages
  const [isInitialLoad, setIsInitialLoad] = React.useState(
    !window.location.pathname.startsWith('/blogs')
  );

  React.useEffect(() => {
    const handleInteraction = () => {
      initAudio();
      playStartupSound();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    // Try to play automatically
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'running') {
        playStartupSound();
      } else {
        // If suspended (autoplay policy), wait for interaction
        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      {isInitialLoad && <LoadingSpinner onComplete={() => setIsInitialLoad(false)} />}
      <SoundWrapper>
        <div className="app">
          <SnowfallManager />
          <Suspense fallback={null}>
            <Routes>
              {/* Main Portfolio Route (Root) */}
              <Route path="/" element={
                <div key={isInitialLoad ? 'loading' : 'loaded'}>
                  <SEO
                    title="Vijay Akash M | Full Stack Developer"
                    description="Portfolio of Vijay Akash M, a Full Stack Developer specializing in .NET, React, Angular, and Azure. Explore my projects, skills, and professional experience."
                    url="/"
                    image="https://vijayakash.com/og-image.png"
                  />
                  <Header />
                  <Hero />
                  <About />
                  <Experience />
                  <Projects />
                  <Certifications />
                  <Contact />
                </div>
              } />

              <Route path="/portfolio" element={<Navigate to="/" replace />} />

              <Route path="/blogs" element={<Blogs />}>
                <Route index element={
                  <>
                    <SEO
                      title="Blogs | Vijay Akash M"
                      description="Read technical articles and insights from Vijay Akash M."
                      url="/blogs"
                    />
                    <BlogList />
                  </>
                } />
                <Route path=":slug" element={<BlogPost />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </SoundWrapper>
    </BrowserRouter>
  );
}

export default App;
