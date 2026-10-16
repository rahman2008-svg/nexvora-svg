import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Sparkles,
  Download,
  Check,
  Copy,
  ArrowRight,
  TrendingDown,
  Layers,
  FileCode,
  RotateCcw,
} from 'lucide-react';
import {
  OptimizerOptions,
  defaultOptimizerOptions,
  optimizeSvg,
  extractSvgStats,
  downloadSvgFile,
} from '../utils/svgUtils';

interface OptimizerPanelProps {
  originalSvg: string;
  onApplyOptimized: (code: string) => void;
}

export const OptimizerPanel: React.FC<OptimizerPanelProps> = ({
  originalSvg,
  onApplyOptimized,
}) => {
  const [options, setOptions] = useState<OptimizerOptions>(defaultOptimizerOptions);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const toggleOption = (key: keyof OptimizerOptions) => {
    if (typeof options[key] === 'boolean') {
      setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const optimizedSvg = useMemo(() => {
    return optimizeSvg(originalSvg, options);
  }, [originalSvg, options]);

  const originalStats = useMemo(() => extractSvgStats(originalSvg), [originalSvg]);
  const optimizedStats = useMemo(() => extractSvgStats(optimizedSvg), [optimizedSvg]);

  const bytesSaved = Math.max(0, originalStats.byteSize - optimizedStats.byteSize);
  const percentSaved =
    originalStats.byteSize > 0
      ? ((bytesSaved / originalStats.byteSize) * 100).toFixed(1)
      : '0';

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApplyOptimized(optimizedSvg);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Original */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Original Size</p>
            <h3 className="text-2xl font-bold text-white mt-1 font-mono">{originalStats.formattedSize}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{originalStats.byteSize.toLocaleString()} bytes</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
            <FileCode className="w-5 h-5" />
          </div>
        </div>

        {/* Optimized */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Optimized Size</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{optimizedStats.formattedSize}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{optimizedStats.byteSize.toLocaleString()} bytes</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Savings */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/60 to-indigo-950/60 border border-blue-500/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Total Reduction</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-extrabold text-white">-{percentSaved}%</h3>
              <span className="text-xs text-sky-400 font-mono">({bytesSaved} B saved)</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">SVGO Lossless Compression</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Column */}
        <div className="lg:col-span-5 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              <h3 className="font-bold text-white text-sm">SVGO Rules & Presets</h3>
            </div>
            <button
              onClick={() => setOptions(defaultOptimizerOptions)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'removeXmlProcInst',
                label: 'Remove XML Processing Instruction',
                desc: 'Strips <?xml version="1.0"?> declaration header',
              },
              {
                id: 'removeDoctype',
                label: 'Remove DOCTYPE Declaration',
                desc: 'Removes <!DOCTYPE svg ...> tags',
              },
              {
                id: 'removeComments',
                label: 'Remove Comments',
                desc: 'Cleans out all <!-- comments --> in SVG XML',
              },
              {
                id: 'removeMetadata',
                label: 'Remove Metadata Tags',
                desc: 'Strips <metadata> and generator tags',
              },
              {
                id: 'removeTitleDesc',
                label: 'Remove <title> and <desc>',
                desc: 'Removes accessible title and description tags if unneeded',
              },
              {
                id: 'removeEmptyAttrs',
                label: 'Remove Empty Attributes',
                desc: 'Strips empty properties like id="" or class=""',
              },
              {
                id: 'collapseGroups',
                label: 'Collapse Empty Groups',
                desc: 'Removes empty or redundant <g></g> tags',
              },
              {
                id: 'convertColors',
                label: 'Minify Color Codes',
                desc: 'Converts #ffffff to #fff and rgb(0,0,0) to #000',
              },
              {
                id: 'roundDecimals',
                label: 'Round Floating Numbers',
                desc: 'Shortens coordinates like 12.345678 to 2 decimal places',
              },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-start justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="pr-3">
                  <div className="text-xs font-semibold text-slate-200">{item.label}</div>
                  <div className="text-[11px] text-slate-400">{item.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(options[item.id as keyof OptimizerOptions])}
                  onChange={() => toggleOption(item.id as keyof OptimizerOptions)}
                  className="mt-1 h-4 w-4 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>
            ))}

            {/* Decimal Precision Slider */}
            {options.roundDecimals && (
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Coordinate Precision:</span>
                  <span className="text-sky-400 font-mono font-bold">{options.decimalPlaces} decimals</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={options.decimalPlaces}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, decimalPlaces: Number(e.target.value) }))
                  }
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleApply}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/25 active:scale-95"
            >
              {applied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Applied to Workspace!</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>Apply to Workspace</span>
                </>
              )}
            </button>

            <button
              onClick={() => downloadSvgFile(optimizedSvg, 'optimized-vector.svg')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Diff Preview Column */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Optimized Output Code
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 flex-1 overflow-auto max-h-[600px] font-mono text-xs text-slate-200 leading-relaxed bg-slate-950/50">
            <pre className="whitespace-pre-wrap">{optimizedSvg}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
