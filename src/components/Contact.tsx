export default function Contact() {

  
  return (
    <section
      id="contact"
      className="relative z-[1] py-24 px-12 max-w-[800px] mx-auto text-center"
    >
      <div className="section-label">Get in touch</div>
      <h2 className="font-serif text-[clamp(36px,4vw,56px)] leading-[1.1] mb-5">
        Let's work
        <br />
        <em className="not-italic text-accent">together</em>
      </h2>
      <p className="text-text-muted text-[17px] mb-12 leading-[1.7]">
        Open to junior analyst roles, internships, and freelance data projects.
        <br />
        I'd love to chat about how I can contribute to your team.
      </p>

      <div className="flex justify-center gap-4 flex-wrap mb-16">
        <a
          href="mailto:abhishek.kumar@email.com"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg font-mono text-[13px] tracking-[0.04em] no-underline transition-all duration-200 bg-accent text-bg border border-accent font-medium hover:shadow-[0_8px_32px_rgba(79,247,176,0.3)] hover:-translate-y-0.5"
        >
          <span>✉</span> Email Me
        </a>
        <a
          href="https://linkedin.com/in/abhishek-kumar-1617a9200"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg font-mono text-[13px] tracking-[0.04em] no-underline border border-border text-text-muted transition-all duration-200 hover:text-text hover:border-text-muted hover:-translate-y-0.5"
        >
          <span>in</span> LinkedIn
        </a>
        <a
          href="https://github.com/abhishek-200309"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg font-mono text-[13px] tracking-[0.04em] no-underline border border-border text-text-muted transition-all duration-200 hover:text-text hover:border-text-muted hover:-translate-y-0.5"
        >
          <span>⌂</span> GitHub
        </a>
        <a
          href="/Abhishek.pdf"
          download="Abhishek.pdf"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg font-mono text-[13px] tracking-[0.04em] no-underline border border-border text-text-muted transition-all duration-200 hover:text-text hover:border-text-muted hover:-translate-y-0.5"
        >
          <span>↓</span> Resume PDF
        </a>
      </div>
    </section>
  );
}
