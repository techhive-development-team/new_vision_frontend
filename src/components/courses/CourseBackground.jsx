import React from "react";
import { useGetCourse } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";
import { Link } from "react-router-dom";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const CourseBackground = () => {
  const { data } = useGetCourse();

  if (!data) return null;

  const { opened = [], closed = [] } = data;

  const renderCourses = (courses) => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-200"
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`}
              alt={course.name}
            />
          </div>
          <div className="p-5 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {course.name}{course.level && ` (${course.level})`}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span>{course.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-gray-400" />
                <span>{course.price} MMK</span>
              </div>
            </div>
            {course.expireDate && course.isOpened && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                <p className="text-xs text-gray-600">
                  <strong>Deadline:</strong>{" "}
                  {new Date(course.expireDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
            <div className="pt-2">
              <Link
                to={`/courses/${course.id}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-new-vision-yellow border border-gray-300 rounded-md hover:bg-new-vision-yellow/80 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );

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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Courses
            </h1>
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
                <span className="text-sm">Total: {opened.length + closed.length}</span>
              </div>
            </div>
            <p className="text-base text-gray-200 leading-relaxed max-w-2xl">
              Explore the rich history of New Vision Art & Science Institute
              through our courses. From beginner to advanced, our programs are
              designed to enhance your skills and knowledge.
            </p>
          </div>
        </div>
      </div>
      {opened.length === 0 && closed.length === 0 && (
        <div className="flex items-center justify-center py-24">
          <p className="text-center text-gray-400 text-lg">
            No courses available at the moment.
          </p>
        </div>
      )}
      {opened.length > 0 && (
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                Opening Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                These courses are currently accepting new students. Register now to secure your spot.
              </p>
            </div>
            {renderCourses(opened)}
          </div>
        </section>
      )}
      {closed.length > 0 && (
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                Closed Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                These courses have completed their registration period. Stay tuned for future offerings!
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