import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { blogPosts } from './blogData';
import './Blogs.css';

const BlogList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const searchQuery = searchParams.get('search') || '';

    const handleSearchChange = (e) => {
        const query = e.target.value;
        if (query) {
            setSearchParams({ search: query });
        } else {
            setSearchParams({});
        }
    };

    const isNew = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - postDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
    };

    const filteredBlogs = blogPosts.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <section className="section blogs-section">
            <div className="container">
                <motion.div
                    className="blogs-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title gradient-text">Vision & Ventures</h2>
                    <p className="blogs-subtitle">Thoughts, tutorials, and tech deep dives.</p>

                    <div className="search-container glass">
                        <div className="search-icon-wrapper">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title or tag..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                className="clear-btn"
                                onClick={() => setSearchParams({})}
                                aria-label="Clear search"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </div>
                </motion.div>

                <div className="blogs-grid">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, index) => (
                            <motion.article
                                key={blog.id}
                                className="blog-card glass"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span className="blog-date">
                                            {blog.date}
                                            {isNew(blog.date) && <span className="new-badge">New</span>}
                                        </span>
                                    </div>
                                    <h3 className="blog-title">{blog.title}</h3>
                                    <p className="blog-excerpt">{blog.excerpt}</p>
                                    <div className="blog-tags">
                                        {blog.tags.map(tag => (
                                            <span key={tag} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <Link
                                        to={`/blogs/${blog.slug}`}
                                        state={{ from: location }}
                                        className="read-more"
                                    >
                                        Read Article →
                                    </Link>
                                </div>
                            </motion.article>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No articles found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogList;
