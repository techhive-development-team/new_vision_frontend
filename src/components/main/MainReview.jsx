import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews = [
  {
    message:
      "The courses at New Vision have transformed my understanding of art and design. The faculty is incredibly supportive and the community is vibrant.",
    name: "John Doe",
    studentImg:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    course: "Bachelor of Fine Arts",
  },
  {
    message:
      "New Vision helped me unlock creativity I didn’t know I had. Amazing instructors and great curriculum!",
    name: "Jane Smith",
    studentImg:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
    course: "Art & Design",
  },
];

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto text-center">
    <img
      src={review.studentImg}
      alt={review.name}
      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
    />
    <p className="text-gray-700 mb-4 italic">"{review.message}"</p>
    <h4 className="font-semibold text-lg">{review.name}</h4>
    <p className="text-sm text-gray-500">{review.course}</p>
  </div>
);

const MainReview = () => {
  return (
    <div className="px-6 py-12 bg-gray-50">
      <div className="w-11/12 md:w-4/5 mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">What Our Students Say</h2>
        <p className="text-gray-600 mt-2">The best choice to connect with us</p>
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
