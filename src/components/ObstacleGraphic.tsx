import React from 'react';

export type ObstacleType =
  | 'alienBug'
  | 'wall404'
  | 'nullCrystal'
  | 'serverFire'
  | 'syntaxSpike'
  | 'memoryBlob';

interface ObstacleGraphicProps {
  type: ObstacleType;
  label: string;
  isShattered?: boolean;
}

export const ObstacleGraphic: React.FC<ObstacleGraphicProps> = ({
  type,
  label,
  isShattered = false,
}) => {
  if (isShattered) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-rose-500">
          <polygon points="20,20 40,10 35,45" fill="#f43f5e" />
          <polygon points="70,15 85,35 60,40" fill="#f59e0b" />
          <polygon points="15,60 30,85 50,70" fill="#ec4899" />
          <polygon points="65,65 90,80 75,50" fill="#a855f7" />
          <circle cx="50" cy="50" r="10" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  switch (type) {
    case 'alienBug':
      return (
        <div className="relative w-24 h-24 flex flex-col items-center justify-center transition-transform hover:scale-105">
          <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 via-rose-600 to-slate-900 rounded-3xl border-2 border-rose-400 p-2 shadow-[0_0_25px_#f43f5e] flex flex-col items-center justify-between">
            {/* Glowing Alien Eyeballs */}
            <div className="w-full flex justify-around px-1 mt-1">
              <div className="w-4 h-4 rounded-full bg-cyan-300 border border-slate-950 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-950" />
              </div>
              <div className="w-4 h-4 rounded-full bg-cyan-300 border border-slate-950 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-950" />
              </div>
            </div>
            {/* Alien Fangs */}
            <span className="text-white font-mono text-xs font-bold tracking-wider">{label}</span>
            <div className="flex gap-1 mb-1">
              <div className="w-2 h-3 bg-white rounded-b-md" />
              <div className="w-2 h-3 bg-white rounded-b-md" />
            </div>
          </div>
          {/* Animated Insect Legs */}
          <div className="w-24 flex justify-between -mt-3 px-1 pointer-events-none">
            <div className="w-3 h-4 border-l-2 border-b-2 border-rose-400 -rotate-45" />
            <div className="w-3 h-4 border-r-2 border-b-2 border-rose-400 rotate-45" />
          </div>
        </div>
      );

    case 'wall404':
      return (
        <div className="relative w-28 h-24 flex flex-col items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 border-3 border-rose-500 rounded-2xl shadow-[0_0_30px_rgba(244,63,94,0.7)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:8px_8px] opacity-40" />
            <span className="text-2xl font-black font-mono text-rose-400 tracking-wider z-10 drop-shadow-[0_0_10px_#f43f5e]">
              404
            </span>
            <span className="text-[11px] font-mono text-slate-300 font-bold z-10">NOT FOUND</span>
          </div>
        </div>
      );

    case 'nullCrystal':
      return (
        <div className="relative w-20 h-28 flex flex-col items-center justify-center">
          <svg viewBox="0 0 70 100" className="w-full h-full drop-shadow-[0_0_25px_#38bdf8]">
            <defs>
              <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            <polygon points="35,5 65,35 50,95 20,95 5,35" fill="url(#crystalGrad)" stroke="#ffffff" strokeWidth="2" />
            <polygon points="35,5 50,95 35,95" fill="#a855f7" opacity="0.6" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded border border-cyan-400">
            {label}
          </span>
        </div>
      );

    case 'serverFire':
      return (
        <div className="relative w-24 h-24 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-[0_0_25px_#f59e0b] flex flex-col items-center justify-around p-1.5 relative overflow-hidden">
            {/* Flames */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-amber-500 to-transparent opacity-80 animate-pulse" />
            <div className="w-full flex justify-between items-center px-2 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold text-amber-400">500 ERR</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded border border-amber-500/50 z-10" />
            <div className="w-full h-2 bg-slate-800 rounded border border-amber-500/50 z-10" />
          </div>
        </div>
      );

    case 'syntaxSpike':
      return (
        <div className="relative w-24 h-20 flex flex-col items-center justify-center">
          <svg viewBox="0 0 90 60" className="w-full h-full drop-shadow-[0_0_20px_#ec4899]">
            <polygon points="15,55 30,10 45,55" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
            <polygon points="45,55 60,5 75,55" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
          </svg>
          <span className="absolute bottom-0 text-[10px] font-mono font-bold text-pink-300 bg-slate-950 px-1.5 rounded border border-pink-500">
            {label}
          </span>
        </div>
      );

    case 'memoryBlob':
      return (
        <div className="relative w-28 h-20 flex flex-col items-center justify-center">
          <div className="w-full h-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl border-2 border-emerald-300 shadow-[0_0_25px_#10b981] flex items-center justify-center p-2 animate-pulse">
            <span className="text-xs font-mono font-bold text-slate-950 tracking-wider">
              MEM_LEAK 💥
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
