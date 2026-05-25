import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({
  projectId,
  dataset,
});

export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("max");
}
