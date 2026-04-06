import { useId, useState } from 'react';
import type {
  AccentTone,
  ProjectBarSection,
  ProjectColumnSection,
  ProjectDashboard,
  ProjectDashboardContent,
  ProjectDashboardSection,
  ProjectDonutSection,
  ProjectLinePoint,
  ProjectLineSection,
  ProjectMetric,
} from './Projects';

const tonePalette: Record<AccentTone, { hex: string; soft: string; dim: string }> = {
  accent: {
    hex: '#60a5fa',
    soft: 'rgba(96, 165, 250, 0.35)',
    dim: 'rgba(96, 165, 250, 0.14)',
  },
  accent2: {
    hex: '#4338ca',
    soft: 'rgba(67, 56, 202, 0.35)',
    dim: 'rgba(67, 56, 202, 0.14)',
  },
  accent3: {
    hex: '#f472b6',
    soft: 'rgba(244, 114, 182, 0.35)',
    dim: 'rgba(244, 114, 182, 0.14)',
  },
  accent4: {
    hex: '#f97316',
    soft: 'rgba(249, 115, 22, 0.35)',
    dim: 'rgba(249, 115, 22, 0.14)',
  },
};

const CHART_WIDTH = 400;
const CHART_HEIGHT = 120;
const PLOT_LEFT = 20;
const PLOT_RIGHT = 380;
const PLOT_TOP = 10;
const BASELINE_Y = 110;
type ChartPoint = ProjectLinePoint & { x: number; y: number };

const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
});

function getTone(tone: AccentTone = 'accent') {
  return tonePalette[tone];
}

function formatCompactNumber(value: number) {
  return compactNumberFormatter.format(value);
}

function buildAxisLabels(values: number[]) {
  const maxValue = Math.max(...values, 0);

  if (maxValue <= 0) {
    return ['0', '0', '0'];
  }

  return [formatCompactNumber(maxValue), formatCompactNumber(maxValue / 2), '0'];
}

function getChartPoints(points: ProjectLinePoint[]): ChartPoint[] {
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const minValue = Math.min(...points.map((point) => point.value), 0);
  const range = Math.max(maxValue - minValue, 1);
  const step = points.length > 1 ? (PLOT_RIGHT - PLOT_LEFT) / (points.length - 1) : 0;

  return points.map((point, index) => {
    const normalized = (point.value - minValue) / range;

    return {
      ...point,
      x: PLOT_LEFT + step * index,
      y: BASELINE_Y - normalized * (BASELINE_Y - PLOT_TOP),
    };
  });
}

