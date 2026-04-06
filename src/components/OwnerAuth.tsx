import { useEffect, useRef, useState } from 'react';
import { setOwnerSession } from './ownerSession';

const OWNER_PIN = '2024AM';

interface OwnerAuthProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function OwnerAuth({ onSuccess, onClose }: OwnerAuthProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (pin === OWNER_PIN) {
      setOwnerSession();
      onSuccess();
      setPin('');
      setError(false);
      return;
    }

    setError(true);
    setShake(true);
    setPin('');
    window.setTimeout(() => setShake(false), 600);
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={`bg-surface border border-border rounded-2xl p-8 w-[min(400px,92vw)] transition-all ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
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
              onChange={(event) => {
                setPin(event.target.value);
                setError(false);
              }}
              placeholder="••••••"
              autoComplete="current-password"
              className={`w-full bg-surface2 border rounded-lg px-4 py-3 font-mono text-[15px] text-text placeholder-text-dim outline-none transition-colors duration-200 focus:border-accent ${error ? 'border-accent3' : 'border-border'}`}
            />
            {error && (
              <span className="font-mono text-[11px] text-accent3 tracking-[0.05em]">
                ✕ Incorrect PIN, try again
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
