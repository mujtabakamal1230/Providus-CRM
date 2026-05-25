import { defineQuery } from "next-sanity";

const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height
      }
    }
  },
  alt
`;

const seoProjection = `
  metaTitle,
  metaDescription,
  ogImage {
    ${imageProjection}
  }
`;

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    title,
    slug
  }
`);

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    heroImage {
      ${imageProjection}
    },
    categories[]->{
      title,
      slug
    },
    author->{
      name,
      role,
      slug,
      image {
        ${imageProjection}
      }
    }
  }
`);

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    heroImage {
      ${imageProjection}
    },
    categories[]->{
      title,
      slug
    },
    author->{
      name,
      role,
      slug,
      image {
        ${imageProjection}
      }
    },
    body[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    seo {
      ${seoProjection}
    }
  }
`);

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    clientName,
    industry,
    technologies,
    resultSummary,
    coverImage {
      ${imageProjection}
    }
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    clientName,
    industry,
    technologies,
    resultSummary,
    coverImage {
      ${imageProjection}
    },
    challenge[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    solution[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    results[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    body[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    seo {
      ${seoProjection}
    }
  }
`);
