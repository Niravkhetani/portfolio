import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

const PROJECTS = [
  {
    title: 'Live Streaming Platform',
    emoji: '📡',
    description:
      'Real-time live streaming architecture using Agora SDK with Server-Sent Events (SSE) for live donation and message updates. Redis handles scalable event distribution across multiple server instances.',
    stack: ['NestJS', 'Agora', 'SSE', 'Redis', 'Node.js'],
    highlights: ['Real-time donations & messages', 'Redis pub/sub for scalability', 'SSE for low-latency updates'],
    type: 'Backend',
  },
  {
    title: 'RAG-Based Chat Support',
    emoji: '🤖',
    description:
      'AI-powered real-time chat support pipeline using Retrieval-Augmented Generation. Semantic chunking of PDF documents stored in Pinecone vector DB, queried via FastAPI for intelligent responses.',
    stack: ['Python', 'FastAPI', 'Pinecone', 'LangChain', 'RAG'],
    highlights: ['PDF semantic chunking', 'Vector similarity search', 'Real-time AI responses'],
    type: 'AI / Backend',
  },
  {
    title: 'Serverless Video Transcoding',
    emoji: '🎬',
    description:
      'Serverless video processing pipeline integrating FFmpeg and FFprobe into AWS Lambda via custom layers. Amazon SQS manages job queues for scalable, async media transcoding workloads.',
    stack: ['AWS Lambda', 'FFmpeg', 'Amazon SQS', 'Node.js', 'AWS S3'],
    highlights: ['Custom Lambda layers', 'SQS job queue management', 'Scalable async processing'],
    type: 'Cloud / DevOps',
  },
  {
    title: 'SaaS Deployment Platform',
    emoji: '🚀',
    description:
      'Decentralized SaaS deployment management platform enabling organizations to securely deploy internal services and manage external applications as private access apps within a closed ecosystem.',
    stack: ['React.js', 'Node.js', 'Docker', 'Mobile'],
    highlights: ['Private app ecosystem', 'Secure internal deployments', 'React.js + mobile support'],
    type: 'Full-Stack',
  },
  {
    title: 'Secure Messaging Platform',
    emoji: '💬',
    description:
      'Real-time messaging platform with OTP authentication, group chat, media transfer, presence indicators, read receipts, and video calling — all with end-to-end encryption.',
    stack: ['Node.js', 'WebSockets', 'E2E Encryption', 'OTP Auth', 'WebRTC'],
    highlights: ['End-to-end encryption', 'Video calling via WebRTC', 'Group chat & media transfer'],
    type: 'Full-Stack',
  },
  {
    title: 'Digital Consulting Platform',
    emoji: '🤝',
    description:
      'Full-featured platform connecting consultants and franchisors — enabling profile management, meeting scheduling, and subscription-based access control. Built with a clean multi-role architecture for both consultant and franchisor workflows.',
    stack: ['NestJS', 'Stripe', 'Node.js', 'PostgreSQL', 'React.js'],
    highlights: [
      'Multi-role system: consultants & franchisors with separate dashboards',
      'Meeting booking engine with calendar availability & confirmation flow',
      'Stripe recurring subscriptions with automated billing & tier management',
      'Secure connection requests between consultants and franchisors',
    ],
    type: 'Full-Stack',
  },
];

const TYPE_COLORS = {
  'Backend':        { bg: 'rgba(212,168,67,0.1)',  border: 'rgba(212,168,67,0.3)',  text: '#d4a843' },
  'AI / Backend':   { bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.3)',  text: '#a78bfa' },
  'Cloud / DevOps': { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.3)',   text: '#4ade80' },
  'Full-Stack':     { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)',  text: '#60a5fa' },
};

export default function Projects() {
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
    gsap.set(cards, { opacity: 0, y: isMobile ? 20 : 40 });
    ScrollTrigger.batch(cards, {
      start: 'top 92%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        opacity: 1, y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
      }),
    });

    // Hover tilt on desktop
    if (!isMobile) {
      cards.forEach(card => {
        if (!card) return;
        card.addEventListener('mouseenter', () =>
          gsap.to(card, { y: -6, duration: 0.25, ease: 'power2.out' })
        );
        card.addEventListener('mouseleave', () =>
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
        );
      });
    }
  }, []);

  return (
    <section className="section projects-section" id="projects">
      <div className="projects-header" ref={titleRef}>
        <span className="section-label">Work</span>
        <h2 className="section-title">Featured Projects</h2>
        <div className="gold-line" />
        <p className="section-subtitle">
          A selection of systems and products I've built — from AI pipelines to cloud infrastructure.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => {
          const typeStyle = TYPE_COLORS[project.type] || TYPE_COLORS['Backend'];
          return (
            <div
              key={project.title}
              className="project-card card"
              ref={el => { cardRefs.current[i] = el; }}
            >
              {/* Top row */}
              <div className="project-top">
                <span className="project-emoji">{project.emoji}</span>
                <span
                  className="project-type"
                  style={{
                    background: typeStyle.bg,
                    border: `1px solid ${typeStyle.border}`,
                    color: typeStyle.text,
                  }}
                >
                  {project.type}
                </span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Highlights */}
              <ul className="project-highlights">
                {project.highlights.map(h => (
                  <li key={h} className="project-highlight">
                    <span className="project-highlight-dot">▹</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="project-stack">
                {project.stack.map(s => (
                  <span key={s} className="project-chip">{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
