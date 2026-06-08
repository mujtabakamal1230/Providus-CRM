import { defineField, defineType } from "sanity";

export const jsonLd = defineType({
  name: "jsonLd",
  title: "JSON-LD",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enable JSON-LD",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "schemaJson",
      title: "JSON-LD schema",
      type: "text",
      rows: 18,
      description:
        "Paste valid JSON-LD here. It can be a single object or an array of objects.",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return true;
          }

          try {
            JSON.parse(value);
            return true;
          } catch {
            return "JSON-LD must be valid JSON.";
          }
        }),
    }),
  ],
});
