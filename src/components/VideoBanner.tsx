import { useEffect, useState } from "react";

const API_BASE = "https://newfashion-backend.onrender.com";

type BannerType = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
};

export default function HomeBanner() {
  const [banner, setBanner] = useState<BannerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/banners`)
      .then((res) => res.json())
      .then((data) => {
        // Optionally, pick the latest one: data[data.length-1]
        setBanner(data.length > 0 ? data[data.length - 1] : null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-24">Loading banner...</div>;
  if (!banner) return <div className="text-center py-24">No banners available.</div>;

  return (
    <section className="w-full mb-10">
      {/* Show video if present, otherwise image */}
      {banner.video ? (
        <div className="w-full h-[400px] mb-5 relative overflow-hidden rounded-xl shadow">
          <video
            className="object-cover w-full h-full"
            autoPlay
            loop
            muted
            poster={banner.image ? `${API_BASE}${banner.image}` : "/banner-placeholder.jpg"}
          >
            <source src={`${API_BASE}${banner.video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-5 left-5 text-white text-3xl font-bold shadow-lg">
            {banner.title || "Welcome to NewFashion!"}
          </div>
        </div>
      ) : banner.image ? (
        <div className="w-full h-[300px] rounded-xl overflow-hidden shadow">
          <img
            src={`${API_BASE}${banner.image}`}
            alt={banner.title || "Shop Banner"}
            className="object-cover w-full h-full"
          />
        </div>
      ) : null}
    </section>
  );
}
