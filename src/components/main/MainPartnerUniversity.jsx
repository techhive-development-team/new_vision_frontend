import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetEducationPartnerUniversity } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";

const MainPartnerUniversity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const { data: universities } = useGetEducationPartnerUniversity();

  useEffect(() => {
    if (!universities || universities.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % universities.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [universities]);

  if (!universities || universities.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">No universities available</p>
    );

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
            src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${uni.bg_img}`}
            alt={uni.name}
            className="h-44 md:h-72 w-full max-w-md object-cover rounded-xl shadow-md"
          />

          <div className="max-w-xl text-left md:text-left space-y-4">
            <h3 className="text-2xl font-bold">{uni.name}</h3>
            <p className="text-lg text-gray-500">{uni.location}</p>
            <p className="text-md text-gray-700">{uni.overview}</p>
            <Link
              to="#"
              className="inline-block border border-new-vision-yellow text-black bg-new-vision-yellow font-base px-6 py-2 rounded-2xl hover:bg-black hover:text-new-vision-yellow transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPartnerUniversity;
