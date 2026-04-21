import React, { useState, useRef } from 'react';

const ContactCard = ({ 
  href, 
  icon, 
  label, 
  value, 
  isCopy = false, 
  onAction 
}: { 
  href: string, 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  isCopy?: boolean,
  onAction?: (e: React.MouseEvent) => void
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <a 
      href={href}
      target={isCopy ? undefined : "_blank"}
      rel={isCopy ? undefined : "noopener noreferrer"}
      onClick={onAction}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col p-8 sm:p-10 rounded-[24px] bg-white/[0.02] border border-white/[0.06] backdrop-blur-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/[0.15] hover:-translate-y-1"
    >
      {/* Premium Glow Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.08), transparent 40%)'
        }}
      />

      <div className="relative z-10 flex w-full items-center justify-between mb-12">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white/50 group-hover:text-white group-hover:bg-white/[0.08] group-hover:border-white/[0.1] transition-all duration-500">
          {icon}
        </div>
        <div className="text-white/20 group-hover:text-white/60 transition-colors duration-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-3 group-hover:text-white/50 transition-colors duration-500">
          {label}
        </span>
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white/90 tracking-tight leading-tight break-all group-hover:text-white transition-colors duration-500">
          {value}
        </span>
      </div>
    </a>
  );
};

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('ashutoshpatel0044@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-32 md:py-48 px-6 sm:px-10 lg:px-20 bg-[#050505] text-white overflow-hidden flex flex-col items-center">
      {/* Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      {/* Header Area */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center mb-16 md:mb-28">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Available for Opportunities</p>
        </div>
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
          Get in <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Touch.</span>
        </h2>
        <p className="text-lg md:text-xl text-white/40 font-light max-w-xl leading-relaxed">
          I’m always looking to collaborate on projects that push the boundaries of digital design and engineering.
        </p>
      </div>

      {/* Links Grid - 2x2 for Professional Spacing */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        
        <ContactCard 
          href="mailto:ashutoshpatel0044@gmail.com"
          onAction={handleCopyEmail}
          isCopy={true}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          }
          label="Email"
          value={copied ? 'Copied to Clipboard!' : 'ashutoshpatel0044@gmail.com'}
        />

        <ContactCard 
          href="https://github.com/Ashu8810"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          }
          label="GitHub"
          value="github.com/Ashu8810"
        />

        <ContactCard 
          href="https://www.linkedin.com/in/ashutosh-patel2901/"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
            </svg>
          }
          label="LinkedIn"
          value="in/ashutosh-patel2901"
        />

        <ContactCard 
          href="https://www.instagram.com/_ashu_h3r3/"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          }
          label="Instagram"
          value="@_ashu_h3r3"
        />

      </div>

      {/* Subtle Footer-like Note */}
      <div className="mt-32 opacity-20 hover:opacity-50 transition-opacity duration-700">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Bengaluru, India • {new Date().getFullYear()}</p>
      </div>
    </section>
  );
};

export default ContactSection;
