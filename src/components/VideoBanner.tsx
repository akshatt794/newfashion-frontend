// src/components/VideoBanner.tsx
import { useEffect, useState } from "react";
import customFetch from "../axios/custom";

type Banner = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
};

export default function VideoBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customFetch
      .get("/banners")
      .then((res) => setBanners(res.data))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading banner...</div>;
  if (!banners.length) return <div className="w-full text-center py-10 text-lg">No banners available.</div>;

  // Show first banner (or loop, or use a carousel)
  const banner = banners[0];
  return (
    <section className="w-full overflow-hidden rounded-xl mb-8">
      {banner.video ? (
        <video
          src={`https://newfashion-backend.onrender.com${banner.video}`}
          autoPlay
          loop
          muted
          className="w-full h-[350px] object-cover"
          poster={banner.image ? `https://newfashion-backend.onrender.com${banner.image}` : ""}
        />
      ) : banner.image ? (
        <img
          src={`https://newfashion-backend.onrender.com${banner.image}`}
          alt={banner.title || "Banner"}
          className="w-full h-[350px] object-cover"
        />
      ) : null}
    </section>
  );
}
