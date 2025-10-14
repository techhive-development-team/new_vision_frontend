import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetStudentReview } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";
import { isEmptyArray } from "@/lib/util";

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 text-gray-800 hover:text-gray-500 dark:text-white text-2xl"
    onClick={onClick}
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 text-gray-800 hover:text-gray-500 dark:text-white text-2xl"
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
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENTREVIEW}/${student_img}`}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 flex flex-col space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold">{name}</h3>
          <p className="text-xs md:text-sm font-light text-gray-600">{batch}</p>
        </div>

        <div className="flex flex-col items-center">
          {educationPartner && (
            <div className="flex items-center justify-center space-x-2">
              {educationPartner.logo_img ? (
                <div className="relative w-10 aspect-square">
                  <img
                    src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${educationPartner.logo_img}`}
                    alt={`${educationPartner.name} Logo`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              ) : (
                <span className="text-base">🏢</span>
              )}
              <p className="text-sm text-left">{educationPartner.name}</p>
            </div>
          )}

          <p className="text-xs md:text-sm font-light text-gray-600">
            {qualification}
          </p>
        </div>

        <Link
          to={`/student-review/${id}`}
          className="relative overflow-hidden text-sm text-black p-2 border rounded-lg before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-black before:z-0 before:transition-all before:duration-300 hover:before:w-full hover:text-white"
        >
          <span className="relative z-10">Learn More</span>
        </Link>
      </div>
    </div>
  );
};

const Congratulations = () => {
  const { data } = useGetStudentReview();

  if (isEmptyArray(data)) {
    return (
      <p className="text-center py-10 text-gray-500">No review available</p>
    );
  }

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
