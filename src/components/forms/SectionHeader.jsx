import React from "react";

const SectionHeader = ({ icon: Icon, color = "text-gray-600", title }) => (
  <div className="flex items-center mb-4">
    {Icon && <Icon className={`mr-2 ${color}`} size={20} />}
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);

export default SectionHeader;
