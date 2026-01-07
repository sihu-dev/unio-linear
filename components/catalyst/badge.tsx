import * as React from "react";
import { clsx } from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full font-medium transition-colors";

  const variants = {
    default: "bg-white/8 text-white border border-white/12",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-[#5E6AD2]/10 text-[#6B77E0] border border-[#5E6AD2]/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      style={{
        letterSpacing: "-0.13px",
        fontWeight: 510,
        borderWidth: "0.8px",
      }}
      {...props}
    >
      {children}
    </span>
  );
}
