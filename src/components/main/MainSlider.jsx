import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { supabase } from "../../client/supabaseClient";

const EmptyArrow = () => <div></div>;

const MainSlider = ({ notifyLoading }) => {
  const [data, setData] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      notifyLoading(true);
      const { data, error } = await supabase.from("main_slider_tbl").select("*");

      if (data && Array.isArray(data)) {
        setData(data);
        if (data.length === 0) {
          notifyLoading(false);
        }
      } else {
        notifyLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && imagesLoaded === data.length) {
      notifyLoading(false);
    }
  }, [imagesLoaded, data.length]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

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

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {data.map((slide, index) => {
          const imageUrl = `https://hcecytohzglqkfrcrzox.supabase.co/storage/v1/object/public/mainpage/${slide.main_bg_img}`;

          return (
            <div key={index} className="relative h-[600px] w-full">
              <img
                src={imageUrl}
                alt="Slide background"
                className="w-full h-full object-cover transition-opacity duration-500"
                onLoad={handleImageLoad}
              />

              <div className="absolute inset-0 flex items-center justify-start">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative text-left px-6 sm:px-12 max-w-3xl">
                  <h2 className="text-new-vision-yellow text-2xl sm:text-4xl font-bold mb-4">
                    {slide.main_text}
                  </h2>
                  {slide.sub_text && (
                    <p className="text-new-vision-yellow text-base sm:text-lg mb-6">
                      {slide.sub_text}
                    </p>
                  )}
                  {slide.main_link && (
                    <Link
                      to={slide.main_link}
                      className="inline-block border border-new-vision-yellow text-new-vision-yellow font-semibold px-6 py-2 rounded-2xl hover:opacity-90 hover:bg-black hover:text-white transition"
                    >
                      Learn More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MainSlider;
