import React from "react";
import { useGetCourse } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";
import { Link } from "react-router-dom";

const CourseBackground = () => {
  const { data, isLoading, error } = useGetCourse();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg text-gray-600">Loading courses...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 text-lg font-medium">
            Error loading courses
          </p>
          <p className="text-red-500 mt-2">Please try again later</p>
        </div>
      </div>
    );

  if (!data) return null;

  const { opened = [], closed = [] } = data;

  const renderCourses = (courses) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <div
          key={course.id}
          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
        >
          {/* Course Image */}
          <div className="relative overflow-hidden h-48">
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`}
              alt={course.name}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

            {/* Course Level Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                {course.level}
              </span>
            </div>

            {/* Price Badge */}
            {course.price && (
              <div className="absolute top-3 right-3">
                <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                  {course.price} MMK
                </span>
              </div>
            )}
          </div>

          {/* Course Content */}
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {course.name}
            </h3>

            {/* Skills */}
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                Skills you'll gain:
              </p>
              <div className="flex flex-wrap gap-1">
                {course.skills.slice(0, 2).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {course.skills.length > 2 && (
                  <span className="text-blue-600 dark:text-blue-400 text-xs px-2 py-1">
                    +{course.skills.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Course Details */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {course.duration}
              </div>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {course.location}
              </div>
            </div>

            {/* Expire Date */}
            {course.expireDate && (
              <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-md p-2">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>Expires:</strong>{" "}
                  {new Date(course.expireDate).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Action Button */}
            <Link
              to={`/courses/${course.id}`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative bg-[url('/images/a1.jpeg')] bg-cover bg-center text-white">
        <div className="container mx-auto">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div className="relative z-10 flex flex-col justify-center md:flex-row items-center md:items-start p-6 space-y-4 md:space-y-0 md:space-x-6 min-h-[18rem]">
            <div className="md:w-1/2 text-left">
              <h1 className="text-3xl md:text-4xl text-new-vision-yellow font-bold mb-4">
                Courses
              </h1>

              {/* Stats */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-new-vision-green rounded-full"></div>
                  <span className="text-base text-new-vision-yellow">
                    Open Courses: {opened.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-base text-new-vision-yellow">
                    Closed Courses: {closed.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-new-vision-latte rounded-full"></div>
                  <span className="text-base text-new-vision-yellow">
                    Total Courses: {opened.length + closed.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-end mt-4 md:mt-0">
              <p className="text-base md:text-lg text-new-vision-yellow leading-relaxed">
                Explore the rich history of New Vision Art & Science Institute
                through our courses. From beginner to advanced, our programs are
                designed to enhance your skills and knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Courses Section */}
      {opened.length > 0 && (
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full font-semibold mb-4">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Currently Open for Registration</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Opening Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Don't miss out! These courses are currently accepting new
                students. Register now to secure your spot.
              </p>
            </div>
            {renderCourses(opened)}
          </div>
        </section>
      )}

      {/* Closed Courses Section */}
      {closed.length > 0 && (
        <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full font-semibold mb-4">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Registration Closed</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Closed Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                These courses have completed their registration period. Stay
                tuned for future offerings!
              </p>
            </div>
            {renderCourses(closed)}
          </div>
        </section>
      )}

      {/* No Courses Message */}
      {opened.length === 0 && closed.length === 0 && (
        <section className="py-20 px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No Courses Available
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check back soon for new course offerings!
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CourseBackground;
