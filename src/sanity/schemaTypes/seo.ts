import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Optional meta keywords. Use concise search terms.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Optional canonical URL. Leave empty to use the page's default URL.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "Tell search engines not to follow links",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph title",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "twitterTitle",
      title: "Twitter/X title",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "twitterDescription",
      title: "Twitter/X description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter/X image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
  ],
});
