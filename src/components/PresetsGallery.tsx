import React, { useState } from 'react';
import { SAMPLE_SVGS, SampleSvg } from '../data/sampleSvgs';
import { Check, ArrowRight, FolderHeart, Sparkles } from 'lucide-react';

interface PresetsGalleryProps {
  onSelectSvg: (code: string) => void;
  currentSvg: string;
}

export const PresetsGallery: React.FC<PresetsGalleryProps> = ({
  onSelectSvg,
  currentSvg,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Branding', 'Tech & Cloud', 'UI Icons', 'Illustrations', 'Shapes'];

  const filteredSvgs =
    selectedCategory === 'All'
      ? SAMPLE_SVGS
      : SAMPLE_SVGS.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-sky-400" />
            Curated SVG Sample Presets
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Select any vector graphic to load directly into the editor and inspector workstation.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredSvgs.map((item) => {
          const isCurrent = currentSvg.trim() === item.code.trim();

          return (
            <div
              key={item.id}
              className={`flex flex-col p-5 rounded-2xl bg-slate-900 border transition-all duration-200 ${
                isCurrent
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Graphic Preview Box */}
              <div className="w-full aspect-video rounded-xl checker-bg-dark border border-slate-800/80 p-6 flex items-center justify-center relative overflow-hidden group">
                <div
                  className="w-full h-full max-w-[130px] max-h-[130px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  dangerouslySetInnerHTML={{ __html: item.code }}
                />
              </div>

              {/* Info */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                      {item.category}
                    </span>
                    {isCurrent && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectSvg(item.code)}
                  className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-300 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  <span>{isCurrent ? 'Currently Loaded' : 'Load in Workspace'}</span>
                  {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
