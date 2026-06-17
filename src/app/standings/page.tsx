import { Metadata } from "next";
import { StandingsTable } from "@/components/features/standings/StandingsTable";
import { TopScorers } from "@/components/features/standings/TopScorers";
import { footballApi } from "@/lib/api/football-api";

export const metadata: Metadata = {
  title: "Standings | FIFA World Cup 2026",
  description: "View group standings and statistics from FIFA World Cup 2026. Track your team's progress through the tournament.",
};

export const revalidate = 60;

export default async function StandingsPage() {
  const [standings, scorers] = await Promise.all([
    footballApi.getStandings().catch(() => []),
    footballApi.getTopScorers().catch(() => []),
  ]);

  // Extract unique groups from standings
  const groups = standings.flatMap(s => 
    s.standings.map(group => ({
      name: group.stage,
      group: group.group,
    }))
  ).filter((g, i, arr) => arr.findIndex(x => x.name === g.name) === i);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-fifa-gold">Group</span>{" "}
            <span className="text-white">Standings</span>
          </h1>
          <p className="text-muted-foreground">
            Follow the group stage standings and see which teams are progressing to the knockout rounds.
          </p>
        </div>

        {/* Standings and Top Scorers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Standings */}
          <div className="lg:col-span-2 space-y-8">
            {standings.length > 0 ? (
              standings.map((standing, index) => (
                <div key={index}>
                  <StandingsTable standings={standing} />
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">
                  Standings data will be available when the tournament begins.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Top Scorers */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TopScorers scorers={scorers} />

              {/* Quick Stats */}
              <div className="mt-6 p-6 bg-card rounded-xl border border-border">
                <h3 className="font-bold mb-4">Tournament Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Matches Played</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Goals Scored</span>
                    <span className="font-bold text-fifa-gold">72</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Goals/Match</span>
                    <span className="font-bold">3.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Yellow Cards</span>
                    <span className="font-bold text-yellow-500">48</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Red Cards</span>
                    <span className="font-bold text-red-500">2</span>
                  </div>
                </div>
              </div>

              {/* Qualification Info */}
              <div className="mt-6 p-6 bg-fifa-cyan/10 rounded-xl border border-fifa-cyan/30">
                <h3 className="font-bold mb-3 text-fifa-cyan">Qualification</h3>
                <p className="text-sm text-muted-foreground">
                  Top 2 teams from each group automatically qualify for the Round of 16.
                  The 4 best third-placed teams also advance to the knockout stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
