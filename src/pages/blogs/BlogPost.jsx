import React, { useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { blogPosts } from './blogData';
import './Blogs.css';

const BlogPost = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleBack = (e) => {
        e.preventDefault();
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate('/blogs');
        }
    };

    if (!post) {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                <h2>Post not found</h2>
                <Link to="/blogs" className="read-more">← Back to Posts</Link>
            </div>
        );
    }

    return (
        <HelmetProvider>
            <section className="section blog-post-section">
                <Helmet>
                    <title>{post.title} | Vijay Akash M</title>
                    <meta name="description" content={post.excerpt} />
                    <meta property="og:title" content={post.title} />
                    <meta property="og:description" content={post.excerpt} />
                    <meta property="og:image" content={post.image} />
                </Helmet>

                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <a href="/blogs" onClick={handleBack} className="back-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to Posts
                        </a>

                        <article className="blog-full-content glass">
                            <div className="blog-header-content">
                                <h1 className="blog-main-title gradient-text">{post.title}</h1>
                                <div className="blog-meta-single">
                                    <span className="blog-date">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        {post.date}
                                    </span>
                                    <div className="blog-tags">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {post.image && (
                                <div className="blog-hero-image">
                                    <img src={post.image} alt={post.title} />
                                </div>
                            )}

                            <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                        </article>
                    </motion.div>
                </div>
            </section>
        </HelmetProvider>
    );
};

export default BlogPost;
