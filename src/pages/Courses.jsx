import React, { useContext } from "react";
import CourseBackground from "../components/courses/CourseBackground";
import Layout from "../components/common/Layout";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";

const Courses = () => {
  const { loadingCount } = useContext(LoadingContext);

  if (loadingCount > 0) {
    return <Loader />;
  }
  return (
    <div>
      <Layout>
        <CourseBackground />
      </Layout>
    </div>
  );
};

export default Courses;
