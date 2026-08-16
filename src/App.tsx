import { motion } from 'framer-motion';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Cpu, Sparkles } from 'lucide-react';

export function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden font-sans flex flex-col justify-between items-center">
      {/* 3D WebGL Background Scene with Interactive Floating Objects */}
      <ThreeCanvas />

      {/* Cyber Grid Background Overlay */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-30" />

      {/* Radial Neon Lights */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

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
          className="text-lg sm:text-2xl text-slate-300 max-w-xl font-light tracking-wide font-sans flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
          <span>Building something awesome for <strong className="text-cyan-300 font-semibold font-mono">neralla.in</strong></span>
        </motion.p>
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
    </div>
  );
}

export default App;
