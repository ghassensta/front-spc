import React from "react";
import { CONFIG } from "src/config-global";

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  ...props
}) => {
  const imageUrl = src.startsWith('http') ? src : `${CONFIG.serverUrl}/storage/${src}`;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "low"}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default OptimizedImage;
