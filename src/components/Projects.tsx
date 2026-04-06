/* eslint-disable react-refresh/only-export-components */
import { useRef, useState } from 'react';
import type { MediaStore } from '../types';

interface ProjectsProps {
  mediaStore: MediaStore;
  isOwner: boolean;
  onOpenLightbox: (pid: number) => void;
  onOpenManage: (pid: number, name: string) => void;
  onOpenInsights: (pid: number) => void;
  limit?: number;
  onViewAll?: () => void;
}

export type AccentTone = 'accent' | 'accent2' | 'accent3' | 'accent4';

export interface ProjectLink {
  label: string;
  href: string;
  ghost?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  tone?: AccentTone;
  icon?: string;
}

export interface ProjectBarDatum {
  label: string;
  labelSuffix?: string;
  detail: string;
  barPercent: number;
  tone?: AccentTone;
}

export interface ProjectLinePoint {
  label: string;
  value: number;
  displayValue: string;
}

export interface ProjectLineSummary {
  label: string;
  value: string;
  tone?: AccentTone;
}

interface ProjectDashboardSectionBase {
  title: string;
  footnote?: string;
  tone?: AccentTone;
}

interface DashboardContent {
  metrics?: ProjectMetric[];
  gridSections?: ProjectDashboardSection[];
  wideSections?: ProjectDashboardSection[];
  layout?: 'grid-first' | 'wide-first';
}

export interface ProjectBarSection extends ProjectDashboardSectionBase {
  kind: 'bars';
  items: ProjectBarDatum[];
  compact?: boolean;
}

export interface ProjectLineSection extends ProjectDashboardSectionBase {
  kind: 'line';
  points: ProjectLinePoint[];
  summary?: ProjectLineSummary[];
  xAxisLabel?: string;
  yAxisLabels?: string[];
}

export interface ProjectColumnDatum {
  label: string;
  value: number;
  displayValue: string;
  tone?: AccentTone;
}

export interface ProjectColumnSection extends ProjectDashboardSectionBase {
  kind: 'columns';
  items: ProjectColumnDatum[];
  xAxisLabel?: string;
  yAxisLabels?: string[];
}

export interface ProjectDonutDatum {
  label: string;
  value: number;
  displayValue: string;
  tone?: AccentTone;
}

export interface ProjectDonutSection extends ProjectDashboardSectionBase {
  kind: 'donut';
  segments: ProjectDonutDatum[];
  legendTitle?: string;
  totalDisplayValue?: string;
}

export type ProjectDashboardSection =
  | ProjectBarSection
  | ProjectLineSection
  | ProjectColumnSection
  | ProjectDonutSection;

export interface ProjectDashboardVariant extends DashboardContent {
  key: string;
  label: string;
}

export interface ProjectDashboard extends DashboardContent {
  badge: string;
  heading: string;
  filtersLabel?: string;
  variants?: ProjectDashboardVariant[];
}

export interface ProjectInsightsContent {
  overview: string;
  technologies: string[];
  challenges: string;
  outcomes: string;
  dashboard?: ProjectDashboard;
}

export interface Project {
  id: number;
  featured: boolean;
  icon: string;
  iconClass: string;
  tag: string;
  name: string;
  desc: string;
  stack: string[];
  links: ProjectLink[];
  insights: ProjectInsightsContent;
}

