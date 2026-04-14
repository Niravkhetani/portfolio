import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contacts' },
];

export default function Navbar({ githubLink, linkedinLink }) {
  const navRef     = useRef(null);
  const logoRef    = useRef(null);
  const linksRef   = useRef([]);
  const menuRef    = useRef(null);
  const stRef      = useRef(null);
  const [open, setOpen] = useState(false);

  // Entrance animation
  useEffect(() => {
    const targets = [logoRef.current, ...linksRef.current].filter(Boolean);
    gsap.set(targets, { opacity: 0, y: -24 });
    gsap.to(targets, {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.07,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, []);

  // Scroll glass effect
  useEffect(() => {
    stRef.current = ScrollTrigger.create({
      start: 'top -80',
      onEnter:     () => navRef.current?.classList.add('scrolled'),
      onLeaveBack: () => navRef.current?.classList.remove('scrolled'),
    });
    return () => stRef.current?.kill();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open) {
      gsap.set(menu, { height: 'auto', opacity: 0 });
      gsap.to(menu, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    } else {
      gsap.to(menu, { opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: () => gsap.set(menu, { height: 0 }) });
    }
  }, [open]);

  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-inner">
        {/* Name wordmark — replaces logo */}
        <a href="#about" className="navbar-wordmark" ref={logoRef} onClick={e => handleNav(e, '#about')}>
          NK<span className="navbar-wordmark-dot">.</span>
        </a>

        {/* Desktop links */}
        <div className="navbar-links">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              ref={el => { linksRef.current[i] = el; }}
              onClick={e => handleNav(e, item.href)}
              className="navbar-link"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="navbar-social" ref={el => { linksRef.current[NAV_ITEMS.length] = el; }}>
          {linkedinLink && (
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="navbar-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="navbar-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`navbar-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className="navbar-mobile" ref={menuRef} style={{ height: 0, opacity: 0 }}>
        {NAV_ITEMS.map(item => (
          <a key={item.href} href={item.href} className="navbar-mobile-link"
            onClick={e => handleNav(e, item.href)}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
