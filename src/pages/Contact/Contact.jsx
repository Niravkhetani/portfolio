import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { NODE_SERVER_URL } from '../../utils/const.js';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const leftRef    = useRef(null);
  const formRef    = useRef(null);
  const btnRef     = useRef(null);

  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const targets = [titleRef.current, leftRef.current, formRef.current].filter(Boolean);
    gsap.set(targets, { opacity: 0, y: isMobile ? 0 : 40 });
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? 'top 95%' : 'top 80%',
      once: true,
      onEnter: () => gsap.to(targets, {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      }),
    });
    return () => ScrollTrigger.getAll()
      .filter(t => t.vars?.trigger === sectionRef.current)
      .forEach(t => t.kill());
  }, []);

  const onChange = useCallback((e) => {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  }, []);

  const isValid = Object.values(fields).every(v => v.trim());

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || status === 'sending') return;
    setStatus('sending');
    gsap.to(btnRef.current, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
    try {
      await axios({ url: `${NODE_SERVER_URL}/${fields.email}`, method: 'GET', data: fields });
      setStatus('success');
      setFields({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      gsap.to(formRef.current, { x: 6, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' });
    }
  };

  return (
    <section className="section contact-section" id="contacts" ref={sectionRef}>
      <div className="contact-header" ref={titleRef}>
        <span className="section-label">Contact</span>
        <h2 className="section-title">Get In Touch</h2>
        <div className="gold-line" />
      </div>

      <div className="contact-inner">
        {/* Left info */}
        <div className="contact-info" ref={leftRef}>
          <p className="contact-tagline">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
          <div className="contact-items">
            {[
              { icon: '📧', label: 'Email', value: 'niravkhetani@example.com' },
              { icon: '📍', label: 'Location', value: 'India' },
              { icon: '💼', label: 'Status', value: 'Open to opportunities' },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <span className="contact-item-icon">{item.icon}</span>
                <div>
                  <p className="contact-item-label">{item.label}</p>
                  <p className="contact-item-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="contact-form card" ref={formRef} onSubmit={onSubmit} noValidate>
          {status === 'success' && (
            <div className="contact-banner contact-banner--success">
              ✅ Message sent! I'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="contact-banner contact-banner--error">
              ⚠️ Something went wrong. Please try again.
            </div>
          )}

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" name="name" placeholder="Nirav Khetani"
                value={fields.name} onChange={onChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" name="email" type="email" placeholder="you@example.com"
                value={fields.email} onChange={onChange} required />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="cf-subject">Subject</label>
            <input id="cf-subject" name="subject" placeholder="What's this about?"
              value={fields.subject} onChange={onChange} required />
          </div>

          <div className="form-field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows={5}
              placeholder="Write your message here…"
              value={fields.message} onChange={onChange} required />
          </div>

          <button
            ref={btnRef}
            type="submit"
            className="btn-gold form-submit"
            disabled={!isValid || status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
