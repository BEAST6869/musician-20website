import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";

// Custom brand logo components
const SpotifyLogo = ({ size = 28, style }: { size?: number, style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.3 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleLogo = ({ size = 28, style }: { size?: number, style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

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
    { name: "SPOTIFY", icon: SpotifyLogo, url: "#" },
    { name: "APPLE MUSIC", icon: AppleLogo, url: "#" },
    { name: "INSTAGRAM", icon: Instagram, url: "#" },
    { name: "YOUTUBE", icon: Youtube, url: "#" }
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
      {/* Ethereal dreamscape background elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Mythic floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-neon-pink animate-float opacity-60"
             style={{
               background: `conic-gradient(from ${mousePosition.x}deg, rgba(255, 0, 222, 0.2), rgba(138, 43, 226, 0.2), rgba(0, 255, 255, 0.2))`,
               transform: `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px) rotate(${mousePosition.x}deg)`,
               filter: 'blur(1px)'
             }} />

        {/* Celestial constellation */}
        <div className="absolute top-60 right-20 w-64 h-64 animate-float delay-1000"
             style={{
               transform: `translateX(${-mousePosition.x * 0.05}px) translateY(${-mousePosition.y * 0.05}px) rotate(${mousePosition.y}deg)`
             }}>
          <div className="absolute top-0 left-0 w-2 h-2 bg-neon-green rounded-full animate-glow-pulse"></div>
          <div className="absolute top-8 left-12 w-1 h-1 bg-neon-cyan rounded-full animate-neon-flicker"></div>
          <div className="absolute top-16 left-4 w-3 h-3 bg-neon-violet rounded-full animate-float"></div>
          <div className="absolute top-24 left-20 w-1 h-1 bg-neon-pink rounded-full animate-glow-pulse"></div>
          <div className="absolute top-32 left-8 w-2 h-2 bg-neon-orange rounded-full animate-neon-flicker"></div>
          {/* Connecting lines for constellation */}
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 64 64">
            <path d="M0,0 L12,8 L16,4 L24,20 L32,8" stroke="url(#constellation-gradient)" strokeWidth="0.5" fill="none" className="animate-pulse"/>
            <defs>
              <linearGradient id="constellation-gradient">
                <stop offset="0%" stopColor="#ff00de"/>
                <stop offset="50%" stopColor="#00ffff"/>
                <stop offset="100%" stopColor="#39ff14"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Surreal geometric morphing shape */}
        <div className="absolute bottom-32 left-1/3 w-48 h-48 animate-float delay-2000"
             style={{
               transform: `translateX(${mousePosition.x * 0.08}px) translateY(${mousePosition.y * 0.08}px)`
             }}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-2 border-neon-violet rounded-full animate-spin opacity-60" style={{ animationDuration: '15s' }}></div>
            <div className="absolute inset-4 border border-neon-cyan animate-spin opacity-40" style={{ animationDuration: '10s', animationDirection: 'reverse', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
            <div className="absolute inset-8 border border-neon-pink animate-spin opacity-60" style={{ animationDuration: '20s', clipPath: 'polygon(30% 0%, 0% 70%, 70% 100%, 100% 30%)' }}></div>
          </div>
        </div>

        {/* Mythic runes scattered around */}
        <div className="absolute top-1/3 left-20 text-4xl text-neon-violet animate-float opacity-50" style={{ transform: `rotate(${mousePosition.x * 0.5}deg)` }}>⟐</div>
        <div className="absolute bottom-1/4 right-32 text-3xl text-neon-cyan animate-neon-flicker opacity-60" style={{ transform: `rotate(${-mousePosition.y * 0.3}deg)` }}>◈</div>
        <div className="absolute top-3/4 left-1/4 text-5xl text-neon-green animate-glow-pulse opacity-40" style={{ transform: `rotate(${mousePosition.x * 0.2}deg)` }}>⟡</div>
        <div className="absolute top-1/4 right-1/3 text-2xl text-neon-pink animate-float opacity-70" style={{ transform: `rotate(${mousePosition.y * 0.4}deg)` }}>◉</div>
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
                <div className="flex justify-center mb-2">
                  <social.icon
                    size={28}
                    style={{ color: index % 2 === 0 ? '#ff00de' : '#00ffff' }}
                    className="neon-text"
                  />
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
