import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FloatingContactButton } from "@/components/FloatingContactButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trustiify | Scale Your Revenue",
  description: "Trustiify combines performance marketing, technical SEO, and conversion-first design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-clash: 'Clash Display', sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased bg-[#050810] text-white selection:bg-cyan-500/30 overflow-x-hidden">
        {children}
        <FloatingContactButton
          web3formsKey="YOUR_KEY_HERE"
          whatsappNumber="19083840281"
          email="ads@trustiify.agency"
          instagramUrl="https://instagram.com/trustiify"
        />
      </body>
    </html>
  );
}
