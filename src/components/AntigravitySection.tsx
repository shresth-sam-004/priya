import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface FloatingCardProps {
  label: string;
  sublabel?: string;
  icon: string | React.ReactNode;
  initialX: string;
  initialY: string;
  depth: number;
  driftDuration: number;
  delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  label, 
  sublabel,
  icon, 
  initialX, 
  initialY, 
  depth, 
  driftDuration,
  delay = 0
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 60 * depth;
      const y = (clientY / window.innerHeight - 0.5) * 60 * depth;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [depth]);

  const x = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      style={{ left: initialX, top: initialY, x, y }}
      className="absolute z-20 flex items-center justify-center pointer-events-auto"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: driftDuration, repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 255, 255, 0.05)' }}
        className="px-5 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-1 min-w-[180px] shadow-2xl group transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl opacity-80">{icon}</span>
          <span className="text-[13px] font-semibold tracking-tight text-white/90">{label}</span>
        </div>
        {sublabel && (
          <span className="text-[10px] text-white/40 font-medium ml-8 leading-tight">
            {sublabel}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default function AntigravitySection() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_DATA = [
    { 
      label: 'BMSIT Bengaluru', 
      sublabel: 'Currently Pursuing', 
      icon: '🎓', 
      initialX: '5%', initialY: '15%', depth: 0.5, driftDuration: 8 
    },
    { 
      label: 'Usha Martin School', 
      sublabel: 'Class 12 Completed', 
      icon: '🏫', 
      initialX: '85%', initialY: '15%', depth: 0.4, driftDuration: 10, delay: 1 
    },
    { 
      label: '1st | Tech Trials', 
      sublabel: 'CTF - Multiverse Heist', 
      icon: '🏆', 
      initialX: '85%', initialY: '85%', depth: 0.8, driftDuration: 7, delay: 0.5 
    },
    { 
      label: '2nd Runner | Cryptnite', 
      sublabel: 'Cyber Security - Manipal', 
      icon: '🛡️', 
      initialX: '5%', initialY: '85%', depth: 0.6, driftDuration: 9, delay: 2 
    },
    { 
      label: 'Modern UI Focus', 
      sublabel: 'Clean, Minimal, Design-driven', 
      icon: '🎨', 
      initialX: '20%', initialY: '30%', depth: 0.3, driftDuration: 11 
    },
    { 
      label: 'Execution Mindset', 
      sublabel: 'Build Fast, Refine Continuously', 
      icon: '⚡', 
      initialX: '4%', initialY: '50%', depth: 0.45, driftDuration: 8.5, delay: 1.5 
    },
    { 
      label: 'Analytical Solver', 
      sublabel: 'Strong Attention to Detail', 
      icon: '🧠', 
      initialX: '86%', initialY: '48%', depth: 0.7, driftDuration: 9.5, delay: 0.8 
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black py-24 px-6"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {CARD_DATA.map((card, i) => (
          <FloatingCard key={i} {...card} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-30 max-w-3xl text-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2 mb-8"
        >
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ashutosh Patel — Bengaluru, India
          </div>
        </motion.div>
        
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
          Design Precision. <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-white/20">
            Logical Mastery.
          </span>
        </h2>
        
        <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-8 md:mb-12 max-w-xl mx-auto pointer-events-auto">
          Building clean, high-performance, and visually refined digital experiences. 
          Blending design precision with logical problem-solving to create intuitive and impactful interfaces.
        </p>

        <div className="flex flex-col items-center gap-6 pointer-events-auto pb-24 md:pb-0">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <button 
              onClick={() => navigate('/achievements')}
              className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
            >
              View All Achievements
            </button>
            <span className="text-[10px] md:text-[11px] font-semibold text-white/20 md:text-white/30 uppercase tracking-[0.2em] cursor-default whitespace-nowrap">
              And many more...
            </span>
          </div>
        </div>
      </motion.div>

      {/* Mobile view reduced elements */}
      <div className="absolute inset-0 pointer-events-none z-10 md:hidden flex flex-col items-center justify-end pb-12 px-6 gap-4">
        <div className="w-full p-6 bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl">
           <div className="flex items-center gap-3 mb-2">
             <span className="text-xl">🏆</span>
             <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Recent Win</span>
           </div>
           <p className="text-sm font-medium text-white/90 ml-8">1st Place | Tech Trials CTF</p>
        </div>
      </div>
    </section>
  );
}
