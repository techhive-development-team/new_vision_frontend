// src/pages/happenings/Happenings.jsx
import React from "react";
import Layout from "../../components/common/Layout";
import HappeningContext from "../../components/happenings/HappeningContext";
import HappeningCard from "../../components/happenings/HappeningCard";
import { useGetHappenings } from "../../hooks/useGetImage";
import { API_URLS, imageUrl } from "../../client/url";
import Loader from "@/components/common/Loader";

const Happenings = () => {
  const { data, isLoading } = useGetHappenings();

  if (isLoading) {
    return <Loader />;
  }

  const events = data?.length
    ? data.reduce((acc, item) => {
        const groupIndex = acc.findIndex((g) => g.id === item.happeningTypeId);
        const eventItem = {
          id: item.id,
          name: item.title,
          mainImage: item.mainImage
            ? `${imageUrl}${API_URLS.HAPPENING}/${item.mainImage}`
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

  if (!events?.length) {
    return (
      <Layout>
        <HappeningContext />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-center text-gray-400 text-lg">
            No happenings available at the moment.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HappeningContext data={data} loading={isLoading} />
      <HappeningCard events={events} />
    </Layout>
  );
};

export default Happenings;
