"use client";

import Link from "next/link";
import Image from "next/image";
import { Trophy, Calendar, MapPin, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroSkeleton } from "@/components/ui/Skeleton";

interface HeroProps {
  isLoading?: boolean;
}

export function Hero({ isLoading }: HeroProps) {
  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-fifa-blue-dark/20 to-dark-bg" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 80px,
              currentColor 80px,
              currentColor 81px
            )`,
          }} />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-fifa-cyan/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fifa-gold/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tournament Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fifa-cyan/10 border border-fifa-cyan/30 mb-8 animate-fade-in">
          <Trophy className="h-5 w-5 text-fifa-gold" />
          <span className="text-sm font-semibold text-fifa-cyan">FIFA World Cup 2026</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up">
          <span className="text-gradient">The Beautiful</span>
          <br />
          <span className="text-white">Game Returns</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 animate-slide-up stagger-1">
          48 nations. 3 countries. 1 champion. Experience the biggest sporting event 
          on Earth from wherever you are.
        </p>

        {/* Event Details */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 animate-slide-up stagger-2">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="h-5 w-5 text-fifa-cyan" />
            <span className="font-medium">June 11 - July 19, 2026</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="h-5 w-5 text-fifa-gold" />
            <span className="font-medium">USA • Canada • Mexico</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up stagger-3">
          <Link href="/live-scores">
            <Button size="lg" className="group">
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Live Scores
            </Button>
          </Link>
          <Link href="/standings">
            <Button variant="outline" size="lg" className="group">
              View Standings
              <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-slide-up stagger-4">
          {[
            { value: "48", label: "Teams" },
            { value: "104", label: "Matches" },
            { value: "16", label: "Venues" },
            { value: "3", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative World Cup Trophy */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path
            fill="currentColor"
            d="M100,10 L100,10 C120,10 135,25 135,45 L135,45 C135,65 120,80 100,80 L100,80 C80,80 65,65 65,45 L65,45 C65,25 80,10 100,10 Z M80,80 L80,85 L120,85 L120,80 M90,85 L90,95 L110,95 L110,85"
            className="text-fifa-gold"
          />
        </svg>
      </div>
    </section>
  );
}
