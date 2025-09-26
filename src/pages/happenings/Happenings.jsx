// src/pages/happenings/Happenings.jsx
import React from "react";
import Layout from "../../components/common/Layout";
import HappeningContext from "../../components/happenings/HappeningContext";
import HappeningCard from "../../components/happenings/HappeningCard";
import { useGetHappenings } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";

const Happenings = () => {
  const { data, isLoading, error } = useGetHappenings();

  if (isLoading)
    return (
      <Layout>
        <p className="text-center py-10">Loading happenings...</p>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <p className="text-center py-10 text-red-500">
          Error loading happenings.
        </p>
      </Layout>
    );

  const events = data?.length
    ? data.reduce((acc, item) => {
        const groupIndex = acc.findIndex(
          (g) => g.id === item.happeningTypeId
        );

        const eventItem = {
          id: item.id,
          name: item.title,
          mainImage: item.mainImage
            ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${item.mainImage}`
            : "/images/a1.jpeg",
          description: item.description,
          postedDate: new Date(item.createdAt).toLocaleDateString(),
        };

        if (groupIndex !== -1) {
          acc[groupIndex].items.push(eventItem);
        } else {
          acc.push({
            id: item.happeningTypeId,
            name: item.happeningType?.typeName || "Category",
            items: [eventItem],
          });
        }

        return acc;
      }, [])
    : [];

  return (
    <Layout>
      <HappeningContext />
      <HappeningCard events={events} />
    </Layout>
  );
};

export default Happenings;
