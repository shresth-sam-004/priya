import { useEffect, useRef, useState } from 'react';

type Project = {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  detail: string;
};

const projects: Project[] = [
  {
    title: 'CTF Cryptography Solver',
    description: 'Automates cipher analysis for complex CTF challenge pipelines.',
    tags: ['Python', 'Web Security', 'Crypto', 'Automation'],
    gradient: 'linear-gradient(135deg, #101826 0%, #13203d 45%, #2e4f8f 100%)',
    detail:
      'A modular cryptography toolkit with pattern detection, keyspace heuristics, and automated challenge-specific solving strategies.',
  },
  {
    title: 'AI Portfolio Generator',
    description: 'Generates polished portfolio sites from prompts and data.',
    tags: ['React', 'Node.js', 'LLM', 'TypeScript'],
    gradient: 'linear-gradient(135deg, #1a1124 0%, #221739 45%, #5b2e8f 100%)',
    detail:
      'A prompt-to-portfolio system that transforms user content into responsive, theme-aware websites with accessible components and animations.',
  },
  {
    title: 'Secure Login System',
    description: 'Hardened auth flow with threat detection and audit logs.',
    tags: ['Node.js', 'JWT', '2FA', 'Security'],
    gradient: 'linear-gradient(135deg, #12201e 0%, #142f2d 40%, #1f7f74 100%)',
    detail:
      'A production-grade authentication stack featuring adaptive rate limiting, anomaly signals, and privacy-conscious session architecture.',
  },
];

const MAX_TILT = 5;

export default function Work() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('project-card--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
  ) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    const ratioX = relativeX / rect.width - 0.5;
    const ratioY = relativeY / rect.height - 0.5;

    card.style.setProperty('--mx', `${relativeX}px`);
    card.style.setProperty('--my', `${relativeY}px`);
    card.style.setProperty('--rx', `${-ratioY * MAX_TILT}deg`);
    card.style.setProperty('--ry', `${ratioX * MAX_TILT}deg`);
  };

  const handlePointerLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <section className="min-h-screen w-full relative pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="work-noise pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <header className="max-w-3xl mb-12 md:mb-16">
          <p className="text-white/50 uppercase tracking-[0.22em] text-xs md:text-sm mb-4">Selected Work</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.06]">
            Premium project showcases with smooth, product-grade interactions.
          </h1>
          <p className="mt-5 text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
            Minimal glass cards with subtle depth, motion, and strong visual hierarchy inspired by Apple and Stripe.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-8">
          {projects.map((project, index) => (
            <button
              key={project.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              type="button"
              className="project-card"
              style={{
                transitionDelay: `${index * 120}ms`,
                ['--project-gradient' as '--project-gradient']: project.gradient,
              }}
              onMouseMove={(event) => handlePointerMove(event, index)}
              onMouseLeave={() => handlePointerLeave(index)}
              onClick={() => setActiveProject(project)}
            >
              <div className="project-thumb" aria-hidden="true" />
              <div className="project-overlay" aria-hidden="true" />

              <div className="p-6 md:p-7 relative z-20 text-left">
                <div className="flex items-start justify-between gap-5 mb-3">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">{project.title}</h2>
                  <span className="project-indicator" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <p className="text-white/70 text-sm md:text-[0.95rem] leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-6" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setActiveProject(null)} />
          <div className="relative w-full max-w-2xl rounded-3xl p-7 md:p-9 bg-[rgba(12,15,24,0.78)] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <p className="uppercase tracking-[0.2em] text-xs text-white/45 mb-3">Project Detail</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">{activeProject.title}</h3>
            <p className="text-white/75 leading-relaxed mb-7">{activeProject.detail}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="tech-pill">
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
