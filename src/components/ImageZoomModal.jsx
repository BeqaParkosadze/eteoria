import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function ImageZoomModal({ imageId, questionText, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!imageId) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      
      <div className="relative z-10 max-w-4xl w-full bg-[#161920] border-2 border-slate-700 rounded-4xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b-2 border-slate-800 flex items-center justify-between bg-[#12141a]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-xl border border-indigo-500/30">
              სურათი #{imageId}
            </span>
            <span className="text-xs text-slate-300 truncate max-w-md hidden sm:inline font-bold">
              {questionText}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-[#0F1115] rounded-xl p-1 border border-slate-800">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.2))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono px-2 text-slate-300 font-bold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition ml-1"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-[#0F1115] hover:bg-rose-500/20 hover:text-rose-400 border border-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Body with panning / scroll */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-[#0B0D11] min-h-[300px]">
          <div 
            className="transition-transform duration-200 origin-center cursor-grab active:cursor-grabbing"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={`/images/${imageId}.jpg`}
              alt="საგზაო სიტუაცია"
              className="max-h-[65vh] w-auto rounded-2xl shadow-2xl object-contain border-2 border-slate-800 select-none"
            />
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-2.5 bg-[#12141a] border-t-2 border-slate-800 text-[11px] text-slate-400 text-center font-bold">
          დააჭირეთ <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[10px]">Esc</kbd> დახურვისთვის.
        </div>
      </div>
    </div>
  );
}
