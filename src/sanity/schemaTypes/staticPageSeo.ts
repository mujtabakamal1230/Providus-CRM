import { defineField, defineType } from "sanity";

const pageOptions = [
  { title: "Home", value: "home" },
  { title: "About", value: "about" },
  { title: "Services", value: "services" },
  { title: "Platform Expertise", value: "platform-expertise" },
  { title: "Industries", value: "industries" },
  { title: "Blog", value: "blog" },
  { title: "Case Studies", value: "case-studies" },
  { title: "Contact", value: "contact" },
];

export const staticPageSeo = defineType({
  name: "staticPageSeo",
  title: "Static page SEO",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "Only used inside Sanity.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageKey",
      title: "Website page",
      type: "string",
      options: {
        list: pageOptions,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO metadata",
      type: "seo",
    }),
    defineField({
      name: "jsonLd",
      title: "JSON-LD",
      type: "jsonLd",
      description:
        "Optional structured data for this page. This replaces the legacy Static page JSON-LD document when set.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageKey",
    },
  },
});
