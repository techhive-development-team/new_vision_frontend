import React from "react";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../hooks/useGetImage"; 
import { baseUrl, API_URLS } from "../../client/url";

const HappeningDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetHappeningById(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading happening.</p>;
  if (!data) return <p>Happening not found.</p>;

  const happening = data;

  return (
    <Layout>
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-200">
        <img
          src={
            happening.mainImage
              ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${happening.mainImage}`
              : "/images/a1.jpeg"
          }
          alt={happening.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto p-6 md:p-10 max-w-5xl">
        <h3 className="font-bold text-3xl md:text-4xl mb-4 text-gray-800">
          {happening.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6">
          {happening.description}
        </p>

        {happening.album?.images?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {happening.album.images.map((img, index) => (
              <img
                key={img.id || index}
                src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${img.image}`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-40 object-cover shadow-md"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No album images available.</p>
        )}
      </div>
    </Layout>
  );
};

export default HappeningDetail;
