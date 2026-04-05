import { useEffect, useRef } from 'react';
import type { MediaStore, MediaItem } from '../types';

interface ManageModalProps {
  isOpen: boolean;
  pid: number | null;
  projectName: string;
  mediaStore: MediaStore;
  onClose: () => void;
  onAddFiles: (pid: number, files: FileList) => void;
  onDeleteFile: (pid: number, idx: number) => void;
  onClickThumb: (pid: number, idx: number) => void;
}

export default function ManageModal({
  isOpen, pid, projectName, mediaStore,
  onClose, onAddFiles, onDeleteFile, onClickThumb,
}: ManageModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const items: MediaItem[] = pid !== null ? (mediaStore[pid] ?? []) : [];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.remove('border-accent');
    if (pid !== null && e.dataTransfer.files.length) onAddFiles(pid, e.dataTransfer.files);
  };

  if (!isOpen || pid === null) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[9998] flex items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface border border-border rounded-2xl p-8 w-[min(560px,92vw)] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="font-serif text-[20px] text-text">{projectName}</div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-transparent border border-border text-text-muted flex items-center justify-center cursor-pointer text-base hover:text-text"
          >
            ✕
          </button>
        </div>

        {/* Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="manage-thumb relative rounded-lg overflow-hidden border border-border aspect-[4/3] cursor-pointer"
                onClick={() => { onClose(); onClickThumb(pid, idx); }}
              >
                {item.type === 'video'
                  ? <video src={item.src} muted controlsList="nodownload noplaybackrate" disablePictureInPicture className="w-full h-full object-cover" />
                  : <img src={item.src} alt="" className="w-full h-full object-cover" />
                }
                <div
                  className="m-del absolute inset-0 bg-transparent flex items-center justify-center opacity-0 text-[22px] transition-all duration-150"
                  onClick={e => { e.stopPropagation(); onDeleteFile(pid, idx); }}
                >
                  ✕
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drop Zone */}
        <div
          ref={dropRef}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-accent'); }}
          onDragLeave={() => dropRef.current?.classList.remove('border-accent')}
          onDrop={handleDrop}
          className="mt-4 border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:border-accent hover:bg-accent/[0.04]"
        >
          <div className="text-[24px]">＋</div>
          <p className="font-mono text-[12px] text-text-dim mt-2">
            Click or drop files here · <strong className="text-accent font-medium">Images &amp; Videos</strong>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={e => {
              if (pid !== null && e.target.files?.length) {
                onAddFiles(pid, e.target.files);
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
