import React, { useContext } from "react";
import Layout from "../../components/common/Layout";
import HappeningDetailCard from "../../components/happenings/HappeningDetailCard";
import { useGetHappeningTypeById } from "../../hooks/useGetImage";
import { API_URLS, imageUrl } from "../../client/url";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";
import HappeningContext from "@/components/happenings/HappeningContext";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import NotFoundData from "@/components/common/NotFoundData";

const HappeningByCategory = () => {
  const { id } = useParams();
  const { data, loading } = useGetHappeningTypeById(id);
  const { loadingCount } = useContext(LoadingContext);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  if (loading || loadingCount > 0) return <Loader />;
  const happenings = data?.Happening || [];
  const typeName = data?.typeName || "Happenings";

  if (!happenings.length)
    return <NotFoundData data={"No happenings found for this category."} />;

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
      </div>
    </Layout>
  );
};

export default HappeningByCategory;
