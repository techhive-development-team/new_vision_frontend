import React from "react";
import CourseBackground from "../../components/courses/CourseBackground";
import Layout from "../../components/common/Layout";
import Loader from "@/components/common/Loader";
import { useGetCourse } from "@/hooks/useGetImage";

const Courses = () => {
  const { data, isLoading } = useGetCourse();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Layout>
        <CourseBackground data={data} loading={isLoading} />
      </Layout>
    </div>
  );
};

export default Courses;
