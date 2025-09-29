import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetStudentReview } from "@/hooks/useGetImage";
import { API_URLS, baseUrl } from "@/client/url";
import { isEmptyArray } from "@/lib/util";

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto text-center">
    <img
      src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENTREVIEW}/${review.student_img}`}
      alt={review.name}
      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
    />
    <p className="text-gray-700 mb-4 italic">"{review?.review}"</p>
    <h4 className="font-semibold text-black text-lg">{review?.name}</h4>
    <p className="text-sm text-gray-500">{review?.batch}</p>
  </div>
);

const MainReview = () => {
  const { data: reviews } = useGetStudentReview(1);
  if (isEmptyArray(reviews)) {
    return (
      <p className="text-center py-10 text-gray-500">No review available</p>
    );
  }
  return (
    <div className="px-6 py-12 text-black dark:text-white ">
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
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainReview;
