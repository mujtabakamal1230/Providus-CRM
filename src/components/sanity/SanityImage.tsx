import Image from "next/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

interface SanityImageProps {
  image?: SanityImageType;
  altFallback: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function SanityImage({
  image,
  altFallback,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: SanityImageProps) {
  if (!image?.asset?.url) {
    return null;
  }

  const blurDataURL = image.asset.metadata?.lqip;

  return (
    <Image
      src={image.asset.url}
      alt={image.alt || altFallback}
      fill
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
}
