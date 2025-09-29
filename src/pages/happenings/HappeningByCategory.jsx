import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import HappeningDetailCard from "../../components/happenings/HappeningDetailCard";
import { useGetHappenings } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";
import HappeningContext from "@/components/happenings/HappeningContext";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const HappeningByCategory = () => {
  const { id } = useParams();
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const { data } = useGetHappenings();
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    setSelectedType(id);
  }, []);
  
  const { loadingCount } = useContext(LoadingContext);

  if (loadingCount > 0) {
    return <Loader />;
  }

  const filteredHappenings = data?.filter(
    (item) => item.happeningTypeId === Number(selectedType)
  );

  const typeName =
    filteredHappenings?.[0]?.happeningType?.typeName || "No happenings found";

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

        {filteredHappenings?.length ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {filteredHappenings.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <HappeningDetailCard
                  key={item.id}
                  item={{
                    id: item.id,
                    name: item.title,
                    mainImage: item.mainImage
                      ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${item.mainImage}`
                      : "/images/a1.jpeg",
                    description: item.description,
                    postedDate: new Date(item.createdAt).toLocaleDateString(),
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p>No happenings found for this category.</p>
        )}
      </div>
    </Layout>
  );
};

export default HappeningByCategory;
