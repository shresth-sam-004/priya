export default function About() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">About Me</h1>
        <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
          This is the new dedicated About page. Feel free to fill this with relevant information.
        </p>
      </div>
    </div>
  )
}
