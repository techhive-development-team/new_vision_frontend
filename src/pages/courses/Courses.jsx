import React from "react";
import CourseBackground from "../../components/courses/CourseBackground";
import Layout from "../../components/common/Layout";
import Loader from "@/components/common/Loader";
import { useGetCourse, useGetImageById } from "@/hooks/useGetImage";
import { getGridCols } from "@/components/common/getGridCols";
import { API_URLS, imageUrl } from "@/client/url";
import { Link } from "react-router-dom";

const Courses = () => {
  const { data, isLoading } = useGetImageById(3);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Layout>
        <CourseBackground />
        {data && (
          <section className="">
            <div className="px-6 w-11/12 md:w-4/5 mx-auto py-6">
              <h3 className="font-semibold text-2xl text-black dark:text-white mb-2">
                Overview of our study programs
              </h3>
              <p className="font-light text-black dark:text-white mb-6">
                We offer a wide range of state-recognised and accredited undergraduate
                and postgraduate study programmes.
              </p>
              <div className={`grid gap-8 ${getGridCols(data.images.length)}`}>
                {data.images.map((card, index) => {
                  const isExternal = typeof card.link === "string" && /^(?:https?:)\/\//.test(card.link);

                  const cardContent = (
                    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02]">
                      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-t-xl shadow-md bg-gray-200">
                        <img
                          src={`${imageUrl}${API_URLS.IMAGE}/${card.bg_img}`}
                          alt={card.mainText || "Course image"}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="p-5">
                        <p className="text-gray-700 text-base text-center">{card.mainText}</p>
                      </div>
                    </div>
                  );

                  return isExternal ? (
                    <Link
                      key={index}
                      to={card.link}
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <Link key={index} to={card.link || "/courses"} className="block">
                      {cardContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </Layout>
    </div>
  );
};

export default Courses;
