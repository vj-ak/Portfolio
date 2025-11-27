import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
import BlogsHeader from './components/BlogsHeader';
const BlogList = lazy(() => import('./pages/blogs/BlogList'));
const BlogPost = lazy(() => import('./pages/blogs/BlogPost'));

function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
          <Routes>
            <Route path="/" element={<><Header /><Home /></>} />
            <Route path="/blogs" element={<><BlogsHeader /><BlogList /></>} />
            <Route path="/blogs/:id" element={<><BlogsHeader /><BlogPost /></>} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
