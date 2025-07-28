import React from "react";
import Navbar from "../components/common/Navbar";
import MainSlider from "../components/main/MainSlider";
import MainContext from "../components/main/MainContext";
import MainCourses from "../components/main/MainCourses";
import MainArchievement from "../components/main/MainArchievement";
import MainPartner from "../components/main/MainPartner";
import Footer from "../components/common/Footer";

const MainPage = () => {
  return (
    <>
      <Navbar />
      <MainSlider />
      <MainContext />
      <MainCourses />
      <MainArchievement />
      <MainPartner />
      <Footer />
    </>
  );
};

export default MainPage;
