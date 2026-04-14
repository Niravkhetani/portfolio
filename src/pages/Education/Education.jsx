import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Education.css';

const FALLBACK_EDUCATION = [
  {
    college: 'Gujarat University',
    degree: 'Bachelor in Computer Application (BCA)',
    startDate: 'Apr 2017',
    endDate: 'Aug 2020',
    gpa: '8.9 GPA',
    location: 'Ahmedabad, Gujarat, India',
  },
];

export default function Education() {
  const displayItems = FALLBACK_EDUCATION;
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
    });

    const cards = cardRefs.current.filter(Boolean);
    gsap.set(cards, { opacity: 0, x: isMobile ? 0 : 60 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        opacity: 1, x: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
      }),
    });
  }, []);

  return (
    <section className="section edu-section" id="education">
      <div className="edu-header" ref={titleRef}>
        <span className="section-label">Learning</span>
        <h2 className="section-title">Education</h2>
        <div className="gold-line" />
        <p className="section-subtitle">
          Academic foundations that shaped my technical thinking.
        </p>
      </div>

      <div className="edu-grid">
        {displayItems.map((item, i) => (
          <div
            key={i}
            className="edu-card card"
            ref={el => { cardRefs.current[i] = el; }}
          >
            <div className="edu-icon">🎓</div>
            <div className="edu-body">
              <h3 className="edu-college">{item.college}</h3>
              <p className="edu-degree">{item.degree}</p>
              <div className="edu-meta">
                <span className="edu-duration">{item.startDate} — {item.endDate}</span>
                {item.gpa && <span className="edu-gpa">{item.gpa}</span>}
              </div>
              {item.location && <p className="edu-location">📍 {item.location}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
