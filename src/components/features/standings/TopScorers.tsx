"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TopScorerSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";
import type { TopScorer } from "@/types";

interface TopScorersProps {
  scorers: TopScorer[];
  isLoading?: boolean;
}

export function TopScorers({ scorers, isLoading }: TopScorersProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-fifa-gold/10">
              <Award className="h-5 w-5 text-fifa-gold" />
            </div>
            <h3 className="font-bold">Top Scorers</h3>
          </div>
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <TopScorerSkeleton key={i} />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-fifa-gold/10">
            <Award className="h-5 w-5 text-fifa-gold" />
          </div>
          <h3 className="font-bold">Top Scorers</h3>
        </div>
      </div>
      <div className="divide-y divide-border">
        {scorers.slice(0, 10).map((scorer) => (
          <ScorerRow key={scorer.player.id} scorer={scorer} />
        ))}
      </div>
    </Card>
  );
}

interface ScorerRowProps {
  scorer: TopScorer;
}

function ScorerRow({ scorer }: ScorerRowProps) {
  const isTopThree = scorer.position <= 3;

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors",
      isTopThree && "bg-fifa-gold/5"
    )}>
      {/* Position */}
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center font-black text-lg",
        scorer.position === 1 && "bg-fifa-gold text-black",
        scorer.position === 2 && "bg-gray-300 text-black",
        scorer.position === 3 && "bg-amber-700 text-white",
        scorer.position > 3 && "bg-muted text-muted-foreground"
      )}>
        {scorer.position}
      </div>

      {/* Player Info */}
      <Link href={`/teams/${scorer.team.id}`} className="flex-1 flex items-center gap-3 group">
        <div className="relative">
          <Image
            src={scorer.player.photo}
            alt={scorer.player.name}
            width={48}
            height={48}
            className="rounded-full object-cover bg-muted"
          />
          {scorer.position === 1 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-fifa-gold rounded-full flex items-center justify-center">
              <span className="text-xs">👑</span>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold group-hover:text-fifa-cyan transition-colors">
            {scorer.player.name}
          </h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Image
              src={scorer.team.logo}
              alt={scorer.team.name}
              width={16}
              height={16}
              className="object-contain"
            />
            <span>{scorer.team.name}</span>
          </div>
        </div>
      </Link>

      {/* Stats */}
      <div className="flex items-center gap-4">
        {scorer.penalties && scorer.penalties > 0 && (
          <div className="text-center hidden sm:block">
            <span className="text-xs text-muted-foreground">PK</span>
            <p className="text-sm font-medium">{scorer.penalties}</p>
          </div>
        )}
        {scorer.assists !== undefined && scorer.assists > 0 && (
          <div className="text-center hidden md:block">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>AST</span>
            </div>
            <p className="text-sm font-medium">{scorer.assists}</p>
          </div>
        )}
        <div className="text-center">
          <span className="text-xs text-muted-foreground">G</span>
          <p className="text-2xl font-black text-fifa-gold">
            {scorer.goals}
          </p>
        </div>
      </div>
    </div>
  );
}
