import React from "react";

const CourseBackground = () => {
  return (
    <div>
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/images/a1.jpeg"
            alt="Courses"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Courses
            </h4>
            <p className="text-base text-gray-200 leading-relaxed max-w-2xl mb-2">
              Explore the rich history of New Vision Art & Science Institute
              through our courses. From beginner to advanced, our programs are
              designed to enhance your skills and knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBackground;
