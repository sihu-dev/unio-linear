import * as React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, fullWidth, ...props }, ref) => {
    const baseStyles =
      "rounded-lg bg-white/[0.03] border border-white/8 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]/50 focus:border-[#5E6AD2] transition-all duration-200";

    const errorStyles = error
      ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
      : "";

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <input
        ref={ref}
        className={clsx(baseStyles, errorStyles, widthStyles, className)}
        style={{
          borderWidth: "0.8px",
          letterSpacing: "-0.13px",
          fontWeight: 400,
        }}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
