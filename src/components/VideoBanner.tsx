// src/components/HomeBanner.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Banner = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
};

export default function HomeBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://newfashion-backend.onrender.com/api/banners")
      .then(res => {
        setBanners(res.data);
      })
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{textAlign: "center"}}>Loading banners...</div>;
  if (banners.length === 0) return <div style={{textAlign: "center"}}>No banners available.</div>;

  return (
    <section className="w-full mb-10">
      {banners.map(banner => (
        <div key={banner._id} className="mb-8 w-full rounded-xl overflow-hidden shadow relative">
          {banner.video ? (
            <video
              src={`https://newfashion-backend.onrender.com${banner.video}`}
              controls
              autoPlay
              loop
              muted
              className="w-full h-[400px] object-cover"
            />
          ) : banner.image ? (
            <img
              src={`https://newfashion-backend.onrender.com${banner.image}`}
              alt={banner.title || "Shop Banner"}
              className="w-full h-[400px] object-cover"
            />
          ) : null}
          {banner.title && (
            <div className="absolute bottom-5 left-5 text-white text-3xl font-bold shadow-lg">
              {banner.title}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
