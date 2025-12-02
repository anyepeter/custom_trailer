"use client";

interface OptionalImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function OptionalImage({ src, alt, className = "" }: OptionalImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // Hide image if it doesn't exist
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
