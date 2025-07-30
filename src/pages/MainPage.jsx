import React from "react";
import Navbar from "../components/common/Navbar";
import MainSlider from "../components/main/MainSlider";
import MainContext from "../components/main/MainContext";
import MainCourses from "../components/main/MainCourses";
import MainArchievement from "../components/main/MainArchievement";
import MainPartnerInstitute from "../components/main/MainPartnerInstitute";
import Footer from "../components/common/Footer";
import MainPartnerUniversity from "../components/main/MainPartnerUniversity";
import MainReview from "../components/main/MainReview";
import StarsCanvas from "../components/common/StarBackground";
import Layout from "../components/common/Layout";

const MainPage = () => {
  return (
    <>
      <Layout>
        <MainSlider />
        <MainContext />
        <MainCourses />
        <MainArchievement />
        <MainPartnerInstitute />
        <MainPartnerUniversity />
        <MainReview />
      </Layout>
    </>
  );
};

export default MainPage;
