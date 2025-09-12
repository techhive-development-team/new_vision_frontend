import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useGetImageById } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";

const EmptyArrow = () => <div></div>;

const MainSlider = () => {
  const { data, isLoading, error } = useGetImageById(1);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    prevArrow: <EmptyArrow />,
    nextArrow: <EmptyArrow />,
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center text-red-500">
        Error loading slides
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {Array.isArray(data.images) && data.images.length > 0 ? (
          data.images.map((slide, index) => (
            <div key={index} className="relative h-[600px] w-full">
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
          ))
        ) : (
          <div className="h-[600px] flex items-center justify-center text-gray-400">
            No slides available
          </div>
        )}
      </Slider>
    </div>
  );
};

export default MainSlider;
