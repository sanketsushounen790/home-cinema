"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TrendingMovieList from "../Movie/TrendingMovieList";
import TrendingTVSerieList from "../TVSerie/TrendingTVSerieList";

const TrendingList = () => {
  const [timeWindowTab, setTimeWindowTab] = useState<"day" | "week">("day");
  const [mediaType, setMediaType] = useState<string>("movie");

  return (
    <div
      className="w-[90%] flex flex-col items-center gap-3"
      style={{ isolation: "isolate" }}
    >
      <div className="w-full flex items-center gap-2 mb-[-7px]">
        <h2 className="text-[20px] font-semibold">Trending</h2>

        <div className="relative flex bg-[#e9eef3] rounded-full p-1 w-[180px] overflow-hidden z-[0]">
          {/* Nền trượt */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute top-1 bottom-1 w-[85px] rounded-full bg-[#0d1b2a] z-[1]`}
            style={{
              left: mediaType === "movie" ? "4px" : "calc(100% - 89px)",
            }}
          />

          {/* Today */}
          <button
            onClick={() => setMediaType("movie")}
            className={`z-[2] flex-1 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              mediaType === "movie" ? "text-[#60f0c2]" : "text-[#0d1b2a]"
            }`}
          >
            Movies
          </button>

          {/* This Week */}
          <button
            onClick={() => setMediaType("tv")}
            className={`z-[2] flex-1 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              mediaType === "tv" ? "text-[#60f0c2]" : "text-[#0d1b2a]"
            }`}
          >
            TV Series
          </button>
        </div>

        <h2 className="text-[20px] font-semibold">/</h2>

        <div className="relative flex bg-[#e9eef3] rounded-full p-1 w-[180px] overflow-hidden z-[0]">
          {/* Nền trượt */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute top-1 bottom-1 w-[85px] rounded-full bg-[#0d1b2a] z-[1]`}
            style={{
              left: timeWindowTab === "day" ? "4px" : "calc(100% - 89px)",
            }}
          />

          {/* Today */}
          <button
            onClick={() => setTimeWindowTab("day")}
            className={`z-[2] flex-1 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              timeWindowTab === "day" ? "text-[#60f0c2]" : "text-[#0d1b2a]"
            }`}
          >
            Today
          </button>

          {/* This Week */}
          <button
            onClick={() => setTimeWindowTab("week")}
            className={`z-[2] flex-1 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              timeWindowTab === "week" ? "text-[#60f0c2]" : "text-[#0d1b2a]"
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="w-full flex items-center">
        {mediaType === "movie" ? (
          <TrendingMovieList timeWindow={timeWindowTab} />
        ) : (
          <TrendingTVSerieList timeWindow={timeWindowTab} />
        )}
      </div>
    </div>
  );
};

export default TrendingList;
