import { useState } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShowcaseGrid } from './components/ShowcaseGrid';
import { EarlyAccessForm } from './components/EarlyAccessForm';
import { TerminalConsole } from './components/TerminalConsole';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { audioEngine } from './utils/audioEngine';

export function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleToggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* 3D WebGL Animated Interactive Canvas Background */}
      <ThreeCanvas />

      {/* Cyber Grid Pattern Background Overlay */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" />

      {/* Ambient Gradient Lighting Spots */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Page Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Header Navbar */}
        <Navbar
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Hero Section */}
        <main className="flex-1">
          <HeroSection
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />

          {/* Specialities & Skills Showcase Grid */}
          <ShowcaseGrid />

          {/* Early Access / Newsletter Waitlist Form */}
          <EarlyAccessForm />
        </main>

        {/* Page Footer */}
        <Footer
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />
      </div>

      {/* Interactive Terminal CLI Modal */}
      <TerminalConsole
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
