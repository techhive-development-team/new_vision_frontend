import React from "react";

const CourseBackground = () => {
  return (
    <div className="bg-gray-200">
      <div className="relative bg-[url('src/assets/a1.jpeg')] bg-cover bg-center text-white">
        <div className="container mx-auto">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between p-8 space-y-6 md:space-y-0 md:space-x-8 min-h-[20rem]">
            <div className="md:w-1/2 text-left">
              <h1 className="text-3xl md:text-4xl text-yellow-300 font-bold">
                Courses
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
      {/* <section className="container mx-auto py-8 px-4">
        <h3 className="text-3xl text-black font-bold mb-6">Filter By</h3>

        <div className="flex flex-col md:flex-row md:items-end md:space-x-4 gap-4">
          <div className="w-full md:w-1/3">
            <label className="block text-black font-medium mb-1">Program</label>
            <select className="w-full rounded-lg border border-gray-300 p-2">
              <option value="">Programs</option>
              <option value="kidart">Art & Design Classes for Kids</option>
              <option value="adultart">Art & Design Classes for Adults</option>
              <option value="software">Software Classes</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-black font-medium mb-1">
              Language
            </label>
            <select className="w-full rounded-lg border border-gray-300 p-2">
              <option value="">Language</option>
              <option value="burmese">Burmese</option>
              <option value="english">English</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-black font-medium mb-1">Level</label>
            <select className="w-full rounded-lg border border-gray-300 p-2">
              <option value="">Level</option>
              <option value="level_1">Level 1</option>
              <option value="level_2">Level 2</option>
              <option value="level_3">Level 3</option>
            </select>
          </div>

          <div className="w-full md:w-auto">
            <button className="bg-new-vision-yellow text-black mt-2 md:mt-6 px-6 py-2 rounded-xl border border-black transition duration-300 w-full md:w-auto hover:bg-black hover:text-white">
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-8 px-4">
        <h3 className="text-3xl text-black font-bold mb-6">Opening Courses</h3>
        <div className="flex justify-center p-4">
          <div className="flex flex-col max-w-sm border border-black rounded-2xl bg-white shadow-md p-6 space-y-4">
            <img
              className="w-full h-48 object-cover rounded-xl"
              src="src/assets/a4.jpeg"
              alt="Architecture Level 1"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              Architecture Level 1
            </h1>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Skills you'll gain:</span> Point,
              Line, Shape, Form, Texture, Pattern, Tone, Rhythm of Art,
              Structural Sketch, Value Sketches, Black and White Sketches,
              Contour Sketches, Color Theory.
            </p>
            <p className="text-gray-800 font-medium">💰 Price: 665,000 MMK</p>
            <p className="text-gray-600 text-sm">
              👶 Beginner • 🎯 Specialization • ⏳ 3 months • 🌐 Online
            </p>
            <p className="text-red-600 text-sm font-semibold">
              📅 Enquiry Last Date: 13th Dec 2025
            </p>
          </div>

          

          
        </div>
      </section> */}
    </div>
  );
};

export default CourseBackground;
