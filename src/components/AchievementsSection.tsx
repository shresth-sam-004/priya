import React from 'react';
import { motion } from 'framer-motion';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: '1st Place – Tech Trials CTF',
    description: 'Solved cryptography challenges under strict time constraints.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
      </svg>
    ),
    year: '2025'
  },
  {
    id: 2,
    title: 'Top Performer – Security',
    description: 'Demonstrated strong problem-solving and logic engineering skills.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    year: '2024'
  },
  {
    id: 3,
    title: 'Hackathon Finalist',
    description: 'Built and presented a functional security prototype under pressure.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    year: '2024'
  }
];

export default function AchievementsSection() {
  return (
    <section className="relative z-40 w-full bg-[#0a0a0c] py-20 md:py-28 px-6 sm:px-10 lg:px-20 border-t border-white/[0.02]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Selected Achievements.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base text-white/50 tracking-wide font-light max-w-lg"
          >
            Recognitions earned through competitive problem-solving and engineering.
          </motion.p>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-transparent lg:grid-cols-3 gap-4 md:gap-6">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative flex flex-col p-6 rounded-[16px] bg-[#111113]/40 border border-white/[0.04] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/70 group-hover:text-white group-hover:bg-white/[0.08] transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold tracking-wider text-white/30 uppercase bg-white/[0.02] px-3 py-1 rounded-full border border-white/[0.03]">
                  {item.year}
                </span>
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white/90 group-hover:text-white mb-2 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
