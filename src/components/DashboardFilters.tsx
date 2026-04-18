import React from 'react';
import type { ProjectDashboardVariant } from './Projects';

interface DashboardFiltersProps {
  variants: ProjectDashboardVariant[];
  activeVariantKey: string;
  setActiveVariantKey: (key: string) => void;
  stateFilter?: {
    label: string;
    options: string[];
  };
  selectedState: string;
  setSelectedState: (state: string) => void;
  filtersLabel?: string;
  isCompact?: boolean;
}

export default function DashboardFilters({
  variants,
  activeVariantKey,
  setActiveVariantKey,
  stateFilter,
  selectedState,
  setSelectedState,
  filtersLabel,
  isCompact = false,
}: DashboardFiltersProps) {
  return (
    <div
      className={`flex ${isCompact ? "flex-row items-center gap-6 justify-center" : "flex-col md:flex-row md:items-start gap-8"}`}
    >
      {variants.length > 0 && (
        <div
          className={`${isCompact ? "flex items-center gap-3" : "space-y-3 flex-1"}`}
        >
          {!isCompact && filtersLabel && (
            <div className="font-mono text-[11px] text-text-muted tracking-[0.12em] uppercase">
              {filtersLabel}
            </div>
          )}
          <div className="flex flex-wrap gap-2.5">
            {variants.map((variant) => {
              const isActive = variant.key === activeVariantKey;

              return (
                <button
                  key={variant.key}
                  type="button"
                  onClick={() => setActiveVariantKey(variant.key)}
                  className={`rounded-full border font-mono tracking-[0.06em] transition-all duration-200 ${
                    isCompact
                      ? "px-3 py-1 text-[10px]"
                      : "px-5 py-2.5 text-[11px]"
                  } ${
                    isActive
                      ? "border-accent bg-accent text-bg shadow-md shadow-accent/20"
                      : "border-border text-text-muted bg-surface/50 hover:border-accent/40 hover:text-text"
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {stateFilter && (
        <div
          className={`${isCompact ? "flex items-center gap-3" : "max-w-[280px] w-full space-y-3 shrink-0"}`}
        >
          {!isCompact && (
            <div className="font-mono text-[11px] text-text-muted tracking-[0.12em] uppercase flex justify-between items-center">
              <span>{stateFilter.label}</span>
            </div>
          )}
          <div className="relative group min-w-[140px]">
            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
              className={`block w-full appearance-none rounded-xl border border-border bg-surface/80 outline-none transition-colors group-hover:border-accent/40 focus:border-accent cursor-pointer shadow-sm ${
                isCompact
                  ? "px-3 py-1.5 pr-8 text-[11px]"
                  : "px-4 py-3 pr-10 text-sm"
              }`}
            >
              {stateFilter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent transition-colors ${isCompact ? "text-[10px]" : "text-sm"}`}
            >
              ▾
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
