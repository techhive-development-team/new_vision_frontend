import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useGetImageById } from "../../hooks/useGetImage";
import { API_URLS, imageUrl } from "../../client/url";
import { isEmptyArray } from "@/lib/util";

const MainSlider = () => {
  const { data } = useGetImageById(1);

  if (isEmptyArray(data?.images)) {
    return <p className="text-center py-10 text-gray-500">No slide available</p>;
  }

  const slides = data.images;
  const pagination = useMemo(() => ({ clickable: true }), []);

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={pagination}
        className="!pb-10"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id ?? index}>
            <div className="relative w-full aspect-[2/3] sm:aspect-[21/9]">
              <img
                src={`${imageUrl}${API_URLS.IMAGE}/${slide.bg_img}`}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-start">
                <div className="absolute inset-0 bg-black opacity-20"></div>

                <div className="relative text-left px-6 sm:px-12 max-w-3xl">
                  <h2 className="text-new-vision-yellow text-2xl sm:text-4xl font-bold mb-4">
                    {slide.mainText}
                  </h2>

                  {slide.subText && (
                    <p className="text-new-vision-yellow text-base sm:text-lg mb-6">
                      {slide.subText}
                    </p>
                  )}

                  {slide.link && (
                    <Link
                      to={slide.link}
                      className="inline-block border border-new-vision-yellow text-new-vision-yellow font-semibold px-6 py-2 rounded-2xl hover:opacity-90 hover:bg-black hover:text-white transition"
                    >
                      Learn More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;