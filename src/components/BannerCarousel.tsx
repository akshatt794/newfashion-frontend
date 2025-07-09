import { useEffect, useState } from "react";
import customFetch from "../axios/custom";

// Update type to include both image and video
type Banner = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
};

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    customFetch
      .get("/banners")
      .then((res) => setBanners(res.data))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  // Basic carousel functionality (auto slide every 4s)
  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (loading) return <div>Loading banners...</div>;
  if (!banners.length) return <div className="w-full text-center py-10 text-lg">No banners available.</div>;

  const banner = banners[index];

  return (
    <div className="w-full h-[320px] relative overflow-hidden mb-6">
      {banner.video ? (
        <video
          src={`https://newfashion-backend.onrender.com${banner.video}`}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover rounded-lg"
          poster={banner.image ? `https://newfashion-backend.onrender.com${banner.image}` : ""}
        />
      ) : banner.image ? (
        <img
          src={`https://newfashion-backend.onrender.com${banner.image}`}
          alt={banner.title || "Banner"}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : null}

      {/* Dots navigation */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-blue-600" : "bg-gray-400"} transition`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
