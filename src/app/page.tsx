import { Suspense } from "react";
import { Hero } from "@/components/features/hero/Hero";
import { LiveScoresSection } from "@/components/features/live-scores/LiveScoresSection";
import { NewsSection } from "@/components/features/news/NewsSection";
import { StandingsTable } from "@/components/features/standings/StandingsTable";
import { TopScorers } from "@/components/features/standings/TopScorers";
import { footballApi } from "@/lib/api/football-api";
import { newsApi } from "@/lib/api/news-api";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch data in parallel
  const [matches, standings, scorers, news] = await Promise.all([
    footballApi.getMatches({ limit: 6 }).catch(() => []),
    footballApi.getStandings().catch(() => []),
    footballApi.getTopScorers().catch(() => []),
    newsApi.searchNews({ query: "FIFA World Cup 2026" }).catch(() => ({ articles: [] })),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <Hero />
        </div>
      </section>

      {/* Live Scores Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={null}>
            <LiveScoresSection initialMatches={matches} limit={6} />
          </Suspense>
        </div>
      </section>

      {/* Standings Section */}
      {standings.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Group Standings */}
              <div className="lg:col-span-2">
                <StandingsTable standings={standings[0]} />
              </div>

              {/* Top Scorers */}
              <div>
                <TopScorers scorers={scorers} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={null}>
            <NewsSection articles={news.articles} title="Latest World Cup News" />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative py-16 px-8 rounded-3xl overflow-hidden bg-gradient-to-br from-fifa-blue-dark via-fifa-blue to-fifa-cyan-dark">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }} />
            </div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated with World Cup 2026
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Get real-time scores, detailed standings, and breaking news from the tournament. 
                Follow your favorite teams and never miss a moment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/live-scores"
                  className="px-8 py-4 bg-white text-fifa-blue-dark font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View Live Scores
                </a>
                <a
                  href="/standings"
                  className="px-8 py-4 bg-fifa-gold text-black font-bold rounded-lg hover:bg-fifa-gold-light transition-colors"
                >
                  Check Standings
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
