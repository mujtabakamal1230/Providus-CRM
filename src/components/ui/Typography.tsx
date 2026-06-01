import React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Heading ──────────────────────────────────────────────────
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  level?: HeadingLevel;
  children?: ReactNode;
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
  ...props
}: HeadingProps) {
  const semanticLevel = as ?? level ?? "h2";
  const visualLevel = level ?? semanticLevel;
  const Tag = semanticLevel;

  return (
    <Tag className={cn(headingClasses[visualLevel], className)} {...props}>
      {children}
    </Tag>
  );
}

// ─── Text ─────────────────────────────────────────────────────
type TextVariant = "p1" | "p2" | "p3" | "p4";
type TextTag = "p" | "span" | "div" | "li" | "label";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: TextTag;
  children?: ReactNode;
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
  ...props
}: TextProps) {
  return (
    <Tag className={cn(textClasses[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
