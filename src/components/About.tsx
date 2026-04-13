import { useEffect, useRef } from "react";
import poberBiLogo from "../../src/assets/powerbi.png";
import pythonLogo from "../../src/assets/python.png";
import ExcelLogo from "../../src/assets/excel.png";
import tableauLogo from "../../src/assets/tableau.png";
import mySQLLogo from "../../src/assets/mysql.png";

const tools = [
  { name: "Power BI", logo: poberBiLogo },
  { name: "Python", logo: pythonLogo },
  { name: "Excel", logo: ExcelLogo },
  { name: "Tableau", logo: tableauLogo },
  { name: "MySQL", logo: mySQLLogo },
];

export default function About() {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLDivElement>(".skill-fill").forEach((bar) => {
            bar.classList.add("animate");
          });
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative z-[1] py-24 px-12 max-w-[1200px] mx-auto"
    >
      <div className="section-label">About me</div>
      <h2 className="section-title">
        Data-curious by nature,
        <br />
        rigorous by practice
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start align-start">
        {/* Left: Bio */}
        <div className="fade-up about-text">
          {[
            <>
              I recently completed a{" "}
              <strong className="text-text font-semibold">
                Data Analytics certification
              </strong>{" "}
              and hold a degree in Statistics. I'm passionate about the entire
              data pipeline — from wrangling messy datasets to building
              interactive dashboards that tell clear stories.
            </>,
            <>
              My approach combines{" "}
              <strong className="text-text font-semibold">
                statistical thinking
              </strong>{" "}
              with strong visualization instincts. I believe the best analysis
              is one that anyone in the room can understand and act on.
            </>,
            <>
              I'm actively seeking{" "}
              <strong className="text-text font-semibold">
                junior analyst or analyst intern
              </strong>{" "}
              roles where I can contribute to data-driven teams and continue
              learning from experienced professionals.
            </>,
          ].map((text, i) => (
            <p
              key={i}
              className="text-text-muted text-[16px] leading-[1.8] mb-5"
            >
              {text}
            </p>
          ))}
        </div>

        {/* Right: Skills + Tools */}
        <div className="fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="mt-10">
            <div className="section-title mb-4">Tools & Technologies</div>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t.name} className="chip flex gap-3">
                  {t.name} {<img className="h-5" src={t.logo}></img>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
