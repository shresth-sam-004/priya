import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'C++', 'Java', 'SQL', 'PHP', 'JSX', 'XML'];

// Global mouse tracker for the repulsion effect
let globalMouse = { x: -1000, y: -1000 };

const SkillCard = ({ skill, index }: { skill: string; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics state
  const state = useRef({
    x: 0,
    y: 0,
    vx: (Math.random() - 0.5) * 1, // Random initial drift velocity
    vy: (Math.random() - 0.5) * 1,
    mass: 1 + Math.random() * 0.5,
  });

  // Framer Motion values for 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the tilt values using springs
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });
  const scale = useSpring(1, { damping: 20, stiffness: 200 });

  // Soft spotlight gradient that follows cursor inside card
  const spotLightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { damping: 20, stiffness: 150 });
  const spotLightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { damping: 20, stiffness: 150 });

  // Main Physics Loop for drifting and repulsion
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 16.66; // Normalize to 60fps
      lastTime = time;

      if (!containerRef.current) return;

      const s = state.current;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance to cursor
      const dx = centerX - globalMouse.x;
      const dy = centerY - globalMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion force
      const maxRepulsionRadius = 100;
      if (dist < maxRepulsionRadius && dist > 0.1) {
        const force = (maxRepulsionRadius - dist) / maxRepulsionRadius; // 0 to 1
        const forceX = (dx / dist) * force * 1.5;
        const forceY = (dy / dist) * force * 1.5;
        
        s.vx += (forceX / s.mass) * dt;
        s.vy += (forceY / s.mass) * dt;
      }

      // Restoring force (bring back to center 0,0)
      const k = 0.05; // Stronger Spring stiffness for tighter grouping
      s.vx += (-s.x * k * dt);
      s.vy += (-s.y * k * dt);

      // Damping (friction)
      s.vx *= Math.pow(0.85, dt);
      s.vy *= Math.pow(0.85, dt);

      // Add tiny random drift occasionally
      if (Math.random() < 0.02) {
        s.vx += (Math.random() - 0.5) * 0.3;
        s.vy += (Math.random() - 0.5) * 0.3;
      }

      // Position update
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      // Apply transform to the outer container (drifting wrapper)
      containerRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0px) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const hoverY = useSpring(0, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    scale.set(1.02);
    hoverY.set(-4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
    hoverY.set(0);
  };

  // Parallax depth assigned by index
  const zIndex = 10 - (index % 3);
  const baseScale = 1 - (index % 3) * 0.05; // Slightly vary visual depth

  return (
    <div 
      className="absolute top-1/2 left-1/2 flex justify-center items-center"
      ref={containerRef}
      style={{ zIndex, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          scale: useTransform(() => scale.get() * baseScale),
          y: hoverY,
          transformPerspective: 1000,
        }}
        // Shrink card drastically on mobile to fit 3 across, full size on desktop
        className="relative group w-[115px] sm:w-[150px] lg:w-[170px] h-[90px] sm:h-[110px] lg:h-[120px] rounded-[14px] lg:rounded-[16px] bg-black/[0.02] backdrop-blur-[8px] border border-black/[0.06] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_-8px_rgba(0,0,0,0.06)] overflow-hidden cursor-crosshair flex flex-col will-change-transform"
      >
        
        {/* Soft Spotlight Gradient over the card */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [spotLightX, spotLightY],
              ([x, y]) => `radial-gradient(circle 120px at ${x}% ${y}%, rgba(0,0,0,0.05), transparent 80%)`
            )
          }}
        />

        {/* Compact Apple-style Browser Top Bar */}
        <div className="w-full flex items-center justify-start gap-[3px] p-2 border-b border-black/[0.04] bg-black/[0.01]">
          <div className="w-[6px] h-[6px] sm:w-2 sm:h-2 rounded-full bg-[#FF5F56] opacity-80" />
          <div className="w-[6px] h-[6px] sm:w-2 sm:h-2 rounded-full bg-[#FFBD2E] opacity-80" />
          <div className="w-[6px] h-[6px] sm:w-2 sm:h-2 rounded-full bg-[#27C93F] opacity-80" />
        </div>

        {/* Centered Typography */}
        <div className="flex-1 flex items-center justify-center pointer-events-none select-none">
          <h3 className="text-[14px] sm:text-[17px] lg:text-[19px] font-semibold tracking-tight text-zinc-900 drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {skill}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

export default function SkillsShowcase() {
  
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      globalMouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] py-32 px-4 sm:px-10 lg:px-20 overflow-hidden flex flex-col items-center">
      
      {/* Background Aesthetic Elements */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-black/[0.02] blur-[150px] rounded-[100%] pointer-events-none" />

      {/* Header */}
      <div className="text-center z-10 mb-16 md:mb-32 relative">
        <h2 className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-zinc-400 mb-4 drop-shadow-sm">
          Technical Arsenal
        </h2>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 drop-shadow-md">
          Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400">Capabilities</span>
        </h1>
      </div>

      {/* Grid Anchor System */}
      {/* 
        We use a visual grid framework, but the actual cards use relative offsets 
        (via position: relative wrappers with absolute internal children) to drift securely. 
      */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 z-10">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-6 sm:gap-y-10 lg:gap-y-12 gap-x-2 sm:gap-x-4 lg:gap-x-6 place-items-center w-full relative px-1 sm:px-6">
          {SKILLS.map((skill, index) => (
             <div key={skill} className="relative w-full h-24 sm:h-32 flex items-center justify-center">
               <SkillCard skill={skill} index={index} />
             </div>
          ))}
        </div>
      </div>

    </section>
  );
}
