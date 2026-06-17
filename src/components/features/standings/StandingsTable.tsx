"use client";

import Image from "next/image";
import Link from "next/link";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import type { Standing, TableEntry } from "@/types";

interface StandingsTableProps {
  standings: Standing;
  groupName?: string;
}

export function StandingsTable({ standings, groupName }: StandingsTableProps) {
  const currentStanding = standings.standings.find(s => s.group === groupName) || standings.standings[0];
  
  if (!currentStanding) return null;

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="bg-muted/50 rounded-t-xl px-4 py-3 border border-border">
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-fifa-gold" />
          <h3 className="font-bold">{currentStanding.stage}</h3>
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-semibold w-12">#</th>
                <th className="px-4 py-3 text-left font-semibold">Team</th>
                <th className="px-4 py-3 text-center font-semibold w-16">P</th>
                <th className="px-4 py-3 text-center font-semibold w-16 hidden sm:table-cell">W</th>
                <th className="px-4 py-3 text-center font-semibold w-16 hidden sm:table-cell">D</th>
                <th className="px-4 py-3 text-center font-semibold w-16 hidden sm:table-cell">L</th>
                <th className="px-4 py-3 text-center font-semibold w-16">GF</th>
                <th className="px-4 py-3 text-center font-semibold w-16">GA</th>
                <th className="px-4 py-3 text-center font-semibold w-16">GD</th>
                <th className="px-4 py-3 text-center font-semibold w-16">Pts</th>
                <th className="px-4 py-3 text-center font-semibold w-20 hidden md:table-cell">Form</th>
              </tr>
            </thead>
            <tbody>
              {currentStanding.table.map((entry) => (
                <TableRow key={entry.team.id} entry={entry} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center justify-end gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-fifa-gold/20 border border-fifa-gold/50" />
          <span>Qualification</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-fifa-cyan/20 border border-fifa-cyan/50" />
          <span>Playoff</span>
        </div>
      </div>
    </div>
  );
}

interface TableRowProps {
  entry: TableEntry;
}

function TableRow({ entry }: TableRowProps) {
  const isTopTwo = entry.position <= 2;
  const isPlayoff = entry.position <= 4;

  return (
    <tr className={cn(
      "border-b border-border/50 hover:bg-muted/20 transition-colors",
      isTopTwo && "bg-fifa-gold/5",
      isPlayoff && !isTopTwo && "bg-fifa-cyan/5"
    )}>
      {/* Position */}
      <td className="px-4 py-4">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
          isTopTwo ? "bg-fifa-gold text-black" : isPlayoff ? "bg-fifa-cyan text-black" : "bg-muted text-muted-foreground"
        )}>
          {entry.position}
        </div>
      </td>

      {/* Team */}
      <td className="px-4 py-4">
        <Link href={`/teams/${entry.team.id}`} className="flex items-center gap-3 group">
          <Image
            src={entry.team.logo}
            alt={entry.team.name}
            width={32}
            height={32}
            className="object-contain"
          />
          <div>
            <span className="font-semibold group-hover:text-fifa-cyan transition-colors">
              {entry.team.name}
            </span>
            <span className="hidden lg:block text-xs text-muted-foreground">
              {entry.team.code}
            </span>
          </div>
        </Link>
      </td>

      {/* Played */}
      <td className="px-4 py-4 text-center font-medium">
        {entry.playedGames}
      </td>

      {/* Won */}
      <td className="px-4 py-4 text-center text-green-500 hidden sm:table-cell">
        {entry.won}
      </td>

      {/* Draw */}
      <td className="px-4 py-4 text-center text-yellow-500 hidden sm:table-cell">
        {entry.draw}
      </td>

      {/* Lost */}
      <td className="px-4 py-4 text-center text-red-500 hidden sm:table-cell">
        {entry.lost}
      </td>

      {/* Goals For */}
      <td className="px-4 py-4 text-center font-medium">
        {entry.goalsFor}
      </td>

      {/* Goals Against */}
      <td className="px-4 py-4 text-center font-medium">
        {entry.goalsAgainst}
      </td>

      {/* Goal Difference */}
      <td className={cn(
        "px-4 py-4 text-center font-bold",
        entry.goalDifference > 0 ? "text-green-500" : entry.goalDifference < 0 ? "text-red-500" : "text-muted-foreground"
      )}>
        {entry.goalDifference > 0 ? "+" : ""}{entry.goalDifference}
      </td>

      {/* Points */}
      <td className="px-4 py-4 text-center">
        <span className={cn(
          "px-3 py-1 rounded-full font-bold",
          isTopTwo ? "bg-fifa-gold text-black" : "bg-muted"
        )}>
          {entry.points}
        </span>
      </td>

      {/* Form */}
      <td className="px-4 py-4 hidden md:table-cell">
        <div className="flex items-center justify-center gap-1">
          {entry.form.split("").map((result, i) => (
            <span
              key={i}
              className={cn(
                "w-6 h-6 rounded text-xs font-bold flex items-center justify-center",
                result === "W" ? "bg-green-500/20 text-green-500" :
                result === "D" ? "bg-yellow-500/20 text-yellow-500" :
                "bg-red-500/20 text-red-500"
              )}
            >
              {result}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}
