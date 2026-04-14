import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    icon: '🖥️',
    skills: ['Next.js', 'React.js', 'TypeScript', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: ['NestJS', 'Node.js', 'TypeScript', 'Python', 'FastAPI', 'Express'],
  },
  {
    category: 'Database',
    icon: '🗄️',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Elasticsearch', 'DynamoDB'],
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁️',
    skills: ['AWS S3', 'AWS Lambda', 'AWS SQS', 'AWS CloudFormation', 'Azure VM', 'DigitalOcean', 'Docker', 'Kubernetes'],
  },
  {
    category: 'AI & Vector',
    icon: '🤖',
    skills: ['RAG', 'Vector DB', 'Pinecone', 'LangChain'],
  },
];

export default function Skills() {
  const titleRef = useRef(null);
  const groupRefs = useRef([]);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
    });

    const groups = groupRefs.current.filter(Boolean);
    gsap.set(groups, { opacity: 0, y: 32 });
    ScrollTrigger.batch(groups, {
      start: 'top 90%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }),
    });
  }, []);

  return (
    <section className="section skills-section" id="skills">
      <div className="skills-header" ref={titleRef}>
        <span className="section-label">Expertise</span>
        <h2 className="section-title">Technical Skills</h2>
        <div className="gold-line" />
        <p className="section-subtitle">
          Technologies I work with daily to build production-grade systems.
        </p>
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS.map((group, i) => (
          <div
            key={group.category}
            className="skills-card card"
            ref={el => { groupRefs.current[i] = el; }}
          >
            <div className="skills-card-header">
              <span className="skills-icon">{group.icon}</span>
              <h3 className="skills-category">{group.category}</h3>
            </div>
            <div className="skills-chips">
              {group.skills.map(s => (
                <span key={s} className="skills-chip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
