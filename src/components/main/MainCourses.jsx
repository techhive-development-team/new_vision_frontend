import React from "react";

const courses = [
  {
    imgSrc:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    description: "Art & Design Programs",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    description: "Technology Programs",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    description: "Children’s Creative Programs",
  },
];
const MainCourses = () => {
  return (
    <div className="px-6">
      <div className="w-11/12 md:w-4/5 mx-auto py-6 space-y-4">
        <h3 className="font-semibold text-2xl">Overview of our study programs</h3>
        <p className="font-light">
          We offer a wide range of state-recognised and accredited undergraduate
          and postgraduate study programmes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((card, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div>
                <img
                  src={card.imgSrc}
                  alt={card.imgAlt}
                  className="w-full h-48 object-cover rounded-t-md shadow-md bg-gray-200"
                />
                <div className="p-5">
                  <p className="text-gray-700 text-base text-center">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCourses;
