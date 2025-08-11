import React from "react";

import { Target, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Awards Won" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
  { icon: Target, value: "24/7", label: "Support" },
];
const Achievement = () => {
  return (
    <div className="p-8">
      <h3 className="text-2xl font-semibold text-black dark:text-white mb-6 text-center">Our Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <stat.icon className="text-blue-600 w-8 h-8 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievement;
