import { cn } from "@/lib/utils";
import type { SectionProps, SectionBackground } from "@/types";

// ─── Background Map ───────────────────────────────────────────
const backgroundClasses: Record<SectionBackground, string> = {
  white: "bg-white",
  "blue-light": "bg-[#E2F2FF]",
  "green-light": "bg-[#A0FF88]",
  "pink-light": "bg-[#FAD3FF]",
  "yellow-light": "bg-[#FFE072]",
  blue: "bg-[#1D70C5]",
};

// ─── Component ────────────────────────────────────────────────
export function Section({
  children,
  background = "white",
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
}
