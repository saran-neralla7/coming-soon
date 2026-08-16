import React from 'react';

export type ObstacleType = 'alienBug' | 'wall404' | 'nullCrystal' | 'serverFire' | 'syntaxSpike' | 'memoryBlob';

interface ObstacleGraphicProps {
  type: ObstacleType;
  label: string;
}

export const ObstacleGraphic: React.FC<ObstacleGraphicProps> = ({ type }) => {
  switch (type) {
    case 'alienBug':
      return (
        <div className="relative w-12 h-10 flex items-center justify-center">
          <svg viewBox="0 0 50 40" className="w-full h-full text-rose-500 drop-shadow-[0_0_8px_#f43f5e]">
            {/* Bug Body */}
            <ellipse cx="25" cy="22" rx="14" ry="10" fill="#881337" stroke="currentColor" strokeWidth="2" />
            {/* Head */}
            <circle cx="12" cy="22" r="6" fill="#4c0519" stroke="currentColor" strokeWidth="1.5" />
            {/* Glowing Red Eyes */}
            <circle cx="10" cy="20" r="2" fill="#ef4444" className="animate-ping" />
            <circle cx="10" cy="20" r="1.5" fill="#ffffff" />
            {/* Legs */}
            <path d="M 20 12 L 15 4 M 25 12 L 25 2 M 30 12 L 35 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M 20 32 L 15 38 M 25 32 L 25 39 M 30 32 L 35 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'wall404':
      return (
        <div className="relative w-16 h-14 bg-amber-950/90 border-2 border-amber-500 rounded-xl flex flex-col items-center justify-center p-1 shadow-[0_0_12px_rgba(245,158,11,0.5)]">
          <div className="w-full h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 mb-1 rounded-sm" />
          <span className="font-mono text-xs font-black text-amber-300 tracking-wider">404</span>
          <span className="font-mono text-[9px] text-rose-400 font-bold uppercase">NOT FOUND</span>
        </div>
      );

    case 'nullCrystal':
      return (
        <div className="relative w-9 h-16 flex items-center justify-center">
          <svg viewBox="0 0 40 70" className="w-full h-full text-purple-400 drop-shadow-[0_0_10px_#a855f7]">
            {/* Crystal Shard */}
            <polygon points="20,0 35,25 30,65 10,65 5,25" fill="#3b0764" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="0" x2="20" y2="65" stroke="#e9d5ff" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'serverFire':
      return (
        <div className="relative w-14 h-11 bg-rose-950/90 border-2 border-rose-500 rounded-xl flex items-center justify-center gap-1 p-1 shadow-[0_0_12px_rgba(244,63,94,0.6)]">
          <span className="text-base animate-bounce">🔥</span>
          <div className="font-mono text-[10px] font-bold text-rose-300 leading-tight">
            <span>500</span>
            <span className="block text-[8px] text-rose-400">ERR</span>
          </div>
        </div>
      );

    case 'syntaxSpike':
      return (
        <div className="relative w-14 h-9 flex items-center justify-center">
          <svg viewBox="0 0 60 40" className="w-full h-full text-emerald-400 drop-shadow-[0_0_8px_#34d399]">
            <polygon points="0,40 15,10 30,40 45,10 60,40" fill="#064e3b" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'memoryBlob':
      return (
        <div className="relative w-18 h-8 bg-purple-900/90 border-2 border-pink-400 rounded-full flex items-center justify-center px-2 shadow-[0_0_10px_rgba(236,72,153,0.5)]">
          <span className="font-mono text-[10px] font-bold text-pink-300 truncate">
            MemoryLeak()
          </span>
        </div>
      );

    default:
      return null;
  }
};
