import Image from "next/image";

interface GreenLineMarkProps {
  className?: string;
}

export function GreenLineMark({ className }: GreenLineMarkProps) {
  return (
    <Image
      src="/images/green-line.svg"
      alt=""
      aria-hidden="true"
      width={80}
      height={40}
      className={className}
    />
  );
}
