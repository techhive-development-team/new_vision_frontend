import React, { useContext } from "react";
import { motion } from "framer-motion";

import MainSlider from "../components/main/MainSlider";
import MainContext from "../components/main/MainContext";
import MainCourses from "../components/main/MainCourses";
import MainArchievement from "../components/main/MainArchievement";
import MainPartnerInstitute from "../components/main/MainPartnerInstitute";
import MainPartnerUniversity from "../components/main/MainPartnerUniversity";
import MainReview from "../components/main/MainReview";
import Layout from "../components/common/Layout";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const MainPage = () => {
  const { loadingCount } = useContext(LoadingContext);

  if (loadingCount > 0) {
    return <Loader />;
  }
  return (
    <Layout>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <MainSlider />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        variants={sectionVariants}
      >
        <MainContext />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={sectionVariants}
      >
        <MainCourses />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        variants={sectionVariants}
      >
        <MainArchievement />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        variants={sectionVariants}
      >
        <MainPartnerInstitute />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        variants={sectionVariants}
      >
        <MainPartnerUniversity />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        variants={sectionVariants}
      >
        <MainReview />
      </motion.div>
    </Layout>
  );
};

export default MainPage;
