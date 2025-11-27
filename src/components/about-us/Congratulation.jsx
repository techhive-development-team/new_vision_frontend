import { useEffect, useRef, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { API_URLS, imageUrl } from "../../client/url"
import { isEmptyArray } from "@/lib/util";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CongratulationCard = ({
  id,
  student_img,
  educationPartner,
  name,
  batch,
  qualification,
}) => {
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 w-full max-w-[280px] mx-auto">
      {student_img && (
        <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={`${imageUrl}${API_URLS.STUDENTREVIEW}/${student_img}`}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="text-center">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1">{batch}</p>
        </div>
        {educationPartner && (
          <div className="flex items-center justify-center gap-2 py-2 px-2 sm:px-3 bg-gray-50 rounded-lg min-h-[40px]">
            {educationPartner.logo_img ? (
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0">
                <img
                  src={`${imageUrl}${API_URLS.EDUCATION_PARTNER}/${educationPartner.logo_img}`}
                  alt={educationPartner.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <span className="text-lg">🏢</span>
            )}
            <p className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2">
              {educationPartner.name}
            </p>
          </div>
        )}
        <p className="text-xs text-center text-gray-600 line-clamp-2">{qualification}</p>
        <Link
          to={`/student-review/${id}`}
          className="block w-full text-center py-2 sm:py-2.5 px-3 sm:px-4 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Read Story
        </Link>
      </div>
    </div>
  );
};

const Congratulations = ({ data, loading }) => {
  if (loading) {
    return <div className="text-center py-12"><p className="text-gray-500">Loading...</p></div>;
  }

  if (isEmptyArray(data)) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-3">
          <span className="text-xl">📝</span>
        </div>
        <p className="text-gray-500 text-sm">No reviews available yet</p>
      </div>
    );
  }

  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const options = useMemo(
    () => ({
      loop: data.length > 3,
      align: "start",
      skipSnaps: false,
    }),
    [data.length]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Update slidesToShow based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update current index on scroll
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl mx-auto">
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          Success Stories
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-2">
          Celebrating our students' achievements
        </p>
      </div>

      <div className="relative px-2 sm:px-4">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 sm:gap-4">
            {data.map((review) => (
              <div
                key={review.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-0"
              >
                <CongratulationCard {...review} />
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 -left-2 sm:left-0 lg:-left-12 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:scale-110 flex-shrink-0"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-sm sm:text-base" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 -right-2 sm:right-0 lg:-right-12 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:scale-110 flex-shrink-0"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-sm sm:text-base" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 lg:mt-8 flex-wrap px-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? "bg-gray-700 dark:bg-gray-300"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
