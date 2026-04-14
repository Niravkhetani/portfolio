import { useRef, useEffect, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';

const ThreeBackground = lazy(() => import('../../components/ThreeBackground/ThreeBackground.jsx'));

const SKILLS = ['NestJS', 'Node.js', 'React', 'TypeScript', 'Python', 'AWS', 'Docker', 'MongoDB'];

export default function Hero({ aboutDescription, cvUrl }) {
  const badgeRef   = useRef(null);
  const labelRef   = useRef(null);
  const nameRef    = useRef(null);
  const roleRef    = useRef(null);
  const descRef    = useRef(null);
  const ctaRef     = useRef(null);
  const skillsRef  = useRef(null);
  const cardRef    = useRef(null);
  const statsRef   = useRef(null);
  const lineRef    = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const tl = gsap.timeline({ delay: 0.3 });

    // Animated gold line
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' });
      tl.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
    }

    // Badge
    gsap.set(badgeRef.current, { opacity: 0, y: -16 });
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

    // Left column stagger
    const leftEls = [labelRef, nameRef, roleRef, descRef, ctaRef, skillsRef]
      .map(r => r.current).filter(Boolean);
    gsap.set(leftEls, { opacity: 0, y: 48 });
    tl.to(leftEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.2');

    // Right card
    if (!isMobile && cardRef.current) {
      gsap.set(cardRef.current, { opacity: 0, x: 60, rotateY: 8 });
      tl.to(cardRef.current, { opacity: 1, x: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5');
    }

    // Stats
    if (statsRef.current) {
      gsap.set(statsRef.current, { opacity: 0, y: 24 });
      tl.to(statsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }

    // Floating animation on card
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -12,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }

    return () => tl.kill();
  }, []);

  const downloadCV = () => {
    const url = 'https://drive.google.com/file/d/1aDyvm-X3Zad1x-Rj4LQglueutrpNy6lF/view?usp=drive_link';
    window.open(url, '_blank');
  };

  return (
    <section className="hero" id="about">
      {/* Three.js background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Gradient overlays */}
      <div className="hero-overlay-tl" aria-hidden="true" />
      <div className="hero-overlay-br" aria-hidden="true" />

      {/* Available badge */}
      <div className="hero-badge" ref={badgeRef}>
        <span className="hero-badge-pulse" />
        Open to opportunities
      </div>

      <div className="hero-inner">
        {/* ── LEFT ── */}
        <div className="hero-left">
          <div className="hero-line" ref={lineRef} />

          <p className="hero-label" ref={labelRef}>Senior Software Engineer</p>

          <h1 className="hero-name" ref={nameRef}>
            Nirav<br />
            <span className="hero-name-gold">Khetani</span>
          </h1>

          <div className="hero-role" ref={roleRef}>
            <span className="hero-role-prefix">I build&nbsp;</span>
            <TypeAnimation
              sequence={[
                'scalable REST APIs',   1400,
                'backend systems',      1400,
                'cloud architectures',  1400,
                'full-stack products',  1400,
              ]}
              speed={55}
              className="hero-type"
              repeat={Infinity}
            />
          </div>

          <p className="hero-desc" ref={descRef}>
            Experienced Software Developer with 5+ years designing, developing, and deploying scalable solutions. Currently at ManekTech — building APIs, cloud infra, and AI-powered systems.
          </p>

          <div className="hero-cta" ref={ctaRef}>
            <button className="btn-gold" onClick={downloadCV}>
              Download CV
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </button>
            <a href="#contacts" className="btn-outline">
              Let's Talk
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div className="hero-skills" ref={skillsRef}>
            {SKILLS.map(s => (
              <span key={s} className="hero-chip">{s}</span>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Terminal card ── */}
        <div className="hero-right">
          <div className="hero-card" ref={cardRef}>
            {/* Window chrome */}
            <div className="hero-card-chrome">
              <span className="chrome-dot" style={{ background: '#ff5f57' }} />
              <span className="chrome-dot" style={{ background: '#febc2e' }} />
              <span className="chrome-dot" style={{ background: '#28c840' }} />
              <span className="chrome-file">nirav.config.js</span>
            </div>

            {/* Code */}
            <div className="hero-code">
              <div className="code-line"><span className="ck">const</span><span className="cv">&nbsp;dev</span><span className="co">&nbsp;=&nbsp;</span><span className="cb">{'{'}</span></div>
              <div className="code-line code-i1"><span className="cp">name</span><span className="co">: </span><span className="cs">'Nirav Khetani'</span><span className="co">,</span></div>
              <div className="code-line code-i1"><span className="cp">title</span><span className="co">: </span><span className="cs">'Senior Software Engineer'</span><span className="co">,</span></div>
              <div className="code-line code-i1"><span className="cp">stack</span><span className="co">: </span><span className="cb">[</span></div>
              {SKILLS.map((s, i) => (
                <div key={s} className="code-line code-i2">
                  <span className="cs">'{s}'</span>{i < SKILLS.length - 1 && <span className="co">,</span>}
                </div>
              ))}
              <div className="code-line code-i1"><span className="cb">]</span><span className="co">,</span></div>
              <div className="code-line code-i1"><span className="cp">passion</span><span className="co">: </span><span className="cs">'Clean code'</span><span className="co">,</span></div>
              <div className="code-line code-i1"><span className="cp">available</span><span className="co">: </span><span className="cbool">true</span></div>
              <div className="code-line"><span className="cb">{'}'}</span><span className="co">;</span></div>
              <div className="code-line code-cursor">
                <span className="cprompt">▶</span>
                <span className="code-blink">_</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats" ref={statsRef}>
            {[['5+', 'Years Shipped'], ['35%', 'Faster APIs'], ['1K+', 'Req / Day']].map(([n, l], i) => (
              <div key={l} className="hero-stat">
                {i > 0 && <div className="stat-divider" />}
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
