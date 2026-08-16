import React from 'react';

interface HumanRunnerSpriteProps {
  isJumping: boolean;
  isFallen?: boolean;
  score: number;
}

export const HumanRunnerSprite: React.FC<HumanRunnerSpriteProps> = ({
  isJumping,
  isFallen = false,
  score,
}) => {
  // Leg & Arm animation frame cycle based on score
  const frame = (score % 6);

  // Fallen / Crash Pose
  if (isFallen) {
    return (
      <div className="relative w-28 h-20 flex items-center justify-center transition-transform duration-200 animate-[shake_0.4s_ease-in-out]">
        <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-[0_0_20px_#f43f5e]">
          {/* Fallen Body (Tumbling flat on track) */}
          <g transform="rotate(-75 60 40)">
            {/* Hoodie Body */}
            <rect x="40" y="25" width="40" height="25" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
            {/* Glowing Helmet/Visor */}
            <circle cx="28" cy="37" r="14" fill="#020617" stroke="#38bdf8" strokeWidth="3" />
            <rect x="18" y="34" width="16" height="6" rx="3" fill="#06b6d4" className="animate-pulse" />
            {/* Bent Legs */}
            <path d="M 80 30 L 98 20 L 110 35" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 80 40 L 102 45 L 115 55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Reaching Arms */}
            <path d="M 42 28 L 22 15 L 10 25" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
          {/* Impact Sparks */}
          <circle cx="30" cy="55" r="4" fill="#f43f5e" className="animate-ping" />
          <circle cx="80" cy="55" r="5" fill="#f59e0b" className="animate-ping" />
        </svg>
      </div>
    );
  }

  // Jumping Pose
  if (isJumping) {
    return (
      <div className="relative w-24 h-32 flex items-center justify-center transition-transform duration-100 drop-shadow-[0_0_25px_rgba(56,189,248,0.9)]">
        <svg viewBox="0 0 90 120" className="w-full h-full">
          <defs>
            <linearGradient id="runnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Head & Cyber Helmet */}
          <circle cx="45" cy="22" r="15" fill="#020617" stroke="#38bdf8" strokeWidth="3" />
          <rect x="34" y="18" width="22" height="7" rx="3.5" fill="#06b6d4" className="animate-pulse" />

          {/* Hoodie Torso */}
          <path
            d="M 30 38 L 60 38 L 65 72 L 25 72 Z"
            fill="url(#runnerGradient)"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Laptop Backpack */}
          <rect x="18" y="42" width="12" height="24" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />

          {/* Reaching Arms (Mid-air Jump) */}
          <path d="M 32 44 L 14 30 L 10 16" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 58 44 L 78 30 L 84 18" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Tucked Legs (Jumping Posture) */}
          <path d="M 36 72 L 24 95 L 42 110" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 54 72 L 68 92 L 52 112" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* Glowing Sneakers */}
          <ellipse cx="42" cy="110" rx="7" ry="4" fill="#06b6d4" />
          <ellipse cx="52" cy="112" rx="7" ry="4" fill="#ec4899" />
        </svg>
      </div>
    );
  }

  // Animated Running Pose
  const legAngle1 = frame === 0 || frame === 1 ? -30 : frame === 2 || frame === 3 ? 0 : 35;
  const legAngle2 = frame === 0 || frame === 1 ? 35 : frame === 2 || frame === 3 ? 0 : -30;

  return (
    <div className="relative w-24 h-32 flex items-center justify-center transition-transform duration-75 drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]">
      <svg viewBox="0 0 90 120" className="w-full h-full">
        <defs>
          <linearGradient id="runnerGradientRun" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Cyber Visor Head */}
        <circle cx="45" cy="22" r="15" fill="#020617" stroke="#38bdf8" strokeWidth="3" />
        <rect x="35" y="18" width="20" height="7" rx="3.5" fill="#06b6d4" className="animate-pulse" />

        {/* Developer Hoodie Torso */}
        <path
          d="M 30 38 L 60 38 L 64 74 L 26 74 Z"
          fill="url(#runnerGradientRun)"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Laptop Backpack */}
        <rect x="16" y="42" width="14" height="24" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />

        {/* Pumping Running Arms */}
        <path
          d={`M 32 44 L ${frame < 3 ? 16 : 48} 62`}
          stroke="#38bdf8"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d={`M 58 44 L ${frame < 3 ? 74 : 42} 62`}
          stroke="#a855f7"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Dynamic Running Legs */}
        <g>
          {/* Back Leg */}
          <line
            x1="38"
            y1="74"
            x2={45 + Math.sin((legAngle1 * Math.PI) / 180) * 35}
            y2={74 + Math.cos((legAngle1 * Math.PI) / 180) * 35}
            stroke="#a855f7"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Front Leg */}
          <line
            x1="52"
            y1="74"
            x2={45 + Math.sin((legAngle2 * Math.PI) / 180) * 35}
            y2={74 + Math.cos((legAngle2 * Math.PI) / 180) * 35}
            stroke="#38bdf8"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};
