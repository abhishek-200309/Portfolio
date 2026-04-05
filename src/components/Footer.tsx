export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-border px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-3">
      <div className="font-mono text-[11px] text-text-dim tracking-[0.05em]">
        © 2024 Abhishek Kumar · Data Analyst Portfolio
      </div>
      <div className="flex items-center gap-2 font-mono text-[11px] text-accent tracking-[0.05em]">
        <div className="w-[7px] h-[7px] rounded-full bg-accent animate-pulse2" />
        Open to work
      </div>
    </footer>
  );
}
