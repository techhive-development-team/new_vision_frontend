import React, { useContext } from "react";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";
import { motion } from "framer-motion";
import NotFoundData from "@/components/common/NotFoundData";

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
  const { data: happening } = useGetHappeningById(id);
  const { loadingCount } = useContext(LoadingContext);

  if (loadingCount > 0) return <Loader />;

  return (
    <>
      {!happening?.mainImage ? (
        <NotFoundData data={"Happening not found."} />
      ) : (
        <Layout>
          <motion.div
            className="w-full aspect-[20/9] overflow-hidden bg-gray-200"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <img
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${happening.mainImage}`}
              alt={happening.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="container mx-auto p-6 md:p-10 max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.h3
              className="font-bold text-xl md:text-4xl mb-4 text-black dark:text-white"
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
                className="grid grid-cols-1 md:grid-cols-3 gap-2"
                variants={container}
              >
                {happening.album.images.map((img, index) => (
                  <motion.div
                    key={img.id || index}
                    className="w-full aspect-[16/9] overflow-hidden rounded-md shadow-md cursor-pointer"
                    variants={fadeUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${img.image}`}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                className="text-gray-400 mt-4"
                variants={fadeUp}
              ></motion.p>
            )}
          </motion.div>
        </Layout>
      )}
    </>
  );
};

export default HappeningDetail;
