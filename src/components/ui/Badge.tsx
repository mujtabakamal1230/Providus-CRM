import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
type BadgeVariant = "blue" | "green" | "pink" | "yellow";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

// ─── Styles ───────────────────────────────────────────────────
const variants: Record<BadgeVariant, string> = {
  blue: "bg-[#E2F2FF] text-[#1D70C5]",
  green: "bg-[#A0FF88] text-[#1D3D0C]",
  pink: "bg-[#FAD3FF] text-[#6B0080]",
  yellow: "bg-[#FFE072] text-[#4A3500]",
};

// ─── Component ────────────────────────────────────────────────
export function Badge({
  variant = "blue",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-p4 font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
