import React from "react";
import HappeningDetailCard from "./HappeningDetailCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const HappeningCard = ({ events }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/happening/category/${id}`);
  };
  return (
    <>
      {events.map((event) => (
        <div key={event.id} className="container mx-auto px-6 py-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white inline-block pb-1">
                {event.name || "Category"}
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={container}
            >
              {event.items.slice(0, 3).map((item) => (
                <motion.div key={item.id} variants={fadeUp}>
                  <HappeningDetailCard item={item} />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center md:justify-end mt-5">
              <motion.button
                onClick={() => handleNavigate(event.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-6 py-2 font-semibold text-black transition-all border border-gray-300 duration-200 bg-new-vision-yellow rounded-full shadow-md hover:bg-yellow-200 hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              >
                <span className="mr-2">View More</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default HappeningCard;
