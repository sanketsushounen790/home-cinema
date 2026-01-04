"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TVSerieImages from "./TVSerieImages";
import TVSerieVideos from "./TVSerieVideos";

interface TVSerieMediaProps {
  tvId: string | number;
}

const TVSerieMedia = ({ tvId }: TVSerieMediaProps) => {
  const [mediaTab, setMediaTab] = useState("image");

  return (
    <div className="w-[90%] flex flex-col justify-start items-center shadow-lg p-2">
      <div className="w-full flex justify-start items-center gap-4 ml-4 mt-4">
        <div className="w-auto font-bold text-[20px]">Media</div>

        <div className="flex justify-around border-b border-base-content">
          {/* Tab trái */}
          <button
            onClick={() => setMediaTab("image")}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer text-[15px]`}
          >
            Image
            {mediaTab === "image" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-[2px] w-full bg-base-content rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>

          {/* Tab phải */}
          <button
            onClick={() => setMediaTab("video")}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer text-[15px]`}
          >
            Video
            {mediaTab === "video" && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-[2px] w-full bg-black rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        </div>
      </div>

      {mediaTab === "image" ? (
        <TVSerieImages tvId={tvId} />
      ) : (
        <TVSerieVideos tvId={tvId} />
      )}
    </div>
  );
};

export default TVSerieMedia;
