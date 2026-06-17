"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "gold" | "live";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      primary: "bg-fifa-cyan/20 text-fifa-cyan border-fifa-cyan/30",
      secondary: "bg-fifa-blue/20 text-fifa-blue border-fifa-blue/30",
      success: "bg-green-500/20 text-green-500 border-green-500/30",
      warning: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      danger: "bg-red-500/20 text-red-500 border-red-500/30",
      gold: "bg-fifa-gold/20 text-fifa-gold border-fifa-gold/30",
      live: "bg-red-500/20 text-red-500 border-red-500/30 animate-pulse",
    };

    const sizes = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-3 py-1",
      lg: "text-base px-4 py-1.5",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-semibold rounded-full border",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {variant === "live" && (
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
