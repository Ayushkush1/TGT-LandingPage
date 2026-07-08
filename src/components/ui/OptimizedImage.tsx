"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

interface OptimizedImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt?: string | null;
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  // Check if src is an external URL and not matching configured hostnames
  const isConfiguredHost = React.useMemo(() => {
    if (!src) return false;
    // Relative/protocol-relative paths or files starting with / are allowed
    if (src.startsWith("/") || src.startsWith(".") || !src.startsWith("http")) {
      return true;
    }
    try {
      const parsedUrl = new URL(src);
      const allowedHosts = [
        "jrltxuhcmvqxuwukacju.supabase.co",
        "thegoldtechnologies.com",
        "i.pravatar.cc",
      ];
      return allowedHosts.some(
        (host) =>
          parsedUrl.hostname === host ||
          parsedUrl.hostname.endsWith("." + host)
      );
    } catch {
      return false;
    }
  }, [src]);

  if (!src) return null;

  if (isConfiguredHost) {
    const hasDimensions =
      props.width !== undefined ||
      props.height !== undefined ||
      props.fill === true;

    if (hasDimensions) {
      return <Image src={src} alt={alt || ""} {...props} />;
    } else {
      // If dimensions are missing and fill is not used, use fill layout
      return <Image src={src} alt={alt || ""} fill {...props} />;
    }
  }

  // Fallback to standard img element with native lazy loading
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt || ""}
      loading={props.priority ? "eager" : "lazy"}
      className={props.className}
      style={props.style}
    />
  );
}
