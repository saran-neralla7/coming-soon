import React, { useState } from 'react';
import { X, Mail, Globe, Share2, Copy, Check, Send, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('saran@neralla.in');
    setCopiedEmail(true);
    audioEngine.playClickSound(1000);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    audioEngine.playSuccessSound();
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg glass-panel-glow p-6 sm:p-8 rounded-3xl relative border border-cyan-500/40 shadow-2xl">
        <button
          onClick={() => {
            audioEngine.playClickSound(500);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DIRECT CONTACT</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Connect with Saran Neralla</h3>
        <p className="text-slate-300 text-xs sm:text-sm mb-6">
          Building custom ERPs, campus automation pipelines, or AI agents? Reach out directly!
        </p>

        {/* Quick Email Copy Bar */}
        <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-mono text-sm text-cyan-300 truncate">saran@neralla.in</span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <a
            href="https://github.com/saranneralla"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playClickSound(800)}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-all"
          >
            <Globe className="w-4 h-4 text-slate-300" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/saranneralla"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playClickSound(800)}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-all"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://twitter.com/saranneralla"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playClickSound(800)}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-all"
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Twitter/X</span>
          </a>
        </div>

        {/* Send Message Form */}
        {msgSent ? (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-xs text-center">
            ✓ Message transmitted to Saran! I'll get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 font-sans text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 font-sans text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <textarea
                required
                rows={3}
                placeholder="What project or automation can I help you build?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 font-sans text-xs focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
