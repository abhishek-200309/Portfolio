import { useRef, useState } from 'react';
import type { MediaStore } from '../types';

interface ProjectsProps {
  mediaStore: MediaStore;
  isOwner: boolean;
  onOpenLightbox: (pid: number) => void;
  onOpenManage: (pid: number, name: string) => void;
  onOpenInsights: (pid: number) => void;
  limit?: number; // Optional limit for main page
  onViewAll?: () => void; // Callback for "View More" button
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
    insights: {
      overview: 'A comprehensive analysis of the electric vehicle market in India, aiming to uncover growth trends, state-wise adoption rates, and the shift in consumer preferences between 2015 and 2024.',
      technologies: ['Power BI for dynamic data visualization and dashboarding', 'SQL for data extraction and cleaning', 'Excel for initial data exploration', 'DAX for complex calculated measures'],
      challenges: 'Handling missing geographic data across various states required mapping custom regions. Optimizing DAX queries for a large dataset (over 1M rows) to ensure the dashboard remained responsive was a significant hurdle. Furthermore, aligning public data sources with differing formats demanded rigorous ETL processes.',
      outcomes: 'Delivered an interactive dashboard that clearly highlighted the 300% YoY growth in 2-wheeler EVs and identified key states leading the transition, providing actionable insights for infrastructure planning.'
    }
  },
  {
    id: 1,
    featured: false,
    icon: '🏥',
    iconClass: 'bg-accent/10',
    tag: 'SQL Analytics',
    name: 'Hospital Management Analytics',
    desc: 'Designed a relational database for hospital operations. Conducted extensive demographics, appointment, and revenue analysis using SQL Window Functions and Joins.',
    stack: ['MySQL', 'Database Design', 'Data Analytics'],
    links: [{ label: '→ View Queries', href: 'https://github.com/abhishek-200309/Hospital-Management/blob/master/project_analysis.sql' }, { label: 'GitHub', href: 'https://github.com/abhishek-200309/Hospital-Management', ghost: true }],
    insights: {
      overview: 'Architected a comprehensive relational database system to streamline hospital administration. The project focused on transforming raw operational data into actionable clinical and financial insights based on a 200-patient dataset.',
      technologies: ['MySQL for relational modeling and data storage', 'Complex Joins & CTEs for multi-table reporting', 'Window Functions for ranking doctor performance and revenue tracking', 'ER Diagramming for database normalization (3NF)'],
      challenges: 'A key challenge was calculating "Patient Stay Duration" accurately while handling null discharge dates for currently admitted patients (20% of cases). This was solved using COALESCE with CURDATE(). Additionally, I implemented a robust billing logic that joins the Admission, Treatment, and Medical Test tables to compute accurate totals per patient stay.',
      outcomes: 'Achieved a perfectly balanced 1:1 gender ratio across 200 patients. Successfully tracked 320 appointments and 140 admissions across 20 specialized departments. The analysis identified Jan-May 2025 as the busiest period, with a total hospital revenue of $2.32M and a 60% billing collection rate.'
    }
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
    insights: {
      overview: 'An end-to-end machine learning project focusing on exploring factors that influence ride-share pricing such as distance, time of day, and weather conditions, culminating in a predictive model.',
      technologies: ['Python (Pandas, NumPy) for data manipulation', 'Scikit-learn for model training and evaluation', 'Seaborn & Matplotlib for exploratory data analysis'],
      challenges: 'The dataset contained overwhelming categorical variables like weather conditions and pick-up locations which required extensive feature engineering and One-Hot Encoding. Handling outliers in surge pricing during extreme weather scenarios also required robust data imputation and statistical filtering.',
      outcomes: 'Trained a Random Forest Regression model that predicted surge prices with an 87% accuracy (R-squared score), identifying weather severity as the top predictive feature next to distance.'
    }
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
    insights: {
      overview: 'A fully automated marketing analytics pipeline designed to consolidate data from multiple social media APIs into a single Google Sheets source, visualized through Looker Studio.',
      technologies: ['Google Sheets & App Script for backend automation', 'Looker Studio for interactive reporting', 'REST APIs for data ingestion'],
      challenges: 'Dealing with rate limits and differing API structures across 4 platforms (Meta, Twitter, LinkedIn, TikTok) required writing complex, error-resilient App Scripts. Designing a unified schema to equate "engagements" from different platforms was a conceptual hurdle.',
      outcomes: 'Reduced reporting time from 5 hours a week down to zero. The automated PDF reports provided stakeholders with real-time visibility into ad spend efficiency and return on investment.'
    }
  },
];

