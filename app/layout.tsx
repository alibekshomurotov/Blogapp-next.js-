
import type { Metadata } from 'next';
// Metadata - sahifa title, description kabi meta ma'lumotlar uchun

import { Inter } from 'next/font/google';
// Google Fonts'dan Inter shrifti - Next.js optimallashtiradi

import './globals.css';
// Global CSS faylimizni import qilamiz

// Inter shriftini yuklaymiz
const inter = Inter({
  subsets: ['latin'],
  // latin - lotincha harflar to'plami
});

// Sahifa meta ma'lumotlari (brauzer tab va SEO uchun)
export const metadata: Metadata = {
  title: 'Posts App — Next.js',
  description: 'JSONPlaceholder API bilan ishlash namunasi',
};

// RootLayout - barcha sahifani o'raydigan asosiy komponent
export default function RootLayout({
  children, // children - ichki sahifalar (page.tsx lar)
}: {
  children: React.ReactNode;
  // React.ReactNode - har qanday React element bo'lishi mumkin
}) {
  return (
    <html lang="uz">
      {/* lang="uz" - sahifa tili o'zbek (accessibility uchun muhim) */}

      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        {/* inter.className - Inter shriftini qo'llash */}
        {/* bg-gray-50 - juda och kulrang fon */}
        {/* min-h-screen - minimal balandlik: ekran balandligi */}
        {/* flex flex-col - vertikal flex layout (footer pastda turadi) */}

        {/* HEADER - Navigatsiya */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          {/* sticky top-0 - sahifa aylantirilganda ham yuqorida qoladi */}
          {/* z-50 - boshqa elementlar ustida turadi */}

          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between h-16">
              {/* h-16 - header balandligi 64px */}

              {/* Logo / Sayt nomi */}
              <a
                href="/"
                className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors"
              >
                <span className="text-2xl">📝</span>
                <span>Posts App</span>
              </a>

              {/* Navigatsiya linklari */}
              <nav className="flex items-center gap-6">
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Bosh sahifa
                </a>
                <a
                  href="https://jsonplaceholder.typicode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  // target="_blank" - yangi tabda ochish
                  // rel="noopener noreferrer" - xavfsizlik uchun
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  API haqida ↗
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* ASOSIY KONTENT - har bir page.tsx shu yerga tushadi */}
        <main className="flex-1">
          {/* flex-1 - bo'sh joyni to'ldiradi (footer pastda turadi) */}
          {children}
          {/* children - hozirgi sahifaning kontent */}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-200 mt-auto py-6">
          {/* mt-auto - yuqoridan avtomatik margin (pastga itaradi) */}

          <div className="container mx-auto px-4 max-w-6xl text-center">
            <p className="text-gray-500 text-sm">
              Next.js + TypeScript + Tailwind CSS bilan qurilgan
              {' · '}
              <a
                href="https://jsonplaceholder.typicode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                JSONPlaceholder API
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}