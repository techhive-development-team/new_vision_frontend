import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetStudentReviewById } from "../hooks/useGetImage"; 
import { baseUrl, API_URLS } from "../client/url";
import Layout from "../components/common/Layout"; 

const StudentReviewDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetStudentReviewById(id);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error loading review.</p>;
  if (!data) return <p className="text-center py-10">No review found.</p>;

  const { student_img, educationPartner, name, batch, qualification, review } = data;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Student Review
        </h2>

        <div className="grid md:grid-cols-2 gap-6 bg-white dark:bg-white shadow rounded-xl overflow-hidden border border-gray-200">
          {student_img && (
            <img
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENTREVIEW}/${student_img}`}
              alt={name}
              className="w-full h-80 md:h-full object-cover"
            />
          )}

          <div className="p-6 md:p-8 flex flex-col justify-center text-gray-800 dark:text-gray-900">
            
            <h3 className="text-2xl font-extrabold">{name}</h3>
            
            <p className="text-base text-gray-500 dark:text-gray-700 mt-1">
              {batch}
            </p>
            
            <p className="text-base text-gray-500 dark:text-gray-700 mt-3">
              {qualification}
            </p>
            
            {educationPartner && (
              <div className="flex items-center space-x-3 mt-1">
                {educationPartner.logo_img ? ( 
                  <img
                    src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${educationPartner.logo_img}`}
                    alt={`${educationPartner.name} Logo`}
                    className="w-10 h-10 object-contain p-1 bg-white dark:bg-gray-100"
                  />
                ) : (
                  <span className="text-3xl">🏢</span> 
                )}
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-900">
                  {educationPartner.name}
                </p>
              </div>
            )}

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-300">
              <p className="text-base leading-relaxed italic dark:text-gray-800">"{review}"</p>
            </div>
          </div>
        </div>
        
        <Link
          to="/about-us"
          className="inline-flex items-center w-32 px-4 py-3 mt-8 text-sm md:text-base font-semibold 
                     rounded-2xl transition duration-300 whitespace-nowrap justify-center
                     text-black bg-new-vision-yellow border border-new-vision-yellow relative overflow-hidden
                     before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-gray-900 before:z-0 before:transition-all before:duration-300 hover:before:w-full hover:text-new-vision-yellow"
        >
          <span className="relative z-10">Back</span>
        </Link>

      </div>
    </Layout>
  );
};

export default StudentReviewDetail;
