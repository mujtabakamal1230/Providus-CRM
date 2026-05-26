import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken, studioUrl } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl,
  },
});

export const previewClient = client.withConfig({
  token: readToken,
  useCdn: false,
});

export const metadataClient = client.withConfig({
  stega: false,
  useCdn: true,
});

export const privateMetadataClient = client.withConfig({
  token: readToken,
  stega: false,
  useCdn: false,
});
