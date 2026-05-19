import React from "react";
import { CONFIG } from "src/config-global";

const OptimizedImage = ({
  src,
  alt = "",
  className,
  width,
  height,
  priority = false,
  sizes,
  style,
  ...props
}) => {
  if (!src) return null;

  const imageUrl = src.startsWith("http")
    ? src
    : `${CONFIG.serverUrl}/storage/${src}`;

  const aspectRatio =
    width && height ? `${width} / ${height}` : undefined;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchpriority={priority ? "high" : "auto"}
      width={width}
      height={height}
      sizes={sizes}
      style={{ aspectRatio, ...style }}
      {...props}
    />
  );
};

export default OptimizedImage;
