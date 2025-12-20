import React from "react";
import { Link } from "react-router-dom";

const HappeningDetailCard = ({ item, itemIndex }) => {
  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div
      key={itemIndex}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors duration-200"
    >
      <div className="w-full aspect-[20/9] overflow-hidden bg-gray-100">
        <img
          src={item.mainImage}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div
          className="overflow-hidden"
          style={{ height: "100px" }} 
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {item.title || item.name}
          </h3>
          <p className="text-sm text-gray-600">
            {truncateDescription(item.description, 8)}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
          <p className="text-sm text-gray-500">Posted: {item.postedDate}</p>
          <Link
            to={`/happening/${item.id}`}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-new-vision-yellow border border-gray-300 rounded-md hover:bg-new-vision-yellow/80 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HappeningDetailCard;
