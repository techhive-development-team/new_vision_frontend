import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/common/Layout";
import CourseBackground from "../../components/courses/CourseBackground";
import Loader from "../../components/common/Loader";
import CourseCard from "../../components/courses/CourseCard";
import SearchCourse from "../../components/courses/SearchCourse";
import { useGetCoursesByType } from "@/hooks/useGetImage";

const CourseByType = () => {
  const { type } = useParams();
  const [filters, setFilters] = useState({ name: "", level: "", location: "" });
  const [searchFilters, setSearchFilters] = useState({});
  const [page, setPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const limit = 6;

  const programType = type?.toUpperCase().replace(/\s+/g, "_");
  const locationEnum =
    filters.location === "Online"
      ? "online"
      : filters.location === "Onsite"
      ? "onsite"
      : undefined;

  const { courses, total, isLoading } = useGetCoursesByType({
    programType,
    name: searchFilters.name,
    level: searchFilters.level,
    location: searchFilters.location,
    page,
    limit,
  });

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  useEffect(() => {
    setPage(1);
    setSearchFilters({});
  }, [type]);

  useEffect(() => {
    if (!isLoading && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, isLoading, isTransitioning]);

  const handleSearch = () => {
    setSearchFilters({
      name: filters.name || undefined,
      level: filters.level || undefined,
      location: locationEnum,
    });
    setPage(1);
  };

  const handleReset = () => {
    setFilters({ name: "", level: "", location: "" });
    setSearchFilters({});
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage === page || newPage < 1 || newPage > totalPages) return;
    setIsTransitioning(true);
    setPage(newPage);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrev = () => handlePageChange(page - 1);
  const handleNext = () => handlePageChange(page + 1);

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  if (isLoading && page === 1) return <Loader />;

  return (
    <Layout>
      <CourseBackground programType={type} showOverview={false} />

      <SearchCourse
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />

      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {type && (
            <h2 className="text-2xl font-bold capitalize mb-6 text-black dark:text-white">
              {type.replace("_", " ")} – Opening Courses
            </h2>
          )}

          <AnimatePresence mode="wait">
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-new-vision-yellow"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {courses.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No courses available.
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                  },
                  exit: { opacity: 0, transition: { duration: 0.3 } },
                }}
              >
                {courses.map((course, index) => (
                  <motion.div
                    key={`${course.id}-${page}`}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                    }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex flex-col items-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <nav className="inline-flex -space-x-px rounded-lg shadow-sm">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  ‹
                </button>

                {getPaginationRange().map((p, idx) =>
                  p === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border transition-all duration-200 ${
                        page === p
                          ? "bg-new-vision-yellow text-gray-900 border-new-vision-yellow z-10 shadow-md"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-yellow-100 dark:hover:bg-yellow-900"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center rounded-r-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  ›
                </button>
              </nav>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CourseByType;
