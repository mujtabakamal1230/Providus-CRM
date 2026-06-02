import type { SanityImage } from "@/sanity/lib/types";

export const EDITORIAL_IMAGE_FALLBACK_ASPECT_RATIO = "1404 / 480";

export function getSanityImageAspectRatio(
  image?: SanityImage
): string {
  const width = image?.asset?.metadata?.dimensions?.width;
  const height = image?.asset?.metadata?.dimensions?.height;

  return width && height
    ? `${width} / ${height}`
    : EDITORIAL_IMAGE_FALLBACK_ASPECT_RATIO;
}
