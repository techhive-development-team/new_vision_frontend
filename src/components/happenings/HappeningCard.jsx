import React from "react";
import HappeningDetailCard from "./HappeningDetailCard";
import { Link } from "react-router-dom";
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

            <div className="flex justify-end mt-6">
              <Link
                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                to={`/happening/category/${event.id}`}
              >
                View More →
              </Link>
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default HappeningCard;
