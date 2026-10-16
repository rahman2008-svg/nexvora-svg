import React, { useRef } from 'react';
import {
  Sparkles,
  Upload,
  Download,
  Shuffle,
  Info,
  Link as LinkIcon,
  Code2,
  FileCode2,
  Maximize2,
  Sliders,
  FolderHeart,
  UserCheck,
} from 'lucide-react';
import { downloadSvgFile } from '../utils/svgUtils';

interface HeaderProps {
  activeTab: 'workspace' | 'optimizer' | 'export' | 'presets' | 'about';
  setActiveTab: (tab: 'workspace' | 'optimizer' | 'export' | 'presets' | 'about') => void;
  svgCode: string;
  onUploadSvg: (code: string, fileName?: string) => void;
  onRandomSample: () => void;
  onOpenAbout: () => void;
  onOpenUrlModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  svgCode,
  onUploadSvg,
  onRandomSample,
  onOpenAbout,
  onOpenUrlModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onUploadSvg(content, file.name);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      {/* Top Banner Navigation */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('workspace')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-400 fill-none stroke-current stroke-2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  NexVora <span className="text-sky-400">SVG</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  v1.0.0
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 leading-none">
                Interactive SVG Workstation & Converter
              </p>
            </div>
          </button>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'workspace'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </button>
            <button
              onClick={() => setActiveTab('optimizer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'optimizer'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Optimizer</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'export'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Export Suite</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'presets'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FolderHeart className="w-3.5 h-3.5" />
              <span>Presets</span>
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>About Developer</span>
            </button>
          </nav>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".svg,image/svg+xml"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 hover:text-white border border-slate-700 transition-colors shadow-sm"
            title="Upload SVG file from computer"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Upload</span>
          </button>

          <button
            onClick={onOpenUrlModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 hover:text-white border border-slate-700 transition-colors shadow-sm"
            title="Load SVG from direct web URL"
          >
            <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>URL</span>
          </button>

          <button
            onClick={onRandomSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 hover:text-white border border-slate-700 transition-colors shadow-sm"
            title="Load a random sample SVG"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Sample</span>
          </button>

          <button
            onClick={() => downloadSvgFile(svgCode, 'nexvora-vector.svg')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30 active:scale-95"
            title="Download current SVG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          {/* About Developer Button */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-300 bg-sky-950/70 hover:bg-sky-900/80 border border-sky-800/80 transition-all ml-1 shadow-sm"
            title="View Developer & Company Information"
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">About</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-slate-800/60 bg-slate-950/50 gap-2 no-scrollbar">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
            activeTab === 'workspace' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3 h-3" />
          Workspace
        </button>
        <button
          onClick={() => setActiveTab('optimizer')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
            activeTab === 'optimizer' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3 h-3" />
          Optimizer
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
            activeTab === 'export' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode2 className="w-3 h-3" />
          Export Suite
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
            activeTab === 'presets' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderHeart className="w-3 h-3" />
          Presets
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
            activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-3 h-3 text-sky-400" />
          About Developer
        </button>
      </div>
    </header>
  );
};
