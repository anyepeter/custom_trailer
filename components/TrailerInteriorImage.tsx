"use client";

export default function TrailerInteriorImage() {
  return (
    <div className="my-8">
      <img
        src="/trailer-interior.jpg"
        alt="Custom Trailer Interior"
        className="w-full rounded-lg shadow-lg"
        onError={(e) => {
          // Hide image if it doesn't exist
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}
