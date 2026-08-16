import React, { useState, useEffect, useRef } from 'react';
import { X, Gamepad2, Play, RotateCcw, Trophy, Zap } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { HumanRunnerSprite } from './HumanRunnerSprite';
import { CyberEnvironment } from './CyberEnvironment';
import { ObstacleGraphic, type ObstacleType } from './ObstacleGraphic';
import { CodeInvadersGame } from './CodeInvadersGame';
import { CyberSnakeGame } from './CyberSnakeGame';
import { MemoryMatrixGame } from './MemoryMatrixGame';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Obstacle {
  id: number;
  x: number;
  type: ObstacleType;
  label: string;
  width: number;
  height: number;
}

export const ArcadeModal: React.FC<ArcadeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'RUNNER' | 'INVADERS' | 'SNAKE' | 'MEMORY'>('RUNNER');

  // CYBER RUNNER STATE
  const [runnerState, setRunnerState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [runnerScore, setRunnerScore] = useState(0);
  const [runnerHighScore, setRunnerHighScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [playerY, setPlayerY] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const lastObstacleTime = useRef<number>(0);
  const isJumpingRef = useRef(false);
  const playerYRef = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('neralla_cyber_runner_highscore');
    if (savedHighScore) {
      setRunnerHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const triggerJump = () => {
    if (runnerState !== 'PLAYING') return;
    if (!isJumpingRef.current) {
      isJumpingRef.current = true;
      setIsJumping(true);
      audioEngine.playClickSound(900);

      let velocity = 13;
      const jumpInterval = setInterval(() => {
        playerYRef.current += velocity;
        velocity -= 0.8;

        if (playerYRef.current <= 0) {
          playerYRef.current = 0;
          isJumpingRef.current = false;
          setIsJumping(false);
          clearInterval(jumpInterval);
        }
        setPlayerY(playerYRef.current);
      }, 16);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || activeTab !== 'RUNNER') return;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (runnerState === 'START' || runnerState === 'GAMEOVER') {
          startRunner();
        } else {
          triggerJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab, runnerState]);

  const startRunner = () => {
    setRunnerState('PLAYING');
    setRunnerScore(0);
    scoreRef.current = 0;
    setObstacles([]);
    setPlayerY(0);
    playerYRef.current = 0;
    isJumpingRef.current = false;
    setIsJumping(false);
    lastObstacleTime.current = Date.now();
    audioEngine.playClickSound(600);
  };

  useEffect(() => {
    if (runnerState !== 'PLAYING' || activeTab !== 'RUNNER') return;

    const obstacleConfigs: { type: ObstacleType; label: string; width: number; height: number }[] = [
      { type: 'alienBug', label: '<Bug />', width: 48, height: 40 },
      { type: 'wall404', label: '404 ERR', width: 64, height: 55 },
      { type: 'nullCrystal', label: 'NullPtr', width: 36, height: 65 },
      { type: 'serverFire', label: '500 ERR', width: 56, height: 44 },
      { type: 'syntaxSpike', label: 'Syntax', width: 56, height: 35 },
      { type: 'memoryBlob', label: 'MemLeak', width: 72, height: 32 },
    ];

    let animationFrameId: number;

    const gameLoop = () => {
      const now = Date.now();

      scoreRef.current += 1;
      setRunnerScore(Math.floor(scoreRef.current / 5));

      // Spawn obstacle
      if (now - lastObstacleTime.current > 1300 - Math.min(scoreRef.current * 0.4, 550)) {
        const randomObstacle = obstacleConfigs[Math.floor(Math.random() * obstacleConfigs.length)];
        setObstacles((prev) => [
          ...prev,
          {
            id: now,
            x: 640,
            ...randomObstacle,
          },
        ]);
        lastObstacleTime.current = now;
      }

      // Move & Collision detection
      setObstacles((prev) => {
        const speed = 6 + Math.min(scoreRef.current * 0.005, 8);
        const updated = prev
          .map((obs) => ({ ...obs, x: obs.x - speed }))
          .filter((obs) => obs.x > -100);

        const playerX = 50;
        const playerWidth = 32;

        for (const obs of updated) {
          // Precise AABB Collision Box Check
          if (
            obs.x < playerX + playerWidth &&
            obs.x + obs.width > playerX &&
            playerYRef.current < obs.height - 10
          ) {
            endRunner();
            return updated;
          }
        }

        return updated;
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [runnerState, activeTab]);

  const endRunner = () => {
    setRunnerState('GAMEOVER');
    audioEngine.playClickSound(300);

    const currentFinalScore = Math.floor(scoreRef.current / 5);
    if (currentFinalScore > runnerHighScore) {
      setRunnerHighScore(currentFinalScore);
      localStorage.setItem('neralla_cyber_runner_highscore', currentFinalScore.toString());
      audioEngine.playSuccessSound();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-3xl glass-panel-glow p-6 sm:p-8 rounded-3xl relative border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-mono text-sm text-cyan-400 font-bold">
            <Gamepad2 className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>NERALLA.IN CYBER ARCADE</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Tabs Selector */}
        <div className="w-full grid grid-cols-4 gap-2 mb-4">
          <button
            onClick={() => {
              setActiveTab('RUNNER');
              audioEngine.playClickSound(700);
            }}
            className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'RUNNER'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🏃‍♂️ Runner
          </button>

          <button
            onClick={() => {
              setActiveTab('INVADERS');
              audioEngine.playClickSound(700);
            }}
            className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'INVADERS'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            👾 Invaders
          </button>

          <button
            onClick={() => {
              setActiveTab('SNAKE');
              audioEngine.playClickSound(700);
            }}
            className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'SNAKE'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🐍 Snake
          </button>

          <button
            onClick={() => {
              setActiveTab('MEMORY');
              audioEngine.playClickSound(700);
            }}
            className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'MEMORY'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🧩 Memory
          </button>
        </div>

        {/* Tab 1: CYBER RUNNER WITH ENVIRONMENT & DIVERSE SHAPE OBSTACLES */}
        {activeTab === 'RUNNER' && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-1 text-cyan-400 font-bold">
                <Zap className="w-4 h-4" /> CYBER RUNNER 🏃‍♂️
              </div>
              <div className="flex items-center gap-4">
                <span className="text-amber-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> HI: {runnerHighScore}
                </span>
                <span className="text-white font-bold">SCORE: {runnerScore}</span>
              </div>
            </div>

            <div
              onClick={triggerJump}
              className="w-full h-64 bg-slate-950/90 rounded-2xl relative overflow-hidden border border-slate-800 cursor-pointer select-none flex flex-col justify-between"
            >
              {/* PARALLAX ENVIRONMENT: Cyber Mountains, Moving Clouds, Trees & Towers */}
              <CyberEnvironment />

              {/* Background Cyber Grid */}
              <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

              <div className="relative z-10 p-3 flex justify-between text-xs font-mono text-slate-400">
                <span>[SPACE] or TAP to Jump</span>
                <span>Avoid Alien Bugs, 404 Walls & Crystals!</span>
              </div>

              {/* Start Screen Overlay */}
              {runnerState === 'START' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-3 animate-bounce">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono mb-1">CYBER RUNNER</h3>
                  <p className="text-slate-400 text-xs font-mono mb-4">
                    Guide Saran Neralla through cyber mountains & jump over alien bugs & 404 walls!
                  </p>
                  <button
                    onClick={startRunner}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <Play className="w-4 h-4" /> START RUNNER
                  </button>
                </div>
              )}

              {/* Game Over Screen Overlay */}
              {runnerState === 'GAMEOVER' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-4 text-center">
                  <h3 className="text-2xl font-extrabold text-rose-400 font-mono mb-1">SYSTEM CRASH!</h3>
                  <p className="text-slate-300 text-sm font-mono mb-1">
                    Score: <strong className="text-cyan-400">{runnerScore}</strong> | High Score: <strong className="text-amber-400">{runnerHighScore}</strong>
                  </p>
                  <button
                    onClick={startRunner}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <RotateCcw className="w-4 h-4" /> TRY AGAIN [SPACE]
                  </button>
                </div>
              )}

              {/* ANIMATED HUMAN DEVELOPER SPRITE */}
              <div
                className="absolute left-[50px] bottom-[20px] z-10 transition-transform duration-75 flex items-center justify-center"
                style={{
                  transform: `translateY(${-playerY}px)`,
                }}
              >
                <HumanRunnerSprite isJumping={isJumping} score={runnerScore} />
              </div>

              {/* DIVERSE SHAPE & SIZE OBSTACLES */}
              {obstacles.map((obs) => (
                <div
                  key={obs.id}
                  className="absolute bottom-[24px] z-10"
                  style={{
                    left: `${obs.x}px`,
                  }}
                >
                  <ObstacleGraphic type={obs.type} label={obs.label} />
                </div>
              ))}

              {/* Neon Running Track */}
              <div className="w-full h-6 bg-slate-900 border-t-2 border-cyan-400/80 relative z-10 flex items-center justify-between px-2 font-mono text-[10px] text-cyan-400/80 shadow-[0_-4px_12px_rgba(56,189,248,0.3)]">
                <span>-----------------------------</span>
                <span>CYBER_RUNNER_TRACK</span>
                <span>-----------------------------</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: CODE INVADERS */}
        {activeTab === 'INVADERS' && <CodeInvadersGame />}

        {/* Tab 3: CYBER SNAKE */}
        {activeTab === 'SNAKE' && <CyberSnakeGame />}

        {/* Tab 4: MEMORY MATRIX */}
        {activeTab === 'MEMORY' && <MemoryMatrixGame />}
      </div>
    </div>
  );
};
