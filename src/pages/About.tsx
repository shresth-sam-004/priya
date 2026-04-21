import AntigravitySection from '../components/AntigravitySection';

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      <AntigravitySection />
      
      {/* Optional additional content section to provide context */}
      <section className="py-32 px-6 bg-black relative z-10">
        <div className="max-w-4xl mx-auto border-t border-white/10 pt-20">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">The Philosophy</h3>
              <p className="text-white/50 leading-relaxed font-light">
                I believe that digital interfaces should be more than just functional—they should be ethereal. 
                By combining physical intuition with digital freedom, I create systems that feel as natural as gravity yet as boundless as space.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Technical Edge</h3>
              <p className="text-white/50 leading-relaxed font-light">
                From performance-critical backend architectures to high-end CSS animations, 
                my work is built on a foundation of clean code and relentless optimization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

