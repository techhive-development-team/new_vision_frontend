import React from "react";

const HappeningContext = () => {
  return (
    <div className="relative bg-[url('../../images/a1.jpeg')] bg-cover bg-center text-white">
      <div className="container mx-auto">
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between p-8 space-y-6 md:space-y-0 md:space-x-8 min-h-[20rem]">
          <div className="md:w-1/2 text-left">
            <h1 className="text-3xl md:text-4xl text-yellow-300 font-bold">
              Events
            </h1>
          </div>
          <div className="md:w-1/2 flex justify-end mt-6 md:mt-0">
            <p className="text-lg md:text-xl text-yellow-300 leading-relaxed">
              Explore the rich history of New Vision Art & Science Institute
              through our past events. From insightful workshops to inspiring
              guest lectures, our archives showcase the knowledge and
              experiences shared by our vibrant community. Dive into the
              highlights and relive the moments that have shaped our college.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappeningContext;
