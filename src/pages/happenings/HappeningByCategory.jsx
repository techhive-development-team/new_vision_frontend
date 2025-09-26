import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import HappeningDetailCard from "../../components/happenings/HappeningDetailCard";
import { useGetHappenings } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";

const HappeningByCategory = () => {
  const { data, isLoading, error } = useGetHappenings();
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const typeId = localStorage.getItem("selectedHappeningTypeId");
    setSelectedType(typeId);
  }, []);

  if (isLoading)
    return (
      <Layout>
        <p className="text-center py-10">Loading...</p>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <p className="text-center py-10 text-red-500">Error loading happenings.</p>
      </Layout>
    );

  const filteredHappenings = data?.filter(
    (item) => item.happeningTypeId === Number(selectedType)
  );

  const typeName =
    filteredHappenings?.[0]?.happeningType?.typeName || "No happenings found";

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="pb-4">
          <div className="inline-block border-b-2 border-black dark:border-new-vision-yellow">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
              {typeName}
            </h2>
          </div>
        </div>

        {filteredHappenings?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHappenings.map((item) => (
              <HappeningDetailCard
                key={item.id}
                item={{
                  id: item.id,
                  name: item.title,
                  mainImage: item.mainImage
                    ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${item.mainImage}`
                    : "/images/a1.jpeg",
                  description: item.description,
                  postedDate: new Date(item.createdAt).toLocaleDateString(),
                }}
              />
            ))}
          </div>
        ) : (
          <p>No happenings found for this category.</p>
        )}
      </div>
    </Layout>
  );
};

export default HappeningByCategory;
