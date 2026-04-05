import { useEffect, useState } from 'react';

interface NavbarProps {
  activeSection: string;
  isOwner: boolean;
  onOwnerLogin: () => void;
  onOwnerLogout: () => void;
}

export default function Navbar({ activeSection, isOwner, onOwnerLogin, onOwnerLogout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-5 transition-all duration-300 border-b border-border backdrop-blur-xl ${scrolled ? 'bg-bg/90' : 'bg-bg/70'}`}>
      <a href="#hero" className="font-mono text-[13px] text-accent tracking-[0.08em] no-underline">
        AK.portfolio
      </a>

      <ul className="hidden md:flex gap-9 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={`font-mono text-[12px] tracking-[0.05em] no-underline transition-colors duration-200 ${activeSection === href.replace('#', '') ? 'text-accent' : 'text-text-muted hover:text-accent'}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {/* Owner mode indicator / toggle */}
        {isOwner ? (
          <button
            onClick={onOwnerLogout}
            title="Exit owner mode"
            className="flex items-center gap-1.5 font-mono text-[10px] text-accent/70 border border-accent/20 bg-accent/[0.06] rounded-full px-2.5 py-1 cursor-pointer transition-all hover:bg-accent/[0.12] hover:text-accent tracking-[0.04em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse2" />
            owner
          </button>
        ) : (
          <button
            onClick={onOwnerLogin}
            title="Owner login"
            className="font-mono text-[10px] text-text-dim border border-border/40 rounded-full px-2.5 py-1 cursor-pointer transition-all hover:text-text-muted hover:border-border opacity-30 hover:opacity-60 tracking-[0.04em]"
          >
            🔐
          </button>
        )}

        <a
          href="#contact"
          className="font-mono text-[12px] text-bg bg-accent px-5 py-2 rounded tracking-[0.05em] no-underline transition-opacity duration-200 hover:opacity-85"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
