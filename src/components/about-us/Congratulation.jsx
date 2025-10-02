import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetStudentReview } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 text-gray-800 hover:text-gray-500 dark:text-white pointer text-2xl"
    onClick={onClick}
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 text-gray-800 hover:text-gray-500 dark:text-white pointer text-2xl"
    onClick={onClick}
  >
    <FaChevronLeft />
  </button>
);

const CongratulationCard = ({
  id,
  student_img,
  educationPartner,
  name,
  batch,
  qualification,
}) => {
  return (
    <div className="rounded-xl shadow bg-white overflow-hidden text-center border border-gray-200 w-full max-w-[280px] mx-auto">
      {student_img && (
        <img
          src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENTREVIEW}/${student_img}`}
          alt={name}
          className="w-full h-48 md:h-56 lg:h-60 object-cover"
        />
      )}
      <div className="p-4 flex flex-col space-y-2">
        <div>
          <h3 className="text-lg md:text-xl font-semibold">{name}</h3>
          <p className="text-xs md:text-sm font-light mt-0.5 text-gray-600">
            {batch}
          </p>
        </div>

        <div className="flex flex-col items-center mt-2">
          {educationPartner && (
            <div className="flex items-center justify-center space-x-2">
              {educationPartner.logo_img ? (
                <img
                  src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${educationPartner.logo_img}`}
                  alt={`${educationPartner.name} Logo`}
                  className="w-5 h-5 object-contain"
                />
              ) : (
                <span className="text-base">🏢</span>
              )}
              <p className="text-sm md:text-base font-semibold">
                {educationPartner.name}
              </p>
            </div>
          )}

          <p className="text-xs md:text-sm font-light mt-0.5 text-gray-600">
            {qualification}
          </p>
        </div>

        <Link
          to={`/student-review/${id}`}
          className="inline-block border border-gray-400 text-black font-base px-4 py-2 rounded-2xl hover:opacity-90 hover:bg-black hover:text-yellow-400 transition text-sm md:text-base mt-2"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const Congratulations = () => {
  const { data, isLoading, error } = useGetStudentReview();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading student reviews.</p>;

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto relative">
      <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-6 text-center">
        Congratulations
      </h3>
      <Slider {...settings}>
        {data?.map((review) => (
          <div key={review.id} className="px-2">
            <CongratulationCard {...review} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Congratulations;
