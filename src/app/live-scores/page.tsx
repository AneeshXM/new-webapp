import { Metadata } from "next";
import { LiveScoresSection } from "@/components/features/live-scores/LiveScoresSection";
import { footballApi } from "@/lib/api/football-api";

export const metadata: Metadata = {
  title: "Live Scores | FIFA World Cup 2026",
  description: "Watch live scores and match updates from FIFA World Cup 2026. Follow every match in real-time.",
};

export const revalidate = 30; // Revalidate every 30 seconds for live scores

export default async function LiveScoresPage() {
  const matches = await footballApi.getMatches().catch(() => []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-fifa-cyan">Live</span>{" "}
            <span className="text-white">Scores</span>
          </h1>
          <p className="text-muted-foreground">
            Follow every match in real-time. Auto-refreshes every 60 seconds.
          </p>
        </div>

        {/* Live Scores Section */}
        <LiveScoresSection 
          initialMatches={matches}
          showFilters={true}
          showRefresh={true}
          limit={20}
        />
      </div>
    </div>
  );
}
