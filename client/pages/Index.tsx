import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const tracks = [
    { title: "NEON NIGHTS", duration: "3:42", status: "streaming" },
    { title: "CYBER DREAMS", duration: "4:15", status: "new" },
    { title: "DIGITAL SOUL", duration: "3:28", status: "streaming" },
    { title: "ELECTRIC HEART", duration: "4:03", status: "coming_soon" }
  ];

  const socialLinks = [
    { name: "SPOTIFY", icon: "♫", url: "#" },
    { name: "SOUNDCLOUD", icon: "◈", url: "#" },
    { name: "INSTAGRAM", icon: "◯", url: "#" },
    { name: "YOUTUBE", icon: "▷", url: "#" }
  ];

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
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Artist Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-12 pt-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 lg:w-80 lg:h-80 relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc1cbc1e8f515451c87c1c7955fc84aad%2Ffc27df9e89074cca8c2b2b426c863ade?format=webp&width=800"
                  alt="Shelby Mackay"
                  className="w-full h-full object-cover rounded-lg cyber-border hover-glow"
                  style={{ borderColor: '#ff00de' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 to-transparent rounded-lg" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon-green rounded-full animate-glow-pulse" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-neon-cyan rounded-full animate-float" />
              </div>
            </motion.div>

            <div className="text-center lg:text-left">
              <h1 className="text-6xl md:text-8xl font-bold text-neon-pink neon-text animate-neon-flicker mb-4 text-glitch font-mono"
                  data-text="SHELBY MACKAY">
                SHELBY MACKAY
              </h1>
              <p className="text-xl md:text-2xl text-neon-cyan neon-text font-mono mb-4">
                &gt; ELECTRONIC MUSIC PRODUCER
              </p>
              <p className="text-lg text-muted-foreground font-mono max-w-2xl">
                Crafting immersive soundscapes from the digital frontier.
                Where cyberpunk meets electronic soul.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="cyber-border bg-cyber-deep/50 p-8 rounded-lg backdrop-blur-sm" style={{ borderColor: '#39ff14' }}>
            <h2 className="text-2xl font-bold text-neon-green mb-6 font-mono neon-text">
              ◯ ARTIST.BIO
            </h2>
            <div className="space-y-4 text-cyber-glow font-mono">
              <p className="text-lg leading-relaxed">
                In the ever-evolving landscape of electronic music, Toronto-based Shelby Mackay is an emerging figure whose
                sound challenges traditional boundaries. Her music blends electronic disco, experimental textures, and a
                curiosity that refuses to be confined to a single genre.
              </p>
              <p className="text-lg leading-relaxed">
                Mackay's style combines retro influences with forward-thinking sensibilities, seamlessly merging pop elements
                with experimental sounds. Drawing from dubstep, '90s R&B, and vintage disco, tracks like "Moongirlnonsense"
                and "Don'tforgetmypeace" showcase her ability to merge deep basslines with ethereal vocals and glitchy synths.
              </p>
              <p className="text-lg leading-relaxed">
                What sets Shelby apart is her willingness to push against conventions—unbound by industry standards, her
                transparency and authenticity resonate in every release. Her music captures both past and future, creating
                sonic experiences that transport listeners into worlds of imagination.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neon-green/30">
                <div className="text-center">
                  <div className="text-2xl text-neon-green mb-1">◈</div>
                  <div className="text-xs text-muted-foreground">RELEASES</div>
                  <div className="text-lg font-bold">12</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-neon-cyan mb-1">◯</div>
                  <div className="text-xs text-muted-foreground">COLLABS</div>
                  <div className="text-lg font-bold">8</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-neon-pink mb-1">♫</div>
                  <div className="text-xs text-muted-foreground">STREAMS</div>
                  <div className="text-lg font-bold">1.2M</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-neon-violet mb-1">▲</div>
                  <div className="text-xs text-muted-foreground">SHOWS</div>
                  <div className="text-lg font-bold">24</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Music Player Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="cyber-border bg-cyber-deep/50 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-neon-violet mb-6 font-mono neon-text">
              ◈ LATEST TRACKS
            </h2>
            
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.title}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer ${
                    currentTrack === index 
                      ? 'bg-gradient-to-r from-neon-pink/20 to-neon-violet/20 border border-neon-pink' 
                      : 'bg-cyber-deep/30 hover:bg-cyber-deep/50 border border-transparent'
                  }`}
                  onClick={() => {
                    setCurrentTrack(index);
                    setIsPlaying(!isPlaying || currentTrack !== index);
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentTrack === index && isPlaying 
                        ? 'bg-neon-pink animate-glow-pulse' 
                        : 'bg-cyber-deep border border-neon-cyan'
                    }`}>
                      <span className="text-xl font-mono">
                        {currentTrack === index && isPlaying ? '⏸' : '▶'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cyber-glow font-mono">
                        {track.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        {track.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                      track.status === 'new' ? 'bg-neon-green/20 text-neon-green border border-neon-green' :
                      track.status === 'coming_soon' ? 'bg-neon-orange/20 text-neon-orange border border-neon-orange' :
                      'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan'
                    }`}>
                      {track.status === 'new' ? 'NEW' : 
                       track.status === 'coming_soon' ? 'SOON' : 'LIVE'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="cyber-border bg-cyber-deep/50 p-6 rounded-lg hover-glow cursor-pointer group backdrop-blur-sm"
            style={{ borderColor: '#ff00de' }}
          >
            <div className="text-4xl mb-4 text-neon-pink group-hover:animate-glitch transition-all duration-300">
              ♫
            </div>
            <h3 className="text-xl font-bold text-cyber-glow mb-2 font-mono">
              DISCOGRAPHY
            </h3>
            <p className="text-muted-foreground font-mono text-sm">
              Explore the complete collection of releases
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="cyber-border bg-cyber-deep/50 p-6 rounded-lg hover-glow cursor-pointer group backdrop-blur-sm"
            style={{ borderColor: '#00ffff' }}
          >
            <div className="text-4xl mb-4 text-neon-cyan group-hover:animate-glitch transition-all duration-300">
              ◈
            </div>
            <h3 className="text-xl font-bold text-cyber-glow mb-2 font-mono">
              LIVE SHOWS
            </h3>
            <p className="text-muted-foreground font-mono text-sm">
              Immersive performances & tour dates
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="cyber-border bg-cyber-deep/50 p-6 rounded-lg hover-glow cursor-pointer group backdrop-blur-sm"
            style={{ borderColor: '#39ff14' }}
          >
            <div className="text-4xl mb-4 text-neon-green group-hover:animate-glitch transition-all duration-300">
              ◯
            </div>
            <h3 className="text-xl font-bold text-cyber-glow mb-2 font-mono">
              REMIXES
            </h3>
            <p className="text-muted-foreground font-mono text-sm">
              Custom tracks & collaboration work
            </p>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <h2 className="text-2xl font-bold text-neon-violet mb-6 font-mono neon-text text-center">
            ◈ CONNECT
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-border bg-cyber-deep/50 p-4 rounded-lg hover-glow text-center cursor-pointer backdrop-blur-sm"
                style={{ borderColor: index % 2 === 0 ? '#ff00de' : '#00ffff' }}
              >
                <div className="text-2xl mb-2" style={{ color: index % 2 === 0 ? '#ff00de' : '#00ffff' }}>
                  {social.icon}
                </div>
                <p className="text-xs font-mono text-cyber-glow">
                  {social.name}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom status bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="fixed bottom-0 left-0 right-0 bg-cyber-deep/80 backdrop-blur-md border-t border-neon-cyan p-4"
        >
          <div className="flex justify-between items-center max-w-6xl mx-auto font-mono text-sm">
            <div className="flex space-x-6">
              <span className="text-neon-green">NOW PLAYING: {isPlaying ? tracks[currentTrack].title : "OFFLINE"}</span>
              <span className="text-neon-cyan">LISTENERS: 2.4K</span>
              <span className="text-neon-violet">QUALITY: 320kbps</span>
            </div>
            <div className="text-neon-pink">
              {new Date().toLocaleTimeString()} UTC
            </div>
          </div>
        </motion.div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
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
