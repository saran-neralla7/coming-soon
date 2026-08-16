import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface TerminalConsoleProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'welcome',
      command: 'welcome',
      output: (
        <div className="text-slate-300 space-y-1">
          <p className="text-cyan-400 font-bold">
            NERALLA.IN INTERACTIVE CLI [v2.4.0-release]
          </p>
          <p className="text-xs text-slate-400">
            Welcome to Saran Neralla's command interface. Type <span className="text-cyan-300 font-bold">'help'</span> for available commands.
          </p>
        </div>
      ),
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    audioEngine.playTypingSound();

    let outputNode: React.ReactNode;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-cyan-400 font-semibold mb-1">Available System Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-purple-400 font-bold">about</span> - Background & engineering summary</div>
              <div><span className="text-purple-400 font-bold">skills</span> - Full-stack & automation tech stack</div>
              <div><span className="text-purple-400 font-bold">projects</span> - Key ERP, AI agent & automation work</div>
              <div><span className="text-purple-400 font-bold">contact</span> - Email & social channels</div>
              <div><span className="text-purple-400 font-bold">matrix</span> - Launch digital cyber rain</div>
              <div><span className="text-purple-400 font-bold">launch</span> - Check neralla.in launch status</div>
              <div><span className="text-purple-400 font-bold">clear</span> - Clear terminal log</div>
              <div><span className="text-purple-400 font-bold">sudo</span> - Execute with admin rights</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-2 text-slate-300 text-xs font-mono">
            <p className="text-cyan-400 font-bold">SARAN NERALLA — FULL STACK DEVELOPER</p>
            <p>
              Automating workflows in engineering college environments, constructing robust ERP backends, and architecting autonomous AI agent pipelines.
            </p>
            <p className="text-slate-400">
              Domain: <span className="text-cyan-300">www.neralla.in</span> | Location: India | Status: Open to high-impact projects.
            </p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1.5 text-slate-300 text-xs font-mono">
            <p className="text-cyan-400 font-semibold">Technical Stack Breakdown:</p>
            <p><span className="text-purple-400">Frontend:</span> React, Next.js, TypeScript, TailwindCSS, Three.js (3D WebGL), HTML5/CSS3</p>
            <p><span className="text-purple-400">Automation:</span> Google Apps Script, Webhooks, REST APIs, Scheduled Cron, Sheets DB</p>
            <p><span className="text-purple-400">Backend & DB:</span> Node.js, Python, PostgreSQL, MongoDB, RESTful APIs</p>
            <p><span className="text-purple-400">AI Architecture:</span> Autonomous Agents, LangChain, Multi-Agent Swarms, RAG, Prompt Design</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-slate-300 text-xs font-mono">
            <p className="text-cyan-400 font-semibold">Featured Projects & Systems:</p>
            <div>
              <p className="text-white font-bold">1. College Administrative ERP</p>
              <p className="text-slate-400">Full-scale institutional portal for student marks, attendance tracking, and faculty reports.</p>
            </div>
            <div>
              <p className="text-white font-bold">2. Google Apps Script Automated Engine</p>
              <p className="text-slate-400">Automates campus notifications, PDF grade generation, and Google Sheets database synchronization.</p>
            </div>
            <div>
              <p className="text-white font-bold">3. Autonomous AI Agent Orchestration</p>
              <p className="text-slate-400">Multi-agent system that plans, writes code, and executes automated web tasks.</p>
            </div>
            <div>
              <p className="text-white font-bold">4. neralla.in Landing Portal</p>
              <p className="text-slate-400">3D animated WebGL coming-soon showcase designed for Vercel deployment.</p>
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-cyan-400 font-semibold">Connect with Saran Neralla:</p>
            <p>Domain: <span className="text-cyan-300">https://www.neralla.in</span></p>
            <p>Email: <span className="text-purple-300">saran@neralla.in</span></p>
            <p>GitHub: <span className="text-slate-300">github.com/saranneralla</span></p>
            <p>LinkedIn: <span className="text-slate-300">linkedin.com/in/saranneralla</span></p>
          </div>
        );
        break;

      case 'matrix':
        outputNode = (
          <div className="text-emerald-400 font-mono text-xs animate-pulse space-y-0.5">
            <p>01001110 01000101 01010010 01000001 01001100 01001100 01000001</p>
            <p>SYSTEM INITIALIZING... WAKING UP AGENTS...</p>
            <p>01010011 01000001 01010010 01000001 01001110 00101110 01001001 01001110</p>
            <p className="text-cyan-400 font-bold">&gt;&gt;&gt; NERALLA.IN MATRIX CORE ONLINE &amp; OPERATIONAL!</p>
          </div>
        );
        break;

      case 'launch':
        outputNode = (
          <div className="text-slate-300 text-xs font-mono space-y-1">
            <p className="text-cyan-400 font-bold">LAUNCH SEQUENCE METRICS:</p>
            <p>Domain Target: <span className="text-white font-bold">www.neralla.in</span></p>
            <p>Deployment Target: <span className="text-emerald-400">Vercel Edge Network</span></p>
            <p>System Build Status: <span className="text-purple-400 font-bold">88% COMPLETE</span></p>
            <p className="text-slate-400">Stay tuned for official public launch!</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
        outputNode = (
          <p className="text-rose-400 font-mono text-xs">
            [ACCESS DENIED] User 'guest' is not in the sudoers file. Incident reported to Saran! 😉
          </p>
        );
        break;

      default:
        outputNode = (
          <p className="text-slate-400 font-mono text-xs">
            Command not recognized: <span className="text-rose-400 font-bold">{cmd}</span>. Type <span className="text-cyan-300 font-bold">'help'</span> for valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: inputVal,
        output: outputNode,
      },
    ]);
    setInputVal('');
  };

  const copyLog = () => {
    const logText = history
      .map((h) => `saran@neralla.in:~$ ${h.command}`)
      .join('\n');
    navigator.clipboard.writeText(logText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className={`w-full ${
          isExpanded ? 'max-w-6xl h-[85vh]' : 'max-w-3xl h-[520px]'
        } glass-panel-glow rounded-2xl flex flex-col overflow-hidden border border-cyan-500/40 shadow-2xl transition-all duration-300`}
      >
        {/* Terminal Header Bar */}
        <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-3 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              saran@neralla.in: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyLog}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copy Output"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors hidden sm:block"
              title={isExpanded ? 'Minimize Window' : 'Maximize Window'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Close Terminal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-sm space-y-4 bg-slate-950/70">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center text-cyan-400">
                <span className="text-emerald-400 font-bold mr-1.5">saran@neralla.in</span>
                <span className="text-slate-500 mr-2">:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-4 border-l-2 border-slate-800/80 py-1">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Form Bar */}
        <form onSubmit={handleCommandSubmit} className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs font-bold">saran@neralla.in</span>
          <span className="text-slate-500 font-mono text-xs">:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              audioEngine.playTypingSound();
            }}
            placeholder="Type 'help', 'about', 'skills', 'projects', 'contact'..."
            className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono text-xs sm:text-sm placeholder-slate-600"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-400 font-mono text-xs"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
};
