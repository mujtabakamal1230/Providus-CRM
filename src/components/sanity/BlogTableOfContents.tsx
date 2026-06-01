"use client";

import { useEffect, useState } from "react";
import type { ArticleHeading } from "@/lib/portableText";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Typography";

interface BlogTableOfContentsProps {
  headings: ArticleHeading[];
}

export function BlogTableOfContents({
  headings,
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Article sections">
      <Text variant="p2" className="font-bold! text-black">
        In this blog
      </Text>
      <ul className="mt-4 flex flex-col">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block border-l-2 py-2 pl-4 text-p4 transition-colors",
                  heading.level === "h3" && "pl-6",
                  isActive
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-[#3D3D3D] hover:border-brand-blue-light hover:text-brand-blue"
                )}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
