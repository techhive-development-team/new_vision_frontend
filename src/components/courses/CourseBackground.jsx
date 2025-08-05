import React from "react";

const openingCourses = [
  {
    id: 1,
    title: "Architecture Level 1",
    location: "Online",
    fees: "365000",
    duration: "3 months",
    level: "Beginner",
    description:
      "Skill you'll gain: Point, Line, Shape, Form, Texture, Pattern, Color Theory, Composition.",
    image: "/images/a4.jpeg",
    expireDate: "13th Dec 2025",
  },
  {
    id: 2,
    title: "Architecture Level 2",
    location: "Campus",
    fees: "765000",
    duration: "3 months",
    level: "Advanced",
    description:
      "Skill you'll gain: Point, Line, Shape, Form, Texture, Pattern, Color Theory, Composition.",
    image: "/images/a5.jpeg",
    expireDate: "13th Sep 2025",
  },
];

const courses = [
  {
    id: 1,
    title: "Architecture Level 1",
    location: "Online",
    fees: "365000",
    duration: "3 months",
    level: "Beginner",
    description:
      "Skill you'll gain: Point, Line, Shape, Form, Texture, Pattern, Color Theory, Composition.",
    image: "/images/a4.jpeg",
    expireDate: "13th Dec 2025",
  },
  {
    id: 2,
    title: "Architecture Level 2",
    location: "Campus",
    fees: "765000",
    duration: "3 months",
    level: "Advanced",
    description:
      "Skill you'll gain: Point, Line, Shape, Form, Texture, Pattern, Color Theory, Composition.",
    image: "/images/a5.jpeg",
    expireDate: "13th Sep 2025",
  },
  {
    id: 3,
    title: "Lumion",
    location: "Campus",
    fees: "765000",
    duration: "3 months",
    level: "Advanced",
    description:
      "Skill you'll gain: Point, Line, Shape, Form, Texture, Pattern, Color Theory, Composition.",
    image: "/images/a5.jpeg",
    expireDate: "13th Sep 2025",
  },
  {
    id: 4,
    title: "Portfolio Preparation",
    location: "Campus",
    fees: "765000",
    duration: "3 months",
    level: "Advanced",
    description:
      "Skill you'll gain: Point, Line, Shape, Form, Texture, Pattern, Color Theory, Composition.",
    image: "/images/a5.jpeg",
    expireDate: "13th Sep 2025",
  },
  {
    id: 5,
    title: "Sketchup",
    location: "Campus",
    fees: "765000",
    duration: "3 months",
    level: "Advanced",
    description:
      "Skill you'll gain: Point, Line, Shape, Form, Texture, Pattern, Color Theory, Composition.",
    image: "/images/a5.jpeg",
    expireDate: "13th Sep 2025",
  },
];

const CourseBackground = () => {
  return (
    <div className="">
      <div className="relative bg-[url('/images/a1.jpeg')] bg-cover bg-center text-white">
        <div className="container mx-auto">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div className="relative z-10 flex flex-col justify-center md:flex-row items-center md:items-start p-8 space-y-6 md:space-y-0 md:space-x-8 min-h-[20rem]">
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
      <section className="container mx-auto p-4">
        <div className="inline-block border-b-2 border-new-vision-yellow mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Filter By</h2>
        </div>

        <div className="flex flex-col justify-center md:flex-row md:items-end md:space-x-4 gap-4">
          <div className="w-full md:w-1/3">
            <label className="block text-white font-medium mb-1" name="program">
              Program
            </label>
            <select className="w-full rounded-lg border border-gray-300 p-2 bg-white">
              <option value="">Programs</option>
              <option value="kidart">Art & Design Classes for Kids</option>
              <option value="adultart">Art & Design Classes for Adults</option>
              <option value="software">Software Classes</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-white font-medium mb-1">
              Language
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 bg-white"
              name="language"
            >
              <option value="">Language</option>
              <option value="burmese">Burmese</option>
              <option value="english">English</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-white font-medium mb-1">Level</label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 bg-white"
              name="level"
            >
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
      <section className="container mx-auto p-4">
        <div className="inline-block border-b-2 border-new-vision-yellow mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Opening Courses
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openingCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col space-y-3 border border-black rounded-2xl p-6 md:p-5 lg:p-6 shadow-md bg-white hover:shadow-xl transition-all duration-300"
            >
              <img
                className="w-full h-48 object-cover rounded-xl"
                src={course.image}
                alt={course.title}
              />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold pl-1">
                {course.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl pl-1">
                {course.description}
              </p>
              <p className="text-base md:text-lg lg:text-xl pl-1">
                <strong>Price:</strong> {course.fees} MMK
              </p>
              <p className="text-base md:text-lg lg:text-xl pl-1">
                • {course.level} • {course.duration} • {course.location}
              </p>
              <p className="text-base md:text-lg lg:text-xl pl-1">
                <strong>Expire Date:</strong> {course.expireDate}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto p-4">
        <div className="inline-block border-b-2 border-new-vision-yellow mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col space-y-3 border border-black rounded-2xl p-6 md:p-5 lg:p-6 shadow-md bg-white hover:shadow-xl transition-all duration-300"
            >
              <img
                className="w-full h-48 object-cover rounded-xl"
                src={course.image}
                alt={course.title}
              />
              <h1 className="text-xl md:text-xl lg:text-2xl font-bold pl-1">
                {course.title}
              </h1>
              <p className="text-base md:text-md lg:text-lg pl-1">
                {course.description}
              </p>
              <p className="text-base md:text-md lg:text-lg pl-1">
                • {course.level} • {course.duration} • {course.location}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseBackground;
