import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ProposalSection from '../components/ProposalSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [started, setStarted] = useState(false);
    const totalFrames = 208;
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleStart = () => {
        setStarted(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        startPetalShower();
    };

    const startPetalShower = () => {
        const duration = 15 * 60 * 1000; // 15 mins
        const animationEnd = Date.now() + duration;

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            confetti({
                particleCount: 2,
                startVelocity: 0,
                ticks: Math.max(200, 500 * (timeLeft / duration)),
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.2 - 0.2
                },
                colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffb6c1'],
                shapes: ['circle'],
                gravity: randomInRange(0.3, 0.6),
                scalar: randomInRange(0.4, 1.2),
                drift: randomInRange(-0.5, 0.5),
                zIndex: 40,
                disableForReducedMotion: true
            });
        }, 300); // Fire a couple of petals every 300ms
    };

    // Preload images
    useEffect(() => {
        // Clear previous images ref and ScrollTriggers on mount if necessary
        const images: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const numStr = i.toString().padStart(3, '0');
            img.src = `${import.meta.env.BASE_URL}sequence/ezgif-frame-${numStr}.png`;

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
        if (imagesLoaded < totalFrames || !started) return;

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
    }, [imagesLoaded, started]);

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
            {/* Audio Element - Custom Background Music */}
            <audio ref={audioRef} src={`${import.meta.env.BASE_URL}our-song.mp3.mp3`} loop />

            {/* Premium Intro & Loading Screen */}
            <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0c] transition-opacity duration-1000 ${started ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-950/20 pointer-events-none"></div>
                {imagesLoaded < totalFrames ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-12 h-12 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
                        <div className="text-rose-200/60 animate-pulse text-lg tracking-[0.3em] uppercase font-light">
                            Loading Memories... {Math.round((imagesLoaded / totalFrames) * 100)}%
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={handleStart}
                        className="px-10 py-5 bg-transparent border-2 border-rose-500/40 hover:bg-rose-500/10 text-rose-100 rounded-full text-xl font-light tracking-[0.3em] uppercase transition-all duration-700 hover:scale-105 hover:border-rose-400 shadow-[0_0_40px_rgba(244,63,94,0.1)] hover:shadow-[0_0_60px_rgba(244,63,94,0.3)]"
                    >
                        Begin Journey
                    </button>
                )}
            </div>

            {/* 800vh Canvas Scrolling Block to fit 7 sections */}
            <div ref={containerRef} className="h-[800vh] w-full relative bg-transparent transition-colors duration-500">
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
                </div>

                {/* Ambient Glowing Orbs */}
                <div className="fixed top-[20%] left-[10%] w-[40vw] h-[40vw] bg-pink-600 glowing-orb"></div>
                <div className="fixed bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-rose-800 glowing-orb" style={{ animationDelay: '5s' }}></div>

                {/* Alternating Info Sections */}
                <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between py-[50vh]">
                    <section className="h-screen flex items-center justify-start px-10 md:px-20">
                        <div className="info-block max-w-2xl">
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-rose-500 to-red-600 mb-6 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">
                                The first time
                            </h2>
                            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-medium tracking-wide text-rose-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-relaxed">
                                I saw you during fashion show auditions in November
                            </p>
                        </div>
                    </section>

                    <section className="h-screen flex items-center justify-end px-10 md:px-20">
                        <div className="info-block text-right max-w-2xl">
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-bl from-pink-300 via-rose-500 to-red-600 mb-6 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">
                                That exact moment
                            </h2>
                            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-medium tracking-wide text-rose-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-relaxed">
                                I fell for you
                            </p>
                        </div>
                    </section>

                    <section className="h-screen flex items-center justify-start px-10 md:px-20">
                        <div className="info-block max-w-2xl">
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-rose-500 to-red-600 mb-6 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">
                                You seemed so innocent
                            </h2>
                            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-medium tracking-wide text-rose-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-relaxed">
                                and cute for this world
                            </p>
                        </div>
                    </section>

                    <section className="h-screen flex items-center justify-end px-10 md:px-20">
                        <div className="info-block text-right max-w-2xl">
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-bl from-pink-300 via-rose-500 to-red-600 mb-6 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">
                                You deserve happiness
                            </h2>
                            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-medium tracking-wide text-rose-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-relaxed">
                                and I'm ready to do anything to make that happen
                            </p>
                        </div>
                    </section>
                    
                    <section className="h-screen flex items-center justify-start px-10 md:px-20">
                        <div className="info-block max-w-2xl">
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-rose-500 to-red-600 mb-6 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">
                                Before seeing you
                            </h2>
                            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-medium tracking-wide text-rose-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-relaxed">
                                I used to go to my hometown every month
                            </p>
                        </div>
                    </section>

                    <section className="h-screen flex items-center justify-end px-10 md:px-20">
                        <div className="info-block text-right max-w-4xl">
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-bl from-pink-300 via-rose-500 to-red-600 mb-6 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">
                                But you gave me
                            </h2>
                            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-medium tracking-wide text-rose-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-relaxed">
                                a motivation to stay back
                            </p>
                        </div>
                    </section>

                    <section className="h-screen flex items-center justify-start px-10 md:px-20">
                        <div className="info-block max-w-4xl">
                            <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-rose-500 to-red-600 mb-6 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]">
                                My intentions are clear
                            </h2>
                            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-medium tracking-wide text-rose-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] leading-relaxed">
                                I want to grow in life with you
                            </p>
                        </div>
                    </section>
                </div>

            </div>

            {/* Proposal Interactive Section */}
            <ProposalSection />

        </div>
    );
}
