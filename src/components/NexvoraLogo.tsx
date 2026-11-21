import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NexvoraLogoProps {
  variant?: "light" | "dark" | "icon";
  className?: string;
  isLink?: boolean;
}

export function NexvoraLogo({
  variant = "light",
  className = "h-8 sm:h-9 w-auto",
  isLink = true,
}: NexvoraLogoProps) {
  const isDark = variant === "dark";
  const isIconOnly = variant === "icon";

  const src = isIconOnly
    ? "/logo-icon.svg"
    : isDark
    ? "/logo-white.svg"
    : "/logo.svg";

  const width = isIconOnly ? 618 : 1845;
  const height = 519;

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt="NEXVORA Technologies"
        width={width}
        height={height}
        className="h-full w-auto object-contain block"
        priority
      />
    </div>
  );

  if (isLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
        aria-label="NEXVORA Technologies Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
