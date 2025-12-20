import React from "react";

const HappeningContext = ({ data, loading }) => {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          src="../../images/happening.jpeg"
          alt="Events"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative container mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Events
          </h4>
          <p className="text-base text-gray-200 leading-relaxed max-w-2xl">
            Explore the rich history of New Vision Art & Science Institute
            through our past events. From insightful workshops to inspiring
            guest lectures, our archives showcase the knowledge and experiences
            shared by our vibrant community. Dive into the highlights and relive
            the moments that have shaped our college.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HappeningContext;