const projects: Project[] = [
  {
    id: 0,
    featured: true,
    icon: '⚡',
    iconClass: 'bg-accent2/10',
    tag: 'Data Analytics Project',
    name: 'The Rise of Electric Vehicles in India',
    desc: 'Built an end-to-end Power BI dashboard to analyze the EV transition in India (2015-2024). Focused on adoption patterns, category shifts, and manufacturer leadership.',
    stack: ['Power BI', 'SQL', 'Excel', 'DAX'],
    links: [
      { label: '→ Live Dashboard', href: '#' },
      { label: 'GitHub', href: '#', ghost: true },
    ],
    insights: {
      overview: 'A comprehensive analysis of the electric vehicle market in India, aiming to uncover growth trends, state-wise adoption rates, and the shift in consumer preferences between 2015 and 2024.',
      technologies: [
        'Power BI for dynamic data visualization and dashboarding',
        'SQL for data extraction and cleaning',
        'Excel for initial data exploration',
        'DAX for complex calculated measures',
      ],
      challenges: 'Handling missing geographic data across various states required mapping custom regions. Optimizing DAX queries for a large dataset (over 1M rows) to ensure the dashboard remained responsive was a significant hurdle. Furthermore, aligning public data sources with differing formats demanded rigorous ETL processes.',
      outcomes: 'Delivered an interactive dashboard that clearly highlighted the 300% YoY growth in 2-wheeler EVs and identified key states leading the transition, providing actionable insights for infrastructure planning.',
      dashboard: {
        badge: 'EV',
        heading: 'Market Adoption Insights',
        filtersLabel: 'Vehicle',
        variants: [
          {
            key: 'all',
            label: 'All',
            layout: 'wide-first',
            metrics: [
              { label: 'Total EV Registrations', value: '4.42M', tone: 'accent' },
              { label: 'Avg Annual EV Registrations', value: '2.40K', tone: 'accent' },
            ],
            wideSections: [
              {
                kind: 'line',
                title: 'EV Adoption Trend (2015-2024)',
                tone: 'accent',
                xAxisLabel: 'Years',
                yAxisLabels: ['2M', '1M', '0M'],
                points: [
                  { label: '2015', value: 7750, displayValue: '7.75K' },
                  { label: '2016', value: 49250, displayValue: '49.25K' },
                  { label: '2017', value: 87020, displayValue: '87.02K' },
                  { label: '2018', value: 129760, displayValue: '129.76K' },
                  { label: '2019', value: 165790, displayValue: '165.79K' },
                  { label: '2020', value: 123770, displayValue: '123.77K' },
                  { label: '2021', value: 328850, displayValue: '328.85K' },
                  { label: '2022', value: 1020530, displayValue: '1020.53K' },
                  { label: '2023', value: 1529230, displayValue: '1529.23K' },
                  { label: '2024', value: 978940, displayValue: '978.94K' },
                ],
              },
            ],
            gridSections: [
              {
                kind: 'columns',
                title: 'Leading EV Manufacturers',
                tone: 'accent',
                xAxisLabel: 'Manufacturer',
                yAxisLabels: ['0.5M', '0.0M'],
                items: [
                  { label: 'Hero MotoCorp', value: 620000, displayValue: '0.62M' },
                  { label: 'Tata Motors', value: 410000, displayValue: '0.41M' },
                  { label: 'Ather Energy', value: 330000, displayValue: '0.33M' },
                  { label: 'Greaves Cotton', value: 310000, displayValue: '0.31M' },
                  { label: 'TVS Motor', value: 220000, displayValue: '0.22M' },
                ],
              },
              {
                kind: 'donut',
                title: 'EV Adoption by Vehicle Category',
                legendTitle: 'vehicle_category',
                totalDisplayValue: '4.42M',
                segments: [
                  { label: 'Four Wheeler', value: 207298, displayValue: '0.21M', tone: 'accent' },
                  { label: 'Three Wheeler', value: 1933750, displayValue: '1.93M', tone: 'accent2' },
                  { label: 'Two Wheeler', value: 2279952, displayValue: '2.28M', tone: 'accent4' },
                ],
              },
            ],
          },
          {
            key: 'two-wheeler',
            label: 'Two Wheeler',
            layout: 'wide-first',
            metrics: [
              { label: 'Total EV Registrations', value: '2.28M', tone: 'accent4' },
              { label: 'Avg Annual EV Registrations', value: '3.80K', tone: 'accent' },
            ],
            wideSections: [
              {
                kind: 'line',
                title: 'EV Adoption Trend (2015-2024)',
                tone: 'accent',
                xAxisLabel: 'Years',
                yAxisLabels: ['1.0M', '0.5M', '0.0M'],
                points: [
                  { label: '2015', value: 1440, displayValue: '1.44K' },
                  { label: '2016', value: 1400, displayValue: '1.4K' },
                  { label: '2017', value: 1530, displayValue: '1.53K' },
                  { label: '2018', value: 17080, displayValue: '17.08K' },
                  { label: '2019', value: 30380, displayValue: '30.38K' },
                  { label: '2020', value: 29120, displayValue: '29.12K' },
                  { label: '2021', value: 156320, displayValue: '156.32K' },
                  { label: '2022', value: 631390, displayValue: '631.39K' },
                  { label: '2023', value: 860400, displayValue: '860.4K' },
                  { label: '2024', value: 550350, displayValue: '550.35K' },
                ],
              },
            ],
            gridSections: [
              {
                kind: 'columns',
                title: 'Leading EV Manufacturers',
                tone: 'accent',
                xAxisLabel: 'Manufacturer',
                yAxisLabels: ['0.5M', '0.0M'],
                items: [
                  { label: 'Hero MotoCorp', value: 590000, displayValue: '0.59M' },
                  { label: 'Tata Motors', value: 310000, displayValue: '0.31M' },
                  { label: 'Greaves Cotton', value: 270000, displayValue: '0.27M' },
                  { label: 'Ather Energy', value: 200000, displayValue: '0.20M' },
                  { label: 'BYD India', value: 200000, displayValue: '0.20M' },
                ],
              },
              {
                kind: 'donut',
                title: 'EV Adoption by Vehicle Category',
                legendTitle: 'vehicle_category',
                totalDisplayValue: '2.28M',
                segments: [
                  { label: 'Two Wheeler', value: 2279952, displayValue: '2.28M', tone: 'accent4' },
                ],
              },
            ],
          },
          {
            key: 'three-wheeler',
            label: 'Three Wheeler',
            layout: 'wide-first',
            metrics: [
              { label: 'Total EV Registrations', value: '1.93M', tone: 'accent2' },
              { label: 'Avg Annual EV Registrations', value: '3.12K', tone: 'accent' },
            ],
            wideSections: [
              {
                kind: 'line',
                title: 'EV Adoption Trend (2015-2024)',
                tone: 'accent',
                xAxisLabel: 'Years',
                yAxisLabels: ['0.5M', '0.0M'],
                points: [
                  { label: '2015', value: 5420, displayValue: '5.42K' },
                  { label: '2016', value: 46910, displayValue: '46.91K' },
                  { label: '2017', value: 83350, displayValue: '83.35K' },
                  { label: '2018', value: 110180, displayValue: '110.18K' },
                  { label: '2019', value: 133500, displayValue: '133.5K' },
                  { label: '2020', value: 90390, displayValue: '90.39K' },
                  { label: '2021', value: 158260, displayValue: '158.26K' },
                  { label: '2022', value: 350550, displayValue: '350.55K' },
                  { label: '2023', value: 583710, displayValue: '583.71K' },
                  { label: '2024', value: 372020, displayValue: '372.02K' },
                ],
              },
            ],
            gridSections: [
              {
                kind: 'columns',
                title: 'Leading EV Manufacturers',
                tone: 'accent',
                xAxisLabel: 'Manufacturer',
                yAxisLabels: ['0.2M', '0.1M', '0.0M'],
                items: [
                  { label: 'Olectra Greentech', value: 190000, displayValue: '0.19M' },
                  { label: 'TVS Motor', value: 140000, displayValue: '0.14M' },
                  { label: 'Simple Energy', value: 130000, displayValue: '0.13M' },
                  { label: 'Ather Energy', value: 115000, displayValue: '0.12M' },
                  { label: 'Ola Electric', value: 100000, displayValue: '0.10M' },
                ],
              },
              {
                kind: 'donut',
                title: 'EV Adoption by Vehicle Category',
                legendTitle: 'vehicle_category',
                totalDisplayValue: '1.93M',
                segments: [
                  { label: 'Three Wheeler', value: 1933750, displayValue: '1.93M', tone: 'accent2' },
                ],
              },
            ],
          },
          {
            key: 'four-wheeler',
            label: 'Four Wheeler',
            layout: 'wide-first',
            metrics: [
              { label: 'Total EV Registrations', value: '207.19K', tone: 'accent' },
              { label: 'Avg Annual EV Registrations', value: '334.18', tone: 'accent' },
            ],
            wideSections: [
              {
                kind: 'line',
                title: 'EV Adoption Trend (2015-2024)',
                tone: 'accent',
                xAxisLabel: 'Years',
                yAxisLabels: ['100K', '50K', '0K'],
                points: [
                  { label: '2015', value: 900, displayValue: '0.9K' },
                  { label: '2016', value: 900, displayValue: '0.9K' },
                  { label: '2017', value: 2140, displayValue: '2.14K' },
                  { label: '2018', value: 2510, displayValue: '2.51K' },
                  { label: '2019', value: 1910, displayValue: '1.91K' },
                  { label: '2020', value: 4260, displayValue: '4.26K' },
                  { label: '2021', value: 14270, displayValue: '14.27K' },
                  { label: '2022', value: 38590, displayValue: '38.59K' },
                  { label: '2023', value: 85120, displayValue: '85.12K' },
                  { label: '2024', value: 56580, displayValue: '56.58K' },
                ],
              },
            ],
            gridSections: [
              {
                kind: 'columns',
                title: 'Leading EV Manufacturers',
                tone: 'accent',
                xAxisLabel: 'Manufacturer',
                yAxisLabels: ['50K', '0K'],
                items: [
                  { label: 'TVS Motor', value: 74000, displayValue: '74K' },
                  { label: 'Ashok Leyland', value: 53000, displayValue: '53K' },
                  { label: 'Force Motors', value: 24000, displayValue: '24K' },
                  { label: 'Hero Electric', value: 22000, displayValue: '22K' },
                  { label: 'Minda Industries', value: 13000, displayValue: '13K' },
                ],
              },
              {
                kind: 'donut',
                title: 'EV Adoption by Vehicle Category',
                legendTitle: 'vehicle_category',
                totalDisplayValue: '207.19K',
                segments: [
                  { label: 'Four Wheeler', value: 207298, displayValue: '207.19K', tone: 'accent' },
                ],
              },
            ],
          },
        ],
      },
    },
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
    links: [
      { label: '→ View Queries', href: 'https://github.com/abhishek-200309/Hospital-Management/blob/master/project_analysis.sql' },
      { label: 'GitHub', href: 'https://github.com/abhishek-200309/Hospital-Management', ghost: true },
    ],
    insights: {
      overview: 'Architected a comprehensive relational database system to streamline hospital administration. The project focused on transforming raw operational data into actionable clinical and financial insights based on a 200-patient dataset.',
      technologies: [
        'MySQL for relational modeling and data storage',
        'Complex Joins & CTEs for multi-table reporting',
        'Window Functions for ranking doctor performance and revenue tracking',
        'ER Diagramming for database normalization (3NF)',
      ],
      challenges: 'A key challenge was calculating "Patient Stay Duration" accurately while handling null discharge dates for currently admitted patients (20% of cases). This was solved using COALESCE with CURDATE(). Additionally, I implemented a robust billing logic that joins the Admission, Treatment, and Medical Test tables to compute accurate totals per patient stay.',
      outcomes: 'Achieved a perfectly balanced 1:1 gender ratio across 200 patients. Successfully tracked 320 appointments and 140 admissions across 20 specialized departments. The analysis identified Jan-May 2025 as the busiest period, with a total hospital revenue of $2.32M and a 60% billing collection rate.',
      dashboard: {
        badge: 'SQL',
        heading: 'Core Project Analytics',
        gridSections: [
          {
            kind: 'bars',
            title: 'Patient Gender Composition',
            items: [
              { label: 'MALE', labelSuffix: '50%', detail: '100 pts', barPercent: 50, tone: 'accent' },
              { label: 'FEMALE', labelSuffix: '50%', detail: '100 pts', barPercent: 50, tone: 'accent3' },
            ],
            footnote: 'Derived from 200 patient registration records across the defined modulo logic.',
          },
          {
            kind: 'line',
            title: 'Monthly Admission Pipeline',
            tone: 'accent',
            points: [
              { label: 'JAN', value: 31, displayValue: '31' },
              { label: 'FEB', value: 28, displayValue: '28' },
              { label: 'MAR', value: 31, displayValue: '31' },
              { label: 'APR', value: 30, displayValue: '30' },
              { label: 'MAY', value: 20, displayValue: '20' },
            ],
            footnote: 'Trend analysis of 140 admissions (Q1-Q2 2025).',
          },
        ],
        wideSections: [
          {
            kind: 'bars',
            title: 'Top 5 Departments (Utilization)',
            compact: true,
            tone: 'accent',
            items: [
              { label: 'Cardiology', detail: '7 admissions', barPercent: 90 },
              { label: 'Neurology', detail: '7 admissions', barPercent: 90 },
              { label: 'Orthopedics', detail: '7 admissions', barPercent: 90 },
              { label: 'Pediatrics', detail: '7 admissions', barPercent: 90 },
              { label: 'Oncology', detail: '7 admissions', barPercent: 90 },
            ],
            footnote: 'Verification note: each of the 20 departments (Building A-T) reached peak consistency with 7 admissions each.',
          },
          {
            kind: 'line',
            title: 'Monthly Revenue Trends (2025)',
            tone: 'accent2',
            points: [
              { label: 'JAN', value: 513, displayValue: '$513K' },
              { label: 'FEB', value: 464, displayValue: '$464K' },
              { label: 'MAR', value: 513, displayValue: '$513K' },
              { label: 'APR', value: 497, displayValue: '$497K' },
              { label: 'MAY', value: 331, displayValue: '$331K' },
            ],
            summary: [
              { label: 'Total Revenue', value: '$2,320,000', tone: 'accent2' },
              { label: 'Collection Rate', value: '60.0%', tone: 'accent' },
            ],
            footnote: 'Financial performance data aggregated across 140 admissions and outpatient billing.',
          },
        ],
      },
    },
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
    links: [
      { label: '→ Notebook', href: '#' },
      { label: 'GitHub', href: '#', ghost: true },
    ],
    insights: {
      overview: 'An end-to-end machine learning project focusing on exploring factors that influence ride-share pricing such as distance, time of day, and weather conditions, culminating in a predictive model.',
      technologies: [
        'Python (Pandas, NumPy) for data manipulation',
        'Scikit-learn for model training and evaluation',
        'Seaborn & Matplotlib for exploratory data analysis',
      ],
      challenges: 'The dataset contained overwhelming categorical variables like weather conditions and pick-up locations which required extensive feature engineering and One-Hot Encoding. Handling outliers in surge pricing during extreme weather scenarios also required robust data imputation and statistical filtering.',
      outcomes: 'Trained a Random Forest Regression model that predicted surge prices with an 87% accuracy (R-squared score), identifying weather severity as the top predictive feature next to distance.',
    },
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
    links: [
      { label: '→ View Dashboard', href: '#' },
      { label: 'GitHub', href: '#', ghost: true },
    ],
    insights: {
      overview: 'A fully automated marketing analytics pipeline designed to consolidate data from multiple social media APIs into a single Google Sheets source, visualized through Looker Studio.',
      technologies: [
        'Google Sheets & App Script for backend automation',
        'Looker Studio for interactive reporting',
        'REST APIs for data ingestion',
      ],
      challenges: 'Dealing with rate limits and differing API structures across 4 platforms (Meta, Twitter, LinkedIn, TikTok) required writing complex, error-resilient App Scripts. Designing a unified schema to equate "engagements" from different platforms was a conceptual hurdle.',
      outcomes: 'Reduced reporting time from 5 hours a week down to zero. The automated PDF reports provided stakeholders with real-time visibility into ad spend efficiency and return on investment.',
    },
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
          {items[0].type === 'video' ? (
            <>
              {items[0].poster && !isPlaying && (
                <img
                  src={items[0].poster}
                  alt="thumbnail"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-[1.04] z-10"
                />
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
          ) : (
            <img
              src={items[0].src}
              alt="project screenshot"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            />
          )}
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

export default function Projects({
  mediaStore,
  isOwner,
  onOpenLightbox,
  onOpenManage,
  onOpenInsights,
  limit,
  onViewAll,
}: ProjectsProps) {
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
            Click <span className="text-accent">+ Add Media</span> on any card
            <br />
            to upload screenshots or videos
          </div>
        ) : (
          <div className="font-mono text-[12px] text-text-muted text-right leading-[1.7] pb-1.5 hidden md:block">
            Projects showcase <span className="text-accent">real analysis</span>
            <br />
            and interactive dashboards
          </div>
        )}
      </div>

      <div className="h-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedProjects.map((project, index) => (
          <div
            key={project.id}
            data-pid={project.id}
            className={`project-card bg-surface border border-border rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden hover:border-accent/30 hover:-translate-y-1 hover:scale-[1.02] fade-up visible ${project.featured ? 'lg:col-span-2 bg-gradient-to-br from-surface to-accent2/5 border-accent2/30' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <MediaPreview pid={project.id} mediaStore={mediaStore} onClick={() => onOpenLightbox(project.id)} />

            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center text-[20px] flex-shrink-0 ${project.iconClass}`}>
                {project.icon}
              </div>
              <span className="font-mono text-[10px] text-text-dim tracking-[0.08em] uppercase">{project.tag}</span>
            </div>

            <div className="font-serif text-[22px] text-text leading-[1.2]">{project.name}</div>

            <p className="text-text-muted text-[14px] leading-[1.7] flex-1">{project.desc}</p>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span key={item} className="stack-pill">
                  {item}
                </span>
              ))}
            </div>

            <div className="relative z-10 flex items-center gap-3 mt-1 w-full justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`project-link ${link.ghost ? 'text-text-muted' : ''}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                {isOwner && (
                  <button
                    onClick={() => onOpenManage(project.id, project.name)}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent bg-accent/[0.08] border border-accent/20 rounded-md px-3 py-1.5 cursor-pointer transition-all duration-200 tracking-[0.04em] hover:bg-accent/[0.14] hover:border-accent/40"
                  >
                    + Add Media
                  </button>
                )}
              </div>
              <button
                onClick={() => onOpenInsights(project.id)}
                className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] text-text rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                Insights <span className="opacity-70">✦</span>
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
