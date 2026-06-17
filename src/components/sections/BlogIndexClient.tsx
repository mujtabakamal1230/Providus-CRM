"use client";

import { useMemo, useState } from "react";
import { BlogSection, type BlogCardItem } from "./BlogSection";

interface BlogIndexClientProps {
  posts: BlogCardItem[];
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.date.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch);

      return matchesSearch;
    });
  }, [posts, searchQuery]);

  return (
    <BlogSection
      posts={filteredPosts}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
}
