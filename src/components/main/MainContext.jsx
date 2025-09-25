import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetImageById } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../client/url";
import { getGridCols } from "../common/getGridCols";

const MainContext = () => {
  const { data, isLoading, error } = useGetImageById(2);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error loading data</p>;

  return (
    <div className="px-6">
      {Array.isArray(data?.images) && data.images.length > 0 && (
        <div
          className={`w-11/12 md:w-4/5 mx-auto py-6 grid gap-8 ${getGridCols(
            data.images.length
          )}`}
        >
          {data.images.map((slide, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="bg-gradient-to-r p-4 pb-0 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <h2 className="text-black text-base font-semibold">
                  {slide.mainText}
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <img
                  src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.IMAGE}/${slide.bg_img}`}
                  alt={slide.sub_text || "Slide image"}
                  className="w-full h-48 object-cover rounded-xl shadow-md bg-gray-200"
                />
                {slide.subText && (
                  <p className="text-gray-700 text-base">{slide.subText}</p>
                )}
                {slide.link && (
                  <Link
                    to={slide.link}
                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Learn More →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {!data?.images?.length && (
        <p className="text-center py-10 text-gray-500">No slides available</p>
      )}
    </div>
  );
};

export default MainContext;
