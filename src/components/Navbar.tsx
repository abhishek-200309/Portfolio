import { useEffect, useState } from 'react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
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
        AM.portfolio
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

      <a
        href="#contact"
        className="font-mono text-[12px] text-bg bg-accent px-5 py-2 rounded tracking-[0.05em] no-underline transition-opacity duration-200 hover:opacity-85"
      >
        Get in Touch
      </a>
    </nav>
  );
}
