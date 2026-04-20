import { motion } from 'framer-motion';

interface Tool {
  name: string;
  icon: string | React.ReactNode;
  link: string;
  color: string;
}

const tools: Tool[] = [
  {
    name: "HTML5",
    icon: "https://cdn.simpleicons.org/html5/E34F26",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "CSS3",
    icon: "https://cdn.simpleicons.org/css3/1572B6",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    link: "https://react.dev",
    color: "bg-cyan-500/10 text-cyan-500"
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    link: "https://www.typescriptlang.org",
    color: "bg-blue-600/10 text-blue-400"
  },
  {
    name: "Tailwind",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    link: "https://tailwindcss.com",
    color: "bg-teal-500/10 text-teal-400"
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/white",
    link: "https://nextjs.org",
    color: "bg-white/5 text-white"
  },
  {
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma/F24E1E",
    link: "https://www.figma.com",
    color: "bg-purple-500/10 text-purple-400"
  },
  {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    link: "https://www.python.org",
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    name: "Kali",
    icon: "https://cdn.simpleicons.org/kalilinux/557C94",
    link: "https://www.kali.org",
    color: "bg-cyan-500/10 text-cyan-400"
  },
  {
    name: "C++",
    icon: "https://cdn.simpleicons.org/cplusplus/00599C",
    link: "https://isocpp.org",
    color: "bg-blue-600/10 text-blue-300"
  }
];

const ToolCard = ({ tool, index }: { tool: Tool, index: number }) => {
  return (
    <motion.a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.05, translateY: -5 }}
      className="group relative flex flex-col bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/20 hover:bg-white/[0.05]"
    >
      {/* macOS Stoplights */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.3)]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)]"></div>
      </div>

      {/* Card Content */}
      <div className="p-8 flex flex-col items-center justify-center gap-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.color} border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500 p-3.5`}>
          {typeof tool.icon === 'string' && tool.icon.startsWith('http') ? (
            <img 
              src={tool.icon} 
              alt="" 
              className="w-full h-full object-contain" 
              onError={(e) => {
                // Fallback to a styled initial if the image fails to load
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('span');
                  fallback.className = "text-xl font-bold";
                  fallback.innerText = tool.name.substring(0, 2);
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <span className="text-2xl font-bold">{tool.icon}</span>
          )}
        </div>
        <h3 className="text-sm font-semibold tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-300">
          {tool.name}
        </h3>
      </div>

      {/* Subtle Shine Effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </motion.a>
  );
};

export default function Links() {
  return (
    <div className="min-h-screen w-full relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#050505]">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <header className="max-w-3xl mb-16 md:mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/40 uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-semibold"
          >
            Digital Toolkit
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]"
          >
            The software, stack, and <span className="text-white/50">resources</span> I use.
          </motion.h1>
        </header>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {tools.map((tool, index) => (
            <ToolCard key={tool.name} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
