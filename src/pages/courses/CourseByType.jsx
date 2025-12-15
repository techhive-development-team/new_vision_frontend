import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../../components/common/Layout";
import CourseBackground from "../../components/courses/CourseBackground";
import Loader from "../../components/common/Loader";
import CourseCard from "../../components/courses/CourseCard";
import SearchCourse from "../../components/courses/SearchCourse";
import { useGetCoursesByType } from "@/hooks/useGetImage";

const getPaginationRange = (page, totalPages) => {
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

const CourseByType = () => {
  const { type } = useParams();
  const [filters, setFilters] = useState({ name: "", level: "", location: "" });
  const [searchFilters, setSearchFilters] = useState({});
  const [page, setPage] = useState(1);
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
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (isLoading) return <Loader />;

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
            <h2 className="text-2xl font-bold capitalize mb-6">
              {type.replace("_", " ")}
            </h2>
          )}

          {courses.length === 0 ? (
            <p className="text-gray-600">No courses available.</p>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-8">
              <nav className="inline-flex -space-x-px rounded-lg shadow-sm">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-2 border rounded-l"
                >
                  ‹
                </button>

                {getPaginationRange(page, totalPages).map((p, idx) =>
                  p === "..." ? (
                    <span key={idx} className="px-4 py-2 border">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`px-4 py-2 border ${
                        page === p ? "bg-new-vision-yellow font-semibold" : "bg-white"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-2 border rounded-r"
                >
                  ›
                </button>
              </nav>

              <p className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CourseByType;
