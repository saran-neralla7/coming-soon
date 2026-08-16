import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeCanvas } from './components/ThreeCanvas';
import { ArcadeModal } from './components/ArcadeModal';
import { Cpu, Sparkles, Code2, Terminal, Brackets, Database, GitBranch, Binary, Layers, Gamepad2 } from 'lucide-react';
import { audioEngine } from './utils/audioEngine';

export function App() {
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);

  const codeBadges = [
    { text: '</>', icon: Code2, x: '12%', y: '22%', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/60' },
    { text: '{ ... }', icon: Brackets, x: '82%', y: '18%', color: 'text-purple-400 border-purple-500/30 bg-purple-950/60' },
    { text: 'git push', icon: GitBranch, x: '15%', y: '72%', color: 'text-pink-400 border-pink-500/30 bg-pink-950/60' },
    { text: '010101', icon: Binary, x: '85%', y: '76%', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/60' },
    { text: 'async () =>', icon: Terminal, x: '8%', y: '48%', color: 'text-amber-400 border-amber-500/30 bg-amber-950/60' },
    { text: 'SQL & DB', icon: Database, x: '88%', y: '46%', color: 'text-sky-400 border-sky-500/30 bg-sky-950/60' },
    { text: 'sys.init()', icon: Layers, x: '50%', y: '12%', color: 'text-cyan-300 border-cyan-500/30 bg-cyan-950/60' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden font-sans flex flex-col justify-between items-center">
      {/* 3D WebGL Background Scene with Interactive Floating 3D Coding Objects */}
      <ThreeCanvas />

      {/* Cyber Grid Background Overlay */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-30" />

      {/* Radial Neon Lights */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Floating Animated Coding Badges around the Screen */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {codeBadges.map((badge, idx) => {
          const IconComp = badge.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                y: [0, -15, 0],
                x: [0, idx % 2 === 0 ? 10 : -10, 0],
              }}
              transition={{
                duration: 4 + (idx % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.4,
              }}
              style={{ left: badge.x, top: badge.y }}
              className={`absolute hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border font-mono text-xs shadow-xl backdrop-blur-md ${badge.color}`}
            >
              <IconComp className="w-4 h-4 animate-pulse" />
              <span>{badge.text}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Top Header Branding */}
      <header className="relative z-10 w-full pt-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono shadow-xl shadow-cyan-500/10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="font-bold tracking-wider">neralla.in</span>
        </motion.div>
      </header>

      {/* Centered Main Hero Section */}
      <main className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center my-auto flex flex-col items-center justify-center">
        {/* Animated Cyber Icon Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-2xl shadow-cyan-500/30 mb-8"
        >
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Main COMING SOON Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-none mb-6 drop-shadow-2xl"
        >
          COMING <span className="text-gradient">SOON</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-300 max-w-xl font-light tracking-wide font-sans flex items-center justify-center gap-2 mb-8"
        >
          <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
          <span>Building something awesome for <strong className="text-cyan-300 font-semibold font-mono">neralla.in</strong></span>
        </motion.p>

        {/* Interactive Game CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => {
            audioEngine.playClickSound(800);
            setIsArcadeOpen(true);
          }}
          className="px-6 py-3 rounded-2xl glass-panel hover:bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 font-mono text-sm font-bold transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center gap-2.5 transform hover:-translate-y-0.5"
        >
          <Gamepad2 className="w-5 h-5 text-cyan-400 animate-bounce" />
          <span>Play Cyber Arcade 🎮</span>
        </motion.button>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full pb-8 pt-4 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm font-mono text-slate-400 tracking-wider hover:text-slate-200 transition-colors"
        >
          Saran Neralla
        </motion.p>
      </footer>

      {/* Cyber Arcade Mini Game Modal */}
      <ArcadeModal
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
      />
    </div>
  );
}

export default App;
