import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../../api/api";

interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/banner");
        const data = res.data?.data || [];
        setBanners(data);
      } catch (err) {
        console.error("Gagal fetch banner:", err);
        setBanners([]);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="w-full py-6 px-4 md:px-6 lg:px-20">
      <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
        Promo Spesial Untuk Kamu
      </h2>
      <div className="relative">
        <Swiper
          modules={[Pagination]}
          pagination={{
            el: ".custom-swiper-pagination",
            clickable: true,
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="overflow-visible"
        >
          {banners.map((banner, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={banner.banner_image}
                  alt={banner.banner_name}
                  className="w-full h-40 md:h-48 lg:h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-swiper-pagination mt-4 flex justify-center" />
      </div>
    </div>
  );
};

export default BannerCarousel;
