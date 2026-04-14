import { useId, useState } from 'react';
import type { CSSProperties } from 'react';
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

const CHART_WIDTH = 600;
const CHART_HEIGHT = 280;
const PLOT_LEFT = 10;
const PLOT_RIGHT = 570;
const PLOT_TOP = 40;
const BASELINE_Y = 250;
type ChartPoint = ProjectLinePoint & { x: number; y: number };

const standardNumberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
  useGrouping: true,
});

const chartNumberFormatter = new Intl.NumberFormat('en-IN', {
  notation: 'compact',
  maximumFractionDigits: 2,
});

function getTone(tone: AccentTone = 'accent') {
  return tonePalette[tone];
}

function formatCompactNumber(value: number) {
  return standardNumberFormatter.format(value);
}

function formatChartNumber(value: number) {
  return chartNumberFormatter.format(value);
}

function getNiceAxisStep(rawStep: number) {
  if (rawStep <= 0) {
    return 1;
  }

  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;

  if (normalized <= 1) {
    return magnitude;
  }

  if (normalized <= 2) {
    return 2 * magnitude;
  }

  if (normalized <= 3) {
    return 2.5 * magnitude;
  }

  if (normalized <= 7) {
    return 5 * magnitude;
  }

  return 10 * magnitude;
}

function buildAxisConfig(values: number[]) {
  const maxValue = Math.max(...values, 0);
  const targetSegmentCount = maxValue >= 1_000_000 ? 6 : 4;

  if (maxValue <= 0) {
    return {
      axisMax: 1,
      labels: ['1', '0'],
      lineYs: [PLOT_TOP, BASELINE_Y],
    };
  }

  const step = getNiceAxisStep(maxValue / targetSegmentCount);
  const segmentCount = Math.max(1, Math.ceil(maxValue / step));
  const axisMax = step * segmentCount;
  const labels = Array.from({ length: segmentCount + 1 }, (_, index) =>
    formatChartNumber(axisMax - step * index)
  );
  const lineYs = Array.from({ length: segmentCount + 1 }, (_, index) =>
    PLOT_TOP + ((BASELINE_Y - PLOT_TOP) / segmentCount) * index
  );

  return {
    axisMax,
    labels,
    lineYs,
  };
}

