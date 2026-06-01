import type { PortableTextBlock } from "next-sanity";

export interface ArticleHeading {
  id: string;
  level: "h2" | "h3";
  title: string;
}

export function getArticleHeadingId(key?: string): string | undefined {
  return key ? `article-heading-${key}` : undefined;
}

export function getArticleHeadings(
  value?: PortableTextBlock[]
): ArticleHeading[] {
  if (!value) {
    return [];
  }

  return value.flatMap((block) => {
    if (
      block._type !== "block" ||
      (block.style !== "h2" && block.style !== "h3")
    ) {
      return [];
    }

    const id = getArticleHeadingId(block._key);
    const title = block.children
      .map((child) => ("text" in child ? child.text : ""))
      .join("")
      .trim();

    return id && title
      ? [
          {
            id,
            level: block.style,
            title,
          },
        ]
      : [];
  });
}
