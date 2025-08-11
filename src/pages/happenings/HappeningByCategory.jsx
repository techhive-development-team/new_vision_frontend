import React from "react";
import Layout from "../../components/common/Layout";
import HappeningContext from "../../components/happenings/HappeningContext";
import HappeningDetailCard from "../../components/happenings/HappeningDetailCard";

const items = [
  {
    id: "2",
    name: "Student Showcase 1",
    image: "/images/a1.jpeg",
    description: "Brief description of the showcase event 1.",
    postedDate: "2023-10-01",
  },

  {
    id: "2",
    name: "Student Showcase 2",
    image: "/images/a4.jpeg",
    description: "Brief description of the showcase event 2.",
    postedDate: "2023-10-01",
  },

  {
    id: "3",
    name: "Student Showcase 3",
    image: "/images/a5.jpeg",
    description: "Brief description of the showcase event 3.",
    postedDate: "2023-10-01",
  },
  {
    id: "2",
    name: "Student Showcase 1",
    image: "/images/a1.jpeg",
    description: "Brief description of the showcase event 1.",
    postedDate: "2023-10-01",
  },

  {
    id: "2",
    name: "Student Showcase 2",
    image: "/images/a4.jpeg",
    description: "Brief description of the showcase event 2.",
    postedDate: "2023-10-01",
  },

  {
    id: "3",
    name: "Student Showcase 3",
    image: "/images/a5.jpeg",
    description: "Brief description of the showcase event 3.",
    postedDate: "2023-10-01",
  },
];

const HappeningByCategory = () => {
  return (
    <>
      <Layout>
        <HappeningContext />
        <div className="container mx-auto p-4">
          <div className="py-6">
            <div className="pb-4">
              <div className="inline-block border-b-2 border-black dark:border-new-vision-yellow">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                  Students Showcase
                </h2>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, itemIndex) => (
              <HappeningDetailCard key={itemIndex} item={item} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HappeningByCategory;
