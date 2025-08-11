import React from "react";
import HappeningDetailCard from "./HappeningDetailCard";
import { Link, useNavigate } from "react-router-dom";

const HappeningCard = ({ events }) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4">
      {events.map((event, index) => (
        <>
          <div key={index} className="py-6">
            <div className="pb-4">
              <div className="inline-block border-b-2 border-black dark:border-new-vision-yellow">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {event.name || "Students Showcase"}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.items.map((item, itemIndex) => (
                <HappeningDetailCard key={itemIndex} item={item} />
              ))}
            </div>
          </div>
          <div className="flex items-end justify-end">
            <Link className="text-md ml-4 text-white" to={`/happening/category`}>
              View More   &rarr;
            </Link>
          </div>
        </>
      ))}
    </div>
  );
};

export default HappeningCard;
