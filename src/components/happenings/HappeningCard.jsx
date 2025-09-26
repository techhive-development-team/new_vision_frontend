import React from "react";
import HappeningDetailCard from "./HappeningDetailCard";
import { useNavigate } from "react-router-dom";

const HappeningCard = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      {events.map((event) => (
        <div key={event.id} className="py-6">
          <div className="pb-4">
            <div className="inline-block border-b-2 border-black dark:border-new-vision-yellow">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                {event.name || "Category"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.items.slice(0, 3).map((item) => (
              <HappeningDetailCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex items-end justify-end mt-4">
            <button
              className="text-md ml-4 text-blue hover:underline"
              onClick={() => {
                localStorage.setItem("selectedHappeningTypeId", event.id);
                navigate("/happening/category");
              }}
            >
              View More &rarr;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HappeningCard;
