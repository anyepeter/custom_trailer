"use client";

import Image from 'next/image';

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  alt: string;
}

export default function TeamCard({ name, role, image, alt }: TeamCardProps) {
  return (
    <div className="flex flex-col">
      {/* Square Photo */}
      <div className="relative w-full pb-[100%] bg-gray-200 rounded-lg overflow-hidden mb-4">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=0066b2&color=fff&bold=true`;
          }}
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>

      {/* Role */}
      <p className="text-sm text-gray-600 mb-3">{role}</p>

      {/* Thin Underline Rule */}
      <div className="w-[85%] h-[2px] bg-gray-200"></div>
    </div>
  );
}
