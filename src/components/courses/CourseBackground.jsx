import React from "react";
import { useGetCourse } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";
import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";

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
      {courses.map((course) => (
        <div
          key={course.id}
          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-new-vision-yellow/60"
        >
          <div className="relative overflow-hidden h-48 md:h-56 xl:h-64">
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`}
              alt={course.name}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            <div className="absolute top-3 left-3">
              <span className="bg-new-vision-yellow text-black px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                {course.level}
              </span>
            </div>
            {course.price && (
              <div className="absolute top-3 right-3">
                <span className="bg-black text-new-vision-yellow px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                  {course.price} MMK
                </span>
              </div>
            )}
          </div>
          <div className="p-5 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-new-vision-green transition-colors duration-200">
              {course.name}
            </h3>
            <div>
              <p className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                Skills you'll gain:
              </p>
              <div className="flex flex-wrap gap-1">
                {course.skills.slice(0, 2).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-new-vision-yellow/20 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {course.skills.length > 2 && (
                  <span className="text-new-vision-yellow text-xs px-2 py-1">
                    +{course.skills.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Duration & Location */}
            <div className="text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex items-center">
                <Clock size={18} className="mr-4" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-4" />
                {course.location}
              </div>
            </div>

            {/* Expire Date */}
            {course.expireDate && (
              <div className="bg-new-vision-yellow/10 border border-new-vision-yellow/40 rounded-md p-2">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Expires:</strong>{" "}
                  {new Date(course.expireDate).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <Link
              to={`/courses/${course.id}`}
              className="block w-full text-center bg-new-vision-yellow rounded-xl hover:bg-black hover:border-new-vision-yellow hover:border hover:text-white text-black font-medium py-2 px-4 transition-colors duration-200"
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
      <div className="relative bg-[url('/images/a1.jpeg')] bg-cover bg-center text-white">
        <div className="container mx-auto">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div className="relative z-10 flex flex-col justify-center md:flex-row items-center md:items-start p-6 space-y-4 md:space-y-0 md:space-x-6 min-h-[18rem]">
            <div className="md:w-1/2 text-left">
              <h1 className="text-3xl md:text-4xl text-new-vision-yellow font-bold mb-4">
                Courses
              </h1>
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
      {opened.length > 0 && (
        <section className="p-8 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-left mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Opening Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Don't miss out! These courses are currently accepting new
                students. Register now to secure your spot.
              </p>
            </div>
            {renderCourses(opened)}
          </div>
        </section>
      )}
      {closed.length > 0 && (
        <section className="pb-8 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-left mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Closed Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                These courses have completed their registration period. Stay
                tuned for future offerings!
              </p>
            </div>
            {renderCourses(closed)}
          </div>
        </section>
      )}
    </div>
  );
};

export default CourseBackground;
