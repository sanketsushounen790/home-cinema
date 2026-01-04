"use client";

import { useState } from "react";
import MovieVideos from "./MovieVideos";
import MovieImages from "./MovieImages";

import { motion } from "framer-motion";

interface MovieMediaProps {
  movieId: string | number;
}

const MovieMedia = ({ movieId }: MovieMediaProps) => {
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
                className="absolute left-0 bottom-0 h-[2px] w-full bg-base-content rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        </div>
      </div>

      {mediaTab === "image" ? (
        <MovieImages movieId={movieId} />
      ) : (
        <MovieVideos movieId={movieId} />
      )}
    </div>
  );
};

export default MovieMedia;
