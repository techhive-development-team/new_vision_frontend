import React, { useEffect, useState } from "react";

const universities = [
  {
    name: "Harvard University",
    location: "Cambridge, Massachusetts, USA",
    description:
      "At New Vision Art & Science Institute, we are proud of our students' academic success and global recognition. Our graduates have earned admissions — many with scholarships and prestigious government grants — to top institutions around the world...",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "University of Tokyo",
    location: "Tokyo, Japan",
    description:
      "The University of Tokyo was established in 1877 as the first national university in Japan. As a leading research university, UTokyo offers courses in essentially all academic disciplines...",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Oxford University",
    location: "Oxford, United Kingdom",
    description:
      "The University of Yangon, founded in 1920, is the earliest university in Myanmar and has played an important role in the life of the nation through educating future leaders...",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
  },
];

const MainPartnerUniversity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % universities.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const uni = universities[currentIndex];

  return (
    <div className="px-6 py-10 bg-new-vision-latte relative">
      <div className="w-11/12 md:w-4/5 mx-auto space-y-10">
        <h2 className="text-2xl font-semibold text-center">
          Our Partner Universities
        </h2>

        <div
          className={`transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          } flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center gap-10`}
        >
          <img
            src={uni.image}
            alt={uni.name}
            className="h-44 md:h-72 w-full max-w-md object-cover rounded-xl shadow-md"
          />

          <div className="max-w-xl text-left md:text-left space-y-4">
            <h3 className="text-2xl font-bold">{uni.name}</h3>
            <p className="text-lg text-gray-500">{uni.location}</p>
            <p className="text-md text-gray-700">{uni.description}</p>
            <a
              href="#"
              className="inline-block border border-new-vision-yellow text-new-vision-yellow bg-black font-base px-6 py-2 rounded-2xl hover:opacity-90 hover:bg-transparent transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPartnerUniversity;
