import React from "react";
import HappeningContext from "../../components/happenings/HappeningContext";
import Layout from "../../components/common/Layout";
import HappeningCard from "../../components/happenings/HappeningCard";

const studentShowcases = [
  {
    id: 1,
    name: "Students Showcase",
    items: [
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
    ],
  },
  {
    id: 2,
    name: "Events - upcoming & past",
    items: [
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
    ],
  },
  {
    id: 3,
    name: "Achievements",
    items: [
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
    ],
  },
];
const Happenings = () => {
  return (
    <>
      <Layout>
        <HappeningContext />
        <HappeningCard events={studentShowcases} />
      </Layout>
    </>
  );
};

export default Happenings;
