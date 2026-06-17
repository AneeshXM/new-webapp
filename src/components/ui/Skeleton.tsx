"use client";

import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "shimmer rounded-md bg-muted",
        className
      )}
    />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full max-w-[120px]" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-10" />
          <Skeleton className="h-6 w-4" />
          <Skeleton className="h-8 w-10" />
        </div>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="space-y-2 flex-1 items-end flex flex-col">
            <Skeleton className="h-4 w-full max-w-[120px]" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function StandingsRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 animate-pulse">
      <Skeleton className="h-6 w-6" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-32" />
      <div className="flex-1" />
      <Skeleton className="h-4 w-8" />
      <Skeleton className="h-4 w-8" />
      <Skeleton className="h-4 w-8" />
      <Skeleton className="h-4 w-8" />
      <Skeleton className="h-4 w-8" />
      <Skeleton className="h-4 w-8" />
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
      <div className="flex flex-col items-center">
        <Skeleton className="h-20 w-20 rounded-full mb-4" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function TopScorerSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 px-4 animate-pulse">
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-12" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[600px] animate-pulse">
      <Skeleton className="absolute inset-0 rounded-2xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
        <Skeleton className="h-16 w-80 mb-6" />
        <Skeleton className="h-8 w-96 mb-4" />
        <Skeleton className="h-12 w-48" />
      </div>
    </div>
  );
}
