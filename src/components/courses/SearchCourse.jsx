import React from "react";

const SearchCourse = ({ filters, setFilters, handleSearch, handleReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-8 px-6">
      <div className="container mx-auto max-w-4xl flex flex-wrap gap-4 items-center">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Course Name"
          className="border rounded px-3 py-2 flex-1
             bg-white dark:bg-gray-800
             text-gray-900 dark:text-white
             border-gray-400 dark:border-gray-500
             placeholder-gray-400 dark:placeholder-gray-300"
        />

        <input
          type="text"
          name="level"
          value={filters.level}
          onChange={handleChange}
          placeholder="Level"
          className="border rounded px-3 py-2 flex-1
             bg-white dark:bg-gray-800
             text-gray-900 dark:text-white
             border-gray-400 dark:border-gray-500
             placeholder-gray-400 dark:placeholder-gray-300"
        />

        <div className="flex gap-4 items-center h-10">
          <label className="flex items-center gap-1 text-gray-900 dark:text-white">
            <input
              type="radio"
              name="location"
              value="Onsite"
              checked={filters.location === "Onsite"}
              onChange={handleChange}
              className="accent-new-vision-yellow"
            />
            Onsite
          </label>
          <label className="flex items-center gap-1 text-gray-900 dark:text-white">
            <input
              type="radio"
              name="location"
              value="Online"
              checked={filters.location === "Online"}
              onChange={handleChange}
              className="accent-new-vision-yellow"
            />
            Online
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-new-vision-yellow text-gray-900 font-semibold rounded-md hover:bg-new-vision-yellow/80 transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchCourse;
