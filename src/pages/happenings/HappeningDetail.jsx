import React, { useContext, useState } from "react";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../hooks/useGetImage";
import { baseUrl, API_URLS } from "../../client/url";
import LoadingContext from "@/context/LoadingContext";
import Loader from "@/components/common/Loader";
import NotFoundData from "@/components/common/NotFoundData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-gray-900 animate-spin"></div>
  </div>
);

const HappeningDetail = () => {
  const { id } = useParams();
  const { data: happening } = useGetHappeningById(id);
  const { loadingCount } = useContext(LoadingContext);

  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [albumLoaded, setAlbumLoaded] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loadingCount > 0 && !happening) return <Loader />;

  if (!happening?.mainImage)
    return <NotFoundData data={"Happening not found."} />;

  const handleAlbumImageLoad = (index) => {
    setAlbumLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(happening.album.images[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % happening.album.images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(happening.album.images[nextIndex]);
  };

  const goToPrev = () => {
    const prevIndex =
      (currentIndex - 1 + happening.album.images.length) %
      happening.album.images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(happening.album.images[prevIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
  };

  return (
    <Layout>
      <div className="w-full aspect-[20/9] overflow-hidden relative bg-gray-100">
        {!mainImageLoaded && <ImageLoader />}
        <img
          src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${happening.mainImage}`}
          alt={happening.title}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
            mainImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setMainImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <h1 className="font-bold text-2xl md:text-3xl mb-4 text-gray-900 dark:text-white">
          {happening.title}
        </h1>
        <p className="text-base leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
          {happening.description}
        </p>
        {happening.album?.images?.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {happening.album.images.map((img, index) => (
                <div
                  key={img.id || index}
                  className="w-full aspect-[16/9] overflow-hidden rounded-lg border border-gray-200 relative bg-gray-100 cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => openModal(index)}
                >
                  {!albumLoaded[index] && <ImageLoader />}
                  <img
                    src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${img.image}`}
                    alt={`Gallery ${index + 1}`}
                    className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                      albumLoaded[index] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleAlbumImageLoad(index)}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400 mt-4 text-center">
            No gallery images available.
          </p>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          {happening.album.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={40} />
            </button>
          )}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${selectedImage.image}`}
              alt={`Gallery ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {happening.album.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight size={40} />
            </button>
          )}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {happening.album.images.length}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HappeningDetail;
