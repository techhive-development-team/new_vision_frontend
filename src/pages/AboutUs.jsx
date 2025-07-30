import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import MissionVision from "../components/about-us/MissionVision";
import StarsCanvas from "../components/common/StarBackground";
import Achievement from "../components/about-us/Achievement";
import Congratulation from "../components/about-us/Congratulation";
import Layout from "../components/common/Layout";

const AboutUs = () => {
  return (
    <>
      <Layout>
        <Congratulation />
        <Achievement />
        <MissionVision />
      </Layout>
    </>
  );
};

export default AboutUs;
