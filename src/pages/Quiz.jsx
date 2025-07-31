import React from "react";
import Layout from "../components/common/Layout";

const Quiz = () => {
  return (
    <Layout>
      <div className="w-full h-screen flex items-center justify-center">
        <iframe
          data-tally-src="https://tally.so/r/meWgXE"
          title="Tally Form"
          width="100%"
          height="500"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          allowFullScreen
          className="rounded-xl shadow-lg"
        ></iframe>
      </div>
    </Layout>
  );
};

export default Quiz;
