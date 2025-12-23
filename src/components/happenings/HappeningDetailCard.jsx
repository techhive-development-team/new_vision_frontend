import React from "react";
import { Link } from "react-router-dom";

const HappeningDetailCard = ({ item }) => {
  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <Link
      to={`/happening/${item.id}`}
      className="block relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-gray-100 rounded-t-xl">
        <img
          src={item.mainImage}
          alt={item.title || item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {item.title || item.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {truncateDescription(item.description, 12)}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
          <p className="text-sm text-gray-500">Posted: {item.postedDate}</p>
          <span className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-new-vision-yellow border border-gray-300 rounded-md hover:bg-new-vision-yellow/80 transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HappeningDetailCard;
