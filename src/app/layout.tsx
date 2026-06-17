import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 | Live Scores, Standings & News",
  description: "Your ultimate destination for FIFA World Cup 2026 coverage. Live scores, group standings, team information, and the latest football news from the tournament in USA, Canada, and Mexico.",
  keywords: ["FIFA World Cup 2026", "football", "soccer", "live scores", "World Cup", "USA 2026"],
  authors: [{ name: "FIFA World Cup 2026" }],
  openGraph: {
    title: "FIFA World Cup 2026",
    description: "Live scores, standings, teams and news from the biggest football tournament",
    type: "website",
    locale: "en_US",
    siteName: "FIFA World Cup 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026",
    description: "Live scores, standings, teams and news from the biggest football tournament",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-body antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
