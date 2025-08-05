import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-16 h-16 rounded-full border-4 border-b-new-vision-yellow border-l-new-vision-green  border-r-new-vision-green border-t-new-vision-yellow animate-spin text-white"></div>
    </div>
  );
};

export default Loader;
