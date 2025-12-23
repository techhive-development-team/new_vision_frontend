import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/common/Layout";
import HappeningDetailCard from "../../components/happenings/HappeningDetailCard";
import { useGetHappeningTypeById } from "../../hooks/useGetImage";
import { API_URLS, imageUrl } from "../../client/url";
import Loader from "@/components/common/Loader";
import HappeningContext from "@/components/happenings/HappeningContext";
import NotFoundData from "@/components/common/NotFoundData";
import { ChevronLeft } from "lucide-react";

const HappeningByCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const limit = 6;
  const { data, total, isLoading } = useGetHappeningTypeById(
    Number(id),
    page,
    limit
  );

  // Smooth scroll to top on page change
  useEffect(() => {
    if (!isLoading && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, isLoading, isTransitioning]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [id]);

  if (isLoading && page === 1) return <Loader />;

  const happenings = data?.Happening || [];
  const typeName = data?.typeName || "Happenings";

  if (!happenings.length && !isLoading) {
    return <NotFoundData data="No happenings found for this category." />;
  }

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
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
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <Layout>
      <button
        onClick={() => navigate(-1)}
        className="fixed top-[100px] left-4 z-50
             flex items-center justify-center
             w-12 h-12
             rounded-full
             bg-black
             text-white
             shadow-xl
             hover:scale-110 active:scale-100
             transition-transform"
      >
        <ChevronLeft size={25} className="text-white" />
      </button>

      <HappeningContext />
      <div className="container mx-auto p-4 ">
        <motion.div
          className="pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="inline-block border-b-2 border-black dark:border-new-vision-yellow">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                {typeName}
              </h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {total} {total === 1 ? "happening" : "happenings"} found
            </p>
          </div>
        </motion.div>
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
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={container}
          >
            {happenings.map((item, index) => (
              <motion.div
                key={`${item.id}-${page}`}
                variants={fadeUp}
                custom={index}
              >
                <HappeningDetailCard
                  item={{
                    id: item.id,
                    name: item.title,
                    mainImage: item.mainImage
                      ? `${imageUrl}${API_URLS.HAPPENING}/${item.mainImage}`
                      : "/images/a1.jpeg",
                    description: item.description,
                    postedDate: new Date(item.createdAt).toLocaleDateString(),
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        {totalPages > 1 && (
          <motion.div
            className="flex flex-col items-center gap-4 mt-8 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <nav
              aria-label="Pagination"
              className="inline-flex -space-x-px rounded-lg shadow-sm"
            >
              <button
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Previous page"
                className="relative inline-flex items-center rounded-l-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
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
                    aria-label={`Go to page ${p}`}
                    aria-current={page === p ? "page" : undefined}
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
                aria-label="Next page"
                className="relative inline-flex items-center rounded-r-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {totalPages}
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default HappeningByCategory;
