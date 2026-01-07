import * as React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-linear-expo disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#5E6AD2] text-white hover:bg-[#4F5BC3] active:bg-[#4052B8] shadow-sm",
    secondary:
      "bg-white/5 text-white hover:bg-white/8 active:bg-white/10 border border-white/8",
    outline:
      "bg-transparent text-white hover:bg-white/5 border border-white/8 hover:border-white/12",
    ghost: "bg-transparent text-white hover:bg-white/5 active:bg-white/8",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      style={{
        letterSpacing: "-0.13px",
        fontWeight: 510,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
