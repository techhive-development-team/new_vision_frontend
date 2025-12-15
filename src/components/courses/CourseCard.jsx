import React from "react";
import { Link } from "react-router-dom";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { imageUrl, API_URLS } from "../../client/url";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-200">

      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={`${imageUrl}${API_URLS.COURSE}/${course.image}`}
          alt={course.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {course.name} {course.level && `(${course.level})`}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{course.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} />
            {course.price != null && <span>{course.price} MMK</span>}
          </div>
        </div>

        <div className="pt-2">
          <Link
            to={`/courses/${course.id}`}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-new-vision-yellow border border-gray-300 rounded-md hover:bg-new-vision-yellow/80 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
