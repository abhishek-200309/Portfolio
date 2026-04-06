import { useEffect, useState } from 'react';
import type { Project } from './Projects';
import type { MediaItem } from '../types';

interface Props {
  project: Project;
  media?: MediaItem[];
  onClose: () => void;
}

export default function ProjectInsights({ project, media = [], onClose }: Props) {
  const [enlargedItem, setEnlargedItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project.insights) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-fade-in">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up select-text">
        <div className="flex-shrink-0 border-b border-border p-6 md:px-10 md:py-8 flex items-start justify-between gap-4 bg-surface2/50 backdrop-blur-sm z-10 sticky top-0">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${project.iconClass}`}>
                {project.icon}
              </div>
              <span className="font-mono text-xs text-accent tracking-widest uppercase">{project.tag}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-text leading-tight">{project.name}</h2>
          </div>
          
          <button 
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-full hover:bg-white/10 text-text-muted transition-colors flex items-center justify-center mt-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 custom-scrollbar">
          
          <section>
            <h3 className="text-xl font-medium text-text mb-4 border-b border-border/50 pb-3 flex items-center gap-3">
              <span className="text-xl opacity-80">📖</span> Project Overview
            </h3>
            <p className="text-text-muted leading-relaxed text-[16px] md:text-lg">
              {project.insights.overview}
            </p>
          </section>

          {/* Live Analytics Dashboard for EV Project (Project 0) */}
          {project.id === 0 && (
            <section className="space-y-12 animate-fade-in">
              <h3 className="text-xl font-medium text-text mb-8 border-b border-border/50 pb-3 flex items-center gap-3">
                <span className="text-xl opacity-80">📈</span> Market Adoption Insights
              </h3>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Sales (2024)', val: '1.5M+', icon: '📊' },
                  { label: '2W YoY Growth', val: '300%', icon: '🚀' },
                  { label: 'Market Reach', val: '30+ ST', icon: '📍' },
                  { label: 'Charging Infra', val: '12K+', icon: '⚡' }
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-surface2/20 border border-border/50 p-4 rounded-xl flex flex-col items-center text-center group hover:border-accent2/40 transition-all duration-300">
                    <span className="text-lg mb-2 opacity-70 group-hover:scale-110 transition-transform">{kpi.icon}</span>
                    <div className="font-mono text-xl text-accent2 leading-none mb-1">{kpi.val}</div>
                    <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider">{kpi.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Category Composition */}
                <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-text mb-6">Market Category Composition (2024)</h4>
                  <div className="space-y-5">
                    {[
                      { label: '2-WHEELERS', val: '65%', color: 'bg-accent2', pts: '980K' },
                      { label: '3-WHEELERS', val: '25%', color: 'bg-accent', pts: '375K' },
                      { label: '4-WHEELERS', val: '10%', color: 'bg-accent3', pts: '150K' }
                    ].map((cat) => (
                      <div key={cat.label}>
                        <div className="flex justify-between text-[11px] font-mono text-text-dim mb-1.5 px-0.5">
                          <span>{cat.label} ({cat.val})</span>
                          <span>{cat.pts} UNITS</span>
                        </div>
                        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-border/10">
                          <div className={`h-full ${cat.color} opacity-80`} style={{ width: cat.val }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-text-muted mt-6 italic">Data reveals the massive dominance of 2-wheelers in the current Indian EV landscape.</p>
                </div>

                {/* 2. Growth Trajectory (Line Chart) */}
                <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl flex flex-col min-h-[220px]">
                  <h4 className="text-sm font-medium text-text mb-8">Annual Adoption Trajectory</h4>
                  <div className="flex-1 relative mt-2 px-2">
                    <svg viewBox="0 0 400 120" className="w-full h-32 overflow-visible">
                      <defs>
                        <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area Fill */}
                      <path 
                        d="M 20,110 L 130,95 L 250,55 L 380,10 V 120 H 20 Z" 
                        fill="url(#line-gradient)" 
                        className="transition-all duration-1000 ease-in-out"
                      />
                      
                      {/* Grid Lines (Minimal) */}
                      <line x1="20" y1="120" x2="380" y2="120" stroke="currentColor" className="text-border/30" strokeWidth="1" />
                      
                      {/* Main Data Line */}
                      <path 
                        d="M 20,110 L 130,95 L 250,55 L 380,10" 
                        fill="none" 
                        stroke="var(--accent2)" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                      />
                      
                      {/* Data Points */}
                      {[
                        { x: 20, y: 110, v: '5K' },
                        { x: 130, y: 95, v: '20K' },
                        { x: 250, y: 55, v: '150K' },
                        { x: 380, y: 10, v: '1.5M' },
                      ].map((pt, i) => (
                        <g key={i} className="group/pt">
                          <circle 
                            cx={pt.x} 
                            cy={pt.y} 
                            r="5" 
                            fill="var(--background)" 
                            stroke="var(--accent2)" 
                            strokeWidth="2" 
                            className="transition-all duration-300 group-hover/pt:r-7 group-hover/pt:stroke-white cursor-help"
                          />
                          <text 
                            x={pt.x} 
                            y={pt.y - 12} 
                            textAnchor="middle" 
                            className="font-mono text-[10px] fill-text-dim opacity-0 group-hover/pt:opacity-100 transition-opacity pointer-events-none"
                          >
                            {pt.v}
                          </text>
                        </g>
                      ))}
                    </svg>
                    
                    {/* X-Axis Labels */}
                    <div className="flex justify-between mt-4 px-0">
                      {['2015', '2018', '2021', '2024'].map((year) => (
                        <span key={year} className="text-[9px] font-mono text-text-dim text-center w-8">{year}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-text-muted mt-6 italic text-center">Exponential growth visualization (Area: Total Cumulative Units).</p>
                </div>
              </div>

              {/* 3. State Leadership Index */}
              <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
                <h4 className="text-sm font-medium text-text mb-6">Top 5 States (EV Adoption Volume)</h4>
                <div className="space-y-4">
                  {[
                    { s: 'Uttar Pradesh', w: 'w-[95%]', v: '20%' },
                    { s: 'Maharashtra', w: 'w-[80%]', v: '15%' },
                    { s: 'Karnataka', w: 'w-[70%]', v: '12%' },
                    { s: 'Rajasthan', w: 'w-[60%]', v: '10%' },
                    { s: 'Delhi', w: 'w-[50%]', v: '8%' }
                  ].map((state) => (
                    <div key={state.s} className="group">
                      <div className="flex justify-between text-[11px] text-text-muted mb-1.5 px-1">
                        <span className="font-medium text-text/80">{state.s}</span>
                        <span className="font-mono text-accent2">{state.v} Market Share</span>
                      </div>
                      <div className="h-2 w-full bg-background/50 rounded-full overflow-hidden border border-border/20">
                        <div className={`h-full bg-gradient-to-r from-accent2/40 to-accent2 group-hover:from-accent2/60 group-hover:to-accent2 transition-all duration-700 ${state.w}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-text-muted mt-6 italic">UP leads significant adoption primarily due to the proliferation of electric 3-wheelers.</p>
              </div>
            </section>
          )}

          {/* Live Analytics Dashboard for Project 1 */}
          {project.id === 1 && (
            <section className="space-y-12 animate-fade-in">
              <h3 className="text-xl font-medium text-text mb-8 border-b border-border/50 pb-3 flex items-center gap-3">
                <span className="text-xl opacity-80">📈</span> Live Analytics Dashboard
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Gender Composition */}
                <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-text mb-6">Patient Gender Composition</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] font-mono text-text-dim mb-1">
                        <span>MALE (50%)</span>
                        <span>100 PTS</span>
                      </div>
                      <div className="h-3 bg-accent/20 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] font-mono text-text-dim mb-1">
                        <span>FEMALE (50%)</span>
                        <span>100 PTS</span>
                      </div>
                      <div className="h-3 bg-accent3/20 rounded-full overflow-hidden">
                        <div className="h-full bg-accent3 w-1/2" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-text-muted mt-6 italic">Derived from 200 patient registration records across the defined modulo logic.</p>
                </div>

                {/* 2. Admission Pipeline */}
                <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-text mb-6">Monthly Admission Pipeline</h4>
                  <div className="flex items-end justify-between h-32 gap-3 px-2">
                    {[
                      { m: 'JAN', h: 'h-24', v: 26 },
                      { m: 'FEB', h: 'h-28', v: 30 },
                      { m: 'MAR', h: 'h-25', v: 27 },
                      { m: 'APR', h: 'h-26', v: 29 },
                      { m: 'MAY', h: 'h-27', v: 28 }
                    ].map((item) => (
                      <div key={item.m} className="flex-1 flex flex-col items-center gap-2">
                        <div className={`w-full bg-accent/30 rounded-t-lg transition-all hover:bg-accent/60 ${item.h} border-x border-t border-accent/20`} title={`${item.m}: ${item.v} Admissions`} />
                        <span className="text-[9px] font-mono text-text-dim">{item.m}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-text-muted mt-4 italic text-center">Trend analysis of 140 admissions (Q1-Q2 2025).</p>
                </div>
              </div>

              {/* 3. Departmental Utilization (Building A-E Example) */}
              <div className="bg-surface2/30 border border-border/50 p-6 rounded-2xl">
                <h4 className="text-sm font-medium text-text mb-6">Top 5 Departments (Utilization)</h4>
                <div className="space-y-6">
                  {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology'].map((dept) => (
                    <div key={dept} className="group">
                      <div className="flex justify-between text-[11px] text-text-muted mb-2 px-1">
                        <span className="font-medium text-text/80">{dept}</span>
                        <span className="font-mono text-accent">7 Admissions</span>
                      </div>
                      <div className="h-2 w-full bg-background/50 rounded-full overflow-hidden border border-border/20">
                        {/* Scaled to 90% width to indicate high utilization for 7 patients */}
                        <div className="h-full bg-gradient-to-r from-accent/40 to-accent group-hover:from-accent/60 group-hover:to-accent transition-all duration-500 w-[90%]" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-text-muted mt-6 italic">Verification Note: Each of the 20 departments (Building A-T) reached peak consistency with 7 admissions each.</p>
              </div>
            </section>
          )}

          {/* Featured Chart (Main Image) - Placed below dashboard */}
          {media.length > 1 && (
            <section className="animate-fade-in">
              <h3 className="text-xl font-medium text-text mb-6 border-b border-border/50 pb-3 flex items-center gap-3">
                <span className="text-xl opacity-80">📊</span> Global Distribution
              </h3>
              <div 
                onClick={() => setEnlargedItem(media[1])}
                className="flex flex-col gap-4 cursor-pointer group max-w-2xl mx-auto"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/40 group-hover:border-accent/40 bg-surface2/30 transition-all duration-300">
                  <img 
                    src={media[1].src} 
                    alt={media[1].title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-background/90 text-text px-4 py-2 rounded-full border border-border text-[10px] font-mono tracking-widest uppercase">Click to Enlarge</div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-text font-serif text-xl mb-2">{media[1].title}</h4>
                  <p className="text-text-muted text-sm leading-relaxed max-w-lg mx-auto">{media[1].description}</p>
                </div>
              </div>
            </section>
          )}


          {/* Enlarge Modal */}
          {enlargedItem && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 animate-fade-in group/enlarge">
              <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out"
                onClick={() => setEnlargedItem(null)}
              />
              <div className="relative max-w-full max-h-full flex flex-col items-center gap-6 animate-slide-up">
                <img 
                  src={enlargedItem.src} 
                  alt={enlargedItem.title} 
                  className="max-w-[90vw] max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />
                <div className="text-center max-w-2xl px-6">
                  <h3 className="text-white font-serif text-2xl md:text-3xl mb-2">{enlargedItem.title}</h3>
                  <p className="text-white/60 text-base md:text-lg">{enlargedItem.description}</p>
                </div>
                <button 
                  onClick={() => setEnlargedItem(null)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] uppercase tracking-widest px-6 py-2 rounded-full transition-all"
                >
                  Close View
                </button>
              </div>
            </div>
          )}

          <section>
            <h3 className="text-xl font-medium text-text mb-4 border-b border-border/50 pb-3 flex items-center gap-3">
              <span className="text-xl opacity-80">⚙️</span> Technologies Used
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.insights.technologies.map((tech, i) => (
                <li key={i} className="flex items-start gap-3 bg-surface2/30 p-4 rounded-xl border border-border/40 hover:border-accent/30 transition-colors">
                  <span className="text-accent mt-0.5 font-mono text-lg leading-none">▹</span>
                  <span className="text-text-muted text-[15px] leading-snug">{tech}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-text mb-4 border-b border-border/50 pb-3 flex items-center gap-3">
              <span className="text-xl opacity-80">🧗‍♂️</span> Challenges & Solutions
            </h3>
            <div className="bg-orange-500/5 border border-orange-500/10 p-6 rounded-2xl text-text-muted text-[16px] leading-relaxed relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <p className="relative z-10">{project.insights.challenges}</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium text-text mb-4 border-b border-border/50 pb-3 flex items-center gap-3">
              <span className="text-xl opacity-80">🎯</span> Key Outcomes
            </h3>
            <div className="bg-accent/5 border border-accent/10 p-6 rounded-2xl text-text-muted text-[16px] leading-relaxed relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mb-10"></div>
               <p className="relative z-10">{project.insights.outcomes}</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
