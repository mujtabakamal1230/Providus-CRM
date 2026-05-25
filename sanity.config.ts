import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "providus-crm",
  title: "Providus CRM",
  projectId,
  dataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],
});
