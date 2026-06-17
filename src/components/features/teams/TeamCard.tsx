"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import type { Team } from "@/types";

interface TeamCardProps {
  team: Team;
  variant?: "default" | "compact";
}

export function TeamCard({ team, variant = "default" }: TeamCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/teams/${team.id}`}>
        <Card className="p-4 flex items-center gap-4 hover:border-fifa-cyan/50 transition-all" hover>
          <Image
            src={team.logo}
            alt={team.name}
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold truncate">{team.name}</h4>
            <p className="text-sm text-muted-foreground">{team.country}</p>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="overflow-hidden hover:border-fifa-cyan/50 transition-all group" hover>
        {/* Header with Flag/Logo */}
        <div className="relative h-32 bg-gradient-to-br from-fifa-blue-dark to-fifa-blue flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }} />
          </div>
          <div className="relative transform group-hover:scale-110 transition-transform duration-500">
            <Image
              src={team.logo}
              alt={team.name}
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
            />
          </div>
          {/* Country Badge */}
          {team.country && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-semibold bg-white/10 backdrop-blur-sm rounded-full text-white/80">
                {team.country}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-1 group-hover:text-fifa-cyan transition-colors">
            {team.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {team.shortName || team.code}
          </p>
          {team.founded && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Founded in {team.founded}
              </p>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-fifa-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
    </Link>
  );
}
