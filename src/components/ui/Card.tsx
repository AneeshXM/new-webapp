"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow" | "glass" | "elevated";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-card border border-border",
      glow: "bg-card border border-fifa-cyan/30 shadow-glow",
      glass: "glass",
      elevated: "bg-card border border-border shadow-lg hover:shadow-xl transition-shadow",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden",
          variants[variant],
          hover && "card-hover cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-4 py-3 border-b border-border", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-bold text-foreground", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 py-4", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-4 py-3 border-t border-border bg-muted/30", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
