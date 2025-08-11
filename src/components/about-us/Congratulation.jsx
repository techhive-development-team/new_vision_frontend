import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  image,
  universityLogo,
  universityName,
  studentName,
  bachelor,
  batch,
}) => {
  return (
    <div className="rounded-xl shadow bg-white overflow-hidden text-center border border-gray-200 w-full max-w-[280px] mx-auto">
      <img
        src={image}
        alt="Partner Banner"
        className="w-full h-48 md:h-56 lg:h-60 object-cover"
      />
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg md:text-xl font-semibold">{studentName}</h3>
        <p className="text-xs md:text-sm font-light">{batch}</p>
        <div className="flex items-center space-x-3 justify-center">
          <img
            src={universityLogo}
            alt="University Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-xl"
          />
          <p className="text-xs md:text-sm font-light">{universityName}</p>
        </div>
        <p className="text-xs md:text-sm font-light">{bachelor}</p>
        <Link
          to="#"
          className="inline-block border border-gray-400 text-black font-base px-4 py-2 rounded-2xl hover:opacity-90 hover:bg-black hover:text-yellow-400 transition text-sm md:text-base"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const Congratulations = () => {
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
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto relative">
      <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-6 text-center">
        Congratulations
      </h3>
      <Slider {...settings}>
        {congratulations.map((congrate, index) => (
          <div key={index} className="px-2">
            <CongratulationCard {...congrate} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Congratulations;
