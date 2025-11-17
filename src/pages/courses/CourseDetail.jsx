import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import {
  Calendar,
  ChartColumnStacked,
  CircleDollarSign,
  Clock,
  MapPin,
} from "lucide-react";
import { useGetCourseById } from "../../hooks/useGetImage";
import { Link, useParams } from "react-router-dom";
import { API_URLS, imageUrl } from "../../client/url";
import { motion, AnimatePresence } from "framer-motion";
import NotFoundData from "@/components/common/NotFoundData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.4 } },
};

const CourseDetail = () => {
  const { id } = useParams();
  const { data: course } = useGetCourseById(id);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!course?.name) return <NotFoundData data={"Course not found."} />;

  return (
    <Layout>
      <motion.div
        className="relative w-full h-64 md:h-80 bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <img
          src={
            course?.image
              ? `${imageUrl}${API_URLS.COURSE}/${course.image}`
              : "/images/a1.jpeg"
          }
          alt={course?.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h4 className="text-3xl md:text-4xl font-bold text-white text-center">
            {course?.name || "Course Detail"}
          </h4>
        </div>
      </motion.div>
      <motion.div
        className="max-w-5xl mx-auto mt-8 px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              icon: Clock,
              label: "Duration",
              value: course?.duration || "N/A",
            },
            {
              icon: CircleDollarSign,
              label: "Fees",
              value: course?.price ? `${course.price} MMK` : "TBA",
            },
            {
              icon: Calendar,
              label: "Deadline",
              value: course?.expireDate
                ? new Date(course.expireDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
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
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 text-center"
              variants={fadeUp}
            >
              <card.icon className="w-5 h-5 text-gray-700 mb-2" />
              <p className="text-xs text-gray-500 mb-1">{card.label}</p>
              <p className="text-sm font-semibold text-gray-900">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-8 px-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {course?.quiz && (
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {showQuiz ? "Close Quiz" : "Check My Level"}
          </button>
        )}

        {course?.isOpened &&
          course?.expireDate &&
          new Date(course.expireDate) >= new Date() && (
            <Link
              to={`/courses/${course.id}/apply`}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Apply Now
            </Link>
          )}
      </motion.div>
      <AnimatePresence>
        {showQuiz && course?.quiz && (
          <motion.div
            key="quiz"
            className="max-w-5xl mx-auto mt-6 mb-12 px-6 rounded-lg overflow-hidden"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <iframe
              src={course.quiz}
              title="Course Quiz"
              className="w-full h-[600px] border-0"
              allow="camera; microphone; autoplay; encrypted-media;"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.section
        className="max-w-5xl mx-auto mt-8 px-6 pb-12"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Program Overview
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
            {course?.programOverview}
          </p>
        </div>
      </motion.section>
    </Layout>
  );
};

export default CourseDetail;
