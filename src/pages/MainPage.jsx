import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainSlider from "../components/main/MainSlider";
import MainContext from "../components/main/MainContext";
import MainCourses from "../components/main/MainCourses";
import MainArchievement from "../components/main/MainArchievement";
import MainPartnerInstitute from "../components/main/MainPartnerInstitute";
import MainPartnerUniversity from "../components/main/MainPartnerUniversity";
import MainReview from "../components/main/MainReview";
import Layout from "../components/common/Layout";
import Loader from "@/components/common/Loader";
import { useGetImageById, useGetEducationPartnerInstitute, useGetEducationPartnerUniversity, useGetStudentReview } from "@/hooks/useGetImage";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const MainPage = () => {
  const { data: sliderData, isLoading: loadingSlider } = useGetImageById(1);
  const { data: contextData, isLoading: loadingContext } = useGetImageById(2);
  const { data: coursesData, isLoading: loadingCourses } = useGetImageById(3);
  const { data: institutesData, isLoading: loadingInstitutes } = useGetEducationPartnerInstitute();
  const { data: universitiesData, isLoading: loadingUniversities } = useGetEducationPartnerUniversity();
  const { data: reviewsData, isLoading: loadingReviews } = useGetStudentReview();

  const isLoading = loadingSlider || loadingContext || loadingCourses || loadingInstitutes || loadingUniversities || loadingReviews;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <MainSlider data={sliderData} loading={loadingSlider} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={sectionVariants}
      >
        <MainContext data={contextData} loading={loadingContext} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={sectionVariants}
      >
        <MainCourses data={coursesData} loading={loadingCourses} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={sectionVariants}
      >
        <MainArchievement />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={sectionVariants}
      >
        <MainPartnerInstitute data={institutesData} loading={loadingInstitutes} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={sectionVariants}
      >
        <MainPartnerUniversity data={universitiesData} loading={loadingUniversities} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={sectionVariants}
      >
        <MainReview data={reviewsData} loading={loadingReviews} />
      </motion.div>
    </Layout>
  );
};

export default MainPage;
