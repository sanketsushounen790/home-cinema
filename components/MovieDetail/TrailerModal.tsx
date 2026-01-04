import { useEffect, useState } from "react";

export default function TrailerModal({
  isOpen,
  onClose,
  videos,
}: {
  isOpen: boolean;
  onClose: () => void;
  videos: { key: string; type: string; name?: string }[];
}) {
  const [index, setIndex] = useState(0);

  const videoKey = videos[index]?.key;

  // Reset về trailer đầu khi mở modal
  useEffect(() => {
    if (isOpen) setIndex(0);
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-base-100 p-4 rounded-xl max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-base-100 hover:bg-base-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        {/* Tabs */}
        <div className="flex gap-2 mb-3 pb-2 overflow-x-auto no-scrollbar">
          {videos.map((v, i) => (
            <button
              key={v.key}
              onClick={() => setIndex(i)}
              className={`px-3 py-1 rounded-lg whitespace-nowrap border text-sm transition-all cursor-pointer ${
                index === i
                  ? "bg-primary text-primary-content border-primary"
                  : "bg-base-200 hover:bg-base-300 border-base-300"
              }`}
            >
              {v.name || v.type || `Trailer ${i + 1}`}
            </button>
          ))}
        </div>

        {/* Video */}
        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            className="w-full aspect-video rounded-lg transition-all duration-300"
            allowFullScreen
          />
        ) : (
          <div className="w-full aspect-video bg-base-300 rounded-lg flex items-center justify-center">
            Không có trailer
          </div>
        )}
      </div>
    </div>
  );
}
