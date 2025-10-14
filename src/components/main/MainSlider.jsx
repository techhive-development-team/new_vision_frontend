import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useGetImageById } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";
import { isEmptyArray } from "@/lib/util";

const EmptyArrow = () => <div></div>;

const MainSlider = () => {
  const { data } = useGetImageById(1);
  if (isEmptyArray(data?.images)) {
    return (
      <p className="text-center py-10 text-gray-500">No slide available</p>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    prevArrow: <EmptyArrow />,
    nextArrow: <EmptyArrow />,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {data.images.map((slide, index) => (
          <div className="relative w-full aspect-[2/3] sm:aspect-[16/9]">
            <img
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.IMAGE}/${slide.bg_img}`}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover transition-opacity duration-500"
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
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
