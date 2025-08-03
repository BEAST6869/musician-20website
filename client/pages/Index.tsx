import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Index() {
  const [glitchText, setGlitchText] = useState("NEURAL//INTERFACE");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const texts = [
        "NEURAL//INTERFACE",
        "CYBER//NEXUS",
        "DIGITAL//VOID",
        "TECH//NOIR",
        "NEON//DREAMS"
      ];
      setGlitchText(texts[Math.floor(Math.random() * texts.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-dark overflow-hidden relative grid-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 border border-neon-pink animate-float" 
             style={{ 
               background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 0, 222, 0.1), transparent)`,
               transform: `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`
             }} />
        <div className="absolute top-60 right-20 w-24 h-24 border border-neon-green animate-float delay-1000"
             style={{ 
               background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 0, 0.1), transparent)`,
               transform: `translateX(${-mousePosition.x * 0.05}px) translateY(${-mousePosition.y * 0.05}px)`
             }} />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 border border-neon-violet animate-float delay-2000"
             style={{ 
               background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(138, 43, 226, 0.1), transparent)`,
               transform: `translateX(${mousePosition.x * 0.08}px) translateY(${mousePosition.y * 0.08}px)`
             }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-8"
        >
          <h1 
            className="text-6xl md:text-8xl font-bold text-neon-pink neon-text animate-neon-flicker mb-4 text-glitch"
            data-text={glitchText}
          >
            {glitchText}
          </h1>
          <p className="text-xl md:text-2xl text-neon-cyan neon-text font-mono">
            &gt; WELCOME TO THE DIGITAL FRONTIER _
          </p>
        </motion.div>

        {/* Central interactive element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mb-12"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
            {/* Orbital rings */}
            <div className="absolute inset-0 border-2 border-neon-violet rounded-full animate-spin opacity-60" 
                 style={{ animationDuration: "20s" }} />
            <div className="absolute inset-4 border border-neon-green rounded-full animate-spin opacity-40" 
                 style={{ animationDuration: "15s", animationDirection: "reverse" }} />
            <div className="absolute inset-8 border border-neon-cyan rounded-full animate-spin opacity-60" 
                 style={{ animationDuration: "10s" }} />
            
            {/* Central core */}
            <div className="absolute inset-16 bg-gradient-to-br from-neon-pink to-neon-violet rounded-full animate-glow-pulse flex items-center justify-center">
              <span className="text-cyber-dark font-bold text-2xl">◉</span>
            </div>

            {/* Floating data points */}
            <div className="absolute top-8 right-8 w-4 h-4 bg-neon-green rounded-full animate-float" />
            <div className="absolute bottom-12 left-6 w-3 h-3 bg-neon-pink rounded-full animate-float delay-500" />
            <div className="absolute top-1/2 left-2 w-2 h-2 bg-neon-cyan rounded-full animate-float delay-1000" />
          </div>
        </motion.div>

        {/* Navigation grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
        >
          {[
            { title: "NEURAL MAPS", desc: "Navigate the data streams", icon: "▲" },
            { title: "CYBER PROTOCOLS", desc: "Access secure channels", icon: "■" },
            { title: "VOID TERMINAL", desc: "Enter the deep web", icon: "●" }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-border bg-cyber-deep/50 p-6 rounded-lg hover-glow cursor-pointer group backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, rgba(255, 0, 222, 0.1), rgba(0, 255, 255, 0.1))`,
                borderColor: index === 0 ? '#ff00de' : index === 1 ? '#00ffff' : '#39ff14'
              }}
            >
              <div className="text-4xl mb-4 group-hover:animate-glitch transition-all duration-300" 
                   style={{ color: index === 0 ? '#ff00de' : index === 1 ? '#00ffff' : '#39ff14' }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-cyber-glow mb-2 font-mono">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-mono text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom status bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="fixed bottom-0 left-0 right-0 bg-cyber-deep/80 backdrop-blur-md border-t border-neon-cyan p-4"
        >
          <div className="flex justify-between items-center max-w-6xl mx-auto font-mono text-sm">
            <div className="flex space-x-6">
              <span className="text-neon-green">STATUS: ONLINE</span>
              <span className="text-neon-cyan">CONN: SECURE</span>
              <span className="text-neon-violet">LAT: 0.001ms</span>
            </div>
            <div className="text-neon-pink">
              {new Date().toLocaleTimeString()} UTC
            </div>
          </div>
        </motion.div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
