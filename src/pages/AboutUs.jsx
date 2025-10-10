import React, { useContext } from "react";
import MissionVision from "../components/about-us/MissionVision";
import Congratulation from "../components/about-us/Congratulation";
import Layout from "../components/common/Layout";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";

const AboutUs = () => {
  const { loadingCount } = useContext(LoadingContext);

  if (loadingCount > 0) {
    return <Loader />;
  }
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
