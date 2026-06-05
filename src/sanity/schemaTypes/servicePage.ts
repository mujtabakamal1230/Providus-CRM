import { defineField, defineType } from "sanity";

const iconKeyOptions = [
  { title: "ROI", value: "roi" },
  { title: "User adoption", value: "adoption" },
  { title: "Platform maturity", value: "maturity" },
  { title: "Lifecycle visibility", value: "visibility" },
  { title: "360 view", value: "view360" },
  { title: "Partnership", value: "partnership" },
];

const colorThemeOptions = [
  { title: "Blue", value: "blue" },
  { title: "Green", value: "green" },
  { title: "Yellow", value: "yellow" },
  { title: "Peach", value: "peach" },
  { title: "Pink", value: "pink" },
  { title: "Purple", value: "purple" },
];

const designColorOptions = [
  { title: "Brand Blue", value: "#1D70C5" },
  { title: "Brand Green", value: "#38A81B" },
  { title: "Consult CTA Blue", value: "#2898FF" },
  { title: "Salesforce Blue", value: "#00A1E0" },
  { title: "Soft Indigo", value: "#687DDA" },
  { title: "Soft Purple", value: "#A670DD" },
  { title: "Experience Orange", value: "#F45A3E" },
  { title: "Data Lavender", value: "#8A8FD2" },
  { title: "Agentforce Cyan", value: "#0D9DDA" },
  { title: "Marketing Gold", value: "#F4AC3B" },
];

const serviceImageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
      }),
    ],
  });

export const servicePage = defineType({
  name: "servicePage",
  title: "Salesforce service page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Page status",
      type: "string",
      initialValue: "published",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft", value: "draft" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "badgeTitle",
          title: "Badge title",
          type: "string",
        }),
        defineField({
          name: "badgeSubtitle",
          title: "Badge subtitle",
          type: "string",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "bullets",
          title: "Bullet list",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "formTitle",
          title: "Form title",
          type: "string",
        }),
        defineField({
          name: "formButtonLabel",
          title: "Form button label",
          type: "string",
        }),
        serviceImageField("backgroundImage", "Background image"),
      ],
    }),
    defineField({
      name: "certified",
      title: "Certified section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "caseStudies",
      title: "Related case studies",
      description: "Select and order the case studies shown on this service page.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "tabsSection",
      title: "Tabs section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "tabs",
          title: "Tabs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "heading",
                  title: "Heading",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Body text",
                  type: "text",
                  rows: 5,
                }),
                defineField({
                  name: "bullets",
                  title: "Bullets",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "benefitsSection",
      title: "Benefits timeline",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "iconKey",
                  title: "Icon",
                  type: "string",
                  options: { list: iconKeyOptions },
                }),
                defineField({
                  name: "colorTheme",
                  title: "Color theme",
                  type: "string",
                  options: { list: colorThemeOptions },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "consultantCta",
      title: "Consultant CTA section",
      description:
        "Blue CTA section with consultant image, shown after the tabs section on Salesforce service pages.",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string",
        }),
        defineField({
          name: "buttonHref",
          title: "Button link",
          type: "string",
        }),
        defineField({
          name: "backgroundColor",
          title: "Background color",
          type: "string",
          initialValue: "#2898FF",
          options: { list: designColorOptions },
        }),
        serviceImageField("image", "Consultant image"),
      ],
    }),
    defineField({
      name: "expertiseSection",
      title: "Expertise carousel",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 4,
                }),
                serviceImageField("icon", "Icon image"),
                defineField({
                  name: "accentColor",
                  title: "Card accent color",
                  type: "string",
                  description: "Choose one of the approved design colors.",
                  options: { list: designColorOptions },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "industriesSection",
      title: "Industries grid",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 4,
                }),
                serviceImageField("image", "Image"),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "whyChooseSection",
      title: "Why choose section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "reasons",
          title: "Reasons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 3,
                }),
                serviceImageField("icon", "Icon image"),
                defineField({
                  name: "color",
                  title: "Title color",
                  type: "string",
                  description: "Choose one of the approved design colors.",
                  options: { list: designColorOptions },
                }),
              ],
            },
          ],
        }),
        serviceImageField("image", "Right-side image"),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string",
        }),
        defineField({
          name: "buttonHref",
          title: "Button link",
          type: "string",
        }),
        serviceImageField("backgroundImage", "Background image"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
    },
  },
});