function getChartPoints(points: ProjectLinePoint[], axisMax?: number): ChartPoint[] {
  const maxValue = Math.max(axisMax ?? Math.max(...points.map((point) => point.value), 1), 1);
  const minValue = 0; // Force start from 0 per user requirement
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

type DonutSegmentGeometry = {
  idx: number;
  segment: ProjectDonutSection['segments'][number];
  segmentPercent: number;
  endPercent: number;
  midRad: number;
  dashOffset: number;
  rotation: number;
  labelX: number;
  labelY: number;
  lineEndX: number;
  lineEndY: number;
  arcPointX: number;
  arcPointY: number;
  textAnchor: 'start' | 'end' | 'middle';
};

function MetricsGrid({ metrics }: { metrics: ProjectMetric[] }) {
  const columnClass =
    metrics.length >= 4 ? 'md:grid-cols-4' : metrics.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-12 ${columnClass}`}>
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
            <div className="text-sm font-mono text-text-muted uppercase tracking-[0.1em] mb-2">
              {metric.label}
            </div>
            <div className="font-mono text-4xl leading-none" style={{ color: tone.hex }}>
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
      <h4 className="text-xl font-medium text-text mb-6">{section.title}</h4>
      <div className={section.compact ? 'space-y-4' : 'space-y-5'}>
        {section.items.map((item) => {
          const tone = getTone(item.tone ?? section.tone ?? 'accent');
          const label = item.labelSuffix ? `${item.label} (${item.labelSuffix})` : item.label;

          return (
            <div key={item.label} className={section.compact ? 'group' : undefined}>
              <div className="flex justify-between text-xs mb-1.5 px-1 gap-3">
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
  const axisConfig = buildAxisConfig(section.points.map((point) => point.value));
  const chartPoints = getChartPoints(section.points, axisConfig.axisMax);
  const linePath = buildLinePath(chartPoints);
  const areaPath = buildAreaPath(chartPoints);
  const customYAxisLabels = section.yAxisLabels;
  const yAxisLabels = customYAxisLabels ?? axisConfig.labels;
  const yAxisLineYs =
    customYAxisLabels && customYAxisLabels.length > 1
      ? Array.from({ length: customYAxisLabels.length }, (_, index) =>
          PLOT_TOP + ((BASELINE_Y - PLOT_TOP) / (customYAxisLabels.length - 1)) * index
        )
      : axisConfig.lineYs;
  const xAxisGridStyle = {
    gridTemplateColumns: `repeat(${Math.max(section.points.length, 1)}, minmax(0, 1fr))`,
  };

  return (
    <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl flex flex-col h-full min-h-[380px]">
      <h4 className="text-xl font-medium text-text mb-8">{section.title}</h4>
      <div className="flex-1 flex items-end pl-10 pr-2">
        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tone.hex} stopOpacity="0.45" />
              <stop offset="100%" stopColor={tone.hex} stopOpacity="0" />
            </linearGradient>
          </defs>

          {yAxisLabels.map((label, index) => (
            <text
              key={`${section.title}-${label}`}
              x={PLOT_LEFT - 6}
              y={(yAxisLineYs[index] ?? BASELINE_Y) + 4}
              textAnchor="end"
              className="font-mono text-[11px] fill-text-muted/70"
            >
              {label}
            </text>
          ))}

          <path d={areaPath} fill={`url(#${gradientId})`} className="transition-all duration-1000 ease-in-out opacity-80" />
          {yAxisLineYs.map((lineY, index) => {
            const isBaseline = index === yAxisLineYs.length - 1;

            return (
              <line
                key={`${section.title}-grid-${index}`}
                x1={PLOT_LEFT}
                y1={lineY}
                x2={PLOT_RIGHT}
                y2={lineY}
                stroke={isBaseline ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)'}
                strokeWidth="1"
                strokeDasharray={isBaseline ? undefined : '4 8'}
              />
            );
          })}
          
          <path
            d={linePath}
            fill="none"
            stroke={tone.hex}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 12px ${tone.soft})` }}
          />

          {chartPoints.map((point, index) => {
            const previousPoint = chartPoints[index - 1];
            const nextPoint = chartPoints[index + 1];
            const isPeak =
              previousPoint !== undefined &&
              nextPoint !== undefined &&
              point.y < previousPoint.y &&
              point.y < nextPoint.y;
            const isValley =
              previousPoint !== undefined &&
              nextPoint !== undefined &&
              point.y > previousPoint.y &&
              point.y > nextPoint.y;
            const labelOffset = isPeak ? 18 : isValley ? 38 : index % 2 === 0 ? 22 : 34;
            const labelY = Math.max(point.y - labelOffset, 18);
            const pointLabel = point.displayValue || formatChartNumber(point.value);

            return (
              <g key={point.label} className="group/point">
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={tone.hex}
                  stroke={tone.hex}
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover/point:r-8"
                />
                <text
                  x={point.x}
                  y={labelY}
                  textAnchor="middle"
                  className="font-mono text-[13px] fill-white/90 pointer-events-none"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))' }}
                >
                  {pointLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid mt-4 px-2" style={xAxisGridStyle}>
        {section.points.map((point) => (
          <span
            key={`${section.title}-${point.label}-label`}
            className="text-[11px] font-mono text-text-muted/90 text-center"
          >
            {point.label}
          </span>
        ))}
      </div>

      {section.xAxisLabel && (
        <div className="mt-2 text-center text-[10px] font-bold font-mono text-text/40 uppercase tracking-[0.2em]">
          {section.xAxisLabel}
        </div>
      )}

      {section.summary && section.summary.length > 0 && (
        <div className="mt-12 flex items-center justify-between gap-8 px-4 pt-6 border-t border-border/10 flex-wrap">
          {section.summary.map((item) => {
            const summaryTone = getTone(item.tone ?? section.tone ?? 'accent');

            return (
              <div key={`${section.title}-${item.label}`} className="flex flex-col">
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-2xl font-mono mt-1" style={{ color: summaryTone.hex }}>
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {section.footnote && <p className="text-[11px] text-text-muted/60 mt-8 italic text-center max-w-4xl mx-auto">{section.footnote}</p>}
    </div>
  );
}

function ColumnSection({ section }: { section: ProjectColumnSection }) {
  const maxValue = Math.max(...section.items.map((item) => item.value), 1);
  const axisConfig = buildAxisConfig(section.items.map((item) => item.value));
  const yAxisLabels = section.yAxisLabels ?? axisConfig.labels;

  return (
    <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl h-full flex flex-col">
      <h4 className="text-xl font-medium text-text mb-6 text-center">{section.title}</h4>
      <div className="relative pl-8 pr-2 pb-16 flex-1 min-h-[250px] w-full">
        {yAxisLabels.length > 0 && (
          <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-xs font-mono text-text-muted">
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
              <div key={item.label} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
                <span className="text-xs font-mono text-white mb-2">{item.displayValue}</span>
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
              <div className="text-xs leading-[1.25] text-text text-center break-words">{item.label}</div>
            </div>
          ))}
        </div>

        {section.xAxisLabel && (
          <div className="absolute bottom-0 left-8 right-2 text-center text-[10px] font-mono text-text-muted">
            {section.xAxisLabel}
          </div>
        )}
      </div>
    </div>
  );
}

function DonutSection({ section }: { section: ProjectDonutSection }) {
  const total = Math.max(section.segments.reduce((sum, segment) => sum + segment.value, 0), 1);
  const gradientBaseId = useId().replace(/:/g, '');

  // SVG parameters
  const size = 560;
  const center = size / 2;
  const radius = 108;
  const strokeWidth = 40;
  const circumference = 2 * Math.PI * radius;
  const displayTotal = section.totalDisplayValue ?? formatCompactNumber(total);
  const totalLabel = section.totalLabel ?? 'Total';
  const segmentGeometry = section.segments.reduce<DonutSegmentGeometry[]>((acc, segment, idx) => {
    const startPercent = acc.length === 0 ? 0 : acc[acc.length - 1].endPercent;
    const segmentPercent = (segment.value / total) * 100;
    const endPercent = startPercent + segmentPercent;
    const rotation = (startPercent / 100) * 360 - 90;
    const midAngle = startPercent + segmentPercent / 2;
    const midRad = ((midAngle * 3.6 - 90) * Math.PI) / 180;
    const calloutRadius = radius + 55;
    const labelOffset = 20;
    const labelX = center + (calloutRadius + labelOffset) * Math.cos(midRad);
    const labelY = center + (calloutRadius + labelOffset) * Math.sin(midRad);
    const lineEndX = center + calloutRadius * Math.cos(midRad);
    const lineEndY = center + calloutRadius * Math.sin(midRad);
    const arcPointOff = 10;
    const arcPointX = center + (radius + arcPointOff) * Math.cos(midRad);
    const arcPointY = center + (radius + arcPointOff) * Math.sin(midRad);
    const textAnchor =
      Math.cos(midRad) > 0.1 ? 'start' : Math.cos(midRad) < -0.1 ? 'end' : 'middle';

    acc.push({
      idx,
      segment,
      segmentPercent,
      endPercent,
      midRad,
      dashOffset: circumference - (segmentPercent / 100) * circumference,
      rotation,
      labelX,
      labelY,
      lineEndX,
      lineEndY,
      arcPointX,
      arcPointY,
      textAnchor,
    });

    return acc;
  }, []);
  const renderedSegmentGeometry = [...segmentGeometry].sort((a, b) => b.segmentPercent - a.segmentPercent);

  return (
    <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl h-full flex flex-col">
      <h4 className="text-xl font-medium text-text mb-4 text-center">{section.title}</h4>
      
      <div className="flex-1 flex items-center justify-center min-h-[340px]">
        <div className="w-full max-w-[460px] aspect-square relative mx-auto flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full block overflow-hidden">
            <defs>
              {segmentGeometry.map(({ segment, idx }) => {
                const segmentTone = getTone(segment.tone ?? section.tone ?? 'accent');
                return (
                  <linearGradient
                    key={`${gradientBaseId}-grad-${idx}`}
                    id={`${gradientBaseId}-grad-${idx}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={segmentTone.hex} />
                    <stop offset="100%" stopColor={segmentTone.hex} stopOpacity="0.8" />
                  </linearGradient>
                );
              })}
            </defs>

            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={strokeWidth}
            />

            {renderedSegmentGeometry.map(({ segment, idx, segmentPercent, midRad, dashOffset, rotation, labelX, labelY, lineEndX, lineEndY, arcPointX, arcPointY, textAnchor }) => {
              const segmentTone = getTone(segment.tone ?? section.tone ?? 'accent');
              const isEmphasized = segment.isEmphasized ?? true;
              const segmentOpacity = isEmphasized ? 1 : 0.3;
              const showTinyMarker = segmentPercent < 1.2;
              const showCallout = segmentPercent > 0;
              const markerRadius = radius;
              const markerX = center + markerRadius * Math.cos(midRad);
              const markerY = center + markerRadius * Math.sin(midRad);
              const calloutLineRadius = showTinyMarker ? radius + 72 : radius + 55;
              const calloutLabelRadius = calloutLineRadius + 24;
              const tinyLabelNudgeY =
                showTinyMarker && Math.sin(midRad) < -0.2 ? -10 :
                showTinyMarker && Math.sin(midRad) > 0.2 ? 10 :
                0;
              const adjustedLineEndX = center + calloutLineRadius * Math.cos(midRad);
              const adjustedLineEndY = center + calloutLineRadius * Math.sin(midRad);
              const adjustedLabelX = center + calloutLabelRadius * Math.cos(midRad);
              const adjustedLabelY = center + calloutLabelRadius * Math.sin(midRad) + tinyLabelNudgeY;
              const segmentStyle = {
                '--donut-start': `${circumference}`,
                '--donut-end': `${dashOffset}`,
                '--donut-opacity': `${segmentOpacity}`,
                strokeDashoffset: dashOffset,
                opacity: segmentOpacity,
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transform: `rotate(${rotation}deg)`,
                animation: `donutSegmentReveal 900ms cubic-bezier(0.22,1,0.36,1) ${idx * 80}ms both`,
              } as CSSProperties;
              const calloutStyle = {
                opacity: segmentOpacity,
                animation: `donutContentFade 350ms ease ${180 + idx * 70}ms both`,
              } as CSSProperties;

              return (
                <g
                  key={`${segment.label}-${segment.value}-${segment.isEmphasized ? 'active' : 'muted'}`}
                  className="group/segment"
                >
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientBaseId}-grad-${idx})`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeLinecap={segmentPercent >= 99.9 ? 'butt' : 'round'}
                    className="cursor-pointer"
                    style={segmentStyle}
                  />
                  {showTinyMarker && (
                    <circle
                      cx={markerX}
                      cy={markerY}
                      r={6}
                      fill={segmentTone.hex}
                      style={{
                        opacity: segmentOpacity,
                        animation: `donutContentFade 350ms ease ${150 + idx * 70}ms both`,
                      }}
                    />
                  )}
                  
                  {showCallout && (
                    <g style={calloutStyle}>
                      <line
                        x1={arcPointX}
                        y1={arcPointY}
                        x2={showTinyMarker ? adjustedLineEndX : lineEndX}
                        y2={showTinyMarker ? adjustedLineEndY : lineEndY}
                        stroke={segmentTone.soft}
                        strokeWidth="1"
                      />
                      <text
                        x={showTinyMarker ? adjustedLabelX : labelX}
                        y={showTinyMarker ? adjustedLabelY : labelY}
                        textAnchor={textAnchor}
                        dominantBaseline="middle"
                        className="fill-white font-mono text-[14px]"
                      >
                        <tspan
                          x={showTinyMarker ? adjustedLabelX : labelX}
                          dy="-0.6em"
                          className="font-bold"
                          style={{ fill: segmentTone.hex }}
                        >
                          {segment.displayValue}
                        </tspan>
                        <tspan
                          x={showTinyMarker ? adjustedLabelX : labelX}
                          dy="1.2em"
                          className="fill-text-muted font-normal text-[11px]"
                        >
                          {segmentPercent.toFixed(1)}%
                        </tspan>
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none"
              style={{ animation: 'donutContentFade 350ms ease 240ms both' }}
            >
              <tspan x={center} dy="-0.4em" className="text-xs font-mono fill-text-muted uppercase tracking-[0.2em]">
                {totalLabel}
              </tspan>
              <tspan x={center} dy="1.4em" className="text-xl font-mono fill-white font-bold">
                {displayTotal}
              </tspan>
            </text>
          </svg>
        </div>
      </div>

      <div className="w-full mt-auto space-y-2 border-t border-border/20 pt-6">
        {section.legendTitle && (
          <div className="text-xs font-mono text-text-muted tracking-[0.1em] uppercase text-center mb-4">
            {section.legendTitle}
          </div>
        )}
        {section.segments.map((segment) => {
          const segmentTone = getTone(segment.tone ?? section.tone ?? 'accent');
          const isEmphasized = segment.isEmphasized ?? true;
          return (
            <div
              key={`${section.title}-${segment.label}`}
              className="flex items-center justify-between gap-4 transition-opacity duration-200"
              style={{ opacity: isEmphasized ? 1 : 0.45 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: segmentTone.hex }} />
                <span className="text-text text-xs">{segment.label}</span>
              </div>
              <span className="font-mono text-text-muted text-[11px]">
                {segment.displayValue}
              </span>
            </div>
          );
        })}
      </div>
      {section.footnote && <p className="text-[10px] text-text-muted mt-6 italic text-center">{section.footnote}</p>}
    </div>
  );
}

function renderSection(section: ProjectDashboardSection) {
  const key = section.kind + section.title;
  switch (section.kind) {
    case 'bars':
      return <BarsSection key={key} section={section} />;
    case 'line':
      return <LineSection key={key} section={section} />;
    case 'columns':
      return <ColumnSection key={key} section={section} />;
    case 'donut':
      return <DonutSection key={key} section={section} />;
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
  const scopeLabel = selectedState === 'All' ? 'All states' : selectedState;
  const allSections = [...(content.wideSections ?? []), ...(content.gridSections ?? [])];

  return (
    <section className="space-y-12 md:space-y-16 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-medium text-text border-b border-border/50 pb-4 flex items-center gap-3">
          <span className="font-mono text-xs text-accent tracking-[0.18em] uppercase">{dashboard.badge}</span>
          <span>{dashboard.heading}</span>
        </h3>

        {stateFilter && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-[11px] font-mono text-text-muted tracking-[0.05em]">
            <span className="text-accent">{stateFilter.label}</span>
            <span>{scopeLabel}</span>
          </div>
        )}
      </div>

      {(variants.length > 0 || stateFilter) && (
        <div className="sticky top-24 z-40 bg-bg/90 backdrop-blur-xl py-5 px-6 rounded-2xl border border-border/60 shadow-lg transition-all">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {variants.length > 0 && (
              <div className="space-y-3 flex-1">
                {dashboard.filtersLabel && (
                  <div className="font-mono text-[11px] text-text-muted tracking-[0.12em] uppercase">
                    {dashboard.filtersLabel}
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
                        className={`px-5 py-2.5 rounded-full border font-mono text-[11px] tracking-[0.06em] transition-all duration-200 ${
                          isActive
                            ? 'border-accent bg-accent text-bg shadow-md shadow-accent/20'
                            : 'border-border text-text-muted bg-surface/50 hover:border-accent/40 hover:text-text'
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
              <div className="max-w-[280px] w-full space-y-3 shrink-0">
                <div className="font-mono text-[11px] text-text-muted tracking-[0.12em] uppercase flex justify-between items-center">
                  <span>{stateFilter.label}</span>
                </div>
                <div className="relative group">
                  <select
                    value={selectedState}
                    onChange={(event) => setSelectedState(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-surface/80 px-4 py-3 pr-10 text-sm text-text outline-none transition-colors group-hover:border-accent/40 focus:border-accent cursor-pointer shadow-sm"
                  >
                    {stateFilter.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent transition-colors">
                    ▾
                  </span>
                </div>
              </div>
            )}
          </div>

          {dashboard.helperText && (
            <div className="mt-5 pt-4 border-t border-border/40">
              <p className="max-w-3xl text-[11px] leading-relaxed text-text-muted/80">
                {dashboard.helperText}
              </p>
            </div>
          )}
        </div>
      )}

      {content.metrics && content.metrics.length > 0 && <MetricsGrid metrics={content.metrics} />}

      <div className={`grid grid-cols-1 gap-4 lg:gap-6 ${
        allSections.length >= 3 ? 'lg:grid-cols-3' : 
        allSections.length === 2 ? 'md:grid-cols-2' : ''
      }`}>
        {allSections.map((section) => (
          <div key={section.kind + section.title} className="h-full">
            {renderSection(section)}
          </div>
        ))}
      </div>
    </section>
  );
}
