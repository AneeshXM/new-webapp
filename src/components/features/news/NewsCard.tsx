"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, User, ExternalLink, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn, getRelativeTime } from "@/lib/utils/cn";
import type { NewsArticle } from "@/types";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "horizontal" | "compact";
  featured?: boolean;
}

export function NewsCard({ article, variant = "default", featured = false }: NewsCardProps) {
  const formattedDate = getRelativeTime(article.publishedAt);

  if (variant === "horizontal") {
    return (
      <Link href={`/news/${article.id}`}>
        <Card className="overflow-hidden hover:border-fifa-cyan/50 transition-all group flex" hover>
          {/* Image */}
          {article.image && (
            <div className="relative w-48 h-32 sm:h-auto shrink-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 192px, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card opacity-50" />
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              {article.category && (
                <Badge variant="primary" size="sm" className="mb-2">
                  {article.category}
                </Badge>
              )}
              <h3 className="font-bold line-clamp-2 group-hover:text-fifa-cyan transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {article.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-medium">{article.source.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/news/${article.id}`}>
        <div className="flex gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors group">
          {article.image && (
            <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-fifa-cyan transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>{article.source.name}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/news/${article.id}`}>
      <Card className={cn(
        "overflow-hidden hover:border-fifa-cyan/50 transition-all group",
        featured && "md:col-span-2 md:row-span-2"
      )} hover>
        {/* Image */}
        <div className={cn(
          "relative overflow-hidden",
          featured ? "h-64 md:h-full" : "h-48"
        )}>
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-fifa-blue-dark to-fifa-cyan/20 flex items-center justify-center">
              <span className="text-6xl opacity-20">⚽</span>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          {article.category && (
            <div className="absolute top-4 left-4">
              <Badge variant="gold" size="sm">
                {article.category}
              </Badge>
            </div>
          )}

          {/* Featured Label */}
          {featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="primary" size="sm">
                Featured
              </Badge>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className={cn(
              "font-bold text-white line-clamp-2 group-hover:text-fifa-cyan transition-colors",
              featured ? "text-xl md:text-2xl" : "text-lg"
            )}>
              {article.title}
            </h3>
            {featured && (
              <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                {article.description}
              </p>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="p-4 bg-card">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="truncate max-w-[120px]">{article.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>{article.source.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
