import React, { useState } from 'react';
import { X, Link as LinkIcon, Download, AlertCircle } from 'lucide-react';

interface UrlLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadSvg: (svgCode: string) => void;
}

export const UrlLoadModal: React.FC<UrlLoadModalProps> = ({
  isOpen,
  onClose,
  onLoadSvg,
}) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url.trim());
      if (!res.ok) {
        throw new Error(`Failed to fetch SVG: HTTP ${res.status}`);
      }
      const text = await res.text();
      if (!text.includes('<svg')) {
        throw new Error('Fetched file does not appear to be a valid SVG');
      }
      onLoadSvg(text);
      setUrl('');
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch SVG');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">Load SVG from URL</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFetch} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Direct SVG URL or GitHub Raw link
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/vector.svg"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md shadow-blue-600/30 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{loading ? 'Fetching...' : 'Load SVG'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
