import React from 'react';

interface VehicleModelProps {
  type: 'CAR' | 'BIKE';
  steeringDir: 'LEFT' | 'RIGHT' | 'CENTER';
  isBoosting?: boolean;
}

export const VehicleModel3D: React.FC<VehicleModelProps> = ({
  type,
  steeringDir,
  isBoosting = true,
}) => {
  // Tilt angle based on steering
  const tiltAngle = steeringDir === 'LEFT' ? -15 : steeringDir === 'RIGHT' ? 15 : 0;

  if (type === 'CAR') {
    return (
      <div
        className="relative w-16 h-24 flex items-center justify-center transition-transform duration-150 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]"
        style={{
          transform: `rotate(${tiltAngle}deg)`,
        }}
      >
        <svg viewBox="0 0 80 120" className="w-full h-full">
          <defs>
            <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="windshieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>
          </defs>

          {/* Glowing Wheels */}
          <rect x="6" y="16" width="10" height="22" rx="3" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
          <rect x="64" y="16" width="10" height="22" rx="3" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
          <rect x="6" y="82" width="10" height="22" rx="3" fill="#020617" stroke="#ec4899" strokeWidth="2" />
          <rect x="64" y="82" width="10" height="22" rx="3" fill="#020617" stroke="#ec4899" strokeWidth="2" />

          {/* Aerodynamic 3D Supercar Body */}
          <path
            d="M 22 15 L 58 15 L 68 35 L 66 95 L 56 110 L 24 110 L 14 95 L 12 35 Z"
            fill="url(#carBodyGrad)"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Front Hood Scoop & Air Vents */}
          <polygon points="28,20 52,20 48,32 32,32" fill="#020617" stroke="#38bdf8" strokeWidth="1" />

          {/* 3D Glass Cockpit / Windshield */}
          <polygon points="26,38 54,38 48,68 32,68" fill="url(#windshieldGrad)" stroke="#a855f7" strokeWidth="1.5" />

          {/* Headlights (Neon Cyan Beams) */}
          <polygon points="16,16 26,16 22,24 14,24" fill="#38bdf8" />
          <polygon points="54,16 64,16 66,24 58,24" fill="#38bdf8" />

          {/* Dual Rear Exhaust Nitro Thrusters */}
          {isBoosting && (
            <g>
              <ellipse cx="28" cy="114" rx="4" ry="8" fill="#f43f5e" className="animate-ping" />
              <ellipse cx="52" cy="114" rx="4" ry="8" fill="#f43f5e" className="animate-ping" />
              <ellipse cx="28" cy="112" rx="2" ry="5" fill="#fef08a" />
              <ellipse cx="52" cy="112" rx="2" ry="5" fill="#fef08a" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // BIKE MODEL
  return (
    <div
      className="relative w-12 h-24 flex items-center justify-center transition-transform duration-150 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
      style={{
        transform: `rotate(${tiltAngle * 1.3}deg)`,
      }}
    >
      <svg viewBox="0 0 60 120" className="w-full h-full">
        <defs>
          <linearGradient id="bikeBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Front & Rear Lightcycle Wheels */}
        <ellipse cx="30" cy="18" rx="7" ry="14" fill="#020617" stroke="#06b6d4" strokeWidth="3" />
        <ellipse cx="30" cy="102" rx="8" ry="16" fill="#020617" stroke="#ec4899" strokeWidth="3" />

        {/* Chassis Streamlined Body */}
        <path
          d="M 22 30 L 38 30 L 42 75 L 30 92 L 18 75 Z"
          fill="url(#bikeBody)"
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* Rider Cyber Visor Helmet */}
        <circle cx="30" cy="45" r="7" fill="#020617" stroke="#06b6d4" strokeWidth="1.5" />
        <rect x="25" y="42" width="10" height="4" rx="2" fill="#38bdf8" />

        {/* Nitro Exhaust Trail */}
        {isBoosting && (
          <ellipse cx="30" cy="118" rx="5" ry="10" fill="#a855f7" className="animate-ping" />
        )}
      </svg>
    </div>
  );
};
