import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetStudentReviewById } from "../hooks/useGetImage";
import { API_URLS, imageUrl } from "../client/url";
import Layout from "../components/common/Layout";

const StudentReviewDetail = () => {
  const { id } = useParams();
  const { data } = useGetStudentReviewById(id);

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-3">
            <span className="text-xl">📝</span>
          </div>
          <p className="text-gray-500 text-sm">No review found</p>
        </div>
      </Layout>
    );
  }

  const { student_img, educationPartner, name, batch, qualification, review } =
    data;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 md:py-10 px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Success Story
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Student achievement details
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100">
          {student_img && (
            <div className="relative w-full aspect-square md:aspect-auto md:min-h-[500px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={`${imageUrl}${API_URLS.STUDENTREVIEW}/${student_img}`}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {name}
              </h3>
              <p className="text-sm text-gray-500">{batch}</p>
            </div>
            <p className="text-base text-gray-600 mb-4">{qualification}</p>
            {educationPartner && (
              <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg mb-6 w-fit">
                {educationPartner.logo_img ? (
                  <div className="w-8 h-8 flex-shrink-0">
                    <img
                      src={`${imageUrl}${API_URLS.EDUCATION_PARTNER}/${educationPartner.logo_img}`}
                      alt={educationPartner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-xl">🏢</span>
                )}
                <p className="text-sm font-medium text-gray-700">
                  {educationPartner.name}
                </p>
              </div>
            )}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-base leading-relaxed text-gray-700 italic">
                "{review}"
              </p>
            </div>
          </div>
        </div>
        <Link
          to="/about-us"
          className="inline-block mt-8 py-2.5 px-6 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Back
        </Link>
      </div>
    </Layout>
  );
};

export default StudentReviewDetail;
