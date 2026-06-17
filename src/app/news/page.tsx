import { Metadata } from "next";
import { NewsSection } from "@/components/features/news/NewsSection";
import { newsApi } from "@/lib/api/news-api";

export const metadata: Metadata = {
  title: "News | FIFA World Cup 2026",
  description: "Get the latest football news and updates from FIFA World Cup 2026. Match reports, analysis, and features.",
};

export const revalidate = 300;

export default async function NewsPage() {
  const news = await newsApi.searchNews({ 
    query: "FIFA World Cup 2026",
    page: 1 
  }).catch(() => ({ articles: [], pagination: null, totalResults: 0 }));

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-fifa-cyan">Football</span>{" "}
            <span className="text-white">News</span>
          </h1>
          <p className="text-muted-foreground">
            The latest news, match reports, and analysis from the World Cup.
          </p>
        </div>

        {/* News Section */}
        <NewsSection 
          articles={news.articles}
          showSearch={true}
          showFilters={true}
          title=""
        />

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 bg-card rounded-2xl border border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Never Miss an Update</h3>
              <p className="text-muted-foreground">
                Subscribe to get the latest World Cup news delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fifa-cyan"
              />
              <button className="h-12 px-6 bg-fifa-cyan text-black font-bold rounded-lg hover:bg-fifa-cyan-light transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
