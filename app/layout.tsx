import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const bankGothic = localFont({
  src: "../public/fonts/BankGothicBT-Light.woff2",
  variable: "--font-bankgothic",
  weight: "300",
  display: "swap",
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
      <body className={`${openSans.variable} ${bankGothic.variable} font-body antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}