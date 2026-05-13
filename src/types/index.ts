import type { ReactNode } from "react";

// ─── Common ────────────────────────────────────────────────────
export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface WithChildrenAndClassName extends WithChildren, WithClassName {}

// ─── Navigation ────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

// ─── Section ───────────────────────────────────────────────────
export type SectionBackground =
  | "white"
  | "blue-light"
  | "green-light"
  | "pink-light"
  | "yellow-light"
  | "blue";

export interface SectionProps extends WithClassName {
  children: ReactNode;
  background?: SectionBackground;
  id?: string;
}
