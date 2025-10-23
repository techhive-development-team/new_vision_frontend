import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";

const Layout = ({ children, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pt-16">
          <Navbar />
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
