import React from "react";
import HappeningDetailCard from "./HappeningDetailCard";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HappeningCard = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      {events.map((event) => (
        <motion.div
          key={event.id}
          className="py-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="pb-4">
            <div className="inline-block border-b-2 border-black dark:border-white">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                {event.name || "Category"}
              </h2>
            </div>
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

          <div className="flex items-end justify-end mt-4">
            <Link
              className="text-md ml-4 text-black dark:text-white hover:underline"
              to={`/happening/category/${event.id}`}
            >
              View More &rarr;
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HappeningCard;
