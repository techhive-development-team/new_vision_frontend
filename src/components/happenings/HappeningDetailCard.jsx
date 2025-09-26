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
    <div key={itemIndex} className="bg-white rounded-lg shadow-lg p-4 border-gray-200 border">
      <img
        src={item.mainImage}
        alt={item.title || item.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
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
          className="text-sm ml-4 text-black p-2 border rounded-xs"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HappeningDetailCard;
