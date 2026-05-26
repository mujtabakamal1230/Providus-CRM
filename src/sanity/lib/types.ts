import type { PortableTextBlock } from "next-sanity";

export interface SanitySlug {
  current: string;
}

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
}

export interface SanityImage {
  alt?: string;
  asset?: SanityImageAsset;
}

export interface Category {
  title: string;
  slug: SanitySlug;
}

export interface Author {
  name: string;
  role?: string;
  slug?: SanitySlug;
  image?: SanityImage;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt?: string;
  heroImage?: SanityImage;
  categories?: Category[];
  author?: Author;
}

export interface BlogPost extends BlogPostListItem {
  body?: PortableTextBlock[];
  seo?: SeoFields;
}

export interface CaseStudyListItem {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt?: string;
  clientName?: string;
  industry?: string;
  coverImage?: SanityImage;
  technologies?: string[];
  resultSummary?: string;
}

export interface CaseStudy extends CaseStudyListItem {
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  results?: PortableTextBlock[];
  body?: PortableTextBlock[];
  seo?: SeoFields;
}
