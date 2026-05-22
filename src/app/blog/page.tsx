"use client";

import { useState } from "react";
import {
  HeroSection,
  BlogSection,
  CtaSection
} from "@/components/sections";

const categories = [
  "All",
  "Blog",
  "CRM Clouds Blogs",
  "Platforms Blogs",
  "Non Profits Blogs",
  "Industry News",
  "Product Blogs"
];

const allBlogPosts = [
  {
    title: "How Nonprofits Can Build the Right Team for a Digital Future?",
    date: "April 27, 2026",
    image: "/images/non-profit.png",
    categories: ["Blog", "Non Profits Blogs"]
  },
  {
    title: "Employee benefits benchmarking UK & Ireland: See How Your Package Compares [Free Tool]",
    date: "March 5, 2026",
    image: "/images/platform-experties.png",
    categories: ["Blog", "Industry News"]
  },
  {
    title: "How to Choose a Benefits Broker: The Ultimate 5 Step Guide",
    date: "March 12, 2026",
    image: "/images/case-study.png",
    categories: ["Blog", "Product Blogs"]
  },
  {
    title: "5 Rippl Alternatives Worth Considering for Your People Team",
    date: "January 19, 2026",
    image: "/images/commerce-cloud.png",
    categories: ["Blog", "Platforms Blogs"]
  },
  {
    title: "Top 5 Zoet Benefits Alternatives in 2026 Compared",
    date: "January 19, 2026",
    image: "/images/education-cloud.png",
    categories: ["Blog", "Platforms Blogs"]
  },
  {
    title: "5 Thanks Ben Alternatives for Better Benefits",
    date: "January 19, 2026",
    image: "/images/finance-services-cloud.png",
    categories: ["Blog", "Platforms Blogs"]
  },
  {
    title: "Here Are the 7 Best Employee Benefits Platforms in 2026",
    date: "January 19, 2026",
    image: "/images/health-cloud.png",
    categories: ["Blog", "Platforms Blogs"]
  },
  {
    title: "Introducing Kota Spend: Flexible Allowances, Made Simple.",
    date: "December 3, 2025",
    image: "/images/manufacturing-cloud.png",
    categories: ["Blog", "Product Blogs"]
  },
  {
    title: "Kota brings private healthcare into payroll with PayFit",
    date: "November 18, 2025",
    image: "/images/service-cloud.png",
    categories: ["Blog", "Product Blogs"]
  },
  {
    title: "Kota Named Among CB Insights' Most Innovative Insurtechs",
    date: "October 17, 2025",
    image: "/images/experience-cloud-expertise.png",
    categories: ["Blog", "Industry News"]
  },
  {
    title: "Toku Launches Health Insurance Cover Powered by Kota",
    date: "September 11, 2025",
    image: "/images/marketing-cloud-expertise.png",
    categories: ["Blog", "CRM Clouds Blogs"]
  },
  {
    title: "We've raised $14.5m to build the employee benefits infrastructure for the internet",
    date: "May 23, 2024",
    image: "/images/revenue-cloud-expertise.png",
    categories: ["Blog", "Industry News"]
  },
  {
    title: "CRM Benefit Taxation in Ireland: 2026 BIK Rules",
    date: "April 17, 2024",
    image: "/images/sales-cloud-expertise.png",
    categories: ["Blog", "CRM Clouds Blogs", "Industry News"]
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
        <path d="M10 29C20 29 23 5 37 5" stroke="#38A81B" strokeWidth="8" strokeLinecap="round" />
        <path d="M28 29C38 29 41 5 55 5" stroke="#A0FF88" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </>
  );

  // Filter posts based on category and search query
  const filteredPosts = allBlogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.categories.includes(activeCategory);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <HeroSection
        title={heroTitle}
        hideImage={true}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogSection
        posts={filteredPosts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CtaSection />
    </>
  );
}
