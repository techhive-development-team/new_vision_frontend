import React from "react";
import { Link } from "react-router-dom";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { imageUrl, API_URLS } from "../../client/url";

const formatPrice = (value) => {
  try {
    return new Intl.NumberFormat("en-US").format(value);
  } catch {
    return value;
  }
};

const CourseCard = ({ course }) => {
  const imageSrc = course.image ? `${imageUrl}${API_URLS.COURSE}/${course.image}` : "/images/a1.jpeg";

  return (
    <Link
      to={`/courses/${course.id}`}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors duration-200 block"
    >
      <div className="w-full aspect-[20/9] overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={course.name || 'Course image'}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.name} {course.level && `(${course.level})`}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{course.duration || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{{ online: "Online", onsite: "Campus" }[course.location]}</span>
          </div>
          {course.price &&
            <div className="flex items-center gap-2">
              <DollarSign size={16} /> <span>{formatPrice(course.price)} MMK</span>
            </div>
          }
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <span className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-new-vision-yellow border border-gray-300 rounded-md hover:bg-new-vision-yellow/80 transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