export type Project = typeof projects[0];

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
      className={`w-full aspect-video rounded-xl overflow-hidden bg-surface2 border border-border relative flex-shrink-0 group flex items-center justify-center ${items.length > 0 ? 'cursor-pointer' : 'cursor-default'}`}
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
                <video 
                  ref={videoRef} 
                  src={items[0].src} 
                  loop 
                  muted 
                  playsInline 
                  preload="auto"
                  controlsList="nodownload noplaybackrate" 
                  disablePictureInPicture 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]" 
                />
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

export default function Projects({ mediaStore, isOwner, onOpenLightbox, onOpenManage, onOpenInsights, limit, onViewAll }: ProjectsProps) {
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className="relative z-[1] py-24 px-12 max-w-[1200px] mx-auto transition-all duration-500">
      <div className="flex justify-between items-end mb-0">
        <div>
          <div className="section-label">Selected work</div>
          <h2 className="font-serif text-[clamp(18px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] mb-0">
            {limit ? 'Featured Projects' : 'All Projects'}
          </h2>
        </div>
        {isOwner ? (
          <div className="font-mono text-[12px] text-text-muted text-right leading-[1.7] pb-1.5 hidden md:block">
            Click <span className="text-accent">+ Add Media</span> on any card<br />
            to upload screenshots or videos
          </div>
        ) : (
          <div className="font-mono text-[12px] text-text-muted text-right leading-[1.7] pb-1.5 hidden md:block">
            Projects showcase <span className="text-accent">real analysis</span><br />
            and interactive dashboards
          </div>
        )}
      </div>

      <div className="h-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedProjects.map((p, i) => (
          <div
            key={p.id}
            data-pid={p.id}
            className={`project-card bg-surface border border-border rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden hover:border-accent/30 hover:-translate-y-1 hover:scale-[1.02] fade-up visible ${p.featured ? 'lg:col-span-2 bg-gradient-to-br from-surface to-accent2/5 border-accent2/30' : ''}`}
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

            <div className="relative z-10 flex items-center gap-3 mt-1 w-full justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex gap-3">
                  {p.links.map(l => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`project-link ${l.ghost ? 'text-text-muted' : ''}`}>
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
                {isOwner && (
                  <button
                    onClick={() => onOpenManage(p.id, p.name)}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent bg-accent/[0.08] border border-accent/20 rounded-md px-3 py-1.5 cursor-pointer transition-all duration-200 tracking-[0.04em] hover:bg-accent/[0.14] hover:border-accent/40"
                  >
                    ＋ Add Media
                  </button>
                )}
              </div>
              <button
                onClick={() => onOpenInsights(p.id)}
                className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] text-text rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                Insights <span className="opacity-70">✨</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {limit && onViewAll && (
        <div className="mt-16 flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={onViewAll}
            className="group relative inline-flex items-center gap-3 bg-surface border border-border px-8 py-4 rounded-full font-mono text-[13px] tracking-[0.05em] text-text hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-accent/10"
          >
            <span className="relative z-10 uppercase">View All Projects</span>
            <span className="relative z-10 text-accent group-hover:translate-x-1 transition-transform duration-300">→</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/5 to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      )}
    </section>
  );
}

export { projects };
