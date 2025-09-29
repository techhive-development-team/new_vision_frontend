import { User } from "lucide-react";
import React from "react";

const stats = [
  {
    icon: <User className="text-black w-10 h-10 mx-auto" />,
    count: "1500+",
    label: "Undergraduate Students",
  },
  {
    icon: <User className="text-black w-10 h-10 mx-auto" />,
    count: "300+",
    label: "Postgraduate Scholarships",
  },
  {
    icon: <User className="text-black w-10 h-10 mx-auto" />,
    count: "20+",
    label: "Countries Our Students Study In",
  },
];

const MainArchievement = () => {
  return (
    <div className="w-full py-12 relative bg-white">
      <img
        src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80"
        className="absolute inset-0 w-full h-full object-cover z-0"
        alt="Students background"
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="relative z-20 text-white px-4 text-center">
        <h3 className="font-semibold text-3xl md:text-4xl">Our Achievements</h3>
        <p className="w-11/12 md:w-2/3 mx-auto mt-6 leading-relaxed text-sm md:text-base text-gray-100">
          At New Vision Art & Science Institute, we are proud of our students'
          academic success and global recognition. Our graduates have earned
          admissions — many with scholarships and prestigious government grants
          — to top institutions around the world. These include renowned
          universities such as Newcastle University, University of Glasgow,
          Sheffield University, University of Illinois, The University of
          Melbourne, Lasalle College, University of Kansas, Brooklyn College,
          Taylor's College, Raffles University, and Assumption University of
          Thailand. In addition, students have gained placements at leading
          institutions in Asia, such as King Mongkut's University of Technology
          Thonburi (KMUTT), Chiang Mai University, Seoul National University of
          Science and Technology, Tongji University, Nanyang Polytechnic, and
          Polytechnic University. We also celebrate success in the creative
          fields with admissions to top design schools like The Ontario College
          of Art and Design University (OCAD). These achievements reflect our
          commitment to nurturing both academic excellence and creative
          innovation on a global scale.
        </p>

        {/* Stats Section */}
        <div className="w-11/12 md:w-4/5 mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform"
            >
              <div>{item.icon}</div>
              <hr className="my-4 border-gray-300 w-16 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">{item.count}</h3>
              <p className="text-gray-700 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainArchievement;
