"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "gold";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-fifa-cyan text-black hover:bg-fifa-cyan-light focus:ring-fifa-cyan shadow-glow",
      secondary: "bg-fifa-blue text-white hover:bg-fifa-blue-light focus:ring-fifa-blue",
      outline: "border-2 border-fifa-cyan text-fifa-cyan hover:bg-fifa-cyan/10 focus:ring-fifa-cyan",
      ghost: "text-gray-400 hover:text-white hover:bg-white/5 focus:ring-gray-500",
      destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      gold: "bg-fifa-gold text-black hover:bg-fifa-gold-light focus:ring-fifa-gold shadow-gold",
    };
    
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-5 text-base",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
