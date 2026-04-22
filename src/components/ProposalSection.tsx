import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function ProposalSection() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    if (accepted) return;
    
    setNoClickCount(prev => prev + 1);
    
    // Move the button to a random position within a safe boundary
    const x = Math.random() * 200 - 100; // -100 to 100
    const y = Math.random() * 200 - 100; // -100 to 100
    
    setNoPosition({ x, y });
  };

  const handleYes = () => {
    setAccepted(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffffff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffffff']
      });
    }, 250);
  };

  return (
    <section className="min-h-[100vh] flex flex-col items-center justify-center px-6 relative z-50 overflow-hidden bg-black/40 backdrop-blur-sm pb-32">
      {/* Decorative background orbs specific to the proposal section */}
      <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] bg-rose-700 glowing-orb" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-[20%] right-[15%] w-[45vw] h-[45vw] bg-pink-700 glowing-orb" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-[10%] right-[30%] w-[30vw] h-[30vw] bg-purple-700 glowing-orb" style={{ animationDelay: '7s' }}></div>

      {!accepted ? (
        <div className="bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(244,63,94,0.15)] text-center max-w-4xl transform transition-all relative z-10">
          <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-100 to-pink-200 mb-6 drop-shadow-xl leading-tight">
            Hi, I know we're strangers, but I won't lie...
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-lg md:text-2xl font-light text-white/90 mb-12 tracking-wide leading-relaxed">
            You seem really interesting and I'd like to know you as a person. If you're okay with it, can we talk a bit? <br/><span className="text-rose-400 font-medium tracking-widest uppercase mt-4 block">No pressure at all.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[80px]">
            <button 
              onClick={handleYes}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white rounded-full text-xl font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_40px_rgba(225,29,72,0.8)] animate-heartbeat"
            >
              Yes, I'd love to!
            </button>
            
            {noClickCount < 5 && (
              <button 
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${1 - noClickCount * 0.2})`,
                  transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s'
                }}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-full text-xl font-medium tracking-wider backdrop-blur-sm border border-white/10 transition-colors"
              >
                No thanks
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-rose-500/30 shadow-[0_0_100px_rgba(225,29,72,0.2)] text-center max-w-4xl animate-in fade-in zoom-in duration-1000 relative z-10">
          <h2 style={{ fontFamily: "'Cinzel', serif" }} className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-rose-300 via-pink-400 to-red-500 mb-6 drop-shadow-2xl">
            Thank you! ✨
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-3xl font-light text-rose-50 tracking-wide mb-12 leading-relaxed">
            I'm really looking forward to getting to know you.
          </p>
          <a 
            href="https://www.instagram.com/shresth._.008/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full text-xl font-bold tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(253,29,29,0.4)] hover:shadow-[0_0_50px_rgba(253,29,29,0.6)] animate-float"
          >
            <svg className="w-7 h-7 mr-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
            Let's connect on Instagram
          </a>
        </div>
      )}
    </section>
  );
}
