import React from 'react';
import { Volume2, VolumeX, Terminal, Mail, Sparkles, Cpu } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface NavbarProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenTerminal: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleSound,
  onOpenTerminal,
  onOpenContact,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-4 max-w-7xl mx-auto">
      <nav className="glass-panel rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl border border-slate-800/80">
        {/* Brand & Domain */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-95">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div>
            <a
              href="https://www.neralla.in"
              className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              neralla<span className="text-cyan-400">.in</span>
            </a>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-1.5 py-0.5 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                SARAN NERALLA
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono">
                Full-Stack & AI
              </span>
            </div>
          </div>
        </div>

        {/* Center operational pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>STATUS:</span>
          <span className="text-cyan-400 font-semibold">BUILDING_NEXT_GEN</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            SYS_ONLINE
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              onToggleSound();
              audioEngine.playClickSound(900);
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            title={isMuted ? 'Unmute Cyber Audio' : 'Mute Cyber Audio'}
            aria-label="Toggle Audio"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            )}
          </button>

          {/* Terminal CLI Trigger */}
          <button
            onClick={() => {
              audioEngine.playClickSound(700);
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-all duration-200"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>CLI</span>
          </button>

          {/* Contact Modal Trigger */}
          <button
            onClick={() => {
              audioEngine.playClickSound(1000);
              onOpenContact();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
