import { useRef, useState } from 'react';
import type { MediaStore } from '../types';

interface ProjectsProps {
  mediaStore: MediaStore;
  isOwner: boolean;
  onOpenLightbox: (pid: number) => void;
  onOpenManage: (pid: number, name: string) => void;
  onRequestOwnerAuth: (pid: number, name: string) => void;
}

const projects = [
  {
    id: 0,
    featured: true,
    icon: '⚡',
    iconClass: 'bg-accent2/10',
    tag: 'Data Analytics Project',
    name: 'The Rise of Electric Vehicles in India',
    desc: 'Built an end-to-end Power BI dashboard to analyze the EV transition in India (2015–2024). Focused on adoption patterns, category shifts, and manufacturer leadership.',
    stack: ['Power BI', 'SQL', 'Excel', 'DAX'],
    links: [{ label: '→ Live Dashboard', href: '#' }, { label: 'GitHub', href: '#', ghost: true }],
  },
  {
    id: 1,
    featured: false,
    icon: '🏥',
    iconClass: 'bg-accent/10',
    tag: 'SQL Analysis',
    name: 'Hospital Readmission Analysis',
    desc: 'Analyzed 30-day readmission rates across departments using PostgreSQL. Identified 3 high-risk patient cohorts using cohort analysis and window functions.',
    stack: ['PostgreSQL', 'Python'],
    links: [{ label: '→ View Report', href: '#' }, { label: 'GitHub', href: '#', ghost: true }],
  },
  {
    id: 2,
    featured: false,
    icon: '🚗',
    iconClass: 'bg-accent3/10',
    tag: 'Python / EDA',
    name: 'Ride-Share Price Prediction',
    desc: 'Performed EDA on 500K+ rows of ride-share data. Built a regression model to predict surge pricing with 87% accuracy using scikit-learn.',
    stack: ['Pandas', 'Scikit-learn', 'Seaborn'],
    links: [{ label: '→ Notebook', href: '#' }, { label: 'GitHub', href: '#', ghost: true }],
  },
  {
    id: 3,
    featured: false,
    icon: '📱',
    iconClass: 'bg-yellow-400/10',
    tag: 'Marketing Analytics',
    name: 'Social Media ROI Tracker',
    desc: 'Built a Google Sheets + App Script dashboard to track campaign performance across 4 social platforms. Automated weekly PDF reports for stakeholders.',
    stack: ['Google Sheets', 'App Script', 'Looker Studio'],
    links: [{ label: '→ View Dashboard', href: '#' }, { label: 'GitHub', href: '#', ghost: true }],
  },
];

function MediaPreview({ pid, mediaStore, onClick }: { pid: number; mediaStore: MediaStore; onClick: () => void }) {
  const items = mediaStore[pid] ?? [];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      // Keep it frozen at the first frame when leaving hover
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full aspect-video rounded-xl overflow-hidden bg-surface2 border border-border relative cursor-pointer flex-shrink-0 group flex items-center justify-center"
    >
      {items.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-text-dim">
          <div className="text-[32px] opacity-30">🖼</div>
          <span className="font-mono text-[10px] tracking-[0.06em]">No media yet</span>
        </div>
      ) : (
        <>
          {items[0].type === 'video'
            ? <>
                {items[0].poster && !isPlaying && (
                  <img src={items[0].poster} alt="thumbnail" onError={(e) => e.currentTarget.style.display = 'none'} className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-[1.04] z-10" />
                )}
                <video ref={videoRef} src={items[0].src} loop muted playsInline controlsList="nodownload noplaybackrate" disablePictureInPicture className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
              </>
            : <img src={items[0].src} alt="project screenshot" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
          }
          {items.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded pointer-events-none">
              +{items.length - 1} more
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Projects({ mediaStore, isOwner, onOpenLightbox, onOpenManage, onRequestOwnerAuth }: ProjectsProps) {
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  return (
    <section id="projects" className="relative z-[1] py-24 px-12 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-0">
        <div>
          <div className="section-label">Selected work</div>
          <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] mb-0">
            Projects that show<br />what I can do
          </h2>
        </div>
        {isOwner ? (
          <div className="font-mono text-[11px] text-text-dim text-right leading-[1.7] pb-1.5 hidden md:block">
            Click <span className="text-accent">+ Add Media</span> on any card<br />
            to upload screenshots or videos
          </div>
        ) : (
          <div className="font-mono text-[11px] text-text-dim text-right leading-[1.7] pb-1.5 hidden md:block">
            Projects showcase <span className="text-accent">real analysis</span><br />
            and interactive dashboards
          </div>
        )}
      </div>

      <div className="h-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <div
            key={p.id}
            data-pid={p.id}
            className={`project-card bg-surface border border-border rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden hover:border-accent/30 hover:-translate-y-1 hover:scale-[1.02] fade-up ${p.featured ? 'lg:col-span-2 bg-gradient-to-br from-surface to-accent2/5 border-accent2/30' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <MediaPreview pid={p.id} mediaStore={mediaStore} onClick={() => onOpenLightbox(p.id)} />

            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center text-[20px] flex-shrink-0 ${p.iconClass}`}>
                {p.icon}
              </div>
              <span className="font-mono text-[10px] text-text-dim tracking-[0.08em] uppercase">{p.tag}</span>
            </div>

            <div className="font-serif text-[22px] text-text leading-[1.2]">{p.name}</div>

            <p className="text-text-muted text-[14px] leading-[1.7] flex-1">{p.desc}</p>

            <div className="flex flex-wrap gap-1.5">
              {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
            </div>

            <div className="flex items-center gap-3 flex-wrap mt-1">
              <div className="flex gap-3">
                {p.links.map(l => (
                  <a key={l.label} href={l.href} className={`project-link ${l.ghost ? 'text-text-muted' : ''}`}>
                    {l.label}
                  </a>
                ))}
              </div>
              {/* Hidden file input */}
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                ref={el => { inputRefs.current[p.id] = el; }}
                className="hidden"
              />
              {isOwner ? (
                <button
                  onClick={() => onOpenManage(p.id, p.name)}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent bg-accent/[0.08] border border-accent/20 rounded-md px-3 py-1.5 cursor-pointer transition-all duration-200 tracking-[0.04em] hover:bg-accent/[0.14] hover:border-accent/40"
                >
                  ＋ Add Media
                </button>
              ) : (
                <button
                  onClick={() => onRequestOwnerAuth(p.id, p.name)}
                  title="Owner-only feature"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text-dim border border-border/50 rounded-md px-2.5 py-1 cursor-pointer transition-all duration-200 tracking-[0.04em] hover:text-text-muted hover:border-border opacity-40 hover:opacity-80"
                >
                  🔒 Manage
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { projects };
