export default function Hero() {
  return (
    <section id="hero" className="relative z-[1] min-h-screen flex items-center px-12 pt-[120px] pb-20 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">

        {/* Left: Content */}
        <div className="hero-content">
          <div className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase mb-5 flex items-center gap-3 before:content-[''] before:w-8 before:h-px before:bg-accent">
            Available for opportunities
          </div>

          <h1 className="font-serif text-[clamp(48px,5vw,72px)] leading-[1.05] tracking-[-0.02em] mb-6">
            Turning data into{' '}
            <em className="not-italic text-accent">insights</em>{' '}
            that matter
          </h1>

          <p className="text-text-muted text-[17px] leading-[1.7] mb-10 max-w-[440px]">
            I'm <strong className="text-text font-semibold">Abhishek Kumar</strong>, a junior data analyst with a passion for uncovering hidden patterns and building clean, compelling dashboards that drive real decisions.
          </p>

          <div className="flex gap-4 items-center">
            <a className="btn-primary" href="#projects">
              <span>View Projects</span>
              <span>→</span>
            </a>
            <a className="btn-secondary" href="#contact">
              <span>Download Resume</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden mt-12">
            {[
              { num: '8+', label: 'Projects' },
              { num: '3', label: 'Certifications' },
              { num: '0.5yr', label: 'Experience' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-surface px-6 py-7 text-center">
                <div className="font-serif text-[36px] text-accent leading-none mb-1.5">{num}</div>
                <div className="font-mono text-[11px] text-text-muted tracking-[0.08em] uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated Chart */}
        <div className="hidden lg:block relative h-[380px]">
          <div className="chart-card bg-surface border border-border rounded-2xl p-7 h-full relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="font-mono text-[11px] text-text-muted tracking-[0.08em] uppercase">Monthly Revenue Analysis</div>
                <div className="font-serif text-[28px] text-text">$284,590</div>
              </div>
              <div className="font-mono text-[11px] text-accent bg-accent/10 px-2 py-0.5 rounded-full">↑ 12.4%</div>
            </div>

            <svg className="w-full h-[180px]" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ff7b0" />
                  <stop offset="100%" stopColor="#4ff7b055" />
                </linearGradient>
                <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7b6cff" />
                  <stop offset="100%" stopColor="#7b6cff55" />
                </linearGradient>
              </defs>
              <g className="cursor-pointer">
                <rect x="10" y="100" width="28" height="56" fill="url(#barGrad)" rx="4" className="transition-opacity hover:opacity-80" />
                <rect x="42" y="120" width="28" height="36" fill="url(#barGrad2)" rx="4" className="transition-opacity hover:opacity-80" />
              </g>
              <g className="cursor-pointer">
                <rect x="82" y="70" width="28" height="86" fill="url(#barGrad)" rx="4" className="transition-opacity hover:opacity-80" />
                <rect x="114" y="95" width="28" height="61" fill="url(#barGrad2)" rx="4" className="transition-opacity hover:opacity-80" />
              </g>
              <g className="cursor-pointer">
                <rect x="154" y="50" width="28" height="106" fill="url(#barGrad)" rx="4" className="transition-opacity hover:opacity-80" />
                <rect x="186" y="80" width="28" height="76" fill="url(#barGrad2)" rx="4" className="transition-opacity hover:opacity-80" />
              </g>
              <g className="cursor-pointer">
                <rect x="226" y="30" width="28" height="126" fill="url(#barGrad)" rx="4" className="transition-opacity hover:opacity-80" />
                <rect x="258" y="58" width="28" height="98" fill="url(#barGrad2)" rx="4" className="transition-opacity hover:opacity-80" />
              </g>
              <text x="31" y="155" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="9" fill="#3d4460">Q1</text>
              <text x="99" y="155" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="9" fill="#3d4460">Q2</text>
              <text x="171" y="155" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="9" fill="#3d4460">Q3</text>
              <text x="243" y="155" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="9" fill="#3d4460">Q4</text>
            </svg>

            <div className="flex gap-5 mt-3">
              {[{ color: '#4ff7b0', label: 'Revenue' }, { color: '#7b6cff', label: 'Target' }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
                  <div className="w-2 h-2 rounded-sm" style={{ background: color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Floating tags */}
          <div className="absolute bottom-[60px] left-[-20px] bg-surface2 border border-border rounded-lg px-3.5 py-2.5 font-mono text-[11px] text-accent animate-float z-10">SQL</div>
          <div className="absolute bottom-[120px] right-[-20px] bg-surface2 border border-border rounded-lg px-3.5 py-2.5 font-mono text-[11px] text-accent animate-float-delay1 z-10">Python</div>
          <div className="absolute top-[60px] right-[-10px] bg-surface2 border border-border rounded-lg px-3.5 py-2.5 font-mono text-[11px] text-accent animate-float-delay2 z-10">Tableau</div>
        </div>
      </div>
    </section>
  );
}
