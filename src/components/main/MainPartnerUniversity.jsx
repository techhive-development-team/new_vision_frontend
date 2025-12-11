import React, { useEffect, useState } from "react";
import { API_URLS, imageUrl } from "../../client/url";

const MainPartnerUniversity = ({ data, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading universities...</p>;
  }
  if (!data || data.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">
        No universities available
      </p>
    );

  const uni = data[currentIndex];

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
          <div className="relative w-full max-w-md overflow-hidden rounded-xl shadow-md bg-gray-200">
            <img
              src={`${imageUrl}${API_URLS.EDUCATION_PARTNER}/${uni.bg_img}`}
              alt={uni.name}
              className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="max-w-xl text-left md:text-left space-y-4">
            <h3 className="text-2xl font-bold">{uni.name}</h3>
            <p className="text-lg text-gray-500">{uni.location}</p>
            <p className="text-md text-gray-700">
              {uni.overview.substring(0, 300)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPartnerUniversity;
