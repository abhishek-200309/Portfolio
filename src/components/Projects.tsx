import { useRef } from 'react';
import type { MediaStore } from '../types';

interface ProjectsProps {
  mediaStore: MediaStore;
  onOpenLightbox: (pid: number) => void;
  onOpenManage: (pid: number, name: string) => void;
}

const projects = [
  {
    id: 0,
    featured: true,
    icon: '📊',
    iconClass: 'bg-accent2/10',
    tag: 'Capstone Project',
    name: 'E-Commerce Sales Dashboard',
    desc: 'Built an end-to-end Tableau dashboard analyzing 2 years of e-commerce sales data across 50K+ transactions. Identified seasonal trends, top-performing SKUs, and regional gaps — resulting in a 15% hypothetical revenue uplift recommendation.',
    stack: ['Tableau', 'SQL', 'Excel', 'Python'],
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
  return (
    <div
      onClick={onClick}
      className="w-full h-40 rounded-xl overflow-hidden bg-surface2 border border-border relative cursor-pointer flex-shrink-0 group"
    >
      {items.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-text-dim">
          <div className="text-[32px] opacity-30">🖼</div>
          <span className="font-mono text-[10px] tracking-[0.06em]">No media yet</span>
        </div>
      ) : (
        <>
          {items[0].type === 'video'
            ? <video src={items[0].src} muted className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
            : <img src={items[0].src} alt="project screenshot" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
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

export default function Projects({ mediaStore, onOpenLightbox, onOpenManage }: ProjectsProps) {
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
        <div className="font-mono text-[11px] text-text-dim text-right leading-[1.7] pb-1.5 hidden md:block">
          Click <span className="text-accent">+ Add Media</span> on any card<br />
          to upload screenshots or videos
        </div>
      </div>

      <div className="h-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <div
            key={p.id}
            data-pid={p.id}
            className={`project-card bg-surface border border-border rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden hover:border-accent/30 hover:-translate-y-1 fade-up ${p.featured ? 'lg:col-span-2 bg-gradient-to-br from-surface to-accent2/5 border-accent2/30' : ''}`}
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
              <button
                onClick={() => onOpenManage(p.id, p.name)}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent bg-accent/8 border border-accent/20 rounded-md px-3 py-1.5 cursor-pointer transition-all duration-200 tracking-[0.04em] hover:bg-accent/14 hover:border-accent/40"
              >
                ＋ Add Media
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { projects };
