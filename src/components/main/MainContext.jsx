import React from "react";
import { Sparkles, Calendar } from "lucide-react"; 

const MainContext = () => {
  const cards = [
    {
      title: "Student's Art",
      icon: <Sparkles className="text-black w-5 h-5" />,
      imgAlt: "Student artwork preview",
      imgSrc: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
      description: "Showcasing the exceptional work of our students.",
      linkText: "Explore their creativity",
      linkHref: "#"
    },
    {
      title: "Happening At",
      icon: <Calendar className="text-black w-5 h-5" />,
      imgAlt: "Event banner",
      imgSrc: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
      description: "Celebrate creativity through our vibrant events.",
      linkText: "Join our events",
      linkHref: "#"
    },
  ];

  return (
    <div className="w-11/12 md:w-3/5 mx-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02]"
        >
          <div className={`bg-gradient-to-r  p-4 flex items-center gap-3`}>
            {card.icon}
            <h2 className="text-black text-base font-semibold">{card.title}</h2>
          </div>
          <div className="p-5 space-y-4">
            <img
              src={card.imgSrc}
              alt={card.imgAlt}
              className="w-full h-48 object-cover rounded-xl shadow-md bg-gray-200"
            />
            <p className="text-gray-700 text-base">{card.description}</p>
            <a
              href={card.linkHref}
              className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {card.linkText} →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContext;
