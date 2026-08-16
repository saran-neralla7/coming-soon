import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Zap, Bug } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface Bullet {
  id: number;
  x: number;
  y: number;
}

interface Invader {
  id: number;
  x: number;
  y: number;
  label: string;
}

export const CodeInvadersGame: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerX, setPlayerX] = useState(250);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [invaders, setInvaders] = useState<Invader[]>([]);

  const playerXRef = useRef(250);
  const bulletsRef = useRef<Bullet[]>([]);
  const invadersRef = useRef<Invader[]>([]);
  const scoreRef = useRef(0);
  const lastShootTime = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('neralla_invaders_highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const shootLaser = () => {
    const now = Date.now();
    if (now - lastShootTime.current < 200) return;
    lastShootTime.current = now;

    audioEngine.playClickSound(1000);
    const newBullet = { id: now, x: playerXRef.current + 20, y: 210 };
    setBullets((prev) => [...prev, newBullet]);
    bulletsRef.current = [...bulletsRef.current, newBullet];
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;

      if (e.key === 'ArrowLeft') {
        playerXRef.current = Math.max(10, playerXRef.current - 25);
        setPlayerX(playerXRef.current);
      } else if (e.key === 'ArrowRight') {
        playerXRef.current = Math.min(480, playerXRef.current + 25);
        setPlayerX(playerXRef.current);
      } else if (e.code === 'Space') {
        e.preventDefault();
        shootLaser();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    scoreRef.current = 0;
    setPlayerX(250);
    playerXRef.current = 250;
    setBullets([]);
    setInvaders([]);
    bulletsRef.current = [];
    invadersRef.current = [];
    lastSpawnTime.current = Date.now();
    audioEngine.playClickSound(700);
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const bugLabels = ['<Bug/>', '404', 'NullPtr', '500ERR', 'Syntax'];

    let animationFrameId: number;

    const gameLoop = () => {
      const now = Date.now();

      // Spawn Invaders
      if (now - lastSpawnTime.current > 1200) {
        const newInvader: Invader = {
          id: now,
          x: 20 + Math.random() * 440,
          y: -20,
          label: bugLabels[Math.floor(Math.random() * bugLabels.length)],
        };
        invadersRef.current.push(newInvader);
        lastSpawnTime.current = now;
      }

      // Move Bullets
      bulletsRef.current = bulletsRef.current
        .map((b) => ({ ...b, y: b.y - 8 }))
        .filter((b) => b.y > -10);

      // Move Invaders
      invadersRef.current = invadersRef.current.map((inv) => ({
        ...inv,
        y: inv.y + 1.5,
      }));

      // Check Collision Bullet vs Invader
      const nextBullets: Bullet[] = [];
      for (const bullet of bulletsRef.current) {
        let hit = false;
        invadersRef.current = invadersRef.current.filter((inv) => {
          if (!hit && Math.abs(inv.x - bullet.x) < 30 && Math.abs(inv.y - bullet.y) < 25) {
            hit = true;
            scoreRef.current += 100;
            setScore(scoreRef.current);
            audioEngine.playClickSound(1200);
            return false;
          }
          return true;
        });
        if (!hit) nextBullets.push(bullet);
      }
      bulletsRef.current = nextBullets;

      // Check Collision Invader vs Bottom line
      for (const inv of invadersRef.current) {
        if (inv.y > 210) {
          endGame();
          return;
        }
      }

      setBullets([...bulletsRef.current]);
      setInvaders([...invadersRef.current]);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  const endGame = () => {
    setGameState('GAMEOVER');
    audioEngine.playClickSound(300);

    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      localStorage.setItem('neralla_invaders_highscore', scoreRef.current.toString());
      audioEngine.playSuccessSound();
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Game Header Bar */}
      <div className="w-full flex items-center justify-between mb-3 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-1 text-cyan-400 font-bold">
          <Zap className="w-4 h-4" /> CODE INVADERS 👾
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> HI: {highScore}
          </span>
          <span className="text-white font-bold">SCORE: {score}</span>
        </div>
      </div>

      {/* Game Canvas Box */}
      <div
        onClick={shootLaser}
        className="w-full h-64 bg-slate-950/90 rounded-2xl relative overflow-hidden border border-slate-800 cursor-pointer"
      >
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Start Overlay */}
        {gameState === 'START' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center">
            <h3 className="text-xl font-bold text-white font-mono mb-1">CODE INVADERS</h3>
            <p className="text-slate-400 text-xs font-mono mb-4">
              Use [LEFT/RIGHT] Arrow Keys to Move & [SPACE] to Shoot Lasers!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Play className="w-4 h-4" /> START SHOOTER
            </button>
          </div>
        )}

        {/* GameOver Overlay */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-4 text-center">
            <h3 className="text-2xl font-extrabold text-rose-400 font-mono mb-1">SYSTEM BREACH!</h3>
            <p className="text-slate-300 text-sm font-mono mb-4">
              Final Score: <strong className="text-cyan-400">{score}</strong> | High Score: <strong className="text-amber-400">{highScore}</strong>
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <RotateCcw className="w-4 h-4" /> PLAY AGAIN
            </button>
          </div>
        )}

        {/* Laser Cannon Player */}
        <div
          className="absolute bottom-2 transition-all duration-75 text-cyan-400 font-mono text-xs font-bold bg-cyan-950 border border-cyan-500 px-3 py-1.5 rounded-xl shadow-lg shadow-cyan-500/40"
          style={{ left: `${playerX}px` }}
        >
          ▲ LASER_CANNON
        </div>

        {/* Flying Lasers */}
        {bullets.map((b) => (
          <div
            key={b.id}
            className="absolute w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]"
            style={{ left: `${b.x}px`, top: `${b.y}px` }}
          />
        ))}

        {/* Falling Invader Bugs */}
        {invaders.map((inv) => (
          <div
            key={inv.id}
            className="absolute px-2 py-1 bg-rose-950/90 border border-rose-800 text-rose-400 rounded-lg text-xs font-mono font-bold flex items-center gap-1 shadow-md"
            style={{ left: `${inv.x}px`, top: `${inv.y}px` }}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>{inv.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
