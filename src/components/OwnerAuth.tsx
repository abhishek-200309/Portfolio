import { useState, useEffect, useRef } from 'react';

// Change this PIN to whatever you want — only you need to know it
const OWNER_PIN = '2024AM';
const SESSION_KEY = 'am_portfolio_owner';

interface OwnerAuthProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export default function OwnerAuth({ isOpen, onSuccess, onClose }: OwnerAuthProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === OWNER_PIN) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onSuccess();
      setPin('');
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setPin('');
      setTimeout(() => setShake(false), 600);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`bg-surface border border-border rounded-2xl p-8 w-[min(400px,92vw)] transition-all ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-[20px]">🔐</div>
          <div>
            <div className="font-serif text-[18px] text-text">Owner Access</div>
            <div className="font-mono text-[11px] text-text-muted tracking-[0.05em]">
              Enter PIN to manage project media
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] text-text-muted tracking-[0.08em] uppercase">
              PIN
            </label>
            <input
              ref={inputRef}
              type="password"
              value={pin}
              onChange={e => { setPin(e.target.value); setError(false); }}
              placeholder="••••••"
              autoComplete="current-password"
              className={`w-full bg-surface2 border rounded-lg px-4 py-3 font-mono text-[15px] text-text placeholder-text-dim outline-none transition-colors duration-200 focus:border-accent ${error ? 'border-accent3' : 'border-border'}`}
            />
            {error && (
              <span className="font-mono text-[11px] text-accent3 tracking-[0.05em]">
                ✕ Incorrect PIN — try again
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 bg-accent text-bg font-mono text-[13px] font-medium py-3 rounded-lg tracking-[0.04em] transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(79,247,176,0.25)]"
            >
              Unlock
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-border text-text-muted font-mono text-[13px] rounded-lg tracking-[0.04em] transition-colors hover:text-text hover:border-text-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper to check if already authenticated this session
export function isOwnerSession(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}
