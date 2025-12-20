import React, { useEffect } from "react";
import { Search, RotateCcw } from "lucide-react";
import { useGetAllCoursesByType } from "@/hooks/useGetImage";

const SearchCourse = ({
  filters,
  setFilters,
  handleSearch,
  handleReset,
  type,
}) => {
  const { data, isLoading } = useGetAllCoursesByType(type);
  console.log(data)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <section className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          src="/images/a1.jpeg"
          alt="Search Courses"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="course-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Course Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                    <select
                      id="course-name"
                      name="name"
                      value={filters.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all appearance-none cursor-pointer"
                      disabled={isLoading}
                    >
                      <option value="">
                        {isLoading ? "Loading courses..." : "Select a course"}
                      </option>
                      {!isLoading &&
                        data &&
                        data.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name} {course.level && `- ${course.level}`}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="course-level"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Level
                  </label>
                  <select
                    id="course-level"
                    name="level"
                    value={filters.level}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all appearance-none cursor-pointer"
                    disabled={isLoading}
                  >
                    <option value="">
                      {isLoading ? "Loading..." : "Select level"}
                    </option>
                    {!isLoading &&
                      data &&
                      [
                        ...new Set(
                          data.map((course) => course.level).filter(Boolean)
                        ),
                      ].map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Location
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="location"
                        value="Onsite"
                        checked={filters.location === "Onsite"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        Campus
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="location"
                        value="Online"
                        checked={filters.location === "Online"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        Online
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchCourse;
