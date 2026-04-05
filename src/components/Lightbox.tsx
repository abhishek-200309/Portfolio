import { useEffect, useCallback } from 'react';
import type { MediaStore } from '../types';

interface LightboxProps {
  isOpen: boolean;
  pid: number | null;
  idx: number;
  mediaStore: MediaStore;
  onClose: () => void;
  onNav: (dir: number) => void;
}

export default function Lightbox({ isOpen, pid, idx, mediaStore, onClose, onNav }: LightboxProps) {
  const items = pid !== null ? (mediaStore[pid] ?? []) : [];
  const item = items[idx];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowRight') onNav(1);
    if (e.key === 'ArrowLeft') onNav(-1);
    if (e.key === 'Escape') onClose();
  }, [isOpen, onClose, onNav]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/92 z-[9999] flex items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex flex-col items-center gap-4 max-w-[90vw] max-h-[88vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 w-9 h-9 rounded-full bg-transparent border border-white/20 text-white text-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-white/10"
        >
          ✕
        </button>

        {/* Media */}
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            className="max-w-[85vw] max-h-[75vh] rounded-xl object-contain"
          />
        ) : (
          <img
            src={item.src}
            alt="project media"
            className="max-w-[85vw] max-h-[75vh] rounded-xl object-contain"
          />
        )}

        {/* Counter */}
        <div className="font-mono text-[11px] text-white/40 tracking-[0.08em]">
          {idx + 1} / {items.length}
        </div>

        {/* Nav */}
        {items.length > 1 && (
          <div className="flex gap-3">
            <button
              onClick={() => onNav(-1)}
              className="bg-white/10 border border-white/20 text-white font-mono text-[13px] px-5 py-2 rounded-md cursor-pointer transition-colors hover:bg-white/[0.18]"
            >
              ← Prev
            </button>
            <button
              onClick={() => onNav(1)}
              className="bg-white/10 border border-white/20 text-white font-mono text-[13px] px-5 py-2 rounded-md cursor-pointer transition-colors hover:bg-white/[0.18]"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
