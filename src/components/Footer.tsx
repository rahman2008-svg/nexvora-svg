import React from 'react';
import { Sparkles, Phone, Share2, ExternalLink, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout }) => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 py-8 px-4 sm:px-6">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-bold text-white text-sm">NexVora SVG</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Published by <strong className="text-slate-300">NexVora Lab&apos;s Ofc</strong> &bull; Developed by <strong className="text-slate-300">Prince AR Abdur Rahman</strong>
            </p>
          </div>
        </div>

        {/* Center: Contact Links */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://wa.me/8801707424006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
            title="WhatsApp 01707424006"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href="https://www.facebook.com/share/1BNn32qoJo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/ur___abdur____rahman__2008"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-pink-400 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>

          <button
            onClick={onOpenAbout}
            className="text-sky-400 hover:text-sky-300 font-medium underline underline-offset-4 cursor-pointer"
          >
            Developer & Company Info
          </button>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-slate-500 text-center md:text-right">
          &copy; 2026 NexVora Lab&apos;s Ofc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
