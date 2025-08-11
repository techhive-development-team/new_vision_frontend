import React from "react";
import { Link } from "react-router-dom";

const HappeningDetailCard = ({ item, itemIndex }) => {
  return (
    <div key={itemIndex} className="bg-white rounded-lg shadow-lg p-4 border-gray-200 border">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
      <p className="text-gray-600">{item.description}</p>
      <div className="mt-2 flex flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mt-2">Posted: {item.postedDate}</p>
        <Link to={`/happening/${item.id}`} className="text-sm ml-4 text-black p-2 border rounded-xs">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HappeningDetailCard;
