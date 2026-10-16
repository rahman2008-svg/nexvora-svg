import React, { useState, useMemo } from 'react';
import {
  Download,
  Image as ImageIcon,
  Code2,
  FileCode,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  exportSvgToImage,
  svgToReact,
  svgToDataUri,
  getCssSnippet,
  getHtmlImageSnippet,
  ReactExportOptions,
} from '../utils/svgUtils';

interface ExportSuiteProps {
  svgCode: string;
}

export const ExportSuite: React.FC<ExportSuiteProps> = ({ svgCode }) => {
  const [activeTab, setActiveTab] = useState<'images' | 'react' | 'datauri'>('images');

  // Image Export State
  const [imgFormat, setImgFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [imgScale, setImgScale] = useState<number>(2);
  const [imgBg, setImgBg] = useState<'transparent' | 'white' | 'black' | 'custom'>('transparent');
  const [customBgHex, setCustomBgHex] = useState('#ffffff');
  const [exporting, setExporting] = useState(false);

  // React Export State
  const [reactOptions, setReactOptions] = useState<ReactExportOptions>({
    componentName: 'NexVoraIcon',
    typescript: true,
    target: 'react',
    memo: false,
    passProps: true,
  });

  // Copy tracking states
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generatedReactCode = useMemo(() => {
    return svgToReact(svgCode, reactOptions);
  }, [svgCode, reactOptions]);

  const rawDataUri = useMemo(() => svgToDataUri(svgCode, 'utf8'), [svgCode]);
  const base64DataUri = useMemo(() => svgToDataUri(svgCode, 'base64'), [svgCode]);
  const cssSnippet = useMemo(() => getCssSnippet(svgCode), [svgCode]);
  const htmlSnippet = useMemo(() => getHtmlImageSnippet(svgCode), [svgCode]);

  const handleDownloadImage = async () => {
    setExporting(true);
    try {
      const bgColor =
        imgFormat === 'jpeg'
          ? (imgBg === 'transparent' ? '#ffffff' : imgBg === 'custom' ? customBgHex : imgBg)
          : (imgBg === 'transparent' ? 'transparent' : imgBg === 'custom' ? customBgHex : imgBg);

      await exportSvgToImage({
        svgString: svgCode,
        format: imgFormat,
        scale: imgScale,
        bgColor,
        fileName: 'nexvora-vector',
      });
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6">
      {/* Tab Selector */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'images'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-sky-400" />
          <span>Raster Images (PNG / JPG / WebP)</span>
        </button>

        <button
          onClick={() => setActiveTab('react')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'react'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span>React JSX / React Native</span>
        </button>

        <button
          onClick={() => setActiveTab('datauri')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'datauri'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4 text-amber-400" />
          <span>Data URI & CSS Snippets</span>
        </button>
      </div>

      {/* Tab 1: Image Export */}
      {activeTab === 'images' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-5">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Download className="w-4 h-4 text-sky-400" />
              Image Export Settings
            </h3>

            {/* Format choice */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">File Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(['png', 'jpeg', 'webp'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setImgFormat(fmt)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                      imgFormat === fmt
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    .{fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution Scaling */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Resolution Multiplier</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { scale: 1, label: '1x (Std)' },
                  { scale: 2, label: '2x (Retina)' },
                  { scale: 3, label: '3x' },
                  { scale: 4, label: '4x (Ultra HD)' },
                ].map((item) => (
                  <button
                    key={item.scale}
                    onClick={() => setImgScale(item.scale)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium text-center transition-colors ${
                      imgScale === item.scale
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Canvas Background</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'transparent', label: 'Alpha', disabled: imgFormat === 'jpeg' },
                  { id: 'white', label: 'White', disabled: false },
                  { id: 'black', label: 'Black', disabled: false },
                  { id: 'custom', label: 'Custom', disabled: false },
                ].map((bg) => (
                  <button
                    key={bg.id}
                    disabled={bg.disabled}
                    onClick={() => setImgBg(bg.id as typeof imgBg)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium text-center transition-colors ${
                      bg.disabled
                        ? 'opacity-40 cursor-not-allowed bg-slate-950 border border-slate-800'
                        : imgBg === bg.id
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>

              {imgBg === 'custom' && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="color"
                    value={customBgHex}
                    onChange={(e) => setCustomBgHex(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={customBgHex}
                    onChange={(e) => setCustomBgHex(e.target.value)}
                    className="flex-1 px-3 py-1 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-200 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleDownloadImage}
              disabled={exporting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{exporting ? 'Rendering...' : `Download ${imgFormat.toUpperCase()} (${imgScale}x)`}</span>
            </button>
          </div>

          <div className="lg:col-span-7 p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
            <div className="w-full max-w-sm aspect-square rounded-xl p-8 flex items-center justify-center checker-bg-dark border border-slate-800 shadow-inner">
              <div
                className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: svgCode }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Rasterized using client-side HTML5 Canvas. Pixel-perfect anti-aliased vectors.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: React JSX / React Native */}
      {activeTab === 'react' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              Component Generator Settings
            </h3>

            {/* Component Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Component Name</label>
              <input
                type="text"
                value={reactOptions.componentName}
                onChange={(e) =>
                  setReactOptions((prev) => ({ ...prev, componentName: e.target.value || 'Icon' }))
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Target Framework */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Framework</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setReactOptions((prev) => ({ ...prev, target: 'react' }))}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                    reactOptions.target === 'react'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  React (Web)
                </button>
                <button
                  onClick={() => setReactOptions((prev) => ({ ...prev, target: 'react-native' }))}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                    reactOptions.target === 'react-native'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  React Native
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2.5 pt-2">
              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer">
                <span className="text-xs text-slate-300">TypeScript (.tsx)</span>
                <input
                  type="checkbox"
                  checked={reactOptions.typescript}
                  onChange={(e) =>
                    setReactOptions((prev) => ({ ...prev, typescript: e.target.checked }))
                  }
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer">
                <span className="text-xs text-slate-300">Pass Props (&#123;...props&#125;)</span>
                <input
                  type="checkbox"
                  checked={reactOptions.passProps}
                  onChange={(e) =>
                    setReactOptions((prev) => ({ ...prev, passProps: e.target.checked }))
                  }
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer">
                <span className="text-xs text-slate-300">Memoize with React.memo</span>
                <input
                  type="checkbox"
                  checked={reactOptions.memo}
                  onChange={(e) =>
                    setReactOptions((prev) => ({ ...prev, memo: e.target.checked }))
                  }
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            </div>

            <button
              onClick={() => handleCopy(generatedReactCode, 'react-comp')}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              {copiedId === 'react-comp' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Component Code</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-8 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-300 font-mono">
                {reactOptions.componentName}.{reactOptions.typescript ? 'tsx' : 'jsx'}
              </span>
              <button
                onClick={() => handleCopy(generatedReactCode, 'react-comp-top')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {copiedId === 'react-comp-top' ? (
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
            </div>
            <div className="p-4 flex-1 overflow-auto max-h-[550px] font-mono text-xs text-slate-200 leading-relaxed bg-slate-950/40">
              <pre className="whitespace-pre-wrap">{generatedReactCode}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Data URI & Snippets */}
      {activeTab === 'datauri' && (
        <div className="space-y-6">
          {/* Base64 Data URI */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Base64 Data URI</h4>
                <p className="text-xs text-slate-400">Encoded base64 string for embedding anywhere</p>
              </div>
              <button
                onClick={() => handleCopy(base64DataUri, 'b64')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                {copiedId === 'b64' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'b64' ? 'Copied' : 'Copy URI'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-400 break-all max-h-24 overflow-y-auto">
              {base64DataUri}
            </div>
          </div>

          {/* UTF-8 Data URI */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">UTF-8 URL-Encoded Data URI</h4>
                <p className="text-xs text-slate-400">Smaller payload size than Base64 for modern web</p>
              </div>
              <button
                onClick={() => handleCopy(rawDataUri, 'utf8')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                {copiedId === 'utf8' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'utf8' ? 'Copied' : 'Copy URI'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-400 break-all max-h-24 overflow-y-auto">
              {rawDataUri}
            </div>
          </div>

          {/* CSS Background Snippet */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">CSS background-image Snippet</h4>
                <p className="text-xs text-slate-400">Drop directly into your CSS or Tailwind stylesheet</p>
              </div>
              <button
                onClick={() => handleCopy(cssSnippet, 'css')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                {copiedId === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-sky-300 break-all">
              <pre className="whitespace-pre-wrap">{cssSnippet}</pre>
            </div>
          </div>

          {/* HTML <img> Snippet */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">HTML &lt;img&gt; Tag</h4>
                <p className="text-xs text-slate-400">Ready to paste into standard HTML templates</p>
              </div>
              <button
                onClick={() => handleCopy(htmlSnippet, 'html')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                {copiedId === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'html' ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-emerald-300 break-all">
              <pre className="whitespace-pre-wrap">{htmlSnippet}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
