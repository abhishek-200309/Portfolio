const certs = [
  { icon: '🎓', name: 'Data Analytics With Gen AI', org: 'Brillica Services · 2026' },
  { icon: '📊', name: 'Tableau Desktop ', org: 'Brillica Services · 2026' },
  { icon: '🐍', name: 'Python for Data Analytics', org: 'Brillica Services · 2026' },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative z-[1] py-20 px-12 max-w-[1200px] mx-auto">
      <div className="section-label"></div>
      <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] mb-8">
        Certifications
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
        {certs.map(({ icon, name, org }) => (
          <div
            key={name}
            className="bg-surface border border-border rounded-xl px-5 py-6 text-center transition-all duration-200 hover:border-accent/30 hover:-translate-y-0.5"
          >
            <div className="text-[32px] mb-3">{icon}</div>
            <div className="font-sans text-[13px] font-semibold text-text mb-1.5 leading-[1.3]">{name}</div>
            <div className="font-mono text-[10px] text-text-muted tracking-[0.05em]">{org}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
