import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const congratulations = [
  {
    universityName: "Harvard University",
    description:
      "Prestigious Ivy League university known for innovation and leadership.",
    universityLogo:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    studentName: "Ivy League",
    bachelor: "Bachelor of Arts",
    batch: "Founded in 1636",
  },
  {
    universityName: "MIT",
    description:
      "Leader in technology and innovation, known globally for its impact.",
    universityLogo:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_universityLogo.svg",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    studentName: "STEM Excellence",
    bachelor: "Bachelor of Science",
    batch: "Founded in 1861",
  },
  {
    universityName: "Stanford University",
    description: "A hub of entrepreneurship and innovation in Silicon Valley.",
    universityLogo:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    studentName: "Tech Pioneer",
    bachelor: "Bachelor of Science",
    batch: "Founded in 1885",
  },
  {
    universityName: "University of Oxford",
    description:
      "One of the oldest and most prestigious universities in the world.",
    universityLogo:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    studentName: "Classical Education",
    bachelor: "Public University",
    batch: "Founded in 1096",
  },
];

const CongratulationCard = ({
  image,
  universityLogo,
  universityName,
  studentName,
  bachelor,
  batch,
}) => {
  return (
    <div className="rounded-3xl shadow-xl bg-white overflow-hidden text-center">
      <img
        src={image}
        alt="Partner Banner"
        className="w-full h-60 object-cover"
      />
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-2xl font-semibold">{studentName}</h3>
        <p className="text-sm font-light">{batch}</p>
        <div className="flex items-center space-x-4 justify-center">
          <img
            src={universityLogo}
            alt="University Logo"
            className="w-12 h-12 object-contain rounded-xl"
          />
          <p className="text-sm font-light">{universityName}</p>
        </div>
        <p className="text-sm font-light">{bachelor}</p>
        <Link
          to="#"
          className="inline-block border border-black text-black font-base px-6 py-2 rounded-2xl hover:opacity-90 hover:bg-black hover:text-new-vision-yellow transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const Congratulations = () => {
  return (
    <div className="p-8">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">
        Congratulations
      </h3>
      <div className="relative">
        <Swiper
          spaceBetween={10}
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
          {congratulations.map((congrate, index) => (
            <SwiperSlide key={index}>
              <div className="max-w-sm mx-auto">
                <CongratulationCard {...congrate} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Congratulations;
