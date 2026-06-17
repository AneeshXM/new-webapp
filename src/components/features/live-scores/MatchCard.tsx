"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDate, formatTime, getRelativeTime } from "@/lib/utils/cn";
import type { Match } from "@/types";

interface MatchCardProps {
  match: Match;
  variant?: "default" | "compact" | "featured";
  showVenue?: boolean;
  showDate?: boolean;
}

export function MatchCard({ match, variant = "default", showVenue = true, showDate = true }: MatchCardProps) {
  const isLive = match.status === "LIVE" || match.status === "IN_PLAY";
  const isFinished = match.status === "FINISHED" || 
                    match.status === "FINISHED_AFTER_EXTRA_TIME" || 
                    match.status === "FINISHED_AFTER_PENALTIES";
  const isScheduled = match.status === "SCHEDULED";

  const getStatusBadge = () => {
    if (isLive) {
      return <Badge variant="live">LIVE {match.minute && `'${match.minute}`}</Badge>;
    }
    if (isFinished) {
      return <Badge variant="default">FT</Badge>;
    }
    if (match.status === "PAUSED") {
      return <Badge variant="warning">HT</Badge>;
    }
    if (match.status === "POSTPONED") {
      return <Badge variant="danger">PPD</Badge>;
    }
    return <Badge variant="secondary">{formatTime(match.date)}</Badge>;
  };

  const getScoreDisplay = () => {
    if (isScheduled) {
      return (
        <div className="text-3xl font-bold text-muted-foreground">
          vs
        </div>
      );
    }

    const homeGoals = match.homeTeam.goals ?? 0;
    const awayGoals = match.awayTeam.goals ?? 0;

    return (
      <div className="flex items-center gap-3">
        <div className={cn(
          "text-3xl md:text-4xl font-black tabular-nums",
          match.homeTeam.winner === true && "text-fifa-cyan",
          match.homeTeam.winner === false && "text-muted-foreground"
        )}>
          {homeGoals}
        </div>
        <div className="text-xl text-muted-foreground font-medium">-</div>
        <div className={cn(
          "text-3xl md:text-4xl font-black tabular-nums",
          match.awayTeam.winner === true && "text-fifa-cyan",
          match.awayTeam.winner === false && "text-muted-foreground"
        )}>
          {awayGoals}
        </div>
      </div>
    );
  };

  if (variant === "compact") {
    return (
      <Link href={`/live-scores/${match.id}`}>
        <Card className="p-3 hover:border-fifa-cyan/50 transition-all" hover>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Image
                src={match.homeTeam.team.logo}
                alt={match.homeTeam.team.name}
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-sm font-medium truncate">
                {match.homeTeam.team.shortName}
              </span>
            </div>
            
            {getScoreDisplay()}
            
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
              <span className="text-sm font-medium truncate">
                {match.awayTeam.team.shortName}
              </span>
              <Image
                src={match.awayTeam.team.logo}
                alt={match.awayTeam.team.name}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center">
            {getStatusBadge()}
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/live-scores/${match.id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300",
          isLive && "border-red-500/50 animate-pulse-glow",
          "hover:border-fifa-cyan/50"
        )} 
        hover
      >
        {/* Header */}
        <div className="px-4 py-2 bg-muted/30 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={match.competition.emblem}
              alt={match.competition.name}
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-xs font-medium text-muted-foreground">
              {match.competition.name}
            </span>
          </div>
          {getStatusBadge()}
        </div>

        {/* Teams & Score */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <div className="relative mx-auto mb-3">
                <Image
                  src={match.homeTeam.team.logo}
                  alt={match.homeTeam.team.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
                {match.homeTeam.winner === true && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-fifa-gold rounded-full flex items-center justify-center">
                    <span className="text-[10px]">🏆</span>
                  </div>
                )}
              </div>
              <h4 className="font-bold text-sm md:text-base truncate">
                {match.homeTeam.team.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {match.homeTeam.team.country}
              </p>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              {getScoreDisplay()}
              {match.score?.halftime && !isScheduled && (
                <p className="text-xs text-muted-foreground mt-2">
                  HT: {match.score.halftime.home} - {match.score.halftime.away}
                </p>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <div className="relative mx-auto mb-3">
                <Image
                  src={match.awayTeam.team.logo}
                  alt={match.awayTeam.team.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
                {match.awayTeam.winner === true && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-fifa-gold rounded-full flex items-center justify-center">
                    <span className="text-[10px]">🏆</span>
                  </div>
                )}
              </div>
              <h4 className="font-bold text-sm md:text-base truncate">
                {match.awayTeam.team.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {match.awayTeam.team.country}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        {(showVenue || showDate) && (
          <div className="px-4 py-3 bg-muted/30 border-t border-border flex items-center justify-center gap-4 text-xs text-muted-foreground">
            {showDate && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDate(match.date)}</span>
              </div>
            )}
            {showVenue && match.venue && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{match.venue}, {match.city}</span>
              </div>
            )}
          </div>
        )}
      </Card>
    </Link>
  );
}
