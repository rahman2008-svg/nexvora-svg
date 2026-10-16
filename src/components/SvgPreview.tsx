import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Eye,
  Grid,
  Download,
  Paintbrush,
  Layers,
  Sparkles,
  Move,
  Check,
} from 'lucide-react';
import { exportSvgToImage, downloadSvgFile } from '../utils/svgUtils';

interface SvgPreviewProps {
  svgCode: string;
}

type BgType = 'checker-dark' | 'checker-light' | 'white' | 'black' | 'slate' | 'custom';

export const SvgPreview: React.FC<SvgPreviewProps> = ({ svgCode }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [background, setBackground] = useState<BgType>('checker-dark');
  const [customBgColor, setCustomBgColor] = useState('#0d1117');
  const [showBoundingBox, setShowBoundingBox] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [previewSize, setPreviewSize] = useState<'fit' | '16' | '24' | '32' | '48' | '64' | '128' | '256' | '512'>('fit');
  const [overrideFill, setOverrideFill] = useState<string>('');
  const [overrideStroke, setOverrideStroke] = useState<string>('');
  const [invertColors, setInvertColors] = useState(false);
  const [exporting, setExporting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.25, 10));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.25, 0.1));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom((z) => Math.max(0.1, Math.min(10, z * factor)));
  };

  // Generate processed SVG markup with color overrides if applied
  const getProcessedSvg = () => {
    let code = svgCode;

    // Apply color tint overrides if user set them
    if (overrideFill) {
      code = code.replace(/fill="([^"]*)"/g, (match, val) => {
        if (val === 'none') return match;
        return `fill="${overrideFill}"`;
      });
    }

    if (overrideStroke) {
      code = code.replace(/stroke="([^"]*)"/g, (match, val) => {
        if (val === 'none') return match;
        return `stroke="${overrideStroke}"`;
      });
    }

    return code;
  };

  // Background styling
  const getBgStyle = () => {
    switch (background) {
      case 'checker-dark':
        return 'checker-bg-dark';
      case 'checker-light':
        return 'checker-bg-light';
      case 'white':
        return 'bg-white';
      case 'black':
        return 'bg-black';
      case 'slate':
        return 'bg-slate-900';
      case 'custom':
        return '';
      default:
        return 'checker-bg-dark';
    }
  };

  const handleDownloadPng = async (scale = 2) => {
    setExporting(true);
    try {
      await exportSvgToImage({
        svgString: getProcessedSvg(),
        format: 'png',
        scale,
        bgColor: background === 'white' ? '#ffffff' : background === 'black' ? '#000000' : 'transparent',
        fileName: 'nexvora-export',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top Preview Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-950/80 border-b border-slate-800 gap-2">
        {/* Left: Background & View Options */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setBackground('checker-dark')}
              className={`p-1.5 rounded text-xs transition-colors ${
                background === 'checker-dark' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dark Checkerboard (Transparency)"
            >
              <div className="w-3.5 h-3.5 rounded-sm checker-bg-dark border border-slate-700" />
            </button>
            <button
              onClick={() => setBackground('checker-light')}
              className={`p-1.5 rounded text-xs transition-colors ${
                background === 'checker-light' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Light Checkerboard"
            >
              <div className="w-3.5 h-3.5 rounded-sm checker-bg-light border border-slate-300" />
            </button>
            <button
              onClick={() => setBackground('white')}
              className={`p-1.5 rounded text-xs transition-colors ${
                background === 'white' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="White Background"
            >
              <div className="w-3.5 h-3.5 rounded-sm bg-white border border-slate-300" />
            </button>
            <button
              onClick={() => setBackground('black')}
              className={`p-1.5 rounded text-xs transition-colors ${
                background === 'black' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Black Background"
            >
              <div className="w-3.5 h-3.5 rounded-sm bg-black border border-slate-700" />
            </button>
            <button
              onClick={() => setBackground('slate')}
              className={`p-1.5 rounded text-xs transition-colors ${
                background === 'slate' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Slate Dark Background"
            >
              <div className="w-3.5 h-3.5 rounded-sm bg-slate-900 border border-slate-700" />
            </button>

            {/* Custom Color Input */}
            <div className="relative flex items-center pl-1 pr-1.5">
              <input
                type="color"
                value={customBgColor}
                onChange={(e) => {
                  setCustomBgColor(e.target.value);
                  setBackground('custom');
                }}
                className="w-4 h-4 rounded cursor-pointer border-0 p-0 bg-transparent"
                title="Pick custom canvas background color"
              />
            </div>
          </div>

          {/* Grid & Bounding Box Toggles */}
          <button
            onClick={() => setShowBoundingBox(!showBoundingBox)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border transition-colors ${
              showBoundingBox
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Bounding Box"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">Box</span>
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border transition-colors ${
              showGrid
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Grid Lines"
          >
            <Grid className="w-3 h-3" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>

        {/* Right: Zoom & Export Controls */}
        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-slate-300 min-w-[42px] text-center select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset Zoom & Pan"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Quick PNG download */}
          <button
            onClick={() => handleDownloadPng(2)}
            disabled={exporting}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-sky-300 bg-sky-950/70 hover:bg-sky-900/80 border border-sky-800/80 transition-colors shadow-sm"
            title="Quick download as High-Res PNG (2x)"
          >
            <Download className="w-3 h-3" />
            <span>PNG</span>
          </button>
        </div>
      </div>

      {/* Secondary Controls Bar: Preset Sizes & Color Adjustments */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1.5 bg-slate-950/60 border-b border-slate-800/60 text-xs text-slate-400 gap-2">
        {/* Preset dimension pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] text-slate-500 mr-1 hidden sm:inline">Size:</span>
          {(['fit', '16', '24', '32', '48', '64', '128', '256'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setPreviewSize(s)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                previewSize === s
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {s === 'fit' ? 'Auto' : `${s}px`}
            </button>
          ))}
        </div>

        {/* Color Tints */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">Fill:</span>
            <input
              type="color"
              value={overrideFill || '#3b82f6'}
              onChange={(e) => setOverrideFill(e.target.value)}
              className="w-4 h-4 rounded cursor-pointer border-0 p-0 bg-transparent"
              title="Override fill color"
            />
            {overrideFill && (
              <button
                onClick={() => setOverrideFill('')}
                className="text-[10px] text-rose-400 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">Stroke:</span>
            <input
              type="color"
              value={overrideStroke || '#38bdf8'}
              onChange={(e) => setOverrideStroke(e.target.value)}
              className="w-4 h-4 rounded cursor-pointer border-0 p-0 bg-transparent"
              title="Override stroke color"
            />
            {overrideStroke && (
              <button
                onClick={() => setOverrideStroke('')}
                className="text-[10px] text-rose-400 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => setInvertColors(!invertColors)}
            className={`px-1.5 py-0.5 rounded text-[10px] border transition-colors ${
              invertColors
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Invert
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          backgroundColor: background === 'custom' ? customBgColor : undefined,
        }}
        className={`relative flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none ${getBgStyle()}`}
      >
        {/* Optional Grid Overlay */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {/* Center Crosshairs */}
        <div className="absolute w-4 h-[1px] bg-sky-400/30 pointer-events-none" />
        <div className="absolute h-4 w-[1px] bg-sky-400/30 pointer-events-none" />

        {/* Transformed SVG Container */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.08s ease-out',
            filter: invertColors ? 'invert(1) hue-rotate(180deg)' : 'none',
          }}
          className={`flex items-center justify-center p-4 ${
            showBoundingBox ? 'ring-1 ring-sky-500/40 ring-offset-2 ring-offset-transparent rounded' : ''
          }`}
        >
          <div
            style={
              previewSize !== 'fit'
                ? {
                    width: `${previewSize}px`,
                    height: `${previewSize}px`,
                  }
                : {
                    maxWidth: '85%',
                    maxHeight: '85%',
                  }
            }
            className="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-[480px] [&>svg]:max-h-[480px] transition-all drop-shadow-sm"
            dangerouslySetInnerHTML={{ __html: getProcessedSvg() }}
          />
        </div>

        {/* Floating Pan Hint */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 pointer-events-none">
          <Move className="w-3 h-3 text-sky-400" />
          <span>Drag to pan &bull; Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
};
