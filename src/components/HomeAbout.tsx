import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use a fresh context for proper cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Background text moves in opposed directions
      tl.fromTo(text1Ref.current, { x: '10%' }, { x: '-50%', ease: 'none' }, 0);
      tl.fromTo(text2Ref.current, { x: '-20%' }, { x: '30%', ease: 'none' }, 0);

      // Paragraph fades in staggered
      const paragraphs = copyRef.current?.querySelectorAll('p');
      if (paragraphs) {
        tl.fromTo(paragraphs, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.2, ease: 'power2.out', duration: 1 }, 
          0.1
        );
        // Fade out slightly before the absolute end
        tl.to(paragraphs, { opacity: 0, y: -20, stagger: 0.1, duration: 0.5 }, 0.8);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-white z-40 text-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 pb-[env(safe-area-inset-bottom)]">
        
        {/* Kinetic Background Typography */}
        <div className="absolute inset-0 flex flex-col justify-between py-16 md:py-12 pointer-events-none select-none opacity-[0.03]">
          <h2 ref={text1Ref} className="text-[18vw] leading-none font-black tracking-tighter whitespace-nowrap uppercase">
            Creative Developer • Visionary Designer
          </h2>
          <h2 ref={text2Ref} className="text-[18vw] leading-none font-black tracking-tighter whitespace-nowrap uppercase">
            Aesthetic Interfaces • Flawless Execution
          </h2>
        </div>

        {/* Foreground Reveal Copy */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6 md:gap-12 mt-20 sm:mt-16 md:mt-0">
          <div className="w-16 h-[3px] bg-black opacity-80 mb-2 md:mb-4"></div>
          
          <div ref={copyRef} className="flex flex-col gap-6 md:gap-10">
            <p className="text-[8vw] sm:text-5xl lg:text-7xl font-light tracking-tight leading-[1.05] text-black">
              I blend <span className="font-semibold italic">code</span> and <span className="font-semibold italic">design</span> to architect digital experiences that captivate.
            </p>
            <p className="text-sm sm:text-xl lg:text-3xl font-light tracking-wide leading-relaxed text-black/60 max-w-3xl ml-auto md:mr-[10%]">
              Every detail is intentional. Obsessed with micro-interactions, smooth animations, and pixel-perfect layouts, I shape the way the world interacts with the web.
            </p>
            <div className="mt-6 md:mt-12 flex justify-start md:justify-end md:mr-[10%]">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-black/80">
                Scroll to explore the projects that define my journey.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
