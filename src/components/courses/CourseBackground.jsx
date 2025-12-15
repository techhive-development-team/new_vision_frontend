import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const programTypeNames = {
  ART_DESIGN: "Art & Design",
  CHILDRENS_CREATIVE: "Children's Creative",
  TECHNOLOGY: "Technology",
};

const programTypeImages = {
  ART_DESIGN: "/images/a4.jpeg",
  CHILDRENS_CREATIVE: "/images/a5.jpeg",
  TECHNOLOGY: "/images/3.jpeg",
};

const CourseBackground = ({
  data,
  loading,
  programType,
  showOverview = true,
}) => {
  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">Loading courses...</p>
    );
  }

  const { opened = [], closed = [] } = data || {};
  const allCourses = [...opened, ...closed];

  const programTypes = programType
    ? [programType]
    : Array.from(new Set(allCourses.map((course) => course.programType)));

  return (
    <div>
      {/* Hero Section */}
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
            <div className="flex flex-wrap gap-4 mb-6 text-white">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Open: {opened.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Closed: {closed.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm">Total: {allCourses.length}</span>
              </div>
            </div>
            <p className="text-base text-gray-200 leading-relaxed max-w-2xl mb-2">
              Explore the rich history of New Vision Art & Science Institute
              through our courses. From beginner to advanced, our programs are
              designed to enhance your skills and knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Program Type Cards / Overview Section */}
      {showOverview && !programType && (
        <section className="py-12 px-6">
          <div className="px-6 w-11/12 md:w-4/5 mx-auto py-6">
            <h3 className="font-semibold text-2xl text-black mb-2">
              Overview of our study programs
            </h3>
            <p className="font-light text-black mb-6">
              We offer a wide range of state-recognised and accredited
              undergraduate and postgraduate study programmes.
            </p>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {programTypes.map((type) => (
                <motion.div
                  key={type}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer border border-gray-200 group"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={programTypeImages[type]}
                      alt={programTypeNames[type]}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-yellow-500/10"></div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-900 text-2xl font-bold tracking-wide mb-1">
                      {programTypeNames[type]}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-yellow-600">
                        {
                          allCourses.filter((c) => c.programType === type)
                            .length
                        }
                      </span>{" "}
                      Total Courses
                    </p>
                    <div className="flex justify-end mt-4">
                      <Link
                        to={`/courses/program/${type}`}
                        state={{ data: allCourses }}
                        className="text-sm font-medium text-yellow-600 flex items-center"
                      >
                        Explore Now
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CourseBackground;
