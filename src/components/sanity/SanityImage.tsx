import Image from "next/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

interface SanityImageProps {
  image?: SanityImageType;
  altFallback: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
}

export function SanityImage({
  image,
  altFallback,
  className,
  priority = false,
  quality,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  unoptimized = false,
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
      quality={quality}
      sizes={sizes}
      unoptimized={unoptimized}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
}
