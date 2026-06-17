import { Metadata } from "next";
import { TeamCard } from "@/components/features/teams/TeamCard";
import { footballApi } from "@/lib/api/football-api";
import type { Team } from "@/types";

export const metadata: Metadata = {
  title: "Teams | FIFA World Cup 2026",
  description: "Explore all 48 teams participating in FIFA World Cup 2026. View squad information, statistics, and fixtures.",
};

export const revalidate = 300;

export default async function TeamsPage() {
  const teams = await footballApi.getTeams().catch(() => [] as Team[]);

  // Group teams by their first letter for alphabetical listing
  const groupedTeams = teams.reduce<Record<string, Team[]>>((acc, team) => {
    const letter = team.name[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(team);
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedTeams).sort();

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-fifa-cyan">World Cup</span>{" "}
            <span className="text-white">Teams</span>
          </h1>
          <p className="text-muted-foreground">
            Meet all 48 teams competing for glory at the 2026 FIFA World Cup.
          </p>
        </div>

        {/* Teams Grid */}
        {teams.length > 0 ? (
          <div className="space-y-12">
            {sortedLetters.map((letter) => (
              <div key={letter}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
                  <span className="text-fifa-cyan">{letter}</span>
                  <span className="flex-1 h-px bg-border" />
                  <span className="text-sm font-normal text-muted-foreground">
                    {groupedTeams[letter].length} teams
                  </span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {groupedTeams[letter].map((team) => (
                    <TeamCard key={team.id} team={team} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-card rounded-xl border border-border animate-pulse"
              />
            ))}
          </div>
        )}

        {/* World Cup Stats */}
        <div className="mt-16 p-8 bg-gradient-to-br from-fifa-blue-dark to-fifa-blue rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">World Cup Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Teams", value: "48" },
              { label: "Host Countries", value: "3" },
              { label: "Venues", value: "16" },
              { label: "First World Cup", value: "1930" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-fifa-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
