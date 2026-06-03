"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dokumentasi', label: 'Dokumentasi' },
    { href: '/aftermovie', label: 'Aftermovie' },
    { href: '/absensi', label: 'Absensi' },
    { href: '/profil', label: 'Profil Anggota' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-space ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded-xs bg-[#F49037]/10 border border-[#F49037]/25 flex items-center justify-center p-0.5 transition-transform group-hover:scale-105">
            <img
              src="https://i.postimg.cc/kXTFxR6n/CN-HD.png"
              alt="Logo Cinematography"
              width={28}
              height={28}
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-bold text-white tracking-widest text-xs uppercase group-hover:text-[#F49037] transition-colors hidden sm:inline">
            SMAN 1 CILEUNGSI
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-all duration-200 relative py-1 hover:text-white ${
                  isActive ? 'text-[#F49037] font-semibold' : 'text-white/60'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F49037]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/80 hover:text-[#F49037] transition-colors focus:outline-none"
          aria-label={isOpen ? 'Tutup Menu' : 'Buka Menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 top-[60px] bg-black border-t border-white/5 z-40 md:hidden transition-all duration-300 flex flex-col px-6 py-8 gap-6 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold tracking-widest uppercase transition-colors ${
                isActive ? 'text-[#F49037]' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
