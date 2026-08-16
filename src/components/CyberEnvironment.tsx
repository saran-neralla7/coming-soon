import React from 'react';

export const CyberEnvironment: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Layer 1: Distant Glowing Cyber Mountain Range */}
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="absolute bottom-6 left-0 w-full h-32 opacity-30 text-purple-500/40"
      >
        <polygon points="0,200 80,110 160,160 280,70 400,150 520,60 680,140 820,80 940,160 1000,200" fill="currentColor" />
        <polygon points="0,200 120,130 240,170 380,90 500,160 640,80 780,150 900,90 1000,200" fill="rgba(56, 189, 248, 0.15)" />
      </svg>

      {/* Layer 2: Moving Cyber Clouds */}
      <div className="absolute top-4 left-0 w-full flex justify-between px-8 text-cyan-400/20 font-mono text-xs animate-pulse">
        <div className="flex items-center gap-1 bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
          <span>☁️</span>
          <span>CLOUD_NODE_01</span>
        </div>
        <div className="flex items-center gap-1 bg-purple-950/40 border border-purple-800/30 px-3 py-1 rounded-full">
          <span>☁️</span>
          <span>CLOUD_NODE_02</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/30 px-3 py-1 rounded-full">
          <span>☁️</span>
          <span>CLOUD_NODE_03</span>
        </div>
      </div>

      {/* Layer 3: Wireframe Cyber Trees & Data Towers along Horizon */}
      <div className="absolute bottom-6 inset-x-0 flex justify-around opacity-40 px-4">
        {/* Tree 1 */}
        <svg viewBox="0 0 40 60" className="w-6 h-10 text-cyan-400">
          <polygon points="20,0 5,30 15,30 0,50 40,50 25,30 35,30" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="3" />
        </svg>

        {/* Server Tower 1 */}
        <svg viewBox="0 0 30 70" className="w-5 h-12 text-purple-400">
          <rect x="5" y="10" width="20" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="15" y1="0" x2="15" y2="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="0" r="2" fill="currentColor" />
          <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="35" x2="20" y2="35" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Tree 2 */}
        <svg viewBox="0 0 40 60" className="w-7 h-11 text-emerald-400">
          <polygon points="20,0 5,30 15,30 0,50 40,50 25,30 35,30" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="3" />
        </svg>

        {/* Server Tower 2 */}
        <svg viewBox="0 0 30 70" className="w-5 h-12 text-pink-400">
          <rect x="5" y="10" width="20" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="15" y1="0" x2="15" y2="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="0" r="2" fill="currentColor" />
          <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="35" x2="20" y2="35" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Tree 3 */}
        <svg viewBox="0 0 40 60" className="w-6 h-10 text-cyan-400">
          <polygon points="20,0 5,30 15,30 0,50 40,50 25,30 35,30" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};
