"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { Play, Film, Flame, Monitor, ExternalLink } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description?: string;
  category?: string;
  votes?: number;
}

const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Sinar: Rasa yang Terpendam",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://picsum.photos/seed/sinar-thumbnail/800/450",
    description: "Film pendek peraih nominasi karya terbaik festival lokal Bogor. Bercerita tentang pergulatan batin seorang siswa kelas XII.",
    category: "Short Movie",
    votes: 42
  },
  {
    id: "p2",
    title: "Cinematography Aftermovie 2025/2026",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://picsum.photos/seed/showreel-thumbnail/800/450",
    description: "Kompilasi sekuens sinematik terbaik, transisi, dan color correction karya seluruh anggota angkatan ke-2.",
    category: "Aftermovie",
    votes: 88
  },
  {
    id: "p3",
    title: "Mengejar Embun",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://picsum.photos/seed/embun/800/450",
    description: "Karya dokumenter puitis yang merekam denyut kehidupan dini hari para pekerja pasar tradisional Cileungsi.",
    category: "Documentary",
    votes: 21
  },
  {
    id: "p4",
    title: "The Silent Set",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://picsum.photos/seed/silent/800/450",
    description: "Eksperimen film bisu berskala hitam-putih yang murni memadukan bahasa tubuh dengan lighting dramatis.",
    category: "Experimental",
    votes: 15
  }
];

export default function AftermoviePage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setProjects(FALLBACK_PROJECTS);
      setLoading(false);
      return;
    }

    const path = "projects";
    const q = query(collection(db, path)); // Standard get, optionally order by votes or title

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: ProjectItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            title: data.title || "",
            videoUrl: data.videoUrl || "",
            thumbnailUrl: data.thumbnailUrl || "",
            description: data.description || "",
            category: data.category || "Fiksi",
            votes: data.votes || 0,
          });
        });

        if (fetched.length === 0) {
          setProjects(FALLBACK_PROJECTS);
        } else {
          setProjects(fetched);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Could not query projects collection. Reverting to static assets.");
        setProjects(FALLBACK_PROJECTS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getYoutubeEmbedUrl = (url: string) => {
    // Basic youtube parser
    try {
      if (url.includes("youtube.com/watch?v=")) {
        const id = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${id}`;
      } else if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  return (
    <div className="w-full bg-black min-h-screen pt-36 pb-24 px-6 selection:bg-[#F49037] selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Title */}
        <div className="border-b border-white/10 pb-8 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[#F49037] tracking-widest uppercase block mb-3">
              // OFFICIAL PORTFOLIO
            </span>
            <h1 className="font-space font-bold uppercase tracking-tighter text-5xl sm:text-6xl md:text-7xl text-white">
              AFTER<span className="text-[#F49037]">MOVIE</span>.
            </h1>
          </div>
          <p className="font-sans text-white/50 text-sm md:text-base font-light max-w-sm">
            Eksplorasi sinematik, film pendek fiksi, dokumenter puitis, dan sekuens visual yang telah disunting oleh kru SMAN 1 Cileungsi.
          </p>
        </div>

        {/* Video Player Modal or Showcase Area */}
        {activeVideo ? (
          <div className="mb-20 bg-[#070707] border border-[#F49037]/30 p-4 transition-all animate-fade-in relative">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-10 bg-black/60 border border-white/15 px-3 py-1 font-mono text-xs text-white/80 hover:text-[#F49037] transition-colors"
            >
              CLOSE PLAYER [X]
            </button>
            <div className="w-full aspect-video">
              {getYoutubeEmbedUrl(activeVideo) ? (
                <iframe
                  className="w-full h-full border-0"
                  src={`${getYoutubeEmbedUrl(activeVideo)}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Cinematography Video Player"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-center gap-6 p-6">
                  <Film size={48} className="text-[#F49037] animate-pulse" />
                  <div>
                    <h3 className="font-space uppercase text-lg text-white font-bold">External Stream Player</h3>
                    <p className="text-white/40 text-xs mt-1">Video ini dimuat melalui server eksternal seperti Google Drive.</p>
                  </div>
                  <a 
                    href={activeVideo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#F49037] text-black font-space text-xs font-bold px-6 py-3 uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all"
                  >
                    Buka Link Eksternal <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Large Billboard Display for Hero aesthetic */
          <div className="mb-20 relative aspect-video bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center p-6 group">
            <Image
              src="https://picsum.photos/seed/main-show-banner/1920/1080"
              alt="Cover Aftermovie"
              fill
              className="object-cover opacity-40 grayscale group-hover:scale-[1.02] transition-transform duration-1000"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Dark gradient to read content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
              <span className="font-mono text-[10px] text-[#F49037] tracking-widest uppercase mb-4 bg-white/5 border border-[#F49037]/20 px-3 py-1">
                FEATURED WORK
              </span>
              <h2 className="font-space text-2xl sm:text-4xl font-bold uppercase tracking-tighter text-white mb-3">
                Cinematography SMANIC Aftermovie
              </h2>
              <p className="font-sans text-white/60 text-xs sm:text-sm font-light mb-8">
                Sorotan karya angkatan 1 & 2 berisi b-roll, transisi, audio-visual storytelling terbaik.
              </p>
              
              <button
                onClick={() => setActiveVideo("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                className="w-16 h-16 rounded-full bg-[#F49037] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg cursor-pointer"
                aria-label="Putar Video Utama"
              >
                <Play size={24} fill="currentColor" className="ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Selected Works dynamic listing */}
        <h2 className="font-space font-bold uppercase tracking-tighter text-2xl sm:text-3xl text-white mb-8 flex items-center gap-3">
          <Film className="text-[#F49037]" size={20} />
          SELECTION PANELS<span className="text-white/20">.</span>
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-6 h-6 rounded-full border-t-2 border-[#F49037] animate-spin border-white/10"></div>
            <span className="font-mono text-xs text-white/40 tracking-wider">INDEXING CELL REGISTRIES...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-[#070707] border border-white/5 p-6 hover:border-[#F49037]/35 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="font-mono text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 text-white/60 tracking-widest uppercase">
                      {project.category || "FILM"}
                    </span>
                    {project.votes !== undefined && (
                      <span className="font-mono text-[10px] text-[#F49037] uppercase tracking-widest flex items-center gap-1">
                        <Flame size={12} className="fill-[#F49037]" /> {project.votes} Suara
                      </span>
                    )}
                  </div>

                  <div className="aspect-video relative overflow-hidden bg-zinc-950 border border-white/5 mb-4 group cursor-pointer" onClick={() => setActiveVideo(project.videoUrl)}>
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover opacity-75 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm group-hover:bg-[#F49037] group-hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-space font-bold uppercase text-lg text-white mb-2">{project.title}</h3>
                  <p className="font-sans text-white/50 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {project.description || "Sebuah cuplikan karya seni visual orisinal cinematography."}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <button
                    onClick={() => setActiveVideo(project.videoUrl)}
                    className="flex-1 bg-white/5 hover:bg-[#F49037] hover:text-black text-white text-xs font-mono py-3 font-semibold uppercase tracking-widest transition-colors duration-200 border border-white/10"
                  >
                    PUTAR VIDEO
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
