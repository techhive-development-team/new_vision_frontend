import { useGetImageById } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";
import { getGridCols } from "../common/getGridCols";
import { isEmptyArray } from "@/lib/util";

const MainCourses = () => {
  const { data } = useGetImageById(3);
  if (isEmptyArray(data?.images)) {
    return (
      <p className="text-center py-10 text-gray-500">No courses available</p>
    );
  }

  return (
    <div className="px-6 w-11/12 md:w-4/5 mx-auto py-6">
      <h3 className="font-semibold text-2xl text-black dark:text-white mb-2">
        Overview of our study programs
      </h3>
      <p className="font-light text-black dark:text-white mb-6">
        We offer a wide range of state-recognised and accredited undergraduate
        and postgraduate study programmes.
      </p>

      <div className={`grid gap-8 ${getGridCols(data.images.length)}`}>
        {data.images.map((card, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <img
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.IMAGE}/${card.bg_img}`}
              alt={card.mainText || "Course image"}
              className="w-full h-48 object-cover rounded-t-xl shadow-md bg-gray-200"
            />
            <div className="p-5">
              <p className="text-gray-700 text-base text-center">
                {card.mainText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCourses;
