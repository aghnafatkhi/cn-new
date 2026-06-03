"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { Camera, Calendar, Award, Star, Mail, MapPin, Sparkles, X, ChevronRight } from "lucide-react";

interface MemberItem {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  email?: string;
  kelas?: string;
  bio?: string;
  joinYear?: string;
  favoriteGear?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  skills?: string[];
  featuredPhotos?: string[];
}

const FALLBACK_MEMBERS: MemberItem[] = [
  {
    id: "m1",
    name: "Alif Ramadhan",
    role: "Presiden Ekskul",
    photoUrl: "https://picsum.photos/seed/alif/600/800",
    email: "alif.cileungsi@gmail.com",
    kelas: "XII IPA 2",
    bio: "Pecinta cerita-cerita puitis dan pencahayaan high-contrast. Bertanggung jawab atas visual direction dan penulisan naskah drama fiksi.",
    joinYear: "2024",
    favoriteGear: "Sony FX30 + Sigma 18-50mm f2.8",
    instagram: "@alifrmd",
    skills: ["Directing", "Editing", "Screenwriting"]
  },
  {
    id: "m2",
    name: "Nadia Putri",
    role: "Wakil Presiden / Produser",
    photoUrl: "https://picsum.photos/seed/nadia/600/800",
    email: "nadia.putri@gmail.com",
    kelas: "XI IPS 1",
    bio: "Mengelola kelancaran operasional set dari awal pra-produksi hingga pasca-produksi. Berkomitmen menjaga kreativitas kru tetap terstruktur.",
    joinYear: "2024",
    favoriteGear: "iPad Pro (Scriptwriting & Shotlist management)",
    instagram: "@nadiaaptr",
    skills: ["Producer", "Scheduling", "Logistics"]
  },
  {
    id: "m3",
    name: "Dimas Anggara",
    role: "Kepala Produksi & DOP",
    photoUrl: "https://picsum.photos/seed/dimas/600/800",
    email: "dimas.angg@gmail.com",
    kelas: "XI IPA 4",
    bio: "Selalu mengeksplorasi sudut-sudut kamera yang ekstrem dan gerakan kamera handheld yang bercerita. Penyuka color-grading bernada vintage.",
    joinYear: "2025",
    favoriteGear: "Fujifilm X-T4 + Viltrox 27mm f1.2",
    instagram: "@dimas_ang",
    skills: ["Cinematography", "Lighting", "Color Grading"]
  },
  {
    id: "m4",
    name: "Rizwan Aditya",
    role: "Koordinator Pasca Produksi",
    photoUrl: "https://picsum.photos/seed/rizwan/600/800",
    email: "rizwan.adit@gmail.com",
    kelas: "XII IPA 1",
    bio: "Fokus pada kelancaran alur suntingan video (editing workflow) dan mixing tata suara agar penonton tenggelam dalam emosi audio-visual.",
    joinYear: "2024",
    favoriteGear: "MacBook Pro M2 - DaVinci Resolve Studio",
    instagram: "@rizwaan",
    skills: ["Video Editing", "Sound Design", "VFX"]
  },
  {
    id: "m5",
    name: "Dewi Lestari",
    role: "Cinematographer",
    photoUrl: "https://picsum.photos/seed/dewi/600/800",
    email: "dewilstr@gmail.com",
    kelas: "XI IPA 5",
    bio: "Penyuka framing simetris dan permainan elemen bayangan (shadow play). Mengabdi dalam mengekstrak ekspresi tersembunyi dari para aktor.",
    joinYear: "2025",
    favoriteGear: "Canon EOS R6 Mark II + RF 50mm f1.8",
    instagram: "@dewii.lst",
    skills: ["Operating Camera", "Framing", "Acting Coach"]
  },
  {
    id: "m6",
    name: "Kevin Pratama",
    role: "Perekam & Penata Suara",
    photoUrl: "https://picsum.photos/seed/kevin/600/800",
    email: "kevinprt@gmail.com",
    kelas: "XI IPS 3",
    bio: "Percaya bahwa audio adalah 50% dari jiwa sebuah film. Fokus mengambil foley suara alamiah, gemerisik daun, dan helaan napas emosional.",
    joinYear: "2025",
    favoriteGear: "Zoom H5 Recorder + Rode NTG-2 Shotgun Microphone",
    instagram: "@kevinprtm",
    skills: ["Location Sound", "Foley Recording", "Audio Mixing"]
  }
];

