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

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDay = (day) => {
    return day.charAt(0) + day.slice(1).toLowerCase();
  };

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
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
          {[
            {
              icon: Clock,
              label: "Duration",
              value: course?.duration,
            },
            {
              icon: CircleDollarSign,
              label: "Fees",
              value: course?.price ? `${course.price} MMK` : null,
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
                : null,
            }, {
              icon: MapPin,
              label: "Location",
              value: {
                online: "Online",
                onsite: "Campus",
              }[course?.location] || course?.location,
            },
            {
              icon: ChartColumnStacked,
              label: "Level",
              value: course?.level,
            },
          ]
            .filter(card => card.value)
            .map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 text-center"
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
      {course?.schedules?.length > 0 && (
        <motion.section
          className="max-w-5xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 pb-8 sm:pb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Class Schedule
            </h2>

            <div className="space-y-3">
              {course.schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-blue-100 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {formatDay(schedule.day)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">Weekly class</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700 ml-11 sm:ml-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">
                      {formatTime(schedule.startTime)} -{" "}
                      {formatTime(schedule.endTime)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </Layout>
  );
};

export default CourseDetail;
