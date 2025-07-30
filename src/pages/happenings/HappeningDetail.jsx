import React from "react";
import Layout from "../../components/common/Layout";

const HappeningDetail = () => {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Image */}
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <img
            src="/src/assets/a1.jpeg"
            alt="Happening Detail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="container mx-auto p-6 md:p-10 max-w-5xl">
          <h3 className="font-bold text-3xl md:text-4xl mb-4 text-gray-800">
            Digital Campus Day
          </h3>
          <p className="text-lg text-gray-700 mb-3">
            Join us for our ONE World ONE Community Event
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            For a celebration that blends learning, culture, creativity, and
            belonging into one powerful shared space brought to life by the
            University of Europe for Applied Sciences – Dubai in partnership
            with the Sharjah Performing Arts Academy, and inspired by the UAE’s
            Year of Community 2025.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <img
                key={index}
                src={`/src/assets/${index + 1}.jpeg`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-40 object-cover shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HappeningDetail;
