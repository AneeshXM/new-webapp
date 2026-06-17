"use client";

import { useState } from "react";
import { Newspaper, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { NewsCard } from "./NewsCard";
import { NewsCardSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";
import type { NewsArticle } from "@/types";

interface NewsSectionProps {
  articles: NewsArticle[];
  isLoading?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  title?: string;
}

const categories = [
  { value: "all", label: "All" },
  { value: "World Cup", label: "World Cup" },
  { value: "Teams", label: "Teams" },
  { value: "Match Preview", label: "Match Preview" },
  { value: "Analysis", label: "Analysis" },
  { value: "Features", label: "Features" },
];

export function NewsSection({ 
  articles, 
  isLoading,
  showSearch = true,
  showFilters = true,
  title = "Latest News"
}: NewsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
      article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-fifa-cyan/10">
            <Newspaper className="h-6 w-6 text-fifa-cyan" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-fifa-cyan/10">
            <Newspaper className="h-6 w-6 text-fifa-cyan" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fifa-cyan focus:border-transparent transition-all"
              />
            </div>
          )}

          {showFilters && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all",
                    selectedCategory === category.value
                      ? "bg-fifa-cyan text-black"
                      : "bg-card border border-border hover:bg-muted"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* News Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No articles found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={article} 
              featured={index === 0 && !searchQuery && selectedCategory === "all"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
