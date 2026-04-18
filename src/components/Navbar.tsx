import { useEffect, useState } from "react";
import { useHeader } from "./HeaderContext";

interface NavbarProps {
  activeSection: string;
  isOwner: boolean;
  onOwnerLogin: () => void;
  onOwnerLogout: () => void;
  view: 'home' | 'projects' | 'insights';
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({
  activeSection,
  view,
  onNavigate,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { showDashboardFilters, dashboardContent } = useHeader();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-12 py-4 md:py-5 transition-all duration-300 border-b border-border backdrop-blur-xl ${scrolled ? "bg-bg/90" : "bg-bg/70"}`}
    >
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}
        className="font-mono text-[13px] text-accent tracking-[0.08em] no-underline shrink-0"
      >
        AK.portfolio
      </a>

      <div className={`flex justify-center overflow-hidden relative items-center min-w-0 transition-all duration-500 w-full order-last md:w-auto md:flex-1 md:order-none md:px-8 md:min-h-[40px] md:opacity-100 ${showDashboardFilters ? 'max-h-[150px] opacity-100 mt-4 md:mt-0 md:max-h-none' : 'max-h-0 opacity-0 mt-0 md:max-h-none'}`}>
        <div 
          className={`transition-all duration-500 flex items-center gap-9 ${showDashboardFilters ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}
        >
          <ul className="hidden md:flex gap-9 list-none p-0 m-0">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); onNavigate(href.replace('#', '')); }}
                  className={`font-mono text-[12px] tracking-[0.05em] no-underline transition-colors duration-200 ${view === 'home' && activeSection === href.replace("#", "") ? "text-accent" : "text-text-muted hover:text-accent"}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {dashboardContent && (
          <div 
            className={`md:absolute md:inset-0 flex items-center justify-center w-full transition-all duration-500 ${showDashboardFilters ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          >
            {dashboardContent}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
          className="font-mono text-[12px] text-bg bg-accent px-5 py-2 rounded tracking-[0.05em] no-underline transition-opacity duration-200 hover:opacity-85"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
