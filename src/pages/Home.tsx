import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HomeAbout from '../components/HomeAbout';
import AchievementsSection from '../components/AchievementsSection';
import ProjectShowcase from '../components/ProjectShowcase';
import SkillsShowcase from '../components/SkillsShowcase';
import ContactSection from '../components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalFrames = 231;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    // Clear previous images ref and ScrollTriggers on mount if necessary
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(3, '0');
      img.src = `/sequence/ezgif-frame-${numStr}.png`;
      
      const handleLoad = () => {
        loaded++;
        setImagesLoaded(prev => Math.max(prev, loaded));
        if (loaded === totalFrames && canvasRef.current) {
          renderFrame(0);
        }
      };

      img.onload = handleLoad;
      img.onerror = () => {
        console.error(`Failed to load frame ${numStr}`);
        handleLoad(); // Still increment to avoid hanging
      };
      images.push(img);
    }
    imagesRef.current = images;

    // Safety timeout: if after 8s we haven't loaded all, force it
    const timer = setTimeout(() => {
      setImagesLoaded((prev) => {
        if (prev < totalFrames) {
          console.warn('Image preloading timed out. Forcing load completion.');
          return totalFrames;
        }
        return prev;
      });
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize smooth scrolling and GSAP animations
  useEffect(() => {
    if (imagesLoaded < totalFrames) return;
    
    // Check if lenis is already running
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    (window as any).lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    const sequence = { frame: 0 };
    
    // Important: check if container still exists and images loaded
    if (containerRef.current) {
      ScrollTrigger.create({
        id: 'mainScroll',
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          const frame = Math.round(self.progress * (totalFrames - 1));
          sequence.frame = frame;
          renderFrame(frame);
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      tl.to(gridRef.current, {
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.3
      }, 0.2);

      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.inOut',
        duration: 0.3
      }, 0.2);
      
      tl.to(canvasRef.current, {
        opacity: 0.4,
        ease: 'power2.inOut',
        duration: 0.3
      }, 0.2);
      
      // Removed white background transition

    }

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.to('body', { backgroundColor: '#0a0a0c', duration: 0, clearProps: 'all' }); // Reset background on unmount
    };
  }, [imagesLoaded]); 

  const renderFrame = (index: number) => {
    if (!canvasRef.current || imagesRef.current.length < totalFrames) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete) {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       
       const hRatio = canvas.width / img.width;
       const vRatio = canvas.height / img.height;
       const ratio = Math.max(hRatio, vRatio);
       const centerShift_x = (canvas.width - img.width * ratio) / 2;
       const centerShift_y = (canvas.height - img.height * ratio) / 2;

       ctx.drawImage(
           img, 
           0, 0, img.width, img.height,
           centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
       );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const st = ScrollTrigger.getById('mainScroll');
        if (st) {
          renderFrame(Math.round(st.progress * (totalFrames - 1)));
        } else {
          renderFrame(0);
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0c]">
      {/* 600vh Canvas Scrolling Block (Reduced from 800vh to remove gap) */}
      <div ref={containerRef} className="h-[600vh] w-full relative bg-transparent transition-colors duration-500">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={gridRef} className="grid-bg"></div>
        
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />
        
        <div ref={textRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mt-[30vh]">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-white/90 drop-shadow-2xl">
            {/* ASHUTOSH */}
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light tracking-widest uppercase text-white/70">
            {/* UI/UX DESIGNER & DEVELOPER */}
          </p>
        </div>

        {imagesLoaded < totalFrames && (
          <div className="absolute inset-0 z-50 bg-[#050505] flex items-center justify-center">
            <div className="text-white/50 animate-pulse text-lg tracking-widest uppercase font-light">
              Loading Sequence... {Math.round((imagesLoaded / totalFrames) * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Alternating Info Sections */}
      <div className="relative z-30 pointer-events-none">
        <section className="h-screen flex items-center justify-start px-10 md:px-20">
          <div className="info-block max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white mb-4">
              Built to Perform
            </h2>
            <p className="text-xl md:text-3xl font-light tracking-wide text-white/60 uppercase">
              Designed with intent
            </p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-end px-10 md:px-20">
          <div className="info-block text-right max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white mb-4">
              Ashutosh
            </h2>
            <p className="text-xl md:text-3xl font-light tracking-wide text-white/60 uppercase">
              The Creative Mind
            </p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-start px-10 md:px-20">
          <div className="info-block max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white mb-4">
              UI/UX Designer
            </h2>
            <p className="text-xl md:text-3xl font-light tracking-wide text-white/60 uppercase">
              Aesthetically Functional
            </p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-end px-10 md:px-20">
          <div className="info-block text-right max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white mb-4">
              Full-Stack
            </h2>
            <p className="text-xl md:text-3xl font-light tracking-wide text-white/60 uppercase">
              Building Scalable Tech
            </p>
          </div>
        </section>

        <section className="h-[120vh] flex items-center justify-center px-10 md:px-20">
          <div className="info-block text-center max-w-4xl">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white mb-4">
              Transforming Ideas
            </h2>
            <p className="text-xl md:text-3xl font-light tracking-wide text-white/60 uppercase">
              Into Seamless Reality
            </p>
          </div>
        </section>
      </div>

      </div>

      {/* Standard Flow Document Content (Outside of 600vh ScrollTrigger bounds) */}
      <div className="relative z-40">
        {/* Advanced Aesthetic About Section */}
        <HomeAbout />

        {/* Modern Minimal Achievements Box */}
        <AchievementsSection />

        {/* Premium Dark Project Showcase */}
        <ProjectShowcase />

        {/* Physics-Based 3D Floating Skills Section */}
        <SkillsShowcase />

        {/* Modern Minimal Contact Layer */}
        <ContactSection />
      </div>
    </div>
  );
}
