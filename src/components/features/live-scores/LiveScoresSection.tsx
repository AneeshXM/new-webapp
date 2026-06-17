"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MatchCard } from "./MatchCard";
import { MatchCardSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";
import type { Match, MatchFilter } from "@/types";

interface LiveScoresSectionProps {
  initialMatches?: Match[];
  showFilters?: boolean;
  showRefresh?: boolean;
  limit?: number;
}

export function LiveScoresSection({ 
  initialMatches, 
  showFilters = true, 
  showRefresh = true,
  limit = 6 
}: LiveScoresSectionProps) {
  const [matches, setMatches] = useState<Match[]>(initialMatches || []);
  const [loading, setLoading] = useState(!initialMatches);
  const [filter, setFilter] = useState<MatchFilter>("all");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMatches = useCallback(async (type: string = "all") => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/scores?type=${type}`);
      const data = await response.json();
      if (data.success) {
        setMatches(data.data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!initialMatches) {
      fetchMatches(filter);
    }
  }, [filter, fetchMatches, initialMatches]);

  // Auto refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMatches(filter);
    }, 60000);

    return () => clearInterval(interval);
  }, [filter, fetchMatches]);

  const filteredMatches = matches
    .filter((match) => {
      switch (filter) {
        case "live":
          return match.status === "LIVE" || 
                 match.status === "IN_PLAY" || 
                 match.status === "PAUSED";
        case "completed":
          return match.status === "FINISHED" ||
                 match.status === "FINISHED_AFTER_EXTRA_TIME" ||
                 match.status === "FINISHED_AFTER_PENALTIES";
        case "upcoming":
          return match.status === "SCHEDULED";
        default:
          return true;
      }
    })
    .slice(0, limit);

  const filters: { value: MatchFilter; label: string; count?: number }[] = [
    { value: "all", label: "All Matches" },
    { value: "live", label: "Live", count: matches.filter(m => m.status === "LIVE" || m.status === "IN_PLAY").length },
    { value: "completed", label: "Finished" },
    { value: "upcoming", label: "Upcoming" },
  ];

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <Zap className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold">Live Scores</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10">
            <Zap className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold">Live Scores</h2>
          {lastUpdate && (
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showFilters && (
            <div className="flex items-center bg-muted rounded-lg p-1">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                    filter === f.value
                      ? "bg-fifa-cyan text-black"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                  {f.count !== undefined && f.count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                      {f.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {showRefresh && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fetchMatches(filter)}
              disabled={isRefreshing}
              aria-label="Refresh scores"
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
          )}
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No matches found</h3>
          <p className="text-sm text-muted-foreground">
            {filter === "live"
              ? "There are no live matches at the moment."
              : filter === "upcoming"
              ? "No upcoming matches scheduled."
              : "Check back later for match updates."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </section>
  );
}
