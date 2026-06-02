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
      <svg
        width="65"
        height="34"
        viewBox="0 0 65 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block ml-4 align-middle"
        aria-hidden="true"
      >
        <path
          d="M10 29C20 29 23 5 37 5"
          stroke="#38A81B"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M28 29C38 29 41 5 55 5"
          stroke="#A0FF88"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
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
