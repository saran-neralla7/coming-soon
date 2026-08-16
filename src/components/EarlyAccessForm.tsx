import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mail, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const EarlyAccessForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('neralla_subscribed');
    if (saved) {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      audioEngine.playClickSound(400);
      return;
    }

    setIsLoading(true);
    audioEngine.playClickSound(900);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      localStorage.setItem('neralla_subscribed', email);
      audioEngine.playSuccessSound();

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#a855f7', '#ec4899', '#34d399'],
        });
      } catch {
        // Fallback if canvas confetti isn't supported
      }
    }, 600);
  };

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-cyan-500/30">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE LAUNCH WAITLIST</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Be the First to Know When <span className="text-gradient">neralla.in</span> Goes Live
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Get exclusive early access updates, full-stack tech breakdowns, and college automation case studies delivered straight to your inbox.
        </p>

        {isSubmitted ? (
          <div className="bg-emerald-950/80 border border-emerald-800/80 p-6 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-3 text-emerald-300">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-left font-mono text-xs sm:text-sm">
              <p className="font-bold text-white">ACCESS GRANTED! YOU'RE ON THE LIST.</p>
              <p className="text-emerald-400/80 mt-0.5">We'll notify you as soon as www.neralla.in launches.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-12 pr-32 py-4 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
              >
                {isLoading ? (
                  <span>Joining...</span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <p className="text-rose-400 text-xs font-mono text-left pl-2">{errorMsg}</p>
            )}

            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-mono pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero spam. Direct updates from Saran Neralla.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
