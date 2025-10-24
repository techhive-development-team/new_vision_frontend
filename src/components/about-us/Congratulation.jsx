import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetStudentReview } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";
import { isEmptyArray } from "@/lib/util";

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -right-3 md:-right-10 transform -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
    onClick={onClick}
    aria-label="Next slide"
  >
    <FaChevronRight className="text-base" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -left-3 md:-left-10 transform -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <FaChevronLeft className="text-base" />
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
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 w-full max-w-[280px] mx-auto">
      {student_img && (
        <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENTREVIEW}/${student_img}`}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4 space-y-3">
        <div className="text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-0.5">
            {name}
          </h3>
          <p className="text-xs text-gray-500">{batch}</p>
        </div>
        {educationPartner && (
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 rounded-lg">
            {educationPartner.logo_img ? (
              <div className="w-7 h-7 flex-shrink-0">
                <img
                  src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${educationPartner.logo_img}`}
                  alt={educationPartner.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <span className="text-lg">🏢</span>
            )}
            <p className="text-xs font-medium text-gray-700 line-clamp-2">
              {educationPartner.name}
            </p>
          </div>
        )}
        <p className="text-xs text-center text-gray-600">{qualification}</p>
        <Link
          to={`/student-review/${id}`}
          className="block w-full text-center py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Read Story
        </Link>
      </div>
    </div>
  );
};

const Congratulations = () => {
  const { data } = useGetStudentReview();

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

  const settings = {
    dots: true,
    infinite: data.length > 3,
    centerMode: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: data.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          infinite: data.length > 1,
        },
      },
    ],
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors" />
    ),
    dotsClass: "slick-dots !bottom-[-35px] flex justify-center gap-2",
  };

  return (
    <div className="px-4 md:px-8 py-8 md:py-10 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Success Stories
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Celebrating our students' achievements
        </p>
      </div>
      <div className="relative px-6 md:px-12">
        <Slider {...settings}>
          {data?.map((review) => (
            <div key={review.id} className="px-2">
              <CongratulationCard {...review} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Congratulations;
