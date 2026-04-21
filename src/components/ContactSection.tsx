import React, { useState } from 'react';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('ashutoshpatel0044@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-32 px-4 sm:px-10 lg:px-20 bg-[#050505] text-white overflow-hidden flex flex-col items-center">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Header Area */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center mb-16 sm:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Let’s Connect
        </h2>
        <p className="text-base sm:text-lg text-white/50 font-light max-w-md">
          Open to collaborations, projects, and new opportunities.
        </p>
      </div>

      {/* Links Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Email Card (Copy Action) */}
        <a 
          href="mailto:ashutoshpatel0044@gmail.com"
          onClick={handleCopyEmail}
          className="group relative flex flex-col items-start p-6 rounded-[16px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.05] hover:border-white/[0.15]"
        >
          <div className="flex w-full items-center justify-between mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-white/50 mb-1">Email</span>
            <span className="text-base font-semibold text-white tracking-wide">
              {copied ? 'Email Copied!' : 'ashutoshpatel0044@gmail.com'}
            </span>
          </div>
        </a>

        {/* GitHub Card */}
        <a 
          href="https://github.com/Ashu8810"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-start p-6 rounded-[16px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.05] hover:border-white/[0.15]"
        >
          <div className="flex w-full items-center justify-between mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-white/50 mb-1">GitHub</span>
            <span className="text-base font-semibold text-white tracking-wide">github.com/Ashu8810</span>
          </div>
        </a>

        {/* LinkedIn Card */}
        <a 
          href="https://www.linkedin.com/in/ashutosh-patel2901/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-start p-6 rounded-[16px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.05] hover:border-white/[0.15]"
        >
          <div className="flex w-full items-center justify-between mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-white/50 mb-1">LinkedIn</span>
            <span className="text-base font-semibold text-white tracking-wide">in/ashutosh-patel2901</span>
          </div>
        </a>

        {/* Instagram Card */}
        <a 
          href="https://www.instagram.com/_ashu_h3r3/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-start p-6 rounded-[16px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.05] hover:border-white/[0.15]"
        >
          <div className="flex w-full items-center justify-between mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-white/50 mb-1">Instagram</span>
            <span className="text-base font-semibold text-white tracking-wide">@_ashu_h3r3</span>
          </div>
        </a>

      </div>
    </section>
  );
};

export default ContactSection;
