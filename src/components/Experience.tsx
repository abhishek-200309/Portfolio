const now = new Date();

// Set target: 1 September 2026
const targetDate = new Date(2026, 8, 1); // month is 0-based (8 = September)

let finalDate;

if (now < targetDate) {
  finalDate = now;
} else {
  finalDate = targetDate;
}

// Format date
const formattedDate = finalDate.toLocaleDateString("en-GB", {

  month: "long",
  year: "numeric",
});

console.log(formattedDate);
const timeline = [
  {
    date: `September 2025 - ${formattedDate}`,
    role: "Data Analyst Trainee",
    org: "Brillica Services · Dehradun, Uttarakhand",
    bullets: [
      "Learned and implemented data analysis tools and techniques.",
      "Built projects to apply concepts and solve real-world problems.",
    ],
  },
  {
    date: "May 2023 - July 2024",
    role: "Quality Analyst",
    org: "EstateDekho · Dehradun, Uttarakhand",
    bullets: [
      "Contribute to maintaining data accuracy and quality assurance.",
      "Assist in finding insights to support business objectives.",
    ],
  },
  {
    date: "June 2022 – October 2022",
    role: "Customer Care Executive",
    org: "Ileads pvt. ltd.",
    bullets: [
      "Handled customer queries and complain on voice and non-voice mode ",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-[1] py-24 px-12 max-w-[1200px] mx-auto"
    >
      <div className="section-label">Experience &amp; Education</div>
      <h2 className="section-title">My journey so far</h2>

      <div className="timeline relative pl-8 fade-up">
        {timeline.map((item, i) => (
          <div key={i} className="timeline-item relative mb-12">
            <div className="font-mono text-[12px] text-text-muted tracking-[0.08em] mb-2">
              {item.date}
            </div>
            <div className="font-serif text-[22px] text-text mb-1">
              {item.role}
            </div>
            <div className="font-mono text-[13px] text-accent2 mb-4">
              {item.org}
            </div>
            <ul className="list-none flex flex-col gap-2">
              {item.bullets.map((b, j) => (
                <li
                  key={j}
                  className="text-[14px] text-text-muted flex items-start gap-2.5 leading-[1.6]"
                >
                  <span className="text-accent font-mono text-[12px] flex-shrink-0 mt-0.5">
                    →
                  </span>
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
