import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Zap,
  Building2,
  Globe,
  CheckCircle2,
  Cpu,
  Workflow,
  ShieldCheck,
  Server,
  Code,
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const ShowcaseGrid: React.FC = () => {
  // Live metric simulator for ERP widget
  const [metrics, setMetrics] = useState({
    reqRate: 1420,
    dbLatency: 4.2,
    activeTasks: 98.4,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        reqRate: 1400 + Math.floor(Math.random() * 50),
        dbLatency: +(4.0 + Math.random() * 0.5).toFixed(1),
        activeTasks: +(98.0 + Math.random() * 1.2).toFixed(1),
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const specialities = [
    {
      id: 'ai-agents',
      title: 'Autonomous AI Agents',
      tagline: 'Multi-Agent Frameworks & LLM Workflows',
      description:
        'Designing goal-oriented AI agents capable of autonomous code execution, tool calling, memory retrieval, and multi-agent coordination.',
      icon: Bot,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      badgeColor: 'bg-cyan-950/80 border-cyan-800/60 text-cyan-300',
      highlights: ['Custom Agentic Tools', 'RAG & Vector Search', 'Multi-Agent Swarms', 'Automated Reasoning'],
    },
    {
      id: 'automation',
      title: 'College & Enterprise Automation',
      tagline: 'Google Apps Script & Custom Webhooks',
      description:
        'Automating complex administrative workflows in engineering colleges — grade calculations, attendance triggers, Google Workspace sync, and scheduled report engines.',
      icon: Zap,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      badgeColor: 'bg-purple-950/80 border-purple-800/60 text-purple-300',
      highlights: ['Google Apps Script', 'Automated Email/SMS', 'Google Sheets/Drive API', 'Cron & Webhooks'],
    },
    {
      id: 'erp-systems',
      title: 'Custom Full-Stack ERP Systems',
      tagline: 'Institutional & Campus Management Platforms',
      description:
        'Building scalable ERP systems tailored for education & business. Features role-based access, student-faculty portals, real-time analytics, and secure data pipelines.',
      icon: Building2,
      color: 'from-pink-500 to-rose-600',
      textColor: 'text-pink-400',
      badgeColor: 'bg-pink-950/80 border-pink-800/60 text-pink-300',
      highlights: ['Role-Based Auth (RBAC)', 'Interactive Dashboards', 'Relational Schemas', 'High Performance'],
    },
    {
      id: 'webapps',
      title: 'Webapps, Websites & Beyond',
      tagline: 'Modern High-Performance Web Development',
      description:
        'Crafting visually rich, interactive web applications using modern JavaScript/TypeScript, React, Next.js, 3D WebGL graphics, and ultra-fast edge deployments.',
      icon: Globe,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      badgeColor: 'bg-emerald-950/80 border-emerald-800/60 text-emerald-300',
      highlights: ['React / Next.js', 'TailwindCSS & Glassmorphism', 'Three.js 3D Animations', 'Vercel Deployment'],
    },
  ];

  const techPills = [
    'TypeScript',
    'React',
    'Next.js',
    'TailwindCSS',
    'Three.js',
    'Google Apps Script',
    'Python',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'REST & GraphQL',
    'Vercel',
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-4">
          <Workflow className="w-3.5 h-3.5" />
          <span>WHAT I BUILD</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Specialized Engineering & Automation
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg">
          From full-scale campus ERPs to autonomous AI agent workforces and instant Google Apps Script automations.
        </p>
      </div>

      {/* Grid of 4 Primary Speciality Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {specialities.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => audioEngine.playClickSound(1100 + idx * 100)}
              className="glass-card p-6 sm:p-8 rounded-3xl relative group overflow-hidden border border-slate-800"
            >
              {/* Card top glow background */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500 rounded-full pointer-events-none`}
              />

              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 shadow-lg shadow-cyan-500/10`}
                >
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <IconComp className={`w-7 h-7 ${item.textColor}`} />
                  </div>
                </div>

                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border ${item.badgeColor}`}
                >
                  {item.tagline}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Speciality Highlight Tags */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${item.textColor}`} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Interactive ERP & System Simulation Widget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel-glow p-6 sm:p-8 rounded-3xl mb-16 border border-cyan-500/30"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Cpu className="w-4 h-4 animate-spin" />
              <span>LIVE_ERP_TELEMETRY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Institutional Automation & ERP Telemetry
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Real-time load handling & automated Google Apps Script pipeline simulation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              GAS API CONNECTED
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800 text-xs font-mono">
              <Server className="w-4 h-4" />
              VERCEL EDGE READY
            </span>
          </div>
        </div>

        {/* Dynamic Metric Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">AUTOMATED REQUESTS / MIN</span>
            <p className="text-2xl font-mono font-bold text-cyan-400 mt-1">
              {metrics.reqRate}{' '}
              <span className="text-xs font-normal text-slate-500">req/m</span>
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">DATABASE QUERY LATENCY</span>
            <p className="text-2xl font-mono font-bold text-purple-400 mt-1">
              {metrics.dbLatency}{' '}
              <span className="text-xs font-normal text-slate-500">ms</span>
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">AGENT UPTIME RELIABILITY</span>
            <p className="text-2xl font-mono font-bold text-emerald-400 mt-1">
              {metrics.activeTasks}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Matrix */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 text-center">
        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          TECHS & TOOLS IN SARAN'S ARSENAL
        </h4>
        <div className="flex flex-wrap justify-center gap-2.5">
          {techPills.map((tech, i) => (
            <span
              key={i}
              onMouseEnter={() => audioEngine.playClickSound(1200 + i * 50)}
              className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-xs font-mono transition-all duration-200 cursor-default hover:text-cyan-300 hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
