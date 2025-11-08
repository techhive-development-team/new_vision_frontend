import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetImageById } from "../../hooks/useGetImage";
import { API_URLS, imageUrl } from "../../client/url";
import { getGridCols } from "../common/getGridCols";
import { isEmptyArray } from "@/lib/util";

const MainContext = () => {
  const { data } = useGetImageById(2);

  if (isEmptyArray(data?.images)) {
    return (
      <p className="text-center py-10 text-gray-500">No context available</p>
    );
  }

  return (
    <div className="px-6">
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
              <div className="relative w-full max-h-[500px] sm:max-h-[600px] aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-xl shadow-md bg-gray-200">
                <img
                  src={`${imageUrl}${API_URLS.IMAGE}/${slide.bg_img}`}
                  alt={slide.sub_text || "Slide image"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              {slide.subText && (
                <p className="text-gray-700 text-base">{slide.subText}</p>
              )}

              {slide.link && (
                <Link
                  to={slide.link}
                  className="inline-block text-base font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Learn More →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContext;
