"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import Image from "next/image";
import { Calendar, Eye, ArrowUpRight, FolderOpen } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  description?: string;
  googleDriveLink?: string;
}

const FALLBACK_EVENTS: EventItem[] = [
  {
    id: "f1",
    title: "Behind The Scenes: Short Film 'Sinar'",
    date: "2026-05-10",
    coverImage: "https://picsum.photos/seed/sinar-bts/1000/700",
    description: "Proses pengambilan gambar film pendek 'Sinar' di sekitar Danau Cileungsi. Mengulik teknik Golden Hour.",
    googleDriveLink: "https://drive.google.com"
  },
  {
    id: "f2",
    title: "Workshop Tata Cahaya & Reflektor",
    date: "2026-04-22",
    coverImage: "https://picsum.photos/seed/lighting/1000/700",
    description: "Belajar mengontrol shadow dan highlight menggunakan panel LED bertenaga baterai dan diffuser buatan.",
    googleDriveLink: "https://drive.google.com"
  },
  {
    id: "f3",
    title: "Screening & Diskusi Teori Film Klasik",
    date: "2026-03-15",
    coverImage: "https://picsum.photos/seed/screening/1000/700",
    description: "Bincang santai mengupas komposisi frame legendaris dari sutradara ternama dunia.",
    googleDriveLink: "https://drive.google.com"
  },
  {
    id: "f4",
    title: "Praktek Lapangan: Teknik Tracking Shots",
    date: "2026-02-08",
    coverImage: "https://picsum.photos/seed/tracking/1000/700",
    description: "Eksperimen menggunakan stabilizer gimbal mekanik untuk menciptakan fluiditas visual dinamis.",
    googleDriveLink: "https://drive.google.com"
  }
];

export default function DokumentasiPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setEvents(FALLBACK_EVENTS);
      setLoading(false);
      return;
    }

    const path = "events";
    const q = query(collection(db, path), orderBy("date", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: EventItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            title: data.title || "",
            date: data.date || "",
            coverImage: data.coverImage || "",
            description: data.description || "",
            googleDriveLink: data.googleDriveLink || "",
          });
        });

        // If Firestore is empty, gracefully show high-quality fallbacks for SMAN 1 Cileungsi
        if (fetched.length === 0) {
          setEvents(FALLBACK_EVENTS);
        } else {
          setEvents(fetched);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore collection is offline or has restricted rules. Showing offline fallbacks instead.");
        setEvents(FALLBACK_EVENTS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-[#030303] min-h-screen pt-36 pb-24 px-6 select-none selection:bg-[#F49037] selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Page title with precise Swiss structural layout */}
        <div className="border-b border-white/10 pb-8 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[#F49037] tracking-widest uppercase block mb-3">
              // ARCHIVAL RECORD
            </span>
            <h1 className="font-space font-bold uppercase tracking-tighter text-5xl sm:text-6xl md:text-7xl text-white">
              DOKUMEN<span className="text-[#F49037]">TASI</span>.
            </h1>
          </div>
          <p className="font-sans text-white/50 text-sm md:text-base font-light max-w-sm">
            Kumpulan proses, di balik layar (BTS), latihan mingguan, dan galeri kegiatan yang diselenggarakan oleh Ekstrakulikuler Cinematography SMAN 1 Cileungsi.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 rounded-full border-t-2 border-[#F49037] animate-spin border-white/10"></div>
            <span className="font-mono text-xs text-white/40 tracking-wider">LOADING ARCHIVE CELLS...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {events.map((event) => (
              <div 
                key={event.id}
                className="group flex flex-col bg-[#080808] border border-white/5 rounded-xs p-6 hover:border-[#F49037]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F49037]/5"
              >
                {/* Visual Cover Asset wrapper */}
                <div className="w-full aspect-[16/10] bg-zinc-950 overflow-hidden relative border border-white/5 mb-6">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale hover:grayscale-0 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/75 border border-white/10 px-3 py-1 flex items-center gap-2">
                    <Calendar size={11} className="text-[#F49037]" />
                    <span className="font-mono text-[10px] text-white/80 tracking-widest uppercase">{event.date}</span>
                  </div>
                </div>

                {/* Event text details */}
                <h3 className="font-space font-bold uppercase text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#F49037] transition-colors mb-3">
                  {event.title}
                </h3>
                
                <p className="font-sans text-white/50 text-sm font-light mb-6 leading-relaxed flex-grow">
                  {event.description || "Tidak ada deskripsi tambahan untuk kegiatan ini."}
                </p>

                {/* Interactive Link Details */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    ID: {event.id.substring(0, 8)}
                  </span>

                  {event.googleDriveLink && (
                    <a
                      href={event.googleDriveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F49037] font-mono text-xs uppercase tracking-widest font-semibold hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      Buka Galeri Drive <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
