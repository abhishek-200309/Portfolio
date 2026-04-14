import { useEffect, useState } from 'react';
import type { Project } from './Projects';
import type { MediaItem } from '../types';
import InsightDashboard from './InsightDashboard';

interface Props {
  project: Project;
  media?: MediaItem[];
  onClose: () => void;
}

export default function ProjectInsights({ project, media = [], onClose }: Props) {
  const [enlargedItem, setEnlargedItem] = useState<MediaItem | null>(null);

  if (!project.insights) return null;

  return (
    <div className="w-full mx-auto animate-slide-up select-text mb-32 flex flex-col gap-16 md:gap-24 pt-8">
      <div className="flex items-start justify-between gap-4 shrink-0 pb-8 border-b border-border/40">
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
            aria-label="Close insights"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col space-y-24 md:space-y-32">
          <section>
            <h3 className="text-xl font-medium text-text mb-4 border-b border-border/50 pb-3 flex items-center gap-3">
              <span className="text-xl opacity-80">Overview</span>
            </h3>
            <p className="text-text-muted leading-relaxed text-[16px] md:text-lg">{project.insights.overview}</p>
          </section>

          {project.insights.dashboard && <InsightDashboard dashboard={project.insights.dashboard} />}

          {media.length > 1 && project.id !== 1 && (
            <section className="animate-fade-in">
              <h3 className="text-xl font-medium text-text mb-6 border-b border-border/50 pb-3 flex items-center gap-3">
                <span className="text-xl opacity-80">Media</span>
                <span>Global Distribution</span>
              </h3>
              <div onClick={() => setEnlargedItem(media[1])} className="flex flex-col gap-4 cursor-pointer group max-w-2xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/40 group-hover:border-accent/40 bg-surface2/30 transition-all duration-300">
                  <img
                    src={media[1].src}
                    alt={media[1].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-bg/90 text-text px-4 py-2 rounded-full border border-border text-[10px] font-mono tracking-widest uppercase">
                      Click to enlarge
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-text font-serif text-xl mb-2">{media[1].title}</h4>
                  <p className="text-text-muted text-sm leading-relaxed max-w-lg mx-auto">{media[1].description}</p>
                </div>
              </div>
            </section>
          )}

          {enlargedItem && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 animate-fade-in group/enlarge">
              <div className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out" onClick={() => setEnlargedItem(null)} />
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
              <span className="text-xl opacity-80">Tech</span>
              <span>Technologies Used</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.insights.technologies.map((tech, index) => (
                <li
                  key={`${tech}-${index}`}
                  className="flex items-start gap-3 bg-surface2/30 p-4 rounded-xl border border-border/40 hover:border-accent/30 transition-colors"
                >
                  <span className="text-accent mt-0.5 font-mono text-lg leading-none">▹</span>
                  <span className="text-text-muted text-[15px] leading-snug">{tech}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-text mb-4 border-b border-border/50 pb-3 flex items-center gap-3">
              <span className="text-xl opacity-80">Build</span>
              <span>Challenges &amp; Solutions</span>
            </h3>
            <div className="bg-orange-500/5 border border-orange-500/10 p-6 rounded-2xl text-text-muted text-[16px] leading-relaxed relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
              <p className="relative z-10">{project.insights.challenges}</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium text-text mb-4 border-b border-border/50 pb-3 flex items-center gap-3">
              <span className="text-xl opacity-80">Wins</span>
              <span>Key Outcomes</span>
            </h3>
            <div className="bg-accent/5 border border-accent/10 p-6 rounded-2xl text-text-muted text-[16px] leading-relaxed relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mb-10" />
              <p className="relative z-10 whitespace-pre-line leading-tight">
  {project.insights.outcomes}
</p>

            </div>
          </section>
        </div>
    </div>
  );
}
