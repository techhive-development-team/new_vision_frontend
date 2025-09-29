import React, { useContext } from "react";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HappeningDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetHappeningById(id);
  const { loadingCount } = useContext(LoadingContext);

  if (loadingCount > 0) return <Loader />;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading happening.</p>;
  if (!data) return <p>Happening not found.</p>;

  const happening = data;

  return (
    <Layout>
      <div
        className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-200"
        initial="hidden"
        animate="visible"
      >
        <img
          src={
            happening.mainImage
              ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${happening.mainImage}`
              : "/images/a1.jpeg"
          }
          alt={happening.title}
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        className="container mx-auto p-6 md:p-10 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.h3
          className="font-bold text-3xl md:text-4xl mb-4 text-black dark:text-white"
          variants={fadeUp}
        >
          {happening.title}
        </motion.h3>

        <motion.p
          className="leading-relaxed mb-6 text-black dark:text-white"
          variants={fadeUp}
        >
          {happening.description}
        </motion.p>

        {happening.album?.images?.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-2"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {happening.album.images.map((img, index) => (
              <motion.img
                key={img.id || index}
                src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${img.image}`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-40 object-cover shadow-md cursor-pointer"
                variants={fadeUp}
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.p className="text-gray-500 mt-4" variants={fadeUp}>
            No album images available.
          </motion.p>
        )}
      </motion.div>
    </Layout>
  );
};

export default HappeningDetail;
