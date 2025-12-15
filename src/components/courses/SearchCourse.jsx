import React from "react";

const SearchCourse = ({ filters, setFilters, handleSearch, handleReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-6 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Course Name"
              className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              name="level"
              value={filters.level}
              onChange={handleChange}
              placeholder="Level"
              className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="Onsite"
                  checked={filters.location === "Onsite"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <span className="text-sm dark:text-gray-200">Campus</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="Online"
                  checked={filters.location === "Online"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <span className="text-sm dark:text-gray-200">Online</span>
              </label>
            </div>

            <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-new-vision-yellow border border-gray-300 rounded-md hover:bg-new-vision-yellow/80 transition-colors focus:outline-none"
                >
                  Search
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-300 border border-gray-300 rounded-md hover:bg-gray-400 transition-colors focus:outline-none"
                >
                  Reset
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchCourse;