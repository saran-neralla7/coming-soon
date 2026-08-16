import React from 'react';

interface HumanRunnerSpriteProps {
  isJumping: boolean;
  score: number;
}

export const HumanRunnerSprite: React.FC<HumanRunnerSpriteProps> = ({ isJumping }) => {
  return (
    <div className="relative w-10 h-14 flex items-center justify-center select-none">
      <svg
        viewBox="0 0 60 80"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
      >
        <defs>
          <linearGradient id="cyberSuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Head / Cyber Visor Helmet */}
        <circle cx="30" cy="16" r="10" fill="url(#cyberSuit)" />
        <rect x="22" y="14" width="16" height="5" rx="2.5" fill="#020617" />
        <line x1="24" y1="16.5" x2="36" y2="16.5" stroke="#38bdf8" strokeWidth="1.5" />

        {/* Torso / Developer Jacket */}
        <path
          d="M 22 28 L 38 28 L 36 50 L 24 50 Z"
          fill="#0f172a"
          stroke="url(#cyberSuit)"
          strokeWidth="2"
        />
        {/* Core Chest Reactor */}
        <circle cx="30" cy="38" r="3" fill="#38bdf8" filter="url(#glow)" />

        {isJumping ? (
          /* JUMPING POSTURE */
          <g>
            {/* Arms up */}
            <path d="M 22 30 L 12 20 L 16 12" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 38 30 L 48 20 L 44 12" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Legs tucked */}
            <path d="M 25 50 L 18 64 L 28 66" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 35 50 L 42 60 L 32 68" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          /* RUNNING ANIMATED POSTURE */
          <g>
            {/* Left Arm Swinging */}
            <path d="M 22 30 L 12 40 L 18 50" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="-25 22 30; 25 22 30; -25 22 30"
                dur="0.4s"
                repeatCount="indefinite"
              />
            </path>

            {/* Right Arm Swinging */}
            <path d="M 38 30 L 48 20 L 42 12" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="25 38 30; -25 38 30; 25 38 30"
                dur="0.4s"
                repeatCount="indefinite"
              />
            </path>

            {/* Left Leg Running */}
            <path d="M 25 50 L 15 65 L 22 76" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="35 25 50; -35 25 50; 35 25 50"
                dur="0.4s"
                repeatCount="indefinite"
              />
            </path>

            {/* Right Leg Running */}
            <path d="M 35 50 L 45 65 L 38 76" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="-35 35 50; 35 35 50; -35 35 50"
                dur="0.4s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        )}
      </svg>
    </div>
  );
};
