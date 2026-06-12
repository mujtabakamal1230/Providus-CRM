import "server-only";

import type { QueryParams } from "next-sanity";
import {
  client,
  metadataClient,
  previewClient,
  privateMetadataClient,
} from "./client";
import { isSanityConfigured, readToken } from "../env";

interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number;
  metadata?: boolean;
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 0,
  metadata = false,
}: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  const fetchClient = readToken
    ? metadata
      ? privateMetadataClient
      : previewClient
    : metadata
      ? metadataClient
      : client;

  return fetchClient.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
