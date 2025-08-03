import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark grid-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-neon-pink animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-neon-green animate-float delay-1000" />
      </div>

      <div className="text-center relative z-10 cyber-border bg-cyber-deep/50 p-8 rounded-lg backdrop-blur-sm">
        <h1 className="text-8xl font-bold mb-6 text-neon-pink neon-text animate-glitch font-mono">
          404
        </h1>
        <p className="text-2xl text-neon-cyan mb-6 font-mono">
          &gt; SECTOR NOT FOUND
        </p>
        <p className="text-lg text-muted-foreground mb-8 font-mono">
          The neural pathway to "{location.pathname}" has been severed
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-violet to-neon-pink text-cyber-dark font-bold rounded-lg hover-glow transition-all duration-300 font-mono"
        >
          ◄ RETURN TO NEXUS
        </Link>
      </div>

      {/* Glitch particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-violet rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;
