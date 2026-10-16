import React from 'react';
import {
  X,
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
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [copiedNumber, setCopiedNumber] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(id);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative px-6 py-6 border-b border-slate-800 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  NexVora SVG
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">
                    v1.0.0
                  </span>
                </h2>
                <p className="text-xs text-slate-400">About Developer & Publisher Information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* About Developer Section */}
          <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-2.5 text-blue-400 font-semibold mb-3">
              <User className="w-5 h-5" />
              <h3 className="text-base text-white">About Developer</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-bold text-slate-100">Prince AR Abdur Rahman</h4>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  Independent App Developer passionate about building modern Android applications, productivity tools, AI-powered experiences, media players, educational apps, and next-generation digital products.
                </p>
              </div>

              {/* Developer Contact & Socials */}
              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Direct Contact & Profiles</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* WhatsApp 1 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400">WhatsApp</div>
                        <div className="text-xs font-medium text-slate-200">01707424006</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy('01707424006', 'wa1')}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Copy number"
                      >
                        {copiedNumber === 'wa1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href="https://wa.me/8801707424006"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                        title="Open WhatsApp chat"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp 2 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400">WhatsApp</div>
                        <div className="text-xs font-medium text-slate-200">01796951709</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy('01796951709', 'wa2')}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Copy number"
                      >
                        {copiedNumber === 'wa2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href="https://wa.me/8801796951709"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                        title="Open WhatsApp chat"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Facebook Link */}
                  <a
                    href="https://www.facebook.com/share/1BNn32qoJo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400">Facebook Profile</div>
                        <div className="text-xs font-medium text-slate-200">Prince AR Abdur Rahman</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </a>

                  {/* Instagram Link */}
                  <a
                    href="https://www.instagram.com/ur___abdur____rahman__2008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400">Instagram</div>
                        <div className="text-xs font-medium text-slate-200">@ur___abdur____rahman__2008</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About Company Section */}
          <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-2.5 text-indigo-400 font-semibold mb-3">
              <Building2 className="w-5 h-5" />
              <h3 className="text-base text-white">About Company</h3>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-bold text-slate-100">NexVora Lab&apos;s Ofc</h4>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  NexVora Lab&apos;s Ofc focuses on creating innovative Android applications designed to improve productivity, entertainment, learning, and digital experiences.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-indigo-500/20">
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mission Statement
                </div>
                <p className="text-sm text-slate-200 italic font-medium">
                  &ldquo;Build fast, beautiful, privacy-friendly, and user-focused applications accessible to everyone.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Technical Info & Credits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                Technical Information
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Application:</span>
                  <span className="font-semibold text-white">NexVora SVG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version:</span>
                  <span className="font-mono text-cyan-400">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Engine:</span>
                  <span>Pure Client-Side / Canvas 2D / SVGO</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Credits & Copyright
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400">Developed by: </span>
                  <span className="font-medium text-white">Prince AR Abdur Rahman</span>
                </div>
                <div>
                  <span className="text-slate-400">Published by: </span>
                  <span className="font-medium text-white">NexVora Lab&apos;s Ofc</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  &copy; 2026 NexVora Lab&apos;s Ofc. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-600/25"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
