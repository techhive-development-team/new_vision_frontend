import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../hooks/useGetImage";
import { API_URLS, imageUrl } from "../../client/url";
import Loader from "@/components/common/Loader";
import NotFoundData from "@/components/common/NotFoundData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-gray-900 animate-spin"></div>
  </div>
);

const ImageSkeleton = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
);

const LazyImage = ({
  src,
  alt,
  className,
  onLoad,
  priority = false,
  aspectRatio = "aspect-[16/9]",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setShouldLoad(true);
          }
        });
      },
      {
        rootMargin: "400px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={imgRef} className={`relative w-full h-full ${aspectRatio}`}>
      {!loaded && shouldLoad && <ImageSkeleton />}
      {!shouldLoad && <ImageSkeleton />}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`${className} absolute top-0 left-0 transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          // Prevent layout shift
          style={{ contentVisibility: "auto" }}
        />
      )}
    </div>
  );
};

const HappeningDetail = () => {
  const { id } = useParams();
  const { data: happening } = useGetHappeningById(id);


  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Detect scrolling to optimize performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const mainImageUrl = useMemo(
    () =>
      happening?.mainImage
        ? `${imageUrl}${API_URLS.HAPPENING}/${happening.mainImage}`
        : null,
    [happening?.mainImage]
  );

  const albumImageUrls = useMemo(
    () =>
      happening?.album?.images?.map(
        (img) =>
          `${imageUrl}${API_URLS.HAPPENING}/${img.image}`
      ) || [],
    [happening?.album?.images]
  );

  useEffect(() => {
    if (selectedImage && happening?.album?.images?.length > 1) {
      const preloadIndexes = [
        (currentIndex + 1) % happening.album.images.length,
        (currentIndex - 1 + happening.album.images.length) %
          happening.album.images.length,
      ];

      preloadIndexes.forEach((idx) => {
        const img = new Image();
        img.src = albumImageUrls[idx];
      });
    }
  }, [
    currentIndex,
    selectedImage,
    albumImageUrls,
    happening?.album?.images?.length,
  ]);

  const openModal = useCallback(
    (index) => {
      setCurrentIndex(index);
      setSelectedImage(happening.album.images[index]);
      document.body.style.overflow = "hidden";
    },
    [happening?.id]
  );

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % happening.album.images.length;
      setSelectedImage(happening.album.images[nextIndex]);
      return nextIndex;
    });
  }, [happening?.id]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex =
        (prev - 1 + happening.album.images.length) %
        happening.album.images.length;
      setSelectedImage(happening.album.images[prevIndex]);
      return prevIndex;
    });
  }, [happening?.id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    },
    [closeModal, goToNext, goToPrev]
  );

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage, handleKeyDown]);

  if (!happening?.mainImage)
    return <NotFoundData data={"Happening not found."} />;

  return (
    <Layout>
      {/* Hero Image with fixed aspect ratio */}
      <div className="w-full aspect-[20/9] overflow-hidden relative bg-gray-100 dark:bg-gray-800">
        <LazyImage
          src={mainImageUrl}
          alt={happening.title}
          className="w-full h-full object-cover"
          priority
          aspectRatio=""
        />
      </div>

      <div className="container mx-auto px-6 py-6 md:py-10 max-w-5xl">
        <h1 className="font-bold text-2xl md:text-3xl mb-4 text-gray-900 dark:text-white">
          {happening.title}
        </h1>
        <p className="text-base leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
          {happening.description}
        </p>

        {/* YouTube Video Section */}
        {happening.embeddedLink && (
        <div className="mb-8">
          <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <iframe
              src={happening.embeddedLink}
              title="YouTube video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
         )} 

        {happening.album?.images?.length > 0 && (
          <>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              style={{ willChange: isScrolling ? "transform" : "auto" }}
            >
              {happening.album.images.map((img, index) => (
                <div
                  key={img.id || index}
                  className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 relative bg-gray-100 dark:bg-gray-800 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  onClick={() => openModal(index)}
                  style={{
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <LazyImage
                    src={albumImageUrls[index]}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                    aspectRatio="aspect-[16/9]"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
          style={{ transform: "translateZ(0)" }}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          {happening.album.images.length > 1 && (
            <>
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
            </>
          )}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={albumImageUrls[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              loading="eager"
              style={{ transform: "translateZ(0)" }}
            />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {happening.album.images.length}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HappeningDetail;
