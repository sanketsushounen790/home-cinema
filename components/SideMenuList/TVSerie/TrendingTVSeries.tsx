"use client";

import LoadingCard from "@/components/Shared_Components/LoadingCard";
import { useTrendingTVSeries } from "./hook/useTrendingTVSeries";
import { useState } from "react";
import { motion } from "framer-motion";
import TVSerieCard from "@/components/TVSerie/TVSerieCard";

const TrendingTVSeries = () => {
  const [timeWindowTab, setTimeWindowTab] = useState<"day" | "week">("day");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTrendingTVSeries(timeWindowTab);

  const tvArraylength: number = data?.pages[0]?.results.length as number;

  return (
    <div className="w-full h-auto mb-8">
      <div className="flex flex-wrap justify-start items-center ml-7 mt-2 mb-3 gap-3">
        <div className="font-bold text-[23px]">Trending TV Shows</div>
        <div className="w-full flex items-center gap-2 mb-2">
          <h2 className="text-[20px] font-semibold">Time Window</h2>
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
      </div>

      {isLoading ? (
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
        >
          {Array.from({ length: 20 }, (_, index) => index).map(
            (item, index) => (
              <div key={item} className="w-full">
                <LoadingCard />
              </div>
            )
          )}
        </div>
      ) : tvArraylength <= 5 ? (
        <div
          className={`w-[90%] flex flex-wrap justify-center lg:justify-start gap-6 mx-6`}
        >
          {data?.pages.map((page) =>
            page.results.map((result, index) => (
              <div key={index} className="w-[200px]">
                <TVSerieCard tv={result} />
              </div>
            ))
          )}
        </div>
      ) : (
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
        >
          {data?.pages.map((page) =>
            page.results.map((result, index) => (
              <div key={index} className="w-full w-max-[200px]">
                <TVSerieCard tv={result} />
              </div>
            ))
          )}

          {hasNextPage && tvArraylength >= 20 && (
            <div className="w-full h-[300px] flex items-center justify-center rounded-lg shadow-lg bg-base-300">
              <button
                key={`loadmore-button`}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
              >
                {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingTVSeries;
