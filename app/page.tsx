import Link from 'next/link';
import { Film, Play, Camera, FilmIcon, Award, Compass, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black overflow-hidden selection:bg-[#F49037] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Dark Video Atmosphere */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            src="https://player.vimeo.com/video/1194906889?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0"
            className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2 opacity-40 grayscale pointer-events-none scale-125 md:scale-110"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Cinematography Background"
          />
          {/* Noise/Grain Accent Overlay for cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 flex flex-col items-start justify-end h-full pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-sm shadow-xl inline-flex rounded-sm">
              <span className="w-2 h-2 rounded-full bg-[#F49037] animate-pulse"></span>
              <span className="font-mono text-[10px] tracking-widest text-[#F49037] uppercase">Aktivitas Terbaru: Rekrutmen Anggota 2026/2027</span>
            </div>
            
            <h1 className="font-space font-bold uppercase tracking-tighter text-5xl sm:text-7xl md:text-8xl text-white mb-6 leading-[0.9]">
              RAW<span className="text-[#F49037]">.</span> <br />
              CANDID<span className="text-white/40">.</span> <br />
              STORIES<span className="text-[#F49037] font-sans">_</span>
            </h1>
            
            <p className="font-sans text-white/70 text-lg sm:text-xl font-light mb-12 leading-relaxed max-w-xl">
              Hasil karya, arsip dokumentasi, dan ruang belajar cinematography siswa-siswi SMAN 1 Cileungsi. Melatih persepsi di balik frame kamera.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/aftermovie"
                className="bg-[#F49037] text-black font-space uppercase tracking-widest text-xs font-bold px-8 py-5 hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 rounded-xs"
              >
                <Play size={14} fill="currentColor" /> Putar Aftermovie
              </Link>
              <Link
                href="/dokumentasi"
                className="bg-transparent border border-white/20 text-white font-space uppercase tracking-widest text-xs font-bold px-8 py-5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center gap-2 rounded-xs"
              >
                Arsip Galeri <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Cinematic Slate Frame lines */}
        <div className="absolute top-0 left-0 w-full h-4 bg-black/90 z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-black/90 z-20"></div>
      </section>

      {/* PHILOSOPHY & VISION - Anti-AI-slop asymmetrical layout */}
      <section className="w-full bg-[#030303] py-28 md:py-36 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#F49037] tracking-widest uppercase block mb-4">
                  // VISUAL IDENTITY
                </span>
                <h2 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-white mb-8 leading-[1]">
                  FRAMING THE <br />UNSEEN ASPECT OF LIFE<span className="text-[#F49037]">.</span>
                </h2>
              </div>
              <p className="font-sans text-white/50 text-base sm:text-lg font-light leading-relaxed mb-6">
                Ekstrakulikuler Cinematography SMAN 1 Cileungsi bukan sekadar tempat kumpul atau memegang kamera. Kami melatih sensitivitas rasa, pencahayaan, perspektif ruang, sehingga siswa dapat memproduksi sinema berbobot dengan pesan moral yang kuat.
              </p>
              <div className="font-mono text-xs text-white/30 flex items-center gap-2 py-4">
                <span>COORD: SMAN 1 CILEUNGSI</span>
                <span>•</span>
                <span>BOGOR, ID</span>
              </div>
            </div>

            {/* Feature Bento Content */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:pl-12">
              <div className="bg-[#0a0a0a] border border-white/5 p-8 relative hover:border-[#F49037]/45 transition-colors duration-300">
                <span className="absolute top-0 left-0 w-6 h-[1px] bg-[#F49037]"></span>
                <span className="absolute top-0 left-0 w-[1px] h-6 bg-[#F49037]"></span>
                <Camera className="text-[#F49037] mb-6" size={28} />
                <h3 className="font-space text-lg font-bold uppercase tracking-wider text-white mb-2">Produksi Lapangan</h3>
                <p className="text-white/55 text-sm font-light">
                  Mempelajari teknik directing, manual camera setting, sound design, tata cahaya (lighting), dan penulisan naskah film pendek.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-8 relative hover:border-[#F49037]/45 transition-colors duration-300">
                <FilmIcon className="text-[#F49037] mb-6" size={28} />
                <h3 className="font-space text-lg font-bold uppercase tracking-wider text-white mb-2">Pasca Produksi</h3>
                <p className="text-white/55 text-sm font-light">
                  Pelatihan editing menggunakan perangkat industri standar, koreksi warna (color grading), sound mixing, dan workflow pasca-produksi.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-8 relative hover:border-[#F49037]/45 transition-colors duration-300">
                <Award className="text-[#F49037] mb-6" size={28} />
                <h3 className="font-space text-lg font-bold uppercase tracking-wider text-white mb-2">Kompetisi & Festival</h3>
                <p className="text-white/55 text-sm font-light">
                  Mengajukan karya-karya terbaik buatan siswa ke festival film pendek antar-sekolah secara aktif dan konsisten.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-8 relative hover:border-[#F49037]/45 transition-colors duration-300">
                <Compass className="text-[#F49037] mb-6" size={28} />
                <h3 className="font-space text-lg font-bold uppercase tracking-wider text-white mb-2">Kurasi Film</h3>
                <p className="text-white/55 text-sm font-light">
                  Screening berkala, ulasan film klasik dan modern untuk memperkaya referensi visual serta mengasah pisau analisis sinematis.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK ATTENDANCE PROMPT (Absensi Call-To-Action) */}
      <section className="w-full bg-[#F49037] px-6 py-16 text-black relative overflow-hidden font-space">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest uppercase bg-black text-[#F49037] px-2 py-1 inline-block mb-3">
              LIVE ATTENDANCE GATE / PRESENSI HARIAN
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none">
              JANGAN LUPA ABSEN PERTEMUAN MINGGUAN<span className="font-sans">!</span>
            </h2>
          </div>
          <div>
            <Link
              href="/absensi"
              className="bg-black hover:bg-white hover:text-black text-[#F49037] font-bold text-xs uppercase tracking-widest px-8 py-5 transition-all inline-block border border-black"
            >
              Isi Presensi Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
