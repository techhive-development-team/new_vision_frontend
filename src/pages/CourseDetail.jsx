import React from "react";
import Layout from "../components/common/Layout";
import { Calendar, ChartColumnStacked, CircleDollarSign, Clock, MapPin } from "lucide-react";
import { useGetCourseById } from "../hooks/useGetImage";
import { Link, useParams } from "react-router-dom";
import { API_URLS, baseUrl } from "../client/url";

const CourseDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetCourseById(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course.</p>;
  if (!data) return <p>No course found.</p>;

  const course = data;

  return (
    <Layout>
      <div className="relative h-64 md:h-96 w-full">
        <img
          src={
            course?.image
              ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`
              : "/images/a1.jpeg"
          }
          alt={course?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-new-vision-yellow drop-shadow-lg">
            {course?.name || "Course Detail"}
          </h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-5 gap-4 px-6">
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-new-vision-yellow transition-colors">
          <Clock className="w-6 h-6 text-black dark:text-new-vision-yellow mb-2" />
          <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            Duration
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {course?.duration || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-new-vision-yellow transition-colors">
          <CircleDollarSign className="w-6 h-6 text-black dark:text-new-vision-yellow mb-2" />
          <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            Fees
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {course?.price ? `${course.price} MMK` : "To be announced"}
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-new-vision-yellow transition-colors">
          <Calendar className="w-6 h-6 text-black dark:text-new-vision-yellow mb-2" />
          <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            Application Deadline
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {course?.expireDate
              ? new Date(course.expireDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not set"}
          </p>
        </div>
        {course?.location && (
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-new-vision-yellow transition-colors">
            <MapPin className="w-6 h-6 text-black dark:text-new-vision-yellow mb-2" />
            <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">
              Level
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {course.location}
            </p>
          </div>
        )}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-new-vision-yellow transition-colors">
          <ChartColumnStacked className="w-6 h-6 text-black dark:text-new-vision-yellow mb-2" />
          <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            Level
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {course?.level || "N/A"}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-6 px-6 md:px-0">
        {course?.quiz && (
          <Link
            to={course.quiz}
            target="_blank"
            className="py-3 px-6 bg-new-vision-yellow text-black font-medium rounded-2xl hover:bg-black hover:text-new-vision-yellow border border-new-vision-yellow transition-colors duration-200 text-center"
          >
            Check My Level
          </Link>
        )}
        {course?.isOpened && (
          <Link
            to={`/courses/${course.id}/apply`}
            className="py-3 px-6 bg-new-vision-yellow text-black font-medium rounded-2xl hover:bg-black hover:text-new-vision-yellow border border-new-vision-yellow transition-colors duration-200 text-center"
          >
            Apply Now
          </Link>
        )}
      </div>

      <section className="max-w-6xl mx-auto mt-6 px-6 ">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Program Overview
          </h3>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-200">
            {course?.programOverview}
          </p>
        </div>
      </section>

      {/* Skills */}
      {course?.skills?.length > 0 && (
        <section className="max-w-6xl mx-auto mt-6 p-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Skill Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-new-vision-yellow/20 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default CourseDetail;
