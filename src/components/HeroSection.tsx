import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Terminal,
  Zap,
  Bot,
  Code2,
  Database,
  Layers,
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal, onOpenContact }) => {
  const words = [
    'Autonomous AI Agents',
    'College Automation Systems',
    'Custom Full-Stack ERPs',
    'High-Performance Webapps',
    'Google Apps Script Engines',
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  // Calculated launch progress ticker
  const launchProgress = 88;

  return (
    <section className="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
      {/* Top Banner Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono mb-8 shadow-xl shadow-cyan-500/10"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
        </span>
        <span className="tracking-wide">neralla.in • INITIALIZING SYSTEM BOOT</span>
        <span className="text-slate-600">|</span>
        <span className="text-purple-400 font-semibold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" /> V2.0
        </span>
      </motion.div>

      {/* Main Title Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight max-w-5xl leading-[1.1] mb-6"
      >
        Engineering the Next Era of{' '}
        <span className="block mt-2 h-[1.3em] text-gradient">
          {displayText}
          <span className="inline-block w-1.5 h-[0.8em] bg-cyan-400 ml-1 animate-pulse align-middle" />
        </span>
      </motion.h1>

      {/* Domain Callout & Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal"
      >
        Welcome to <strong className="text-cyan-300 font-semibold font-mono">www.neralla.in</strong>. I'm{' '}
        <strong className="text-white font-semibold">Saran Neralla</strong>, a full-stack software engineer automating campus operations, crafting enterprise ERP platforms, and building intelligent autonomous AI agents.
      </motion.p>

      {/* Interactive Action CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-16 w-full max-w-md"
      >
        <button
          onClick={() => {
            audioEngine.playClickSound(800);
            onOpenContact();
          }}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
        >
          <span>Connect with Saran</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            audioEngine.playClickSound(600);
            onOpenTerminal();
          }}
          className="w-full sm:w-auto px-6 py-4 rounded-xl glass-panel hover:bg-slate-800/80 border border-slate-700 text-cyan-300 font-mono text-sm transition-all duration-200 flex items-center justify-center gap-2.5 hover:border-cyan-500/50"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>$ open_terminal</span>
        </button>
      </motion.div>

      {/* Feature Badges Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl"
      >
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 text-left border border-slate-800/60 hover:border-cyan-500/40 transition-colors">
          <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-slate-400">CORE FOCUS</h4>
            <p className="text-sm font-semibold text-white">AI Agents</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 text-left border border-slate-800/60 hover:border-purple-500/40 transition-colors">
          <div className="p-2.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800/50">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-slate-400">AUTOMATION</h4>
            <p className="text-sm font-semibold text-white">College Workflows</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 text-left border border-slate-800/60 hover:border-pink-500/40 transition-colors">
          <div className="p-2.5 rounded-lg bg-pink-950/80 text-pink-400 border border-pink-800/50">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-slate-400">ENTERPRISE</h4>
            <p className="text-sm font-semibold text-white">ERP Systems</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 text-left border border-slate-800/60 hover:border-emerald-500/40 transition-colors">
          <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-slate-400">FULL-STACK</h4>
            <p className="text-sm font-semibold text-white">Modern Webapps</p>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Launch System Status Meter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-xl mt-12 glass-panel p-4 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            SYSTEM_DEPLOYMENT_PROGRESS
          </span>
          <span className="text-cyan-400 font-bold">{launchProgress}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-lg shadow-cyan-500/50"
            style={{ width: `${launchProgress}%` }}
          />
        </div>
      </motion.div>
    </section>
  );
};
