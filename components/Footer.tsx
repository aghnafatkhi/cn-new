export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-16 px-6 font-space selection:bg-[#F49037] selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-mono text-[10px] tracking-widest font-bold text-black bg-[#F49037] px-2 py-0.5">SMAN 1 CILEUNGSI</span>
            <span className="text-white/40 text-xs tracking-wider">// CINEMATOGRAPHY</span>
          </div>
          <span className="text-white/30 text-xs font-mono">
            CRAFTING CINEMATIC NARRATIVES • BOGOR, INDONESIA
          </span>
        </div>

        <div className="flex gap-8 text-xs font-semibold tracking-widest uppercase text-white/50">
          <a href="#" className="hover:text-[#F49037] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#F49037] transition-colors">Youtube</a>
          <a href="#" className="hover:text-[#F49037] transition-colors">TikTok</a>
        </div>

        <div className="text-white/30 text-[10px] tracking-widest uppercase font-mono">
          &copy; {new Date().getFullYear()} SMAN 1 Cileungsi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
