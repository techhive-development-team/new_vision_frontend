import { GraduationCap } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { useGetEducationPartnerInstitute } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";
import { isEmptyArray } from "@/lib/util";

const PartnerCard = ({ bg_img, logo_img, name, location, foundedDate }) => {
  return (
    <div className="rounded-xl shadow-xl bg-white overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-gray-200">
        <img
          src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${bg_img}`}
          alt="Partner Banner"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 aspect-square">
            <img
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${logo_img}`}
              alt="Partner Logo"
              className="absolute inset-0 w-full h-full object-contain rounded-xl"
            />
          </div>
          <p className="text-2xl font-semibold">{name}</p>
        </div>
        <h3 className="text-base font-light">{location}</h3>
        <div className="flex items-center space-x-4 my-2">
          <GraduationCap className="w-6 h-6" />
          <p className="text-sm font-light">{foundedDate}</p>
        </div>
      </div>
    </div>
  );
};

const MainPartnerInstitute = () => {
  const { data: partnerInstitutes } = useGetEducationPartnerInstitute();

  if (isEmptyArray(partnerInstitutes)) {
    return (
      <p className="text-center py-10 text-gray-500">No partner available</p>
    );
  }

  return (
    <div className="px-6 py-10 relative">
      <div className="w-11/12 md:w-4/5 mx-auto space-y-8">
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white">
          Our Partner Institutes
        </h2>
        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="!pb-10"
            loop
          >
            {partnerInstitutes.map((partner, index) => (
              <SwiperSlide key={index}>
                <PartnerCard {...partner} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MainPartnerInstitute;
