import React from "react";
import Layout from "../components/common/Layout";
import { Calendar, CircleDollarSign, Clock } from "lucide-react";
import { useGetCourseById } from "../hooks/useGetImage";
import { Link, useParams } from "react-router-dom";
import { API_URLS, baseUrl } from "../client/url";

const CourseDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetCourseById(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course.</p>;
  if (!data) return <p>No course found.</p>;

  const course = data; // already unwrapped in your hook

  return (
    <Layout>
      <div>
        {/* Banner Section */}
        <div
          className="relative md:h-auto bg-cover bg-center text-white"
          style={{
            backgroundImage: `url(${
              course?.image
                ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`
                : "/images/a1.jpeg"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

          <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4">
            {/* Course Name */}
            <h1 className="text-yellow-300 font-bold text-center text-2xl md:text-4xl mb-8">
              {course?.name || "Course Detail"}
            </h1>

            {/* Info Cards */}
            <div className="flex flex-col md:flex-row m-6 p-4 md:p-6 bg-black bg-opacity-70 border rounded-xl w-full md:w-auto">
              {/* Duration */}
              <div className="flex flex-col space-y-4 pb-6 md:pb-0 md:mx-6 md:px-4 border-b md:border-r md:border-b-0 border-white text-sm md:text-xl">
                <div className="flex flex-row items-center space-x-4 pt-2">
                  <Clock className="w-6 h-6" />
                  <p>Duration</p>
                </div>
                <p>{course?.duration || "N/A"}</p>
              </div>

              {/* Price */}
              <div className="flex flex-col space-y-4 pb-6 md:pb-0 md:mx-6 md:px-4 border-b md:border-r md:border-b-0 border-white text-sm md:text-xl">
                <div className="flex flex-row items-center space-x-4 pt-2">
                  <CircleDollarSign className="w-6 h-6" />
                  <p>Fees</p>
                </div>
                <p>
                  {course?.price ? `${course.price} MMK` : "To be announced"}
                </p>
              </div>

              {/* Expiry Date */}
              <div className="flex flex-col space-y-4 md:mx-6 md:px-4 text-sm md:text-xl">
                <div className="flex flex-row items-center space-x-4 pt-2">
                  <Calendar className="w-6 h-6" />
                  <h2>Application Deadline</h2>
                </div>
                <p>
                  {course?.expireDate
                    ? new Date(course.expireDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Not set"}
                </p>
              </div>
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
              {/* Quiz Button */}
              {course?.quiz && (
                <div className="mt-6 text-center">
                  <Link
                    to={course.quiz}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 bg-new-vision-yellow border rounded-2xl text-black text-md font-medium hover:bg-black hover:text-white hover:border-new-vision-yellow"
                  >
                    Check My Level
                  </Link>
                </div>
              )}
              {course?.isOpened && (
                <div className="mt-6 text-center">
                  <Link
                    to={course?.id ? `/courses/${course.id}/apply` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 bg-new-vision-yellow border rounded-2xl text-black text-md font-medium hover:bg-black hover:text-white hover:border-new-vision-yellow"
                  >
                    Apply Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <section className="px-6 md:px-10 py-6 bg-white">
          {/* Program Overview */}
          <h3 className="text-2xl font-medium py-2">PROGRAM OVERVIEW</h3>
          <p className="text-base md:text-lg">{course?.programOverview}</p>

          {/* Skills */}
          {course?.skills?.length > 0 && (
            <div className="py-8">
              <h3 className="font-medium text-2xl">SKILL DEVELOPMENT</h3>
              <ul className="list-disc p-4 text-base md:text-lg">
                {course.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default CourseDetail;
