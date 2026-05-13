import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
type CardVariant = "white" | "blue-light" | "green-light" | "pink-light" | "yellow-light";

interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
}

// ─── Styles ───────────────────────────────────────────────────
const variants: Record<CardVariant, string> = {
  white: "bg-white border border-gray-100 shadow-sm",
  "blue-light": "bg-[#E2F2FF]",
  "green-light": "bg-[#A0FF88]",
  "pink-light": "bg-[#FAD3FF]",
  "yellow-light": "bg-[#FFE072]",
};

// ─── Component ────────────────────────────────────────────────
export function Card({ variant = "white", children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] p-6",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
