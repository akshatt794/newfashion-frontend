import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Banner type supports both
type Banner = {
  _id: string;
  image?: string;
  video?: string;
  poster?: string;
  title?: string;
  subheadline?: string;
  link?: string;
};

const BannerCarousel: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => {
        setBanners(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[420px] md:h-[560px] flex justify-center items-center">
        Loading banners...
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="w-full h-[420px] md:h-[560px] flex justify-center items-center">
        No banners available.
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] md:h-[560px] relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={banner._id || idx} className="relative w-full h-full">
            {banner.video ? (
              <video
                src={banner.video}
                poster={banner.poster || ""}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src={banner.image}
                alt={banner.title || "Banner"}
                className="object-cover w-full h-full"
              />
            )}

            {(banner.title || banner.subheadline || banner.link) && (
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-white text-center px-4">
                {banner.title && (
                  <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow">
                    {banner.title}
                  </h2>
                )}
                {banner.subheadline && (
                  <p className="text-lg md:text-2xl font-medium mb-5 drop-shadow">
                    {banner.subheadline}
                  </p>
                )}
                {banner.link && (
                  <a
                    href={banner.link}
                    className="inline-block bg-white text-black px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-gray-200 transition"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Explore
                  </a>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
