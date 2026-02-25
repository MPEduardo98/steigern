import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "STEIGERN — We Enjoy Making Machines",
  description: "Soluciones de ingeniería de precisión y automatización industrial. Construido para rendir. Diseñado para durar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${barlowCondensed.variable} ${barlow.variable} font-body antialiased bg-white text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}