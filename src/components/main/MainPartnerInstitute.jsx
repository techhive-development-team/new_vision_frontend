import { GraduationCap } from "lucide-react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const partnerInstitutes = [
  {
    name: "Harvard University",
    description:
      "Prestigious Ivy League university known for innovation and leadership.",
    logo: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    classType: "Ivy League",
    type: "Private University",
    earning: "Founded in 1636",
  },
  {
    name: "MIT",
    description:
      "Leader in technology and innovation, known globally for its impact.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    classType: "STEM Excellence",
    type: "Private University",
    earning: "Founded in 1861",
  },
  {
    name: "Stanford University",
    description: "A hub of entrepreneurship and innovation in Silicon Valley.",
    logo: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    classType: "Tech Pioneer",
    type: "Private University",
    earning: "Founded in 1885",
  },
  {
    name: "University of Oxford",
    description:
      "One of the oldest and most prestigious universities in the world.",
    logo: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    classType: "Classical Education",
    type: "Public University",
    earning: "Founded in 1096",
  },
];

const PartnerCard = ({ image, logo, name, classType, type, earning }) => {
  return (
    <div className="rounded-xl shadow-xl bg-white overflow-hidden">
      <img
        src={image}
        alt="Partner Banner"
        className="w-full h-52 object-cover"
      />
      <div className="p-4 flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Partner Logo"
            className="w-12 h-12 object-contain rounded-xl"
          />
          <p className="text-sm font-light">{name}</p>
        </div>
        <h3 className="text-2xl font-semibold">{classType}</h3>
        <div className="flex items-center space-x-4">
          <GraduationCap className="w-5 h-5" />
          <p className="text-sm font-light">{earning}</p>
        </div>
        <p className="text-sm font-light">{type}</p>
      </div>
    </div>
  );
};

const MainPartnerInstitute = () => {
  return (
    <div className="px-6 py-10 relative">
      <div className="w-11/12 md:w-4/5 mx-auto space-y-8">
        <h2 className="text-2xl font-semibold text-center text-white">Our Partner Institutes</h2>
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
