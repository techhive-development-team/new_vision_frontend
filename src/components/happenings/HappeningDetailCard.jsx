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
      className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="w-full aspect-[20/9] rounded-lg overflow-hidden mb-4">
        <img
          src={item.mainImage}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {item.title || item.name}
      </h3>
      <p className="text-gray-600">
        {truncateDescription(item.description, 10)}
      </p>
      <div className="mt-2 flex flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mt-2">Posted: {item.postedDate}</p>
        <Link
          to={`/happening/${item.id}`}
          className="relative overflow-hidden text-sm ml-4 text-black p-2 border rounded-xs before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-black before:z-0 before:transition-all before:duration-300 hover:before:w-full hover:text-white"
        >
          <span className="relative z-10">View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default HappeningDetailCard;
