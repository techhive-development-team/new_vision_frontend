import React from "react";
import { useGetCourse } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";

const CourseBackground = () => {
  const { data, isLoading, error } = useGetCourse();

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error loading data</p>;
  if (!data) return null;

  const { opened = [], closed = [] } = data;

  const renderCourses = (courses) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col space-y-3 border border-gray-300 rounded-2xl p-6 md:p-5 lg:p-6 shadow-md bg-white hover:shadow-xl transition-all duration-300"
        >
          <img
            className="w-full h-48 object-cover rounded-xl"
            src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.IMAGE}/${course.image}`}
            alt={course.name}
          />
          <h1 className="text-xl font-semibold">{course.name}</h1>
          <p className="text-base">{course.programOverview}</p>
          <p className="text-base">
            <strong>Price:</strong>{" "}
            {course.price ? `${course.price} MMK` : "N/A"}
          </p>
          <p className="text-base">
            • {course.level} • {course.duration} • {course.location}
          </p>
          {course.expireDate && (
            <p className="text-base">
              <strong>Expire Date:</strong>{" "}
              {new Date(course.expireDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="">
      <div className="relative bg-[url('/images/a1.jpeg')] bg-cover bg-center text-white">
        <div className="container mx-auto">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div className="relative z-10 flex flex-col justify-center md:flex-row items-center md:items-start p-8 space-y-6 md:space-y-0 md:space-x-8 min-h-[20rem]">
            <div className="md:w-1/2 text-left">
              <h1 className="text-3xl md:text-4xl text-yellow-300 font-bold">
                Courses
              </h1>
            </div>
            <div className="md:w-1/2 flex justify-end mt-6 md:mt-0">
              <p className="text-lg md:text-xl text-yellow-300 leading-relaxed">
                Explore the rich history of New Vision Art & Science Institute
                through our courses. From beginner to advanced, our programs are
                designed to enhance your skills and knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {opened.length > 0 && (
        <section className="px-6 w-11/12 md:w-4/5 mx-auto py-6">
          <div className="inline-block border-b-2 dark:border-new-vision-yellow mb-4 border-black">
            <h2 className="font-semibold text-2xl text-black dark:text-white mb-2">
              Opening Courses
            </h2>
          </div>
          {renderCourses(opened)}
        </section>
      )}
      
      {closed.length > 0 && (
        <section className="px-6 w-11/12 md:w-4/5 mx-auto py-6">
          <div className="inline-block border-b-2 dark:border-new-vision-yellow mb-4 border-black">
            <h2 className="font-semibold text-2xl text-black dark:text-white mb-2">
              Closed Courses
            </h2>
          </div>
          {renderCourses(closed)}
        </section>
      )}
    </div>
  );
};

export default CourseBackground;
