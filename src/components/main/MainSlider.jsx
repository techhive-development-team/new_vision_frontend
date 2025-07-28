import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EmptyArrow = () => <div></div>;
//apply now
//learn more
//class info
const data = [
  {
    id: 1,
    mainText: "Welcome to New Vision Art & Science Institute",
    subText:
      "Blending artistic excellence with modern science and global education standards to empower the next generation of creators, thinkers, and leaders.",
    link: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    mainText: "Academic Excellence & Creative Innovation",
    subText: "On a Global Scale",
    link: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    mainText: "Come see the amazing art our students have created",
    subText: "Don’t miss this inspiring event",
    link: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    mainText: "Transformative Learning Journey",
    subText: "Guided by passion, personalised mentorship, and purpose",
    link: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  },
];

const MainSlider = () => {
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
        {data.map((slide, index) => (
          <div key={index} className="relative h-[600px] w-full">
            <img
              src={slide.backgroundImage}
              className="h-full w-full object-cover"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="absolute inset-0 bg-black opacity-50"></div>
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
                  <a
                    href={slide.link}
                    className="inline-block border border-new-vision-yellow text-new-vision-yellow font-semibold px-6 py-2 rounded-2xl hover:opacity-90 hover:bg-black hover:text-white transition"
                  >
                    Learn More
                  </a>
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