export default function ProfilPage() {
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);

  useEffect(() => {
    if (!db) {
      setMembers(FALLBACK_MEMBERS);
      setLoading(false);
      return;
    }

    const path = "members";
    const q = query(collection(db, path)); // Standard listener for member lists

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: MemberItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            name: data.name || "",
            role: data.role || "Anggota",
            photoUrl: data.photoUrl || "",
            email: data.email || "",
            kelas: data.kelas || "",
            bio: data.bio || "",
            joinYear: data.joinYear || "",
            favoriteGear: data.favoriteGear || "",
            instagram: data.instagram || "",
            tiktok: data.tiktok || "",
            youtube: data.youtube || "",
            skills: data.skills || [],
            featuredPhotos: data.featuredPhotos || []
          });
        });

        if (fetched.length === 0) {
          setMembers(FALLBACK_MEMBERS);
        } else {
          setMembers(fetched);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Could not query members collection. Reverting to local database rosters.");
        setMembers(FALLBACK_MEMBERS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-[#030303] min-h-screen pt-36 pb-24 px-6 selection:bg-[#F49037] selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Page banner */}
        <div className="border-b border-white/10 pb-8 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[#F49037] tracking-widest uppercase block mb-3">
              // PRODUCTION TEAM
            </span>
            <h1 className="font-space font-bold uppercase tracking-tighter text-5xl sm:text-6xl md:text-7xl text-white">
              PROFIL<span className="text-[#F49037]">.</span>
            </h1>
          </div>
          <p className="font-sans text-white/50 text-sm md:text-base font-light max-w-sm">
            Kreator di balik layar. Temui para pengurus dan kru aktif ekstrakulikuler Cinematography SMAN 1 Cileungsi. Klik salah satu kartu untuk detail profil lengkap.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-6 h-6 border-t-2 border-[#F49037] rounded-full animate-spin border-white/10"></div>
            <span className="font-mono text-xs text-white/40 tracking-wider">COMPILING ACTOR REGISTRY...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {members.map((member) => (
              <div 
                key={member.id} 
                onClick={() => setSelectedMember(member)}
                className="group flex flex-col items-center text-center cursor-pointer relative"
              >
                {/* Profile Image Wrapper */}
                <div className="w-full aspect-[3/4] bg-[#0c0c0c] overflow-hidden border border-white/5 mb-6 relative">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Absolute frame lines overlay */}
                  <div className="absolute top-3 left-3 w-4 h-[1px] bg-white/20 group-hover:bg-[#F49037]"></div>
                  <div className="absolute top-3 left-3 w-[1px] h-4 bg-white/20 group-hover:bg-[#F49037]"></div>
                  
                  {/* Click indicator on hover */}
                  <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[9px] text-[#F49037] tracking-widest uppercase">DETAIL +</span>
                  </div>
                </div>

                <h3 className="font-space font-bold uppercase tracking-tight text-xl text-white mb-1 group-hover:text-[#F49037] transition-colors line-clamp-1">
                  {member.name}
                </h3>
                
                <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase line-clamp-1 max-w-full">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Member Details Drawer Modal Dialog */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300">
            <div className="bg-[#080808] border border-white/10 max-w-2xl w-full relative overflow-hidden rounded-xs max-h-[90vh] overflow-y-auto no-scrollbar">
              
              {/* Cover aesthetic bar */}
              <div className="h-1.5 w-full bg-[#F49037]"></div>
              
              {/* Close Button Trigger */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white border border-white/15 p-2 bg-black hover:border-white transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X size={16} />
              </button>

              <div className="p-8 md:p-10 space-y-8">
                
                {/* Header Profile Frame */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-28 h-36 relative bg-zinc-900 border border-white/10 shrink-0 overflow-hidden">
                    <Image
                      src={selectedMember.photoUrl}
                      alt={selectedMember.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="font-mono text-[9px] text-[#F49037] tracking-widest uppercase border border-[#F49037]/20 px-2 py-0.5 bg-[#F49037]/5 inline-block mb-2">
                      {selectedMember.role}
                    </span>
                    <h2 className="font-space font-bold uppercase text-2xl md:text-3xl text-white tracking-tight leading-none mb-2">
                      {selectedMember.name}
                    </h2>
                    
                    {/* Basic details */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-white/40 font-mono mt-3">
                      {selectedMember.kelas && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-white/30" /> Kelas: {selectedMember.kelas}
                        </span>
                      )}
                      
                      {selectedMember.joinYear && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-white/30" /> Bergabung: {selectedMember.joinYear}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Narrative Bio/Core Description */}
                <div>
                  <h4 className="font-space font-bold uppercase tracking-widest text-[10px] text-[#F49037] mb-3 flex items-center gap-2">
                    <Star size={12} className="fill-[#F49037]" /> BIO SINGKAT CRUWS
                  </h4>
                  <p className="font-sans text-white/70 text-sm font-light leading-relaxed">
                    {selectedMember.bio || "Anggota aktif Ekstrakulikuler Cinematography SMAN 1 Cileungsi yang berdedikasi tinggi terhadap seni penataan kamera dan perancangan sinema."}
                  </p>
                </div>

                {/* Skills/Expertise List */}
                {selectedMember.skills && selectedMember.skills.length > 0 && (
                  <div>
                    <h4 className="font-space font-bold uppercase tracking-widest text-[10px] text-white/50 mb-3 flex items-center gap-2">
                      <Sparkles size={12} className="text-[#F49037]" /> KEAHLIAN / EXPERTISE
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="font-mono text-[10px] uppercase bg-white/5 border border-white/10 px-3 py-1.5 text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Favorite gear info */}
                {selectedMember.favoriteGear && (
                  <div className="bg-white/5 border border-white/5 p-4 flex items-start gap-3">
                    <Camera size={18} className="text-[#F49037] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-space text-xs font-bold uppercase text-white tracking-wider">Perangkat Favorit</h5>
                      <p className="font-mono text-xs text-white/50 mt-1">{selectedMember.favoriteGear}</p>
                    </div>
                  </div>
                )}

                {/* Social media connections */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/40 font-mono">
                  {selectedMember.email && (
                    <span className="flex items-center gap-2">
                      <Mail size={13} /> {selectedMember.email}
                    </span>
                  )}
                  {selectedMember.instagram && (
                    <a
                      href={`https://instagram.com/${selectedMember.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F49037] hover:text-white transition-colors"
                    >
                      INSTAGRAM: {selectedMember.instagram}
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
