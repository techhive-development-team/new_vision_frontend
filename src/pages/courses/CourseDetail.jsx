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
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_URLS, imageUrl, baseUrl } from "../../client/url";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotFoundData from "@/components/common/NotFoundData";
import { ChevronLeft } from "lucide-react";

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
  const navigate = useNavigate();
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
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [loadingApply, setLoadingApply] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleApplicantChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (toast.message) {
      const t = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    const { name, email, description, phone } = applicant;
    if (!name || !email || !description || !phone) {
      setToast({
        message: "Please provide name, email, phone and description.",
        type: "error",
      });
      return;
    }

    setLoadingApply(true);
    setToast({ message: "", type: "" });

    try {
      await fetch(`${baseUrl}/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...applicant, courseId: course?.id }),
      });

      setToast({
        message: "Application submitted successfully!",
        type: "success",
      });
      setShowApplyModal(false);
      setApplicant({ name: "", email: "", phone: "", description: "" });
    } catch (err) {
      console.error("Error submitting application:", err);
      setToast({ message: "Failed to submit. Try again.", type: "error" });
    } finally {
      setLoadingApply(false);
    }
  };

  if (!course?.name) return <NotFoundData data={"Course not found."} />;

  return (
    <Layout>
      {toast.message && (
        <div
          className={`z-50 fixed top-20 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-500 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-6 z-[9999] w-12 h-12 rounded-full
                     bg-black text-white
                     flex items-center justify-center
                     shadow-lg
                     hover:scale-110 active:scale-100
                     transition-transform"
        aria-label="Go Back"
      >
        <ChevronLeft size={25} />
      </button>
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
            },
            {
              icon: MapPin,
              label: "Location",
              value:
                {
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
            .filter((card) => card.value)
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
            <button
              onClick={() => setShowApplyModal(true)}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Apply Now
            </button>
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
                      <p className="text-xs sm:text-sm text-gray-500">
                        Weekly class
                      </p>
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
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            key="apply-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowApplyModal(false)}
            />
            <motion.div
              className="relative w-full max-w-xl bg-white rounded-lg shadow-lg p-6 z-10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Apply for Course
              </h3>
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700">Course</label>
                  <input
                    value={course?.name || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Your Name *</label>
                  <input
                    name="name"
                    value={applicant.name}
                    onChange={handleApplicantChange}
                    className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={applicant.email}
                    onChange={handleApplicantChange}
                    className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Phone *</label>
                  <input
                    name="phone"
                    value={applicant.phone}
                    onChange={handleApplicantChange}
                    className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Description *</label>
                  <textarea
                    name="description"
                    placeholder="Briefly explain why you want to join (required)"
                    value={applicant.description}
                    onChange={handleApplicantChange}
                    className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-xl bg-new-vision-yellow text-black font-medium"
                    disabled={loadingApply}
                  >
                    {loadingApply ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default CourseDetail;
