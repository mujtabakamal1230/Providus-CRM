import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

// ─── Styles ───────────────────────────────────────────────────
const base =
  "inline-flex items-center justify-center font-body font-semibold rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1D70C5] text-white hover:bg-[#1559A0] focus-visible:outline-[#1D70C5]",
  secondary:
    "bg-[#A0FF88] text-[#1D3D0C] hover:bg-[#85e86e] focus-visible:outline-[#38A81B]",
  ghost:
    "bg-transparent text-[#1D70C5] hover:bg-[#E2F2FF] focus-visible:outline-[#1D70C5]",
  outline:
    "bg-transparent border-2 border-[#1D70C5] text-[#1D70C5] hover:bg-[#E2F2FF] focus-visible:outline-[#1D70C5]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-p3 px-4 py-2",
  md: "text-p3 px-6 py-3",
  lg: "text-p2 px-8 py-4",
};

// ─── Component ────────────────────────────────────────────────
export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
