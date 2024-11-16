"use client";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("../components/Providers"), { ssr: false });
const ConnectButton = dynamic(() => import("../components/ConnectButton"), { ssr: false });

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-lg border-b border-white/10 z-50">
            <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
              <h1 className="text-xl font-bold text-white">🎲 YL</h1>
              <ConnectButton />
            </div>
          </nav>
          <main className="min-h-screen bg-black text-white pt-8 pb-8">{children}</main>
          <NavBar />
        </Providers>
      </body>
    </html>
  );
}
