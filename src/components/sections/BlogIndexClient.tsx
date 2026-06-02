"use client";

import { useMemo, useState } from "react";
import { HeroSection } from "./HeroSection";
import { BlogSection, type BlogCardItem } from "./BlogSection";

interface BlogIndexClientProps {
  posts: BlogCardItem[];
  categories: string[];
}

export function BlogIndexClient({ posts, categories }: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryOptions = ["All", ...categories];

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.categories.includes(activeCategory);
      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.date.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, searchQuery]);

  const heroTitle = (
    <>
      Insights And Impact
      <img
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        className="inline-block h-[0.7em] w-auto align-baseline ml-1"
      />
    </>
  );

  return (
    <>
      <HeroSection
        title={heroTitle}
        hideImage
        // categories={categoryOptions}
        // activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogSection
        posts={filteredPosts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </>
  );
}
