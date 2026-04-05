const timeline = [
  {
    date: 'Jan 2024 – Present',
    role: 'Junior Data Analyst (Intern)',
    org: 'TechRetail Co. · Remote',
    bullets: [
      'Built and maintained 6 Tableau dashboards used by the marketing and ops teams weekly',
      'Wrote complex SQL queries to support A/B test reporting across 3 product lines',
      'Cleaned and transformed 2M+ row datasets using Python (Pandas) for monthly reporting',
      'Presented findings to non-technical stakeholders in weekly review sessions',
    ],
  },
  {
    date: 'Aug 2023 – Dec 2023',
    role: 'Google Data Analytics Certificate',
    org: 'Coursera / Google · Self-paced',
    bullets: [
      'Completed 8-course professional certificate covering SQL, R, Tableau, and data cleaning',
      'Capstone: Analyzed Cyclistic bike-share data to surface rider behavior patterns',
    ],
  },
  {
    date: '2020 – 2023',
    role: 'BSc Statistics',
    org: 'Delhi University · New Delhi, India',
    bullets: [
      'Graduated with First Class Honors (GPA 3.7/4.0)',
      'Coursework: Probability, Regression Analysis, Time Series, Data Mining',
      'Final project: Predictive modeling of crop yield using weather data',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-[1] py-24 px-12 max-w-[1200px] mx-auto">
      <div className="section-label">Experience &amp; Education</div>
      <h2 className="section-title">My journey so far</h2>

      <div className="timeline relative pl-8 fade-up">
        {timeline.map((item, i) => (
          <div key={i} className="timeline-item relative mb-12">
            <div className="font-mono text-[11px] text-text-dim tracking-[0.08em] mb-2">{item.date}</div>
            <div className="font-serif text-[22px] text-text mb-1">{item.role}</div>
            <div className="font-mono text-[13px] text-accent2 mb-4">{item.org}</div>
            <ul className="list-none flex flex-col gap-2">
              {item.bullets.map((b, j) => (
                <li key={j} className="text-[14px] text-text-muted flex items-start gap-2.5 leading-[1.6]">
                  <span className="text-accent font-mono text-[12px] flex-shrink-0 mt-0.5">→</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
