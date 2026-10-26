import React, { useState } from 'react';

const DEFAULT_FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23FFE6D2"/><circle cx="200" cy="150" r="70" fill="%23F47C38" opacity="0.2"/><path d="M160 160 Q200 120 240 160 Z" fill="%23F47C38"/><circle cx="200" cy="135" r="10" fill="%23F47C38"/><text x="50%" y="240" font-family="sans-serif" font-size="14" font-weight="600" fill="%238A817A" text-anchor="middle">Cookpedia Recipe</text></svg>`;

export const ImageWithFallback = ({
  src,
  fallbackSrc = DEFAULT_FALLBACK_SVG,
  alt = 'Recipe Image',
  className,
  style,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      style={{
        objectFit: 'cover',
        ...style
      }}
      loading="lazy"
      {...props}
    />
  );
};

