"use client";

import Link from "next/link";
import { Globe, Github, Twitter, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const footerLinks = {
  tournament: [
    { label: "Teams", href: "/teams" },
    { label: "Fixtures", href: "/live-scores" },
    { label: "Standings", href: "/standings" },
    { label: "Statistics", href: "/standings" },
  ],
  news: [
    { label: "Latest News", href: "/news" },
    { label: "Match Reports", href: "/news" },
    { label: "Analysis", href: "/news" },
    { label: "Features", href: "/news" },
  ],
  resources: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <Globe className="h-8 w-8 text-fifa-cyan group-hover:text-fifa-gold transition-colors" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  <span className="text-fifa-cyan">FIFA</span>
                  <span className="text-fifa-gold"> 2026</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">
                  World Cup
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Your ultimate destination for FIFA World Cup 2026 coverage. Live scores, 
              standings, team information, and the latest football news.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={cn(
                      "p-2 rounded-lg bg-dark-surface hover:bg-dark-card text-gray-400",
                      "hover:text-fifa-cyan transition-colors"
                    )}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Tournament Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tournament
            </h3>
            <ul className="space-y-3">
              {footerLinks.tournament.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-fifa-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              News
            </h3>
            <ul className="space-y-3">
              {footerLinks.news.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-fifa-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-fifa-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FIFA World Cup 2026. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Built with</span>
            <span className="text-red-500">❤</span>
            <span>using Next.js 15 & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
