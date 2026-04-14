import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

const FALLBACK_EXPERIENCE = [
  {
    JobRole: 'Senior Software Engineer',
    companyName: 'ManekTech',
    startDate: 'May 2024',
    endDate: 'Present',
    highlights: [
      'Architected scalable REST APIs using NestJS & Express, handling 1K+ daily requests — improved response time by 35%',
      'Integrated FFmpeg into AWS Lambda with custom layers for serverless video transcoding via Amazon SQS job queues',
      'Built live streaming architecture using Agora with SSE and Redis for scalable event distribution',
      'Developed Stripe-based recurring subscription & billing system for a consultant platform',
      'Designed RAG-based pipeline for real-time chat support using Python, FastAPI, and Pinecone vector DB',
      'Optimized CRM database performance — reduced complex query time from 1.2s to under 300ms',
      'Deployed production system on DigitalOcean using load balancers, Docker registry, and Kubernetes',
    ],
    Skills: ['NestJS', 'Express', 'AWS Lambda', 'SQS', 'Redis', 'Stripe', 'Python', 'FastAPI', 'Pinecone', 'Docker', 'Kubernetes'],
  },
  {
    JobRole: 'SDE - II',
    companyName: 'Rao Information Technology',
    startDate: 'Jun 2023',
    endDate: 'May 2024',
    highlights: [
      'Built a decentralized SaaS deployment management platform with React.js web interfaces and mobile support',
      'Developed a secure real-time messaging platform with OTP auth, group chat, media transfer, video calling, and E2E encryption',
    ],
    Skills: ['React.js', 'Node.js', 'WebSockets', 'OTP Auth', 'E2E Encryption'],
  },
  {
    JobRole: 'Software Developer',
    companyName: 'Ironlist',
    startDate: 'Apr 2021',
    endDate: 'May 2023',
    highlights: [
      'Developed Vendor Portal, Subscription Management Module, and Org Debugging Tools — improved efficiency by 60%+',
      'Built full-stack solutions using Node.js, React.js, Next.js, Python, Flask, MySQL, and Elasticsearch',
      'Managed CI/CD pipelines using Docker, GitHub Actions, and AWS EC2',
      'Engineered a distributed scraping system with proxy-based routing for large-scale data collection',
    ],
    Skills: ['Node.js', 'React.js', 'Next.js', 'Python', 'Flask', 'MySQL', 'Elasticsearch', 'Docker', 'AWS EC2'],
  },
];

export default function Experience() {
  const displayItems = FALLBACK_EXPERIENCE;

  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const lineRef    = useRef(null);
  const cardRefs   = useRef([]);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
    });

    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top' });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        animation: gsap.to(lineRef.current, { scaleY: 1, ease: 'none' }),
      });
    }

    const cards = cardRefs.current.filter(Boolean);
    gsap.set(cards, { opacity: 0, x: isMobile ? 0 : -60 });
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

    return () => ScrollTrigger.getAll()
      .filter(t => t.vars?.trigger === titleRef.current)
      .forEach(t => t.kill());
  }, []);

  return (
    <section className="section exp-section" id="experience" ref={sectionRef}>
      <div className="exp-header" ref={titleRef}>
        <span className="section-label">Career</span>
        <h2 className="section-title">Work Experience</h2>
        <div className="gold-line" />
        <p className="section-subtitle">
          5+ years building scalable systems across startups and product companies.
        </p>
      </div>

      <div className="exp-timeline">
        <div className="exp-line-track">
          <div className="exp-line" ref={lineRef} />
        </div>

        <div className="exp-cards">
          {displayItems.map((item, i) => (
            <div
              key={i}
              className="exp-card card"
              ref={el => { cardRefs.current[i] = el; }}
            >
              <div className="exp-card-dot" />
              <div className="exp-card-header">
                <div>
                  <h3 className="exp-role">{item.JobRole}</h3>
                  <p className="exp-company">{item.companyName}</p>
                </div>
                <span className="exp-duration">
                  {item.startDate} — {item.endDate}
                </span>
              </div>

              {item.highlights?.length > 0 && (
                <ul className="exp-highlights">
                  {item.highlights.map((h, j) => (
                    <li key={j} className="exp-highlight">
                      <span className="exp-highlight-dot">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {!item.highlights && item.description && (
                <p className="exp-desc">{item.description}</p>
              )}

              {item.Skills?.length > 0 && (
                <div className="exp-skills">
                  {item.Skills.map(s => (
                    <span key={s} className="exp-skill">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
