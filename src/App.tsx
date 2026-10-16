/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SvgEditor } from './components/SvgEditor';
import { SvgPreview } from './components/SvgPreview';
import { OptimizerPanel } from './components/OptimizerPanel';
import { ExportSuite } from './components/ExportSuite';
import { PresetsGallery } from './components/PresetsGallery';
import { AboutView } from './components/AboutView';
import { AboutModal } from './components/AboutModal';
import { UrlLoadModal } from './components/UrlLoadModal';
import { Footer } from './components/Footer';
import { SAMPLE_SVGS } from './data/sampleSvgs';
import { extractSvgStats } from './utils/svgUtils';
import { UploadCloud } from 'lucide-react';

export default function App() {
  const [svgCode, setSvgCode] = useState<string>(SAMPLE_SVGS[0].code);
  const [activeTab, setActiveTab] = useState<'workspace' | 'optimizer' | 'export' | 'presets' | 'about'>('workspace');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Computed stats for the current SVG
  const stats = useMemo(() => extractSvgStats(svgCode), [svgCode]);

  // Random sample picker
  const handleRandomSample = useCallback(() => {
    const remaining = SAMPLE_SVGS.filter((s) => s.code.trim() !== svgCode.trim());
    const random = remaining[Math.floor(Math.random() * remaining.length)] || SAMPLE_SVGS[0];
    setSvgCode(random.code);
  }, [svgCode]);

  // Reset to default sample
  const handleReset = () => {
    setSvgCode(SAMPLE_SVGS[0].code);
  };

  // Upload handler
  const handleUploadSvg = (code: string) => {
    setSvgCode(code);
    setActiveTab('workspace');
  };

  // Drag and drop handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/svg+xml' || file.name.endsWith('.svg'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          handleUploadSvg(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* Drag & Drop Overlay */}
      {isDragOver && (
        <div className="fixed inset-0 z-50 bg-blue-600/30 backdrop-blur-sm border-4 border-dashed border-sky-400 flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-150">
          <UploadCloud className="w-16 h-16 text-sky-400 animate-bounce mb-3" />
          <h2 className="text-2xl font-bold text-white">Drop your SVG file here</h2>
          <p className="text-sm text-sky-200 mt-1">Instant parsing & visualization</p>
        </div>
      )}

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        svgCode={svgCode}
        onUploadSvg={handleUploadSvg}
        onRandomSample={handleRandomSample}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenUrlModal={() => setIsUrlModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'workspace' && (
          <div className="flex-1 p-3 sm:p-5 flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 min-h-[640px] max-w-[1900px] w-full mx-auto">
              {/* Left Column: Source Code Editor */}
              <div className="lg:col-span-6 xl:col-span-5 h-[480px] lg:h-[calc(100vh-140px)] min-h-[460px]">
                <SvgEditor
                  value={svgCode}
                  onChange={setSvgCode}
                  stats={stats}
                  onReset={handleReset}
                />
              </div>

              {/* Right Column: Visual Inspector & Preview */}
              <div className="lg:col-span-6 xl:col-span-7 h-[480px] lg:h-[calc(100vh-140px)] min-h-[460px]">
                <SvgPreview svgCode={svgCode} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'optimizer' && (
          <div className="flex-1 py-4 sm:py-6">
            <OptimizerPanel
              originalSvg={svgCode}
              onApplyOptimized={(optimized) => {
                setSvgCode(optimized);
                setActiveTab('workspace');
              }}
            />
          </div>
        )}

        {activeTab === 'export' && (
          <div className="flex-1 py-4 sm:py-6">
            <ExportSuite svgCode={svgCode} />
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="flex-1 py-4 sm:py-6">
            <PresetsGallery
              currentSvg={svgCode}
              onSelectSvg={(newCode) => {
                setSvgCode(newCode);
                setActiveTab('workspace');
              }}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="flex-1 py-4 sm:py-6">
            <AboutView />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onOpenAbout={() => setIsAboutModalOpen(true)} />

      {/* About Developer & Company Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Load from URL Modal */}
      <UrlLoadModal
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        onLoadSvg={handleUploadSvg}
      />
    </div>
  );
}
