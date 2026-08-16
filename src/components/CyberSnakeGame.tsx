import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Zap } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface Position {
  x: number;
  y: number;
}

export const CyberSnakeGame: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [foodLabel, setFoodLabel] = useState('<React/>');

  const dirRef = useRef<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const snakeRef = useRef<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);

  const GRID_SIZE = 20;

  useEffect(() => {
    const savedHighScore = localStorage.getItem('neralla_snake_highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const foodLabels = ['<React/>', 'Node.js', 'Python', 'AI Agent', 'AppsScript', 'SQL', 'Three.js'];

  const spawnFood = (currentSnake: Position[]) => {
    let newX: number;
    let newY: number;
    do {
      newX = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      newY = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
    } while (currentSnake.some((segment) => segment.x === newX && segment.y === newY));

    setFood({ x: newX, y: newY });
    setFoodLabel(foodLabels[Math.floor(Math.random() * foodLabels.length)]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;

      if (e.key === 'ArrowUp' && dirRef.current !== 'DOWN') {
        dirRef.current = 'UP';
      } else if (e.key === 'ArrowDown' && dirRef.current !== 'UP') {
        dirRef.current = 'DOWN';
      } else if (e.key === 'ArrowLeft' && dirRef.current !== 'RIGHT') {
        dirRef.current = 'LEFT';
      } else if (e.key === 'ArrowRight' && dirRef.current !== 'LEFT') {
        dirRef.current = 'RIGHT';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const startGame = () => {
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    setSnake(initialSnake);
    snakeRef.current = initialSnake;
    dirRef.current = 'RIGHT';
    setScore(0);
    setGameState('PLAYING');
    spawnFood(initialSnake);
    audioEngine.playClickSound(700);
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      const head = { ...snakeRef.current[0] };

      if (dirRef.current === 'UP') head.y -= 1;
      if (dirRef.current === 'DOWN') head.y += 1;
      if (dirRef.current === 'LEFT') head.x -= 1;
      if (dirRef.current === 'RIGHT') head.x += 1;

      // Check Wall Collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        endGame();
        return;
      }

      // Check Self Collision
      if (snakeRef.current.some((seg) => seg.x === head.x && seg.y === head.y)) {
        endGame();
        return;
      }

      const newSnake = [head, ...snakeRef.current];

      // Check Food Collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 50);
        audioEngine.playClickSound(1100);
        spawnFood(newSnake);
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;
      setSnake(newSnake);
    }, 120);

    return () => clearInterval(interval);
  }, [gameState, food]);

  const endGame = () => {
    setGameState('GAMEOVER');
    audioEngine.playClickSound(300);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('neralla_snake_highscore', score.toString());
      audioEngine.playSuccessSound();
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between mb-3 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-1 text-emerald-400 font-bold">
          <Zap className="w-4 h-4" /> CYBER SNAKE 🐍
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> HI: {highScore}
          </span>
          <span className="text-white font-bold">SCORE: {score}</span>
        </div>
      </div>

      {/* Grid Canvas Container */}
      <div className="w-full h-64 bg-slate-950/90 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Start Overlay */}
        {gameState === 'START' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center">
            <h3 className="text-xl font-bold text-white font-mono mb-1">CYBER SNAKE</h3>
            <p className="text-slate-400 text-xs font-mono mb-4">
              Use Arrow Keys to guide the snake & eat code modules!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-4 h-4" /> START SNAKE
            </button>
          </div>
        )}

        {/* GameOver Overlay */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-4 text-center">
            <h3 className="text-2xl font-extrabold text-rose-400 font-mono mb-1">CRASH DETECTED!</h3>
            <p className="text-slate-300 text-sm font-mono mb-4">
              Final Score: <strong className="text-emerald-400">{score}</strong> | High Score: <strong className="text-amber-400">{highScore}</strong>
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <RotateCcw className="w-4 h-4" /> RESTART SNAKE
            </button>
          </div>
        )}

        {/* Snake Grid Board */}
        <div className="w-full h-full relative">
          {/* Food Token */}
          <div
            className="absolute px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold shadow-lg shadow-cyan-500/50 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(food.x / GRID_SIZE) * 100}%`,
              top: `${(food.y / GRID_SIZE) * 100}%`,
            }}
          >
            {foodLabel}
          </div>

          {/* Snake Segments */}
          {snake.map((seg, idx) => (
            <div
              key={idx}
              className={`absolute w-3.5 h-3.5 rounded-md ${
                idx === 0
                  ? 'bg-emerald-400 border border-white shadow-md shadow-emerald-400/50'
                  : 'bg-emerald-600/80'
              } -translate-x-1/2 -translate-y-1/2`}
              style={{
                left: `${(seg.x / GRID_SIZE) * 100}%`,
                top: `${(seg.y / GRID_SIZE) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
