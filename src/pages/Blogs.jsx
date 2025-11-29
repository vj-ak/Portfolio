import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import './Blogs.css';

const blogPosts = [
    {
        id: 1,
        title: "Getting Started with .NET Core 8",
        excerpt: "Explore the new features and performance improvements in the latest version of .NET Core. Learn how to migrate your existing applications.",
        date: "Nov 15, 2025",
        tags: [".NET Core", "C#", "Backend"],
        link: "#"
    },
    {
        id: 2,
        title: "Building Scalable Microservices with Azure",
        excerpt: "A comprehensive guide to designing and deploying microservices architecture using Azure Kubernetes Service and Azure Functions.",
        date: "Oct 28, 2025",
        tags: ["Azure", "Microservices", "Cloud"],
        link: "#"
    },
    {
        id: 3,
        title: "Angular 17: What's New?",
        excerpt: "Dive into the new control flow syntax, deferred loading, and signal-based reactivity introduced in Angular 17.",
        date: "Oct 10, 2025",
        tags: ["Angular", "Frontend", "TypeScript"],
        link: "#"
    },
    {
        id: 4,
        title: "Optimizing SQL Server Performance",
        excerpt: "Best practices for indexing, query optimization, and database tuning to ensure your SQL Server runs at peak performance.",
        date: "Sep 22, 2025",
        tags: ["SQL Server", "Database", "Performance"],
        link: "#"
    },
    {
        id: 5,
        title: "Introduction to Generative AI for Developers",
        excerpt: "Learn the basics of Generative AI and how to integrate OpenAI models into your applications using Azure OpenAI Service.",
        date: "Sep 05, 2025",
        tags: ["AI", "Generative AI", "Azure OpenAI"],
        link: "#"
    },
    {
        id: 6,
        title: "Mastering Docker for DevOps",
        excerpt: "A step-by-step tutorial on containerizing applications, managing images, and orchestrating containers with Docker Compose.",
        date: "Aug 18, 2025",
        tags: ["Docker", "DevOps", "Containers"],
        link: "#"
    }
];

const Blogs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const handleSearchChange = (e) => {
        const query = e.target.value;
        if (query) {
            setSearchParams({ search: query });
        } else {
            setSearchParams({});
        }
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
                                        <span className="blog-date">{blog.date}</span>
                                    </div>
                                    <h3 className="blog-title">{blog.title}</h3>
                                    <p className="blog-excerpt">{blog.excerpt}</p>
                                    <div className="blog-tags">
                                        {blog.tags.map(tag => (
                                            <span key={tag} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <a href={blog.link} className="read-more">Read Article →</a>
                                </div>
                            </motion.article>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No articles found matching &quot;{searchQuery}&quot;</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
