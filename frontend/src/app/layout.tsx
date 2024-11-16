/* eslint-disable @next/next/no-img-element */
"use client";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("../components/Providers"), {
  ssr: false,
});
const ConnectButton = dynamic(() => import("../components/ConnectButton"), {
  ssr: false,
});

import NavBar from "../components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900`}>
        <Providers>
          <div className="hidden md:block fixed top-1/2 left-8 -translate-y-1/2 text-zinc-600 rotate-[-90deg]">
            Mobile Version Only
          </div>
          <div className="hidden md:block fixed top-1/2 right-8 -translate-y-1/2 text-zinc-600 rotate-90">
            Mobile Version Only
          </div>
          <div className="max-w-[430px] mx-auto relative min-h-screen bg-black">
            <nav className="fixed top-0 w-full max-w-[430px] bg-black/80 backdrop-blur-lg border-b border-white/10 z-50">
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                  <img src="/tontine-logo.png" alt="YL" className="w-6 h-6" />
                  <h1 className="text-xl font-bold text-white">Tontine</h1>
                </div>
                <ConnectButton />
              </div>
            </nav>
            <main className="min-h-screen bg-black text-white pt-8 pb-8">{children}</main>
            <NavBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
