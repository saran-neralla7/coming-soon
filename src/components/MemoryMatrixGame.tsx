import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, Zap, Code2, Bot, Database, Globe, Cpu, Layers, Terminal, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface Card {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryMatrixGame: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'WIN'>('START');
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [highScore, setHighScore] = useState(0);

  const cardIcons = [Code2, Bot, Database, Globe, Cpu, Layers, Terminal, Sparkles];

  useEffect(() => {
    const savedHighScore = localStorage.getItem('neralla_memory_highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const initializeCards = () => {
    const deck: Card[] = [];
    let idCounter = 0;
    for (let i = 0; i < 8; i++) {
      deck.push({ id: idCounter++, iconIndex: i, isFlipped: false, isMatched: false });
      deck.push({ id: idCounter++, iconIndex: i, isFlipped: false, isMatched: false });
    }
    // Shuffle
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMoves(0);
  };

  const startGame = () => {
    initializeCards();
    setGameState('PLAYING');
    audioEngine.playClickSound(800);
  };

  const handleCardClick = (index: number) => {
    if (gameState !== 'PLAYING') return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (selectedCards.length === 2) return;

    audioEngine.playClickSound(900);

    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newSelected;

      if (cards[firstIdx].iconIndex === cards[secondIdx].iconIndex) {
        // Match found!
        audioEngine.playSuccessSound();
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[firstIdx].isMatched = true;
            next[secondIdx].isMatched = true;
            return next;
          });
          setSelectedCards([]);

          // Check Win Condition
          setCards((current) => {
            const allMatched = current.every((c) => c.isMatched || c.id === cards[firstIdx].id || c.id === cards[secondIdx].id);
            if (allMatched) {
              setGameState('WIN');
              const finalScore = moves + 1;
              if (highScore === 0 || finalScore < highScore) {
                setHighScore(finalScore);
                localStorage.setItem('neralla_memory_highscore', finalScore.toString());
              }
            }
            return current;
          });
        }, 300);
      } else {
        // No match -> flip back
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[firstIdx].isFlipped = false;
            next[secondIdx].isFlipped = false;
            return next;
          });
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between mb-3 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-1 text-purple-400 font-bold">
          <Zap className="w-4 h-4" /> MEMORY MATRIX 🧩
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> BEST: {highScore ? `${highScore} moves` : 'N/A'}
          </span>
          <span className="text-white font-bold">MOVES: {moves}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="w-full h-64 bg-slate-950/90 rounded-2xl relative overflow-hidden border border-slate-800 p-3 flex flex-col justify-center items-center">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Start Overlay */}
        {gameState === 'START' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-center">
            <h3 className="text-xl font-bold text-white font-mono mb-1">MEMORY MATRIX</h3>
            <p className="text-slate-400 text-xs font-mono mb-4">
              Match pairs of tech stack icons in minimum moves!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <Play className="w-4 h-4" /> START MATCHING
            </button>
          </div>
        )}

        {/* Win Overlay */}
        {gameState === 'WIN' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-4 text-center">
            <h3 className="text-2xl font-extrabold text-emerald-400 font-mono mb-1">MATRIX CLEARED!</h3>
            <p className="text-slate-300 text-sm font-mono mb-4">
              Total Moves: <strong className="text-cyan-400">{moves}</strong>
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <RotateCcw className="w-4 h-4" /> PLAY AGAIN
            </button>
          </div>
        )}

        {/* 4x4 Flip Card Grid */}
        <div className="grid grid-cols-4 gap-2 w-full h-full max-w-sm">
          {cards.map((card, idx) => {
            const IconComp = cardIcons[card.iconIndex];
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`w-full h-full rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-slate-900 border-cyan-400 text-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-purple-500/50 hover:bg-slate-900/60'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <IconComp className="w-5 h-5 animate-pulse" />
                ) : (
                  <span className="font-mono text-xs font-bold">?</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
