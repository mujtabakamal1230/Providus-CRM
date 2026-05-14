import React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Heading ──────────────────────────────────────────────────
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  as?: HeadingLevel;
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const headingClasses: Record<HeadingLevel, string> = {
  h1: "typography-h1",
  h2: "typography-h2",
  h3: "typography-h3",
  h4: "typography-h4",
};

export function Heading({
  as,
  level,
  children,
  className,
  style,
}: HeadingProps) {
  const resolvedLevel = as ?? level ?? "h2";
  const Tag = resolvedLevel;

  return (
    <Tag className={cn(headingClasses[resolvedLevel], className)} style={style}>
      {children}
    </Tag>
  );
}

// ─── Text ─────────────────────────────────────────────────────
type TextVariant = "p1" | "p2" | "p3" | "p4";
type TextTag = "p" | "span" | "div" | "li" | "label";

interface TextProps {
  variant?: TextVariant;
  as?: TextTag;
  children: ReactNode;
  className?: string;
}

const textClasses: Record<TextVariant, string> = {
  p1: "typography-p1",
  p2: "typography-p2",
  p3: "typography-p3",
  p4: "typography-p4",
};

export function Text({
  variant = "p2",
  as: Tag = "p",
  children,
  className,
}: TextProps) {
  return (
    <Tag className={cn(textClasses[variant], className)}>
      {children}
    </Tag>
  );
}
