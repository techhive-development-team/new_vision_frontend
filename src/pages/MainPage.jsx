import React, { useEffect, useState } from "react";
import MainSlider from "../components/main/MainSlider";
import MainContext from "../components/main/MainContext";
import MainCourses from "../components/main/MainCourses";
import MainArchievement from "../components/main/MainArchievement";
import MainPartnerInstitute from "../components/main/MainPartnerInstitute";
import MainPartnerUniversity from "../components/main/MainPartnerUniversity";
import MainReview from "../components/main/MainReview";
import Layout from "../components/common/Layout";

const MainPage = () => {
  const [loadingCount, setLoadingCount] = useState(0);

  const notifyLoading = (isLoading) => {
    loadingCount
    setLoadingCount((count) => count + (isLoading ? 1 : -1));
  };

  const isLoading = loadingCount < 0;
  return (
    <>
      <Layout isLoading={isLoading}>
        <MainSlider notifyLoading={notifyLoading} />
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
