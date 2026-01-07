import * as React from "react";
import { clsx } from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "ghost";
  interactive?: boolean;
}

export function Card({
  className,
  variant = "default",
  interactive = false,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-xl transition-all duration-200 ease-linear-expo";

  const variants = {
    default: "bg-white/[0.03] border border-white/8",
    elevated: "bg-white/[0.05] border border-white/10 shadow-lg",
    ghost: "bg-transparent border border-white/6",
  };

  const interactiveStyles = interactive
    ? "hover:bg-white/[0.06] hover:border-white/12 cursor-pointer hover:shadow-lg hover:scale-[1.01]"
    : "";

  return (
    <div
      className={clsx(baseStyles, variants[variant], interactiveStyles, className)}
      style={{
        borderWidth: "0.8px",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={clsx("px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={clsx("px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx("px-6 py-4 border-t border-white/8", className)}
      style={{ borderWidth: "0.8px" }}
      {...props}
    >
      {children}
    </div>
  );
}
