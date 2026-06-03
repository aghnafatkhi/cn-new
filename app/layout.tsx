import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'SMAN 1 Cileungsi - Cinematography',
    template: '%s | SMAN 1 Cileungsi - Cinematography'
  },
  description: 'Official Web of SMAN 1 Cileungsi Cinematography Extracurricular. Framing raw human narratives and visual boundaries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white font-sans antialiased min-h-screen flex flex-col selection:bg-[#F49037] selection:text-black">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
