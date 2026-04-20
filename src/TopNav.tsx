import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'intro', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'links', label: 'Links', path: '/links' },
  { id: 'achievements', label: 'Achievements', path: '/achievements' },
];

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update activeIdx based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const index = NAV_ITEMS.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setActiveIdx(index);
    } else {
      setActiveIdx(0); // fallback to Home
    }
  }, [location]);

  // Update slider position when active index changes
  useEffect(() => {
    const activeElement = tabRefs.current[activeIdx];
    if (activeElement) {
      setPillStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        opacity: 1,
      });
      // Ensure the active tab remains in view on mobile scrollbars
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIdx]);

  // Handle Resize recalculation
  useEffect(() => {
    const handleResize = () => {
      const activeElement = tabRefs.current[activeIdx];
      if (activeElement) {
        setPillStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIdx]);

  const handleNavClick = (idx: number | null, path: string | null) => {
    if (idx !== null && path) {
      navigate(path);
    } else if (path === null) {
      // CTA "Book Call" could scroll to bottom, open mailto, or go to a booking link
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] md:w-auto md:max-w-max"
    >
      <div className="relative flex items-center justify-between p-1.5 md:p-2 bg-[rgba(10,10,12,0.6)] backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_1px_rgba(255,255,255,0.1)]">
        
        {/* Absolute Unclipped Tubelight Tracker */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
          <div 
            className="absolute top-[-1.5px] md:top-[-2px] h-[3px] md:h-[4px] w-6 md:w-8 bg-white rounded-full shadow-[0_2px_15px_3px_rgba(255,255,255,0.8),0_4px_30px_rgba(255,255,255,0.6)] z-50"
            style={{
              left: 0,
              opacity: pillStyle.opacity,
              transform: `translateX(${pillStyle.left - scrollLeft + (pillStyle.width / 2) + (activeIdx === 0 ? 6 : 6)}px) translateX(-50%)`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Scrollable Navigation Wrapper for Mobile */}
        <div 
          className="relative flex items-center overflow-x-auto flex-1 min-w-0 no-scrollbar scroll-smooth px-1.5 md:px-0"
          onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
        >
          
          {/* Active Slider Pill */}
          <div 
            className="absolute h-[calc(100%-8px)] top-1/2 -translate-y-1/2 left-0 bg-white/[0.12] rounded-full transition-all duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(${pillStyle.left}px)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
            }}
          />

          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              onClick={() => handleNavClick(idx, item.path)}
              className={`
                relative z-10 shrink-0 px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[12px] sm:text-[13px] md:text-sm font-medium tracking-wide transition-colors duration-300
                ${activeIdx === idx ? 'text-white' : 'text-white/50 hover:text-white/80'}
              `}
            >
              <span className="relative z-20 mix-blend-plus-lighter whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pl-1 sm:pl-2 shrink-0">
          <button 
            className="bg-white text-black px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[12px] sm:text-[13px] md:text-sm font-bold tracking-wide hover:bg-white/90 active:scale-[0.96] transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.15)] whitespace-nowrap"
            onClick={() => handleNavClick(null, null)}
          >
            Book Call
          </button>
        </div>

      </div>
    </nav>
  );
}
