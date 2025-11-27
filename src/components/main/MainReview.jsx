import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { API_URLS, imageUrl } from "@/client/url";
import { isEmptyArray } from "@/lib/util";

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto text-center">
    <div className="relative w-24 sm:w-28 mx-auto mb-4 aspect-square rounded-full overflow-hidden bg-gray-200">
      <img
        src={`${imageUrl}${API_URLS.STUDENTREVIEW}/${review.student_img}`}
        alt={review.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    <p className="text-gray-700 mb-4 italic">"{review?.review}"</p>
    <h4 className="font-semibold text-black text-lg">{review?.name}</h4>
    <p className="text-sm text-gray-500">{review?.batch}</p>
  </div>
);

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
    <div className="px-6 py-12 text-black dark:text-white">
      <div className="w-11/12 md:w-4/5 mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">What Our Students Say</h2>
        <p className="text-gray-800 dark:text-gray-100 mt-2">
          The best choice to connect with us
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="!pb-10"
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
