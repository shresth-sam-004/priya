import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

type Achievement = {
  id: string;
  title: string;
  date: string;
  description: string;
  gradient: string;
  imageUrl?: string;
  link?: string;
};

const ACHIEVEMENT_STACKS: Achievement[][] = [
  // Stack 1
  [
    {
      id: "a1",
      title: "CTF Winner",
      date: "April 2026",
      description: "Secured 1st place in a competitive cybersecurity CTF event focusing on cryptography and logic.",
      gradient: "from-blue-900/40 to-black",
      imageUrl: "", // Add your image path here like "/images/ctf-winner.jpg"
      link: "", // Add your LinkedIn post URL here
    },
    {
      id: "a2",
      title: "Top Open Source Contributor",
      date: "Feb 2026",
      description: "Recognized as a leading contributor to major React security libraries.",
      gradient: "from-purple-900/40 to-black",
      imageUrl: "",
      link: "",
    },
    {
      id: "a3",
      title: "DefCon Speaker",
      date: "August 2025",
      description: "Delivered a keynote on next-generation cryptographic vulnerabilities.",
      gradient: "from-red-900/40 to-black",
      imageUrl: "",
      link: "",
    }
  ],
  // Stack 2
  [
    {
      id: "b1",
      title: "Hackathon Champion",
      date: "March 2026",
      description: "Built an AI-driven malware detection engine in 48 hours.",
      gradient: "from-emerald-900/40 to-black",
      imageUrl: "",
      link: "",
    },
    {
      id: "b2",
      title: "AWS Certified Security",
      date: "Jan 2026",
      description: "Achieved the highest level of AWS Security Specialty certification.",
      gradient: "from-orange-900/40 to-black",
      imageUrl: "",
      link: "",
    },
    {
      id: "b3",
      title: "Published Researcher",
      date: "Oct 2025",
      description: "Co-authored a paper on Zero-Trust Architecture in cloud native environments.",
      gradient: "from-blue-900/40 to-black",
      imageUrl: "",
      link: "",
    }
  ],
  // Stack 3
  [
    {
      id: "c1",
      title: "Awwwards Site of the Day",
      date: "May 2026",
      description: "Awarded SOTD for a highly interactive and secure fintech dashboard.",
      gradient: "from-pink-900/40 to-black",
      imageUrl: "",
      link: "",
    },
    {
      id: "c2",
      title: "Bug Bounty Elite",
      date: "Dec 2025",
      description: "Acknowledged by 5 major tech companies in their security Hall of Fame.",
      gradient: "from-yellow-900/40 to-black",
      imageUrl: "",
      link: "",
    },
    {
      id: "c3",
      title: "UI/UX Excellence",
      date: "Sept 2025",
      description: "Won the national design challenge for accessibility and secure design patterns.",
      gradient: "from-teal-900/40 to-black",
      imageUrl: "",
      link: "",
    }
  ]
];

const AchievementCard = ({ 
  card, 
  isTop, 
  index, 
  onSwipe 
}: { 
  card: Achievement, 
  isTop: boolean, 
  index: number, 
  onSwipe: () => void 
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If the card is dragged past the threshold, trigger swipe logic
    if (Math.abs(info.offset.x) > 100) {
      onSwipe();
    }
  };

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        transformOrigin: "bottom center",
        zIndex: 10 - index
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      animate={{
        top: index * 16,
        scale: Math.max(1 - index * 0.04, 0.8),
        opacity: Math.max(1 - index * 0.2, 0)
      }}
      initial={false}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`absolute inset-0 flex flex-col overflow-hidden bg-[#111113]/90 backdrop-blur-xl rounded-[24px] border border-white/[0.08] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ${isTop ? 'cursor-grab active:cursor-grabbing hover:border-white/20' : 'cursor-auto'}`}
    >
      <div className="relative h-44 w-full overflow-hidden flex-shrink-0 border-b border-white/[0.05]">
        {card.imageUrl ? (
          <img 
            src={card.imageUrl} 
            alt={card.title} 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
          {card.link && (
            <a 
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking link
              className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              title="View on LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          )}
        </div>
        <p className="text-[11px] text-white/40 font-semibold uppercase tracking-[0.1em] mb-4">{card.date}</p>
        <p className="text-sm text-white/60 leading-relaxed font-light mt-auto">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
};

const SwipeableCardStack = ({ initialCards }: { initialCards: Achievement[] }) => {
  const [cards, setCards] = useState<Achievement[]>(initialCards);

  const handleSwipe = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const top = newArray.shift();
      if (top) newArray.push(top);
      return newArray;
    });
  };

  return (
    <div className="relative w-full max-w-[320px] aspect-[3/4] mx-auto perspective-[1200px]">
      {/* We reverse the mapping so index 0 is rendered last (on top visually) */}
      {[...cards].map((card, index) => {
        const isTop = index === 0;
        return (
          <AchievementCard 
            key={card.id} 
            card={card} 
            isTop={isTop} 
            index={index} 
            onSwipe={handleSwipe} 
          />
        );
      }).reverse()}
      
      {/* Visual Instruction under the stack */}
      <div className="absolute -bottom-10 left-0 right-0 text-center opacity-40 text-xs tracking-widest uppercase font-semibold pointer-events-none">
        Swipe <span className="inline-block mx-1">↔</span> To Explore
      </div>
    </div>
  );
};

export default function Achievements() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 sm:px-10 lg:px-20 relative z-40 overflow-hidden">
      
      {/* Background noise effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 text-center md:text-left">
          <p className="text-white/50 uppercase tracking-[0.22em] text-xs md:text-sm mb-4">Milestones</p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            All Achievements.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl font-light mx-auto md:mx-0"
          >
            A swipeable timeline of recognitions, awards, and major career milestones. Interactive polaroids with smooth spring physics.
          </motion.p>
        </header>

        {/* Swipeable Stacks Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 pb-10"
        >
          {ACHIEVEMENT_STACKS.map((stack, idx) => (
            <SwipeableCardStack key={idx} initialCards={stack} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
