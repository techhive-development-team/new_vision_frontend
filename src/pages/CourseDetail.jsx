import React from "react";
import Layout from "../components/common/Layout";
import {
  Calendar,
  ChartColumnStacked,
  CircleDollarSign,
  Clock,
  MapPin,
} from "lucide-react";
import { useGetCourseById } from "../hooks/useGetImage";
import { Link, useParams } from "react-router-dom";
import { API_URLS, baseUrl } from "../client/url";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CourseDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetCourseById(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course.</p>;
  if (!data) return <p>No course found.</p>;

  const course = data;

  return (
    <Layout>
      {/* Hero Image */}
      <motion.div
        className="relative h-64 md:h-96 w-full"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
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
      </motion.div>

      {/* Course Info Cards */}
      <motion.div
        className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-5 gap-4 px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {[
          { icon: Clock, label: "Duration", value: course?.duration || "N/A" },
          {
            icon: CircleDollarSign,
            label: "Fees",
            value: course?.price ? `${course.price} MMK` : "To be announced",
          },
          {
            icon: Calendar,
            label: "Application Deadline",
            value: course?.expireDate
              ? new Date(course.expireDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not set",
          },
          ...(course?.location
            ? [{ icon: MapPin, label: "Location", value: course.location }]
            : []),
          {
            icon: ChartColumnStacked,
            label: "Level",
            value: course?.level || "N/A",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:border-new-vision-yellow transition-colors"
            variants={fadeUp}
          >
            <card.icon className="w-6 h-6 text-black mb-2" />
            <p className="font-medium text-gray-700 mb-1">{card.label}</p>
            <p className="font-semibold text-gray-900">{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-col md:flex-row justify-center gap-4 mt-6 px-6 md:px-0"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {course?.quiz && (
          <Link
            to={course.quiz}
            target="_blank"
            className="py-3 px-6 bg-new-vision-yellow text-black font-medium rounded-2xl hover:bg-black hover:text-white border border-new-vision-yellow transition-colors duration-200 text-center"
          >
            Check My Level
          </Link>
        )}
        {course?.isOpened && (
          <Link
            to={`/courses/${course.id}/apply`}
            className="py-3 px-6 bg-new-vision-yellow text-black font-medium rounded-2xl hover:bg-black hover:text-white border border-new-vision-yellow transition-colors duration-200 text-center"
          >
            Apply Now
          </Link>
        )}
      </motion.div>

      {/* Program Overview */}
      <motion.section
        className="max-w-6xl mx-auto mt-6 px-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Program Overview
          </h3>
          <p className="text-base md:text-lg text-gray-700">
            {course?.programOverview}
          </p>
        </div>
      </motion.section>

      {/* Skills */}
      {course?.skills?.length > 0 && (
        <motion.section
          className="max-w-6xl mx-auto mt-6 p-6 mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Skill Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-new-vision-yellow/20 text-yellow-800 px-3 py-1 rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </Layout>
  );
};

export default CourseDetail;