function buildLinePath(points: ChartPoint[]) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`)
    .join(' ');
}

function buildAreaPath(points: ChartPoint[]) {
  if (points.length === 0) {
    return '';
  }

  const linePath = buildLinePath(points);
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  return `${linePath} L ${lastPoint.x},${BASELINE_Y} L ${firstPoint.x},${BASELINE_Y} Z`;
}

function MetricsGrid({ metrics }: { metrics: ProjectMetric[] }) {
  const columnClass =
    metrics.length >= 4 ? 'md:grid-cols-4' : metrics.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 ${columnClass}`}>
      {metrics.map((metric) => {
        const tone = getTone(metric.tone ?? 'accent');

        return (
          <div
            key={metric.label}
            className="bg-surface2/20 border border-border/50 p-4 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-0.5"
            style={{ boxShadow: `inset 0 0 0 1px ${tone.dim}` }}
          >
            {metric.icon && (
              <span
                className="text-[10px] font-mono tracking-[0.14em] uppercase mb-3"
                style={{ color: tone.hex }}
              >
                {metric.icon}
              </span>
            )}
            <div className="text-[11px] font-mono text-text-muted uppercase tracking-[0.08em] mb-2">
              {metric.label}
            </div>
            <div className="font-mono text-[28px] leading-none" style={{ color: tone.hex }}>
              {metric.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BarsSection({ section }: { section: ProjectBarSection }) {
  return (
    <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
      <h4 className="text-sm font-medium text-text mb-6">{section.title}</h4>
      <div className={section.compact ? 'space-y-4' : 'space-y-5'}>
        {section.items.map((item) => {
          const tone = getTone(item.tone ?? section.tone ?? 'accent');
          const label = item.labelSuffix ? `${item.label} (${item.labelSuffix})` : item.label;

          return (
            <div key={`${section.title}-${item.label}`} className={section.compact ? 'group' : undefined}>
              <div className="flex justify-between text-[11px] mb-1.5 px-1 gap-3">
                <span className="font-medium text-text/80">{label}</span>
                <span className="font-mono text-right" style={{ color: tone.hex }}>
                  {item.detail}
                </span>
              </div>
              <div
                className={`${section.compact ? 'h-2' : 'h-3'} w-full rounded-full overflow-hidden border border-border/20`}
                style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)' }}
              >
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${item.barPercent}%`,
                    backgroundImage: `linear-gradient(90deg, ${tone.soft}, ${tone.hex})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {section.footnote && <p className="text-[10px] text-text-muted mt-6 italic">{section.footnote}</p>}
    </div>
  );
}

function LineSection({ section }: { section: ProjectLineSection }) {
  const gradientId = useId().replace(/:/g, '');
  const tone = getTone(section.tone ?? 'accent');
  const chartPoints = getChartPoints(section.points);
  const linePath = buildLinePath(chartPoints);
  const areaPath = buildAreaPath(chartPoints);
  const yAxisLabels = section.yAxisLabels ?? buildAxisLabels(section.points.map((point) => point.value));

  return (
    <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl flex flex-col min-h-[220px]">
      <h4 className="text-sm font-medium text-text mb-6">{section.title}</h4>
      <div className="flex-1 relative pl-10 pr-2 pb-9">
        {yAxisLabels.length > 0 && (
          <div className="absolute left-0 top-0 bottom-9 flex flex-col justify-between text-[10px] font-mono text-text-muted">
            {yAxisLabels.map((label) => (
              <span key={`${section.title}-${label}`}>{label}</span>
            ))}
          </div>
        )}

        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full h-32 overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tone.hex} stopOpacity="0.38" />
              <stop offset="100%" stopColor={tone.hex} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill={`url(#${gradientId})`} className="transition-all duration-1000 ease-in-out opacity-70" />
          <line x1={PLOT_LEFT} y1={BASELINE_Y} x2={PLOT_RIGHT} y2={BASELINE_Y} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
          <path
            d={linePath}
            fill="none"
            stroke={tone.hex}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 8px ${tone.soft})` }}
          />

          {chartPoints.map((point) => (
            <g key={`${section.title}-${point.label}`} className="group/point">
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                fill={tone.hex}
                stroke={tone.hex}
                strokeWidth="2"
                className="transition-all duration-300 group-hover/point:r-[6]"
              />
              <text
                x={point.x}
                y={point.y - 12}
                textAnchor="middle"
                className="font-mono text-[9px] fill-white"
              >
                {point.displayValue}
              </text>
            </g>
          ))}
        </svg>

        <div className="flex justify-between mt-3">
          {section.points.map((point) => (
            <span
              key={`${section.title}-${point.label}-label`}
              className="text-[10px] font-mono text-text/90 text-center min-w-[28px]"
            >
              {point.label}
            </span>
          ))}
        </div>

        {section.xAxisLabel && (
          <div className="absolute bottom-0 left-10 right-2 text-center text-[10px] font-mono text-text-muted">
            {section.xAxisLabel}
          </div>
        )}
      </div>

      {section.summary && section.summary.length > 0 && (
        <div className="mt-8 flex items-center justify-between gap-4 px-2 pt-4 border-t border-border/20 flex-wrap">
          {section.summary.map((item) => {
            const summaryTone = getTone(item.tone ?? section.tone ?? 'accent');

            return (
              <div key={`${section.title}-${item.label}`} className="flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-lg font-mono" style={{ color: summaryTone.hex }}>
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {section.footnote && <p className="text-[10px] text-text-muted mt-6 italic text-center">{section.footnote}</p>}
    </div>
  );
}

function ColumnSection({ section }: { section: ProjectColumnSection }) {
  const maxValue = Math.max(...section.items.map((item) => item.value), 1);
  const yAxisLabels = section.yAxisLabels ?? buildAxisLabels(section.items.map((item) => item.value));

  return (
    <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
      <h4 className="text-sm font-medium text-text mb-6 text-center">{section.title}</h4>
      <div className="relative pl-9 pr-2 pb-10 h-[210px]">
        {yAxisLabels.length > 0 && (
          <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-[10px] font-mono text-text-muted">
            {yAxisLabels.map((label) => (
              <span key={`${section.title}-${label}`}>{label}</span>
            ))}
          </div>
        )}

        <div className="h-full border-b border-white/25 px-3 flex items-end justify-between gap-3">
          {section.items.map((item) => {
            const tone = getTone(item.tone ?? section.tone ?? 'accent');
            const barHeight = `${Math.max((item.value / maxValue) * 100, 6)}%`;

            return (
              <div key={`${section.title}-${item.label}`} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
                <span className="text-[10px] font-mono text-white mb-2">{item.displayValue}</span>
                <div
                  className="w-full max-w-[42px] rounded-t-md transition-all duration-700"
                  style={{
                    height: barHeight,
                    backgroundImage: `linear-gradient(180deg, ${tone.hex}, rgba(255,255,255,0.12))`,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex justify-between gap-3 px-3">
          {section.items.map((item) => (
            <div key={`${section.title}-${item.label}-label`} className="flex-1 min-w-0">
              <div className="text-[10px] leading-[1.25] text-text text-center break-words">{item.label}</div>
            </div>
          ))}
        </div>

        {section.xAxisLabel && (
          <div className="absolute bottom-0 left-9 right-2 text-center text-[10px] font-mono text-text-muted">
            {section.xAxisLabel}
          </div>
        )}
      </div>
    </div>
  );
}

function DonutSection({ section }: { section: ProjectDonutSection }) {
  const total = Math.max(section.segments.reduce((sum, segment) => sum + segment.value, 0), 1);
  const gradient = section.segments
    .reduce<Array<{ color: string; start: number; end: number }>>((accumulator, segment) => {
      const start = accumulator.length > 0 ? accumulator[accumulator.length - 1].end : 0;
      const segmentPercent = (segment.value / total) * 100;
      const tone = getTone(segment.tone ?? section.tone ?? 'accent');
      accumulator.push({ color: tone.hex, start, end: start + segmentPercent });
      return accumulator;
    }, [])
    .map((segment) => `${segment.color} ${segment.start}% ${segment.end}%`)
    .join(', ');

  return (
    <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
      <h4 className="text-sm font-medium text-text mb-6 text-center">{section.title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-6">
        <div className="flex items-center justify-center">
          <div
            className="w-[128px] h-[128px] rounded-full relative"
            style={{ background: `conic-gradient(${gradient || `${getTone(section.tone ?? 'accent').hex} 0% 100%`})` }}
          >
            <div className="absolute inset-[26px] rounded-full bg-surface" />
          </div>
        </div>

        <div className="space-y-3">
          {section.legendTitle && (
            <div className="text-[11px] font-mono text-text-muted tracking-[0.08em] uppercase">
              {section.legendTitle}
            </div>
          )}
          {section.segments.map((segment) => {
            const tone = getTone(segment.tone ?? section.tone ?? 'accent');
            const percent = ((segment.value / total) * 100).toFixed(2);

            return (
              <div key={`${section.title}-${segment.label}`} className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tone.hex }} />
                  <span className="text-text">{segment.label}</span>
                </div>
                <span className="font-mono text-text-muted">
                  {segment.displayValue} ({percent}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {section.totalDisplayValue && (
        <div className="mt-6 text-center text-[11px] font-mono text-text-muted">
          Total tracked volume: <span className="text-text">{section.totalDisplayValue}</span>
        </div>
      )}

      {section.footnote && <p className="text-[10px] text-text-muted mt-6 italic text-center">{section.footnote}</p>}
    </div>
  );
}

function renderSection(section: ProjectDashboardSection, index: number) {
  switch (section.kind) {
    case 'bars':
      return <BarsSection key={`${section.title}-${index}`} section={section} />;
    case 'line':
      return <LineSection key={`${section.title}-${index}`} section={section} />;
    case 'columns':
      return <ColumnSection key={`${section.title}-${index}`} section={section} />;
    case 'donut':
      return <DonutSection key={`${section.title}-${index}`} section={section} />;
    default:
      return null;
  }
}

export default function InsightDashboard({ dashboard }: { dashboard: ProjectDashboard }) {
  const variants = dashboard.variants ?? [];
  const [activeVariantKey, setActiveVariantKey] = useState(() => variants[0]?.key ?? 'default');
  const stateFilter = dashboard.stateFilter;
  const [selectedState, setSelectedState] = useState(
    () => stateFilter?.defaultValue ?? stateFilter?.options[0] ?? 'All'
  );

  const activeVariant = variants.find((variant) => variant.key === activeVariantKey) ?? variants[0];
  const fallbackContent: ProjectDashboardContent = activeVariant ?? dashboard;
  const content =
    dashboard.resolveContent?.({
      selectedState,
      activeVariantKey,
      fallbackContent,
    }) ?? fallbackContent;
  const wideFirst = content.layout === 'wide-first';
  const scopeLabel = selectedState === 'All' ? 'All states' : selectedState;

  const wideSectionMarkup =
    content.wideSections && content.wideSections.length > 0 ? (
      <div className="space-y-8">{content.wideSections.map(renderSection)}</div>
    ) : null;

  const gridSectionMarkup =
    content.gridSections && content.gridSections.length > 0 ? (
      <div className={`grid grid-cols-1 gap-8 ${content.gridSections.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {content.gridSections.map(renderSection)}
      </div>
    ) : null;

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="space-y-3">
        <h3 className="text-xl font-medium text-text border-b border-border/50 pb-3 flex items-center gap-3">
          <span className="font-mono text-xs text-accent tracking-[0.18em] uppercase">{dashboard.badge}</span>
          <span>{dashboard.heading}</span>
        </h3>

        {stateFilter && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-[11px] font-mono text-text-muted tracking-[0.05em]">
            <span className="text-accent">{stateFilter.label}</span>
            <span>{scopeLabel}</span>
          </div>
        )}

        {(variants.length > 0 || stateFilter) && (
          <div className="space-y-4">
            {dashboard.filtersLabel && (
              <div className="font-mono text-[11px] text-text-muted tracking-[0.12em] uppercase">
                {dashboard.filtersLabel}
              </div>
            )}
            {variants.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => {
                  const isActive = variant.key === activeVariantKey;

                  return (
                    <button
                      key={variant.key}
                      type="button"
                      onClick={() => setActiveVariantKey(variant.key)}
                      className={`px-4 py-2 rounded-full border font-mono text-[11px] tracking-[0.06em] transition-all duration-200 ${
                        isActive
                          ? 'border-accent bg-accent text-bg'
                          : 'border-border text-text-muted bg-surface hover:border-accent/40 hover:text-text'
                      }`}
                    >
                      {variant.label}
                    </button>
                  );
                })}
              </div>
            )}

            {stateFilter && (
              <div className="max-w-[260px] space-y-2">
                <div className="font-mono text-[11px] text-text-muted tracking-[0.12em] uppercase">
                  {stateFilter.label}
                </div>
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(event) => setSelectedState(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 pr-10 text-sm text-text outline-none transition-colors hover:border-accent/40 focus:border-accent"
                  >
                    {stateFilter.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                    ▾
                  </span>
                </div>
              </div>
            )}

            {dashboard.helperText && (
              <p className="max-w-2xl text-[11px] leading-relaxed text-text-muted">
                {dashboard.helperText}
              </p>
            )}
          </div>
        )}
      </div>

      {content.metrics && content.metrics.length > 0 && <MetricsGrid metrics={content.metrics} />}

      {wideFirst ? (
        <>
          {wideSectionMarkup}
          {gridSectionMarkup}
        </>
      ) : (
        <>
          {gridSectionMarkup}
          {wideSectionMarkup}
        </>
      )}
    </section>
  );
}
