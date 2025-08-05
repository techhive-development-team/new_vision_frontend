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
        <div>
          <Navbar />
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
