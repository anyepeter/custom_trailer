interface HeroVideoProps {
  videoId: string;
  title?: string;
}

export default function HeroVideo({ videoId, title = "Custom Trailer Pro Video" }: HeroVideoProps) {
  return (
    <div className="w-full bg-white py-12 ">
      <div className="container mx-auto px-4" style={{ maxWidth: '980px' }}>
        <div className="w-full mx-auto" >
          <div
            className="relative overflow-hidden shadow-2xl"
            style={{
              paddingBottom: '56.25%', // 16:9 aspect ratio
            }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/gH6BZVeeYjc?si=CcX0QmRL0PKTaLc4"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
