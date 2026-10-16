import React, { useState } from 'react';
import {
  User,
  Building2,
  Phone,
  Share2,
  ExternalLink,
  ShieldCheck,
  Code2,
  Sparkles,
  Heart,
  Copy,
  Check,
  Layers,
  Smartphone,
  Cpu,
  Compass,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-sky-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Official Developer & Company Dossier
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              NexVora <span className="text-sky-400">SVG</span> Suite
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              High-performance vector graphics workstation engineered for modern web and mobile developers. Powered by clean code, privacy-first offline processing, and visual precision.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center min-w-[160px] shadow-lg">
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Release</span>
            <span className="text-3xl font-extrabold font-mono text-sky-400 mt-1">v1.0.0</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Production Ready
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Developer Card & Company Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Developer Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <User className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">Lead Creator</span>
                <h2 className="text-2xl font-bold text-white">Prince AR Abdur Rahman</h2>
                <p className="text-xs text-slate-400">Independent Application Developer</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">About Developer</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                Independent App Developer passionate about building modern Android applications, productivity tools, AI-powered experiences, media players, educational apps, and next-generation digital products.
              </p>
            </div>

            {/* Direct Contact */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Direct Contact & Social Profiles</h3>
              
              <div className="space-y-3">
                {/* WhatsApp Line 1 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">WhatsApp Direct</div>
                      <div className="text-sm font-semibold text-white">01707424006</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy('01707424006', 'wa1')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy phone number"
                    >
                      {copiedId === 'wa1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href="https://wa.me/8801707424006"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                      title="Open WhatsApp chat"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp Line 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">WhatsApp Secondary</div>
                      <div className="text-sm font-semibold text-white">01796951709</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy('01796951709', 'wa2')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy phone number"
                    >
                      {copiedId === 'wa2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href="https://wa.me/8801796951709"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                      title="Open WhatsApp chat"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1BNn32qoJo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Facebook Connection</div>
                      <div className="text-sm font-semibold text-white">Prince AR Abdur Rahman</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ur___abdur____rahman__2008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-pink-500/50 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Instagram Handle</div>
                      <div className="text-sm font-semibold text-white">@ur___abdur____rahman__2008</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-pink-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Company Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">Organization</span>
                <h2 className="text-2xl font-bold text-white">NexVora Lab&apos;s Ofc</h2>
                <p className="text-xs text-slate-400">Application Research & Digital Software Studio</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">About Company</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                NexVora Lab&apos;s Ofc focuses on creating innovative Android applications designed to improve productivity, entertainment, learning, and digital experiences.
              </p>
            </div>

            {/* Mission Statement Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/70 to-indigo-950/70 border border-blue-500/30 relative">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Core Mission
              </div>
              <p className="text-slate-100 font-medium text-base italic leading-relaxed">
                &ldquo;Build fast, beautiful, privacy-friendly, and user-focused applications accessible to everyone.&rdquo;
              </p>
            </div>

            {/* Focus Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Android Apps</div>
                  <div className="text-[11px] text-slate-400">Modern & Native</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">AI Tools</div>
                  <div className="text-[11px] text-slate-400">Intelligent UX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Information & Credits Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2.5 text-sky-400 font-semibold mb-3">
            <Code2 className="w-5 h-5" />
            <h3 className="text-base text-white">Technical Information</h3>
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Product Name</span>
              <span className="font-semibold text-white">NexVora SVG</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Version</span>
              <span className="font-mono text-sky-400 font-bold">1.0.0</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Architecture</span>
              <span className="text-slate-200">Client-Side High Performance SPA</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Privacy Guarantee</span>
              <span className="text-emerald-400 font-medium">100% Client-Side Processing</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2.5 text-rose-400 font-semibold mb-3">
            <Heart className="w-5 h-5" />
            <h3 className="text-base text-white">Credits & Authorship</h3>
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Developed by</span>
              <span className="font-semibold text-white">Prince AR Abdur Rahman</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Published by</span>
              <span className="font-semibold text-white">NexVora Lab&apos;s Ofc</span>
            </div>
            <div className="pt-2 text-xs text-slate-400 leading-relaxed">
              &copy; 2026 NexVora Lab&apos;s Ofc. All Rights Reserved. All trademarks and registered trademarks are the property of their respective owners.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
