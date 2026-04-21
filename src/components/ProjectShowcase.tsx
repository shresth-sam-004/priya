import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: 'Pixelary',
    description: '🚀A modern design-and-development studio website built to showcase the intersection of thoughtful design and solid engineering. Pixelary presents a clean, product-first digital experience that emphasizes clarity, performance, and scalability—crafted for brands that value execution as much as aesthetics.',
    gradient: 'from-blue-900/40 to-black',
    imageUrl: '/pixelary.png', // <-- Add your image path here (e.g., '/projects/ctf.png')
    link: 'https://pixelary-studio.vercel.app',    // <-- Add your project URL here
  },
  {
    id: 2,
    title: 'Dodge Challenger',
    description: '🚀A high-octane digital tribute to the legendary Dodge Challenger. This immersive website captures the raw power and aggressive design of the American muscle icon, featuring stunning visuals, detailed performance specs, and a smooth user experience that feels as fast as the car itself.',
    gradient: 'from-emerald-900/40 to-black',
    imageUrl: '/dodge_challenger.png', 
    link: 'https://dodgechallanger.in/',
  },
  {
    id: 3,
    title: 'Elyaitra',
    description: '🚀Elyaitra is an AI-powered exam-focused learning platform built to help students study smarter, faster, and with absolute clarity. Designed around college syllabi and real exam needs, Elyaitra delivers precise explanations, targeted preparation, and distraction-free learning—so students focus only on what truly matters for marks.',
    gradient: 'from-purple-900/40 to-black',
    imageUrl: '/elyaitra.png', 
    link: 'https://www.elyaitra.com/',
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade in/slide up for cards when scrolling into view
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // trigger when top of section is 80% down viewport
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative z-40 w-full min-h-screen bg-[#0a0a0c] py-24 md:py-32 px-6 sm:px-10 lg:px-20 flex flex-col justify-center"
    >
      {/* Delicate Noise Texture Overlay for depth */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.85] flex flex-col">
              <span className="text-white">Featured</span>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>Works.</span>
            </h2>
            <p className="text-base md:text-xl text-white/50 tracking-wide font-light max-w-lg">
              Engineering complex systems disguised as minimal, effortless experiences.
            </p>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => (
            <a
              key={project.id}
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { cardsRef.current[idx] = el; }}
              onMouseMove={handleMouseMove}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-[#111113]/40 border border-white/[0.08] p-2 sm:p-2.5 shadow-2xl backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(255,255,255,0.12)] hover:border-white/20 cursor-pointer block"
            >
              {/* Spotlight Effect element mapped to CSS custom variables */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-[32px]"
                style={{
                  background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)'
                }}
              />

              {/* Card Internal Body wrapper to sit above spotlight */}
              <div className="relative z-10 flex flex-col h-full bg-[#050505]/60 rounded-[22px] sm:rounded-[24px] overflow-hidden backdrop-blur-md border border-white/[0.04]">
                
                {/* Thumbnail Area */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden flex-shrink-0 border-b border-white/[0.05]">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transform transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110`} />
                  )}
                  {/* Overlay to ensure text legibility and cinematic mood */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 ease-out" />
                  
                  {/* Subtle float indicator over thumbnail */}
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur-2xl border border-white/10 flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] delay-75 shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>

                {/* Content Box */}
                <div className="flex flex-col flex-1 p-6 sm:p-8 relative">
                  {/* Space where tech tags used to be */}
                  
                  <div className="mt-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
                      {project.description}
                    </p>
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>

        {/* Centered View All Button */}
        <div className="mt-16 md:mt-20 flex justify-center w-full">
          <button 
            onClick={() => navigate('/work')}
            className="group flex items-center gap-4 px-8 py-4 rounded-full bg-[#111111] hover:bg-[#1a1a1a] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:-translate-y-1"
          >
            <span className="uppercase tracking-[0.15em] text-sm font-bold text-white/90">View All Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90 transform group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
