import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../../components/common/Layout";
import HappeningDetailCard from "../../components/happenings/HappeningDetailCard";
import { useGetHappeningTypeById } from "../../hooks/useGetImage";
import { API_URLS, imageUrl } from "../../client/url";
import Loader from "@/components/common/Loader";
import HappeningContext from "@/components/happenings/HappeningContext";
import NotFoundData from "@/components/common/NotFoundData";

const HappeningByCategory = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const limit = 6;
  const { data, total, isLoading } = useGetHappeningTypeById(
    Number(id),
    page,
    limit
  );

  if (isLoading) return <Loader />;

  const happenings = data?.Happening || [];
  const typeName = data?.typeName || "Happenings";

  if (!happenings.length) {
    return <NotFoundData data="No happenings found for this category." />;
  }

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <Layout>
      <HappeningContext />
      <div className="container mx-auto p-4">
        <div className="pb-4">
          <div className="inline-block border-b-2 border-black dark:border-new-vision-yellow">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
              {typeName}
            </h2>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {happenings.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <nav
              aria-label="Pagination"
              className="inline-flex -space-x-px rounded-md"
            >
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    page === p
                      ? "bg-indigo-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;
              </button>
            </nav>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HappeningByCategory;
