import React, { useState, useEffect, useRef } from 'react';
import { X, Gamepad2, Play, RotateCcw, Trophy, Zap, Maximize2, Minimize2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { HumanRunnerSprite } from './HumanRunnerSprite';
import { CyberEnvironment } from './CyberEnvironment';
import { ObstacleGraphic, type ObstacleType } from './ObstacleGraphic';
import { CyberTrafficRacerGame } from './CyberTrafficRacerGame';
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
  isShattered?: boolean;
}

export const ArcadeModal: React.FC<ArcadeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'RACER' | 'RUNNER' | 'INVADERS' | 'SNAKE' | 'MEMORY'>('RACER');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // CYBER RUNNER STATE
  const [runnerState, setRunnerState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [runnerScore, setRunnerScore] = useState(0);
  const [runnerHighScore, setRunnerHighScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isFallen, setIsFallen] = useState(false);
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

  const toggleFullscreenMode = () => {
    const nextState = !isFullscreen;
    setIsFullscreen(nextState);
    audioEngine.playClickSound(800);

    try {
      if (nextState) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    } catch {
      // Fallback
    }
  };

  const triggerJump = () => {
    if (runnerState !== 'PLAYING' || isFallen) return;
    if (!isJumpingRef.current) {
      isJumpingRef.current = true;
      setIsJumping(true);
      audioEngine.playClickSound(900);

      let velocity = 18;
      const jumpInterval = setInterval(() => {
        playerYRef.current += velocity;
        velocity -= 1.1;

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
    setIsFallen(false);
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
      { type: 'alienBug', label: '<Bug />', width: 85, height: 80 },
      { type: 'wall404', label: '404 ERR', width: 95, height: 85 },
      { type: 'nullCrystal', label: 'NullPtr', width: 70, height: 95 },
      { type: 'serverFire', label: '500 ERR', width: 85, height: 80 },
      { type: 'syntaxSpike', label: 'Syntax', width: 85, height: 70 },
      { type: 'memoryBlob', label: 'MemLeak', width: 95, height: 70 },
    ];

    let animationFrameId: number;

    const gameLoop = () => {
      const now = Date.now();

      scoreRef.current += 1;
      setRunnerScore(Math.floor(scoreRef.current / 5));

      if (now - lastObstacleTime.current > 1400 - Math.min(scoreRef.current * 0.4, 600)) {
        const randomObstacle = obstacleConfigs[Math.floor(Math.random() * obstacleConfigs.length)];
        setObstacles((prev) => [
          ...prev,
          {
            id: now,
            x: 800,
            ...randomObstacle,
          },
        ]);
        lastObstacleTime.current = now;
      }

      setObstacles((prev) => {
        const speed = 7 + Math.min(scoreRef.current * 0.005, 9);
        const updated = prev
          .map((obs) => ({ ...obs, x: obs.x - speed }))
          .filter((obs) => obs.x > -120);

        const playerX = 60;
        const playerWidth = 60;

        for (const obs of updated) {
          if (
            obs.x < playerX + playerWidth &&
            obs.x + obs.width > playerX &&
            playerYRef.current < obs.height - 20
          ) {
            triggerRunnerCrash(obs.id);
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

  const triggerRunnerCrash = (hitObstacleId: number) => {
    setIsFallen(true);
    audioEngine.playClickSound(200);

    setObstacles((prev) =>
      prev.map((obs) => (obs.id === hitObstacleId ? { ...obs, isShattered: true } : obs))
    );

    setTimeout(() => {
      endRunner();
    }, 1000);
  };

  const endRunner = () => {
    setRunnerState('GAMEOVER');

    const currentFinalScore = Math.floor(scoreRef.current / 5);
    if (currentFinalScore > runnerHighScore) {
      setRunnerHighScore(currentFinalScore);
      localStorage.setItem('neralla_cyber_runner_highscore', currentFinalScore.toString());
      audioEngine.playSuccessSound();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isFullscreen ? 'p-0 bg-slate-950' : 'p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md'
      }`}
    >
      <div
        className={`w-full ${
          isFullscreen
            ? 'h-full w-full max-w-full rounded-none border-none p-4 sm:p-6 flex flex-col justify-between bg-slate-950'
            : 'max-w-4xl h-auto max-h-[94vh] rounded-3xl glass-panel-glow p-4 sm:p-6 relative border border-cyan-500/40 shadow-2xl flex flex-col items-center'
        } transition-all duration-300 overflow-hidden`}
      >
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between mb-3 border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2 font-mono text-sm text-cyan-400 font-bold">
            <Gamepad2 className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>NERALLA.IN CYBER ARCADE</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreenMode}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 hover:text-white transition-colors flex items-center gap-1.5 font-mono text-xs"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Tabs Selector */}
        <div className="w-full grid grid-cols-5 gap-1.5 sm:gap-2 mb-4 shrink-0">
          <button
            onClick={() => {
              setActiveTab('RACER');
              audioEngine.playClickSound(700);
            }}
            className={`py-2 px-2 sm:px-3 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'RACER'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🏎️ Racer
          </button>

          <button
            onClick={() => {
              setActiveTab('RUNNER');
              audioEngine.playClickSound(700);
            }}
            className={`py-2 px-2 sm:px-3 rounded-xl font-mono text-xs font-bold transition-all ${
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
            className={`py-2 px-2 sm:px-3 rounded-xl font-mono text-xs font-bold transition-all ${
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
            className={`py-2 px-2 sm:px-3 rounded-xl font-mono text-xs font-bold transition-all ${
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
            className={`py-2 px-2 sm:px-3 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'MEMORY'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🧩 Memory
          </button>
        </div>

        {/* Tab Content */}
        <div className="w-full flex-1 flex flex-col justify-center items-center overflow-hidden">
          {activeTab === 'RACER' && <CyberTrafficRacerGame isFullscreen={isFullscreen} />}

          {/* Tab 2: CYBER RUNNER */}
          {activeTab === 'RUNNER' && (
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-2 font-mono text-xs text-slate-300 shrink-0">
                <div className="flex items-center gap-1 text-cyan-400 font-bold">
                  <Zap className="w-4 h-4" /> 3D CYBER RUNNER 🏃‍♂️
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
                className={`w-full bg-slate-950/90 rounded-2xl relative overflow-hidden border border-slate-800 cursor-pointer select-none flex flex-col justify-between ${
                  isFullscreen ? 'h-full flex-1 min-h-[500px]' : 'h-80'
                }`}
              >
                <CyberEnvironment />
                <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

                <div className="relative z-10 p-3 flex justify-between text-xs font-mono text-slate-400">
                  <span>[SPACE] or TAP to Jump</span>
                  <span>Avoid Alien Bugs, 404 Walls & Crystals!</span>
                </div>

                {runnerState === 'START' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-3 animate-bounce">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-white font-mono mb-2">CYBER RUNNER</h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-6 max-w-md">
                      Guide Saran Neralla through cyber mountains & jump over alien bugs & 404 walls!
                    </p>
                    <button
                      onClick={startRunner}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm font-mono flex items-center gap-2 shadow-xl shadow-cyan-500/25"
                    >
                      <Play className="w-5 h-5" /> START RUNNER
                    </button>
                  </div>
                )}

                {runnerState === 'GAMEOVER' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-4 text-center">
                    <h3 className="text-3xl font-extrabold text-rose-400 font-mono mb-2">RUNNER CRASH!</h3>
                    <p className="text-slate-300 text-base font-mono mb-6">
                      Score: <strong className="text-cyan-400">{runnerScore}</strong> | High Score: <strong className="text-amber-400">{runnerHighScore}</strong>
                    </p>
                    <button
                      onClick={startRunner}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm font-mono flex items-center gap-2 shadow-xl shadow-cyan-500/25"
                    >
                      <RotateCcw className="w-5 h-5" /> TRY AGAIN [SPACE]
                    </button>
                  </div>
                )}

                {/* Large Human Developer Sprite */}
                <div
                  className="absolute left-[60px] bottom-[30px] z-10 transition-transform duration-75 flex items-center justify-center"
                  style={{
                    transform: `translateY(${-playerY}px)`,
                  }}
                >
                  <HumanRunnerSprite isJumping={isJumping} isFallen={isFallen} score={runnerScore} />
                </div>

                {/* Large Obstacle Graphics */}
                {obstacles.map((obs) => (
                  <div
                    key={obs.id}
                    className="absolute bottom-[30px] z-10"
                    style={{
                      left: `${obs.x}px`,
                    }}
                  >
                    <ObstacleGraphic type={obs.type} label={obs.label} isShattered={obs.isShattered} />
                  </div>
                ))}

                <div className="w-full h-8 bg-slate-900 border-t-2 border-cyan-400/80 relative z-10 flex items-center justify-between px-4 font-mono text-xs text-cyan-400/80 shadow-[0_-4px_12px_rgba(56,189,248,0.3)]">
                  <span>-----------------------------</span>
                  <span>CYBER_RUNNER_TRACK</span>
                  <span>-----------------------------</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: CODE INVADERS */}
          {activeTab === 'INVADERS' && <CodeInvadersGame />}

          {/* Tab 4: CYBER SNAKE */}
          {activeTab === 'SNAKE' && <CyberSnakeGame />}

          {/* Tab 5: MEMORY MATRIX */}
          {activeTab === 'MEMORY' && <MemoryMatrixGame />}
        </div>
      </div>
    </div>
  );
};
