import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, X, Trophy, Zap, Bug } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface CyberRunnerGameProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Obstacle {
  id: number;
  x: number;
  type: 'bug' | 'err404' | 'nullPointer' | 'syntax';
  label: string;
  width: number;
}

export const CyberRunnerGame: React.FC<CyberRunnerGameProps> = ({ isOpen, onClose }) => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const lastObstacleTime = useRef<number>(0);
  const isJumpingRef = useRef(false);
  const playerYRef = useRef(0);
  const scoreRef = useRef(0);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('neralla_cyber_runner_highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Jump control
  const triggerJump = () => {
    if (gameState !== 'PLAYING') return;
    if (!isJumpingRef.current) {
      isJumpingRef.current = true;
      audioEngine.playClickSound(900);

      // Jump Physics
      let velocity = 12;
      const jumpInterval = setInterval(() => {
        playerYRef.current += velocity;
        velocity -= 0.8; // Gravity

        if (playerYRef.current <= 0) {
          playerYRef.current = 0;
          isJumpingRef.current = false;
          clearInterval(jumpInterval);
        }
        setPlayerY(playerYRef.current);
      }, 16);
    }
  };

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'START' || gameState === 'GAMEOVER') {
          startGame();
        } else {
          triggerJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gameState]);

  // Start game
  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    scoreRef.current = 0;
    setObstacles([]);
    setPlayerY(0);
    playerYRef.current = 0;
    isJumpingRef.current = false;
    lastObstacleTime.current = Date.now();
    audioEngine.playClickSound(600);
  };

  // Main Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const obstacleTypes: { type: 'bug' | 'err404' | 'nullPointer' | 'syntax'; label: string; width: number }[] = [
      { type: 'bug', label: '<Bug />', width: 45 },
      { type: 'err404', label: '404 ERR', width: 55 },
      { type: 'nullPointer', label: 'NullPointer', width: 70 },
      { type: 'syntax', label: 'SyntaxErr', width: 65 },
    ];

    let animationFrameId: number;

    const gameLoop = () => {
      const now = Date.now();

      // Increase score
      scoreRef.current += 1;
      setScore(Math.floor(scoreRef.current / 5));

      // Spawn obstacle
      if (now - lastObstacleTime.current > 1400 - Math.min(scoreRef.current * 0.5, 600)) {
        const randomObstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        setObstacles((prev) => [
          ...prev,
          {
            id: now,
            x: 600, // Canvas width
            ...randomObstacle,
          },
        ]);
        lastObstacleTime.current = now;
      }

      // Move obstacles & Collision check
      setObstacles((prev) => {
        const speed = 6 + Math.min(scoreRef.current * 0.005, 8);
        const updated = prev
          .map((obs) => ({ ...obs, x: obs.x - speed }))
          .filter((obs) => obs.x > -100);

        // Check collision with player
        const playerX = 50; // Player fixed X position
        const playerHeight = 40;

        for (const obs of updated) {
          if (
            obs.x < playerX + 35 &&
            obs.x + obs.width > playerX &&
            playerYRef.current < playerHeight
          ) {
            // Collision detected! Game Over
            endGame();
            return updated;
          }
        }

        return updated;
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  const endGame = () => {
    setGameState('GAMEOVER');
    audioEngine.playClickSound(300);

    const currentFinalScore = Math.floor(scoreRef.current / 5);
    if (currentFinalScore > highScore) {
      setHighScore(currentFinalScore);
      localStorage.setItem('neralla_cyber_runner_highscore', currentFinalScore.toString());
      audioEngine.playSuccessSound();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-2xl glass-panel-glow p-6 sm:p-8 rounded-3xl relative border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-bold">CYBER RUNNER v1.0 • NERALLA.IN</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1 text-amber-400">
              <Trophy className="w-3.5 h-3.5" />
              <span>HI: {highScore}</span>
            </div>
            <div className="text-white font-bold">
              SCORE: {score}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div
          onClick={triggerJump}
          className="w-full h-64 bg-slate-950/90 rounded-2xl relative overflow-hidden border border-slate-800 cursor-pointer select-none flex flex-col justify-between"
        >
          {/* Background Cyber Grid */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

          {/* Top Info Overlay */}
          <div className="relative z-10 p-3 flex justify-between text-xs font-mono text-slate-500">
            <span>[SPACE] or TAP to Jump</span>
            <span>Avoid Bugs & 404s!</span>
          </div>

          {/* Start Screen Overlay */}
          {gameState === 'START' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-3 animate-bounce">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-mono mb-1">CYBER RUNNER</h3>
              <p className="text-slate-400 text-xs font-mono mb-4">
                Help Saran Neralla jump over bugs & 404 errors!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-4 h-4" />
                <span>START GAME</span>
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-4 text-center">
              <h3 className="text-2xl font-extrabold text-rose-400 font-mono mb-1">SYSTEM CRASH!</h3>
              <p className="text-slate-300 text-sm font-mono mb-1">
                Score: <strong className="text-cyan-400">{score}</strong> | High Score: <strong className="text-amber-400">{highScore}</strong>
              </p>
              <p className="text-slate-500 text-xs font-mono mb-4">You got caught by a bug!</p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>TRY AGAIN [SPACE]</span>
              </button>
            </div>
          )}

          {/* Player Sprite */}
          <div
            className="absolute left-[50px] bottom-[24px] transition-transform duration-75 flex items-center justify-center"
            style={{
              transform: `translateY(${-playerY}px)`,
            }}
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/40">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-300 font-mono font-bold text-sm">
                ⚡
              </div>
            </div>
          </div>

          {/* Moving Obstacles */}
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              className="absolute bottom-[24px] px-2 py-1 rounded-lg bg-rose-950/90 border border-rose-800 text-rose-300 font-mono text-xs font-bold shadow-md shadow-rose-500/20 flex items-center gap-1"
              style={{
                left: `${obs.x}px`,
                width: `${obs.width}px`,
              }}
            >
              <Bug className="w-3.5 h-3.5 shrink-0 text-rose-400" />
              <span className="truncate">{obs.label}</span>
            </div>
          ))}

          {/* Running Track / Ground Line */}
          <div className="w-full h-6 bg-slate-900 border-t border-cyan-500/40 relative flex items-center justify-between px-2 font-mono text-[10px] text-cyan-500/60">
            <span>-----------------------------</span>
            <span>SYSTEM_TRACK</span>
            <span>-----------------------------</span>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="w-full mt-4 flex items-center justify-between text-slate-400 text-xs font-mono">
          <span>High Score saved to device</span>
          <span className="text-cyan-400 font-bold">neralla.in</span>
        </div>
      </div>
    </div>
  );
};
