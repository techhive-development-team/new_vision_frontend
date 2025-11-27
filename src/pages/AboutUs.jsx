import React from "react";
import MissionVision from "../components/about-us/MissionVision";
import Congratulation from "../components/about-us/Congratulation";
import Layout from "../components/common/Layout";
import Loader from "@/components/common/Loader";
import { useGetStudentReview } from "@/hooks/useGetImage";

const AboutUs = () => {
  const { data, isLoading } = useGetStudentReview();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Layout>
        <Congratulation data={data} loading={isLoading} />
        <MissionVision />
      </Layout>
    </>
  );
};

export default AboutUs;
