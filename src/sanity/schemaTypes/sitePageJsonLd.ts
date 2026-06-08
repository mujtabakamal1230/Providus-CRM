import { defineField, defineType } from "sanity";

const pageOptions = [
  { title: "Home", value: "home" },
  { title: "About", value: "about" },
  { title: "Industries", value: "industries" },
  { title: "Platform Expertise", value: "platform-expertise" },
  { title: "Case Studies", value: "case-studies" },
  { title: "Blog", value: "blog" },
  { title: "Services", value: "services" },
];

export const sitePageJsonLd = defineType({
  name: "sitePageJsonLd",
  title: "Static page JSON-LD",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      options: {
        list: pageOptions,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jsonLd",
      title: "JSON-LD",
      type: "jsonLd",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageKey",
    },
  },
});
