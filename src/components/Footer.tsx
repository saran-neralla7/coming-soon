import React from 'react';
import { Terminal, Heart, Globe, Cpu } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenContact }) => {
  return (
    <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <a
              href="https://www.neralla.in"
              className="text-base font-bold text-white hover:text-cyan-400 transition-colors font-mono"
            >
              www.neralla.in
            </a>
            <p className="text-xs text-slate-400">
              Saran Neralla © {new Date().getFullYear()} • All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Center Live Ping Indicator */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            EDGE_PING: 14ms
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            VERCEL DEPLOY READY
          </span>
        </div>

        {/* Right Footer Quick Links */}
        <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
          <button
            onClick={() => {
              audioEngine.playClickSound(600);
              onOpenTerminal();
            }}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5" />
            CLI
          </button>
          <span>•</span>
          <button
            onClick={() => {
              audioEngine.playClickSound(700);
              onOpenContact();
            }}
            className="hover:text-cyan-400 transition-colors"
          >
            Contact
          </button>
          <span>•</span>
          <a
            href="https://github.com/saranneralla"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-900/80 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 font-mono">
        <span>Engineered with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        <span>by Saran Neralla for <strong className="text-slate-300">neralla.in</strong></span>
      </div>
    </footer>
  );
};
