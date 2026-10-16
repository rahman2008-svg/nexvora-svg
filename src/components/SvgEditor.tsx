import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Sparkles,
  Minimize2,
  AlignLeft,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { formatSvg, minifySvg, optimizeSvg, SvgStats } from '../utils/svgUtils';

interface SvgEditorProps {
  value: string;
  onChange: (value: string) => void;
  stats: SvgStats;
  onReset: () => void;
}

export const SvgEditor: React.FC<SvgEditorProps> = ({
  value,
  onChange,
  stats,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrettify = () => {
    const formatted = formatSvg(value);
    onChange(formatted);
  };

  const handleMinify = () => {
    const minified = minifySvg(value);
    onChange(minified);
  };

  const handleQuickOptimize = () => {
    const optimized = optimizeSvg(value);
    onChange(optimized);
  };

  const handleClear = () => {
    onChange('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="#3b82f6" />\n</svg>');
  };

  // Generate line numbers
  const lines = value.split('\n');
  const lineNumbers = Array.from({ length: Math.max(lines.length, 1) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Editor Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Code className="w-3.5 h-3.5 text-sky-400" />
            <span>SVG Source Code</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="font-mono bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              {stats.formattedSize}
            </span>
            <span className="font-mono bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              {lines.length} lines
            </span>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrettify}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-colors"
            title="Prettify and format with standard indentation"
          >
            <AlignLeft className="w-3 h-3 text-sky-400" />
            <span>Format</span>
          </button>

          <button
            onClick={handleMinify}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-colors"
            title="Minify and remove extra whitespace"
          >
            <Minimize2 className="w-3 h-3 text-amber-400" />
            <span>Minify</span>
          </button>

          <button
            onClick={handleQuickOptimize}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-colors"
            title="Optimize SVG structure and eliminate junk"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Optimize</span>
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-1" />

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-colors"
            title="Copy SVG to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Reset to default graphic"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleClear}
            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Syntax Error Warning Banner */}
      {!stats.isValid && stats.error && (
        <div className="px-3 py-2 bg-rose-500/10 border-b border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span className="truncate">{stats.error}</span>
        </div>
      )}

      {/* Editor Content with Line Numbers */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-xs">
        {/* Line Numbers Column */}
        <div className="select-none py-3 px-2 bg-slate-950/60 text-slate-600 border-r border-slate-800/60 text-right w-11 flex-shrink-0 font-mono text-[11px] leading-5">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full h-full p-3 bg-transparent text-slate-200 font-mono text-xs leading-5 resize-none focus:outline-none focus:ring-0 selection:bg-blue-600/40 border-none"
          placeholder="Paste or write your SVG markup here..."
        />
      </div>

      {/* Bottom Status bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/90 border-t border-slate-800/80 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-slate-500" />
            <span>XML / SVG 1.1</span>
          </div>
          {stats.viewBox && (
            <span>
              viewBox: <strong className="text-slate-300 font-mono">{stats.viewBox}</strong>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span>
            Elements: <strong className="text-slate-300">{stats.elementsCount}</strong>
          </span>
          <span>
            Paths: <strong className="text-slate-300">{stats.pathsCount}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
