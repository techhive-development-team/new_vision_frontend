import React from "react";
import Layout from "./Layout";

const NotFoundData = ({ data }) => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-400 text-lg">{data}</p>
      </div>
    </Layout>
  );
};

export default NotFoundData;
