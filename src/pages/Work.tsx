import { useEffect, useRef } from 'react';

type Project = {
  title: string;
  description: string;
  gradient: string;
  detail: string;
  imageUrl?: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: 'Pixelary',
    description: '🚀A modern design-and-development studio website built to showcase the intersection of thoughtful design and solid engineering. Pixelary presents a clean, product-first digital experience that emphasizes clarity, performance, and scalability—crafted for brands that value execution as much as aesthetics.',
    gradient: 'from-blue-900/40 to-black',
    detail:
      '',
    imageUrl: "/pixelary.png", // Add your image path here like "/images/ctf-winner.jpg"
    link: "https://pixelary-studio.vercel.app", // Add your external link URL here
  },
  {
    title: 'Dodge Challenger',
    description: 'A high-octane digital tribute to the legendary Dodge Challenger. This immersive website captures the raw power and aggressive design of the American muscle icon, featuring stunning visuals, detailed performance specs, and a smooth user experience that feels as fast as the car itself.',
    gradient: 'from-emerald-900/40 to-black',
    detail:
      '',
    imageUrl: "/dodge_challenger.png", 
    link: 'https://dodgechallanger.in',
  },
  {
    title: 'Elyaitra',
    description: 'Elyaitra is an AI-powered exam-focused learning platform built to help students study smarter, faster, and with absolute clarity. Designed around college syllabi and real exam needs, Elyaitra delivers precise explanations, targeted preparation, and distraction-free learning—so students focus only on what truly matters for marks.',
    gradient: 'from-purple-900/40 to-black',
    detail:
      '',
    imageUrl: "/elyaitra.png", 
    link: "https://www.elyaitra.com",
  },
  {
    title: 'Smart Hostel Mess Management System',
    description: 'Smart Hostel Mess is a modern, digital solution for efficient hostel mess operations that reduces food waste, eliminates long queues, and delivers real-time insights for students, staff, and administrators. Built to streamline mess workflows, enhance transparency, and optimize resource planning on campus, it transforms the mess experience for every stakeholder.',
    gradient: 'from-blue-900/40 to-black',
    detail: '',
    imageUrl: "/smart_mess.png", 
    link: "https://smarthostelmess.vercel.app/",
  },
  {
    title: 'Lab Portfolio',
    description: 'A modern, interactive portfolio designed to showcase projects, achievements, and technical expertise through clean UI and immersive user experiences. Built with a focus on performance, minimal design, and smooth interactions, it reflects a design-driven development approach while presenting work in a structured and impactful way.',
    gradient: 'from-blue-900/40 to-black',
    detail: '',
    imageUrl: "/lab_ashu.png", 
    link: "",
  },
  // {
  //   title: '',
  //   description: '',
  //   tags: ['Python', 'Web Sec', 'RSA'],
  //   gradient: 'from-blue-900/40 to-black',
  //   detail: '',
  //   imageUrl: "", 
  //   link: "",
  // },
];

const MAX_TILT = 5;

  // Stack 3 variables eliminated
export default function Work() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
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
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
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
            <a
              key={project.title}
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-[#111113]/40 border border-white/[0.08] p-2 sm:p-2.5 shadow-2xl backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(255,255,255,0.12)] hover:border-white/20 text-left w-full translate-y-8 opacity-0 focus:outline-none focus:ring-2 focus:ring-white/20"
              style={{
                transitionDelay: `${index * 120}ms`,
              } as React.CSSProperties}
              onMouseMove={(event) => handlePointerMove(event as any, index)}
              onMouseLeave={() => handlePointerLeave(index)}
            >
              {/* Spotlight Effect element mapped to CSS custom variables */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-[32px]"
                style={{
                  background: 'radial-gradient(800px circle at var(--mx) var(--my), rgba(255,255,255,0.06), transparent 40%)'
                }}
              />

              {/* Card Internal Body wrapper to sit above spotlight */}
              <div className="relative z-10 flex flex-col h-full w-full bg-[#050505]/60 rounded-[22px] sm:rounded-[24px] overflow-hidden backdrop-blur-md border border-white/[0.04]">
                
                {/* Thumbnail Area */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden flex-shrink-0 border-b border-white/[0.05]">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 pointer-events-none" 
                    />
                  ) : (
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transform transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110`} 
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 ease-out pointer-events-none" />
                </div>

                {/* Content Box */}
                <div className="flex flex-col flex-1 p-6 sm:p-8 relative">
                  {/* Space where tags used to be */}
                  
                  <div className="mt-auto flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
                        {project.description}
                      </p>
                    </div>
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} 
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors z-20 group/link"
                        title="Visit Link"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-300">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}