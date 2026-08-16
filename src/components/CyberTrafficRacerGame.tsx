import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Trophy, Zap, Car, Bike, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { VehicleModel3D } from './3DVehicleModels';
import { CrashExplosion } from './CrashExplosion';

interface CyberTrafficRacerGameProps {
  isFullscreen?: boolean;
}

interface TrafficCar {
  id: number;
  lane: number; // 0, 1, 2 (Left, Center, Right)
  y: number; // 0 to 100%
  speed: number;
  color: string;
  type: string;
}

export const CyberTrafficRacerGame: React.FC<CyberTrafficRacerGameProps> = ({ isFullscreen = false }) => {
  const [gameState, setGameState] = useState<'SELECT' | 'PLAYING' | 'GAMEOVER'>('SELECT');
  const [vehicle, setVehicle] = useState<'CAR' | 'BIKE'>('CAR');
  const [lane, setLane] = useState<number>(1); // 0 = Left, 1 = Center, 2 = Right
  const [steeringDir, setSteeringDir] = useState<'LEFT' | 'RIGHT' | 'CENTER'>('CENTER');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [traffic, setTraffic] = useState<TrafficCar[]>([]);
  const [speedLevel, setSpeedLevel] = useState(1);
  const [isCrashing, setIsCrashing] = useState(false);

  const laneRef = useRef<number>(1);
  const scoreRef = useRef<number>(0);
  const trafficRef = useRef<TrafficCar[]>([]);
  const lastSpawnTime = useRef<number>(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('neralla_racer_highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const handleLaneChange = (dir: 'LEFT' | 'RIGHT') => {
    if (gameState !== 'PLAYING') return;
    setSteeringDir(dir);
    setTimeout(() => setSteeringDir('CENTER'), 300);

    if (dir === 'LEFT' && laneRef.current > 0) {
      laneRef.current -= 1;
      setLane(laneRef.current);
      audioEngine.playClickSound(900);
    } else if (dir === 'RIGHT' && laneRef.current < 2) {
      laneRef.current += 1;
      setLane(laneRef.current);
      audioEngine.playClickSound(900);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handleLaneChange('LEFT');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleLaneChange('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const startGame = (chosenVehicle: 'CAR' | 'BIKE') => {
    setVehicle(chosenVehicle);
    setGameState('PLAYING');
    setIsCrashing(false);
    setScore(0);
    scoreRef.current = 0;
    setLane(1);
    laneRef.current = 1;
    setTraffic([]);
    trafficRef.current = [];
    setSpeedLevel(1);
    lastSpawnTime.current = Date.now();
    audioEngine.playClickSound(800);
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const carColors = ['#f43f5e', '#ec4899', '#a855f7', '#34d399', '#f59e0b'];

    let animationFrameId: number;

    const gameLoop = () => {
      const now = Date.now();

      scoreRef.current += 1;
      setScore(Math.floor(scoreRef.current / 3));

      const currentSpeed = 1.3 + Math.min(scoreRef.current * 0.001, 2.8);
      setSpeedLevel(+(currentSpeed).toFixed(1));

      // Spawn traffic
      if (now - lastSpawnTime.current > 1000 - Math.min(scoreRef.current * 0.3, 500)) {
        const randomLane = Math.floor(Math.random() * 3);
        const randomColor = carColors[Math.floor(Math.random() * carColors.length)];
        const newCar: TrafficCar = {
          id: now,
          lane: randomLane,
          y: -20,
          speed: currentSpeed,
          color: randomColor,
          type: Math.random() > 0.5 ? 'SUV' : 'SEDAN',
        };
        trafficRef.current.push(newCar);
        lastSpawnTime.current = now;
      }

      // Move traffic
      trafficRef.current = trafficRef.current
        .map((c) => ({ ...c, y: c.y + currentSpeed * 1.6 }))
        .filter((c) => c.y < 115);

      // Collision Check
      const playerYPos = 72;
      for (const car of trafficRef.current) {
        if (
          car.lane === laneRef.current &&
          car.y > playerYPos - 14 &&
          car.y < playerYPos + 14
        ) {
          triggerCrash();
          return;
        }
      }

      setTraffic([...trafficRef.current]);
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  const triggerCrash = () => {
    setIsCrashing(true);
    audioEngine.playClickSound(200);

    setTimeout(() => {
      endGame();
    }, 900);
  };

  const endGame = () => {
    setGameState('GAMEOVER');
    setIsCrashing(false);

    const finalScore = Math.floor(scoreRef.current / 3);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('neralla_racer_highscore', finalScore.toString());
      audioEngine.playSuccessSound();
    }
  };

  return (
    <div className={`w-full flex flex-col items-center select-none ${isFullscreen ? 'h-full flex-1' : ''}`}>
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between mb-3 font-mono text-xs text-slate-300 shrink-0">
        <div className="flex items-center gap-1 text-cyan-400 font-bold">
          <Zap className="w-4 h-4 text-cyan-400" /> 3D CYBER TRAFFIC RACER 🏎️
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> HI: {highScore}
          </span>
          <span className="text-emerald-400 font-bold">SPEED: {speedLevel}x</span>
          <span className="text-white font-bold">SCORE: {score}</span>
        </div>
      </div>

      {/* 3D Perspective Canvas Box */}
      <div
        className={`w-full bg-slate-950/95 rounded-2xl relative overflow-hidden border border-slate-800 flex flex-col justify-between shadow-2xl transition-all duration-300 ${
          isFullscreen ? 'h-full flex-1 min-h-[500px]' : 'h-80'
        }`}
      >
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Dynamic Road Track with Moving Stripes */}
        <div className="absolute inset-0 flex justify-center overflow-hidden">
          <div className="w-4/5 h-full bg-slate-900/90 border-x-4 border-cyan-500/60 relative flex justify-around shadow-[0_0_30px_rgba(56,189,248,0.3)]">
            <div className="w-0.5 h-full border-r-2 border-dashed border-cyan-400/40" />
            <div className="w-0.5 h-full border-r-2 border-dashed border-cyan-400/40" />
          </div>
        </div>

        {/* Crash Explosion Visual Effect */}
        {isCrashing && <CrashExplosion />}

        {/* Vehicle Selector Screen */}
        {gameState === 'SELECT' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono mb-2">3D CYBER RACER</h3>
            <p className="text-slate-400 text-xs sm:text-sm font-mono mb-6 max-w-md">
              Select your 3D vehicle & dodge incoming highway traffic:
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <button
                onClick={() => startGame('CAR')}
                className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-300 font-mono text-sm font-bold transition-all flex flex-col items-center gap-2 group shadow-xl shadow-cyan-500/20"
              >
                <Car className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>3D SUPERCAR</span>
              </button>

              <button
                onClick={() => startGame('BIKE')}
                className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border-2 border-purple-500/60 hover:border-purple-400 text-purple-300 font-mono text-sm font-bold transition-all flex flex-col items-center gap-2 group shadow-xl shadow-purple-500/20"
              >
                <Bike className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>NEON BIKE</span>
              </button>
            </div>
            <p className="text-slate-500 text-xs font-mono mt-6">Use [LEFT / RIGHT] Arrow keys or A / D to steer</p>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 mb-4 animate-bounce">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-rose-400 font-mono mb-2">TRAFFIC CRASH!</h3>
            <p className="text-slate-300 text-base font-mono mb-6">
              Final Score: <strong className="text-cyan-400">{score}</strong> | High Score: <strong className="text-amber-400">{highScore}</strong>
            </p>
            <button
              onClick={() => setGameState('SELECT')}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm font-mono flex items-center gap-2 shadow-xl shadow-cyan-500/25"
            >
              <RotateCcw className="w-5 h-5" /> RESTART RACER
            </button>
          </div>
        )}

        {/* 3D Player Vehicle Model */}
        {gameState === 'PLAYING' && (
          <div
            className="absolute bottom-8 z-10 transition-all duration-150 transform -translate-x-1/2 flex flex-col items-center"
            style={{
              left: `${lane === 0 ? '24%' : lane === 1 ? '50%' : '76%'}`,
            }}
          >
            <VehicleModel3D type={vehicle} steeringDir={steeringDir} isBoosting={true} />
          </div>
        )}

        {/* Incoming Traffic Vehicles */}
        {traffic.map((car) => (
          <div
            key={car.id}
            className="absolute z-10 transform -translate-x-1/2 flex flex-col items-center transition-all duration-75"
            style={{
              left: `${car.lane === 0 ? '24%' : car.lane === 1 ? '50%' : '76%'}`,
              top: `${car.y}%`,
            }}
          >
            <div
              className="w-14 h-20 rounded-2xl border-2 flex items-center justify-center shadow-lg text-slate-950 font-bold"
              style={{ backgroundColor: car.color, borderColor: '#ffffff' }}
            >
              <Car className="w-6 h-6 rotate-180 text-slate-950" />
            </div>
          </div>
        ))}

        {/* Touch / On-screen Steering Buttons */}
        {gameState === 'PLAYING' && (
          <div className="absolute bottom-3 inset-x-0 z-20 flex justify-between px-6 pointer-events-auto">
            <button
              onClick={() => handleLaneChange('LEFT')}
              className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 font-mono text-base font-bold active:scale-95 shadow-xl"
            >
              ◀ LEFT
            </button>
            <button
              onClick={() => handleLaneChange('RIGHT')}
              className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 font-mono text-base font-bold active:scale-95 shadow-xl"
            >
              RIGHT ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
