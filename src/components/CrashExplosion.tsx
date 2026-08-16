import React from 'react';

export const CrashExplosion: React.FC = () => {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden animate-[shake_0.5s_ease-in-out]">
      {/* Explosive Shockwave Circle */}
      <div className="w-48 h-48 rounded-full border-4 border-rose-500 bg-rose-500/30 animate-[ping_0.6s_cubic-bezier(0,0,0.2,1)_infinite] shadow-[0_0_50px_#f43f5e]" />

      {/* Fiery Sparks & Debris */}
      <svg viewBox="0 0 200 200" className="absolute w-64 h-64 text-amber-400">
        <circle cx="100" cy="100" r="15" fill="#f43f5e" />
        <line x1="100" y1="100" x2="30" y2="30" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="100" x2="170" y2="30" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="100" x2="20" y2="150" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="100" x2="180" y2="160" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="100" x2="100" y2="10" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="100" x2="100" y2="190" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
      </svg>

      {/* CRASH text */}
      <div className="absolute text-4xl font-black font-mono text-rose-400 tracking-widest animate-bounce drop-shadow-[0_0_20px_#f43f5e]">
        CRASH!
      </div>
    </div>
  );
};
