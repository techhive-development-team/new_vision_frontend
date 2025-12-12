import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { API_URLS, imageUrl } from "@/client/url";
import { isEmptyArray } from "@/lib/util";
import { Link } from "react-router-dom";

const REVIEW_LIMIT = 180;

const ReviewCard = ({ review }) => {
  const isLong = review?.review?.length > REVIEW_LIMIT;
  const shortText = isLong
    ? review.review.slice(0, REVIEW_LIMIT) + "..."
    : review.review;

  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-8 max-w-2xl mx-auto text-center flex flex-col w-full h-full border border-gray-100 dark:border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative w-24 sm:w-28 mx-auto mb-4 mt-4 aspect-square rounded-full overflow-hidden bg-gray-200 border-4 border-white dark:border-neutral-800 shadow-md">
        <img
          src={`${imageUrl}${API_URLS.STUDENTREVIEW}/${review.student_img}`}
          alt={review.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-4">
        “{shortText}”
      </p>

      {isLong && (
        <Link
          to={`/student-review/${review.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline mb-4"
        >
          Read full story →
        </Link>
      )}

      {/* Divider */}
      <div className="mt-auto pt-5 border-t border-gray-100 dark:border-neutral-800">
        <h4 className="font-semibold text-black dark:text-white text-lg">
          {review?.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {review?.batch}
        </p>
      </div>
    </div>
  );
};

const MainReview = ({ data, loading }) => {
  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading reviews...</p>;
  }
  if (isEmptyArray(data)) {
    return (
      <p className="text-center py-10 text-gray-500">No review available</p>
    );
  }
  return (
    <div className="px-6 py-16 text-black dark:text-white bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="w-11/12 md:w-4/5 mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight">
          What Our Students Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Real experiences from students who trusted us with their education
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="!pb-12"
      >
        {data.map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainReview;
