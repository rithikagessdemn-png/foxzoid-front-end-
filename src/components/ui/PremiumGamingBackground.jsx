import React from 'react';

const PremiumGamingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#000000]">
      {/* Base Gradient Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0a1a] to-[#120233]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#001233]/30 via-[#001233]/10 to-transparent"></div>
      
      {/* Dynamic Energy Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/20 to-[#9d00ff]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute inset-10 border-2 border-[#0066ff]/30 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-20 border border-[#9d00ff]/20 rounded-full animate-spin-reverse"></div>
      </div>
      
      {/* Circuit Board Patterns */}
      <div className="absolute inset-0 opacity-[0.15]">
        {/* Main circuit lines */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-0.5 bg-gradient-to-r from-transparent via-[#00ffff] to-transparent"></div>
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-[300px] bg-gradient-to-b from-transparent via-[#00ffff] to-transparent"></div>
        
        {/* Diagonal circuit connections */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45) + 15;
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[400px] h-0.5 bg-gradient-to-r from-transparent via-[#0066ff]/40 to-transparent"
              style={{
                transform: `rotate(${angle}deg) translateX(-200px)`,
                transformOrigin: 'left center'
              }}
            />
          );
        })}
      </div>
      
      {/* Hexagonal Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.08]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 100 0 L 200 50 L 200 150 L 100 200 L 0 150 L 0 50 Z' fill='none' stroke='%230066ff' stroke-width='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '120px 120px',
             maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)'
           }}></div>
      
      {/* Floating Energy Orbs */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => {
          const size = Math.random() * 60 + 30;
          const left = Math.random() * 80 + 10;
          const top = Math.random() * 80 + 10;
          const color = i % 2 === 0 ? '#0066ff' : '#9d00ff';
          
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse-slow"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `radial-gradient(circle at 30% 30%, ${color}40, transparent 70%)`,
                filter: 'blur(15px)',
                animationDelay: `${i * 0.5}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Glowing Data Streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => {
          const height = Math.random() * 100 + 100;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          return (
            <div
              key={i}
              className="absolute animate-data-stream"
              style={{
                width: '2px',
                height: `${height}px`,
                left: `${left}%`,
                top: `-${height}px`,
                background: `linear-gradient(to bottom, transparent, #00ffff 30%, #00ffff 70%, transparent)`,
                filter: 'blur(1px)',
                animationDelay: `${i * 2}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Abstract Polygon Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 border-2 border-[#0066ff]/30 clip-path-hex animate-spin-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 border-2 border-[#9d00ff]/30 clip-path-triangle animate-spin-reverse"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-[#00ffff]/20 clip-path-diamond"></div>
      </div>
      
      {/* Neon Grid Lines */}
      <div className="absolute inset-0 opacity-[0.1]">
        {Array.from({ length: 12 }).map((_, i) => {
          const spacing = 100 / 12;
          return (
            <React.Fragment key={i}>
              <div
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0066ff]/30 to-transparent"
                style={{ left: `${i * spacing}%` }}
              />
              <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9d00ff]/30 to-transparent"
                style={{ top: `${i * spacing}%` }}
              />
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Holographic Interface Elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64">
        <div className="absolute inset-0 border border-[#0066ff]/20 rounded-lg">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#0066ff] to-transparent blur-sm"></div>
          <div className="absolute inset-2 border border-[#9d00ff]/10 rounded"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#9d00ff] to-[#0066ff]"></div>
        </div>
      </div>
      
      {/* Particle Streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, streamIndex) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          return (
            <div key={streamIndex} className="absolute">
              {Array.from({ length: 20 }).map((_, particleIndex) => (
                <div
                  key={particleIndex}
                  className="absolute rounded-full animate-particle-stream"
                  style={{
                    width: '2px',
                    height: '2px',
                    left: `${left}%`,
                    top: `${top}%`,
                    backgroundColor: '#00ffff',
                    opacity: 0.3,
                    animationDelay: `${particleIndex * 0.1 + streamIndex * 0.5}s`,
                    filter: 'blur(0.5px)'
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
      
      {/* Glowing Dots Grid */}
      <div className="absolute inset-0 opacity-[0.1]"
           style={{
             backgroundImage: `radial-gradient(circle at 2px 2px, #0066ff 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}></div>
      
      {/* Cyberpunk Scan Lines */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #00ffff 1px, #00ffff 2px)`,
             backgroundSize: '100% 4px'
           }}></div>
      
      {/* Energy Pulse Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[1, 2, 3, 4, 5].map((ring) => (
          <div
            key={ring}
            className="absolute border border-[#00ffff]/10 rounded-full animate-energy-pulse"
            style={{
              width: `${ring * 120}px`,
              height: `${ring * 120}px`,
              animationDelay: `${ring * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Neon Glow Accents */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-[#0066ff]/20 to-transparent rounded-full blur-[40px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-tr from-[#9d00ff]/20 to-transparent rounded-full blur-[50px]"></div>
      
      {/* Binary Code Rain (Subtle) */}
      <div className="absolute inset-0 opacity-[0.08] font-mono text-[8px] leading-none text-cyan-300/30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-binary-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%)"></div>
      
      {/* Smooth Overlay */}
      <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(5px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes data-stream {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes particle-stream {
          0% { transform: translateY(-100px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100px) translateX(20px); opacity: 0; }
        }
        
        @keyframes energy-pulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes binary-fall {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .animate-float {
          animation: float 20s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 20s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-data-stream {
          animation: data-stream 8s linear infinite;
        }
        
        .animate-particle-stream {
          animation: particle-stream 3s linear infinite;
        }
        
        .animate-energy-pulse {
          animation: energy-pulse 4s ease-out infinite;
        }
        
        .animate-binary-fall {
          animation: binary-fall linear infinite;
        }
        
        .clip-path-hex {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .clip-path-diamond {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        
        .bg-radial-gradient {
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%);
        }
      `}</style>
    </div>
  );
};

export default PremiumGamingBackground;