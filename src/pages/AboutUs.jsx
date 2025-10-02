import React from "react";
import MissionVision from "../components/about-us/MissionVision";
import Congratulation from "../components/about-us/Congratulation";
import Layout from "../components/common/Layout";

const AboutUs = () => {
  return (
    <>
      <Layout>
        <Congratulation />
        <MissionVision />
      </Layout>
    </>
  );
};

export default AboutUs;
