import { useEffect, useState, useRef } from "react";

const API_BASE = "https://newfashion-backend.onrender.com";

type Banner = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
};

const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/banners`)
      .then((res) => res.json())
      .then((data) => setBanners(data || []));
  }, []);

  // Auto-slide
  useEffect(() => {
    if (banners.length < 2) return;
    intervalRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current!);
  }, [banners]);

  if (!banners.length) {
    return (
      <div className="w-full h-[320px] md:h-[420px] bg-gray-200 flex items-center justify-center rounded-xl shadow mb-4 text-lg">
        No banners available. Upload in admin panel!
      </div>
    );
  }

  const showBanner = banners[current];

  return (
    <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden shadow mb-8">
      {showBanner.video ? (
        <video
          className="w-full h-full object-cover"
          src={`${API_BASE}${showBanner.video}`}
          autoPlay
          muted
          loop
          playsInline
          poster={showBanner.image ? `${API_BASE}${showBanner.image}` : undefined}
        />
      ) : (
        <img
          className="w-full h-full object-cover"
          src={`${API_BASE}${showBanner.image}`}
          alt={showBanner.title || "Banner"}
        />
      )}
      {/* Overlay title and link */}
      {(showBanner.title || showBanner.link) && (
        <div className="absolute left-5 bottom-5 bg-black/60 text-white rounded px-5 py-3">
          <div className="text-xl font-bold">{showBanner.title}</div>
          {showBanner.link && (
            <a
              href={showBanner.link}
              className="underline text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          )}
        </div>
      )}

      {/* Carousel dots/navigation */}
      <div className="absolute bottom-4 right-5 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
            style={{ outline: "none", border: "none" }}
          />
        ))}
      </div>
      {/* Arrows for manual navigation */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold"
            aria-label="Previous"
          >‹</button>
          <button
            onClick={() => setCurrent((current + 1) % banners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold"
            aria-label="Next"
          >›</button>
        </>
      )}
    </div>
  );
}
