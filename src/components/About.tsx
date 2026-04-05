import { useEffect, useRef } from 'react';

const skills = [
  { name: 'SQL / PostgreSQL', pct: 85 },
  { name: 'Python (Pandas, NumPy)', pct: 78 },
  { name: 'Tableau / Power BI', pct: 80 },
  { name: 'Excel / Google Sheets', pct: 90 },
  { name: 'Data Visualization', pct: 82 },
  { name: 'Statistical Analysis', pct: 75 },
];

const tools = [
  'Python','SQL','Tableau','Power BI','Excel','Pandas',
  'Matplotlib','Seaborn','Google Analytics','BigQuery','Jupyter','Git',
];

export default function About() {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLDivElement>('.skill-fill').forEach(bar => {
            bar.classList.add('animate');
          });
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="relative z-[1] py-24 px-12 max-w-[1200px] mx-auto">
      <div className="section-label">About me</div>
      <h2 className="section-title">
        Data-curious by nature,<br />rigorous by practice
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Bio */}
        <div className="fade-up about-text">
          {[
            <>I recently completed a <strong className="text-text font-semibold">Data Analytics certification</strong> and hold a degree in Statistics. I'm passionate about the entire data pipeline — from wrangling messy datasets to building interactive dashboards that tell clear stories.</>,
            <>My approach combines <strong className="text-text font-semibold">statistical thinking</strong> with strong visualization instincts. I believe the best analysis is one that anyone in the room can understand and act on.</>,
            <>I'm actively seeking <strong className="text-text font-semibold">junior analyst or analyst intern</strong> roles where I can contribute to data-driven teams and continue learning from experienced professionals.</>,
          ].map((text, i) => (
            <p key={i} className="text-text-muted text-[16px] leading-[1.8] mb-5">{text}</p>
          ))}
        </div>

        {/* Right: Skills + Tools */}
        <div className="fade-up" style={{ animationDelay: '0.15s' }}>
          <div ref={skillsRef} className="flex flex-col gap-3">
            {skills.map(({ name, pct }, i) => (
              <div key={name} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[12px] text-text tracking-[0.04em]">{name}</span>
                  <span className="font-mono text-[11px] text-text-muted">{pct}%</span>
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="skill-fill"
                    style={{ width: `${pct}%`, transitionDelay: `${i * 0.1}s` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="font-mono text-[11px] text-text-muted tracking-[0.08em] uppercase mb-4">
              Tools & Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
