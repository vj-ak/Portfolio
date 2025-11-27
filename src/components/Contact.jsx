import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('');

        try {
            // EmailJS configuration
            const serviceId = 'service_6keuhdl';
            const templateId = 'template_ekk2dln';
            const publicKey = 'XH7frKrLnptoWLr9L';

            const result = await emailjs.sendForm(
                serviceId,
                templateId,
                form.current,
                publicKey
            );

            console.log('Email sent successfully:', result.text);
            setStatus('success');
            setFormData({ from_name: '', from_email: '', message: '' });

            // Reset form
            form.current.reset();

            // Clear success message after 5 seconds
            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error('Email send failed:', error);
            setStatus('error');

            // Clear error message after 5 seconds
            setTimeout(() => setStatus(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.h2
                    className="section-title gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Get In Touch
                </motion.h2>
                <div className="contact-content">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Let's Talk</h3>
                        <p>
                            I'm currently open to new opportunities and collaborations.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <FaEnvelope className="icon" />
                                <span>VijayAkash248@gmail.com</span>
                            </div>
                        </div>
                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/vj-ak" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn Profile"><FaLinkedin /></a>
                            <a href="https://x.com/VJAK248?t=FIG3xFjXRgjVja0CK2qyAg&s=09" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter Profile"><FaXTwitter /></a>
                        </div>
                    </motion.div>
                    <motion.form
                        ref={form}
                        onSubmit={handleSubmit}
                        className="contact-form glass"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                name="from_name"
                                placeholder="Your Name"
                                value={formData.from_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="from_email"
                                placeholder="Your Email"
                                value={formData.from_email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {status === 'success' && (
                            <div className="form-message success">
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="form-message error">
                                Oops! Something went wrong. Please try again or email me directly.
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
